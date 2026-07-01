// Server-only. Reads/writes the live gallery data as a single JSON file in
// Vercel Blob. Falls back to the static seed in `@/lib/gallery` whenever Blob
// isn't configured yet or a read fails, so the public site never breaks.
import { del, list, put } from "@vercel/blob";
import { serviceGalleries, type GalleryImage } from "@/lib/gallery";

export type Galleries = Record<string, GalleryImage[]>;

// Where the live gallery data lives inside the Blob store.
const METADATA_PATH = "studio/galleries.json";

// Hostname suffix of Vercel Blob public URLs. Used to tell "photos we uploaded"
// (safe to delete from Blob) apart from the original seed images in /public.
const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

export class StudioConfigError extends Error {}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function isUploadedBlob(src: string): boolean {
  try {
    return new URL(src).hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

/** A fresh, deep-ish copy of the static seed galleries. */
export function seedGalleries(): Galleries {
  const out: Galleries = {};
  for (const [key, images] of Object.entries(serviceGalleries)) {
    out[key] = images.map((image) => ({ ...image }));
  }
  return out;
}

function isValidImage(value: unknown): value is GalleryImage {
  if (!value || typeof value !== "object") return false;
  const image = value as Record<string, unknown>;
  return (
    typeof image.src === "string" &&
    typeof image.alt === "string" &&
    typeof image.caption === "string" &&
    typeof image.width === "number" &&
    typeof image.height === "number"
  );
}

/**
 * Merge stored data over the seed so every known gallery key always exists,
 * while stored galleries (including intentionally empty ones) stay authoritative.
 */
function normalize(raw: unknown): Galleries {
  const result = seedGalleries();
  const container =
    raw && typeof raw === "object" && "galleries" in (raw as object)
      ? (raw as { galleries: unknown }).galleries
      : raw;

  if (container && typeof container === "object") {
    for (const [key, value] of Object.entries(container as Record<string, unknown>)) {
      if (Array.isArray(value)) {
        result[key] = value.filter(isValidImage).map((image) => ({
          src: image.src,
          alt: image.alt,
          caption: image.caption,
          width: image.width,
          height: image.height,
        }));
      }
    }
  }

  return result;
}

/** Read the current galleries straight from Blob (no caching). */
export async function readGalleries(): Promise<Galleries> {
  if (!isBlobConfigured()) return seedGalleries();

  try {
    const { blobs } = await list({ prefix: METADATA_PATH, limit: 1 });
    const blob = blobs.find((item) => item.pathname === METADATA_PATH);
    if (!blob) return seedGalleries();

    // Version the URL by upload time so any CDN cache is bypassed after a write.
    // (Next's fetch is uncached by default; we avoid `no-store` so this can also
    // run inside `unstable_cache` on the public read path without conflict.)
    const response = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`);
    if (!response.ok) return seedGalleries();

    return normalize(await response.json());
  } catch (error) {
    console.error("[studio] Failed to read galleries from Blob, using seed.", error);
    return seedGalleries();
  }
}

/** Persist the full galleries object back to Blob. */
export async function writeGalleries(galleries: Galleries): Promise<void> {
  if (!isBlobConfigured()) {
    throw new StudioConfigError(
      "Photo storage isn't set up yet. Add a Vercel Blob store to this project so changes can be saved.",
    );
  }

  await put(METADATA_PATH, JSON.stringify({ galleries }), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

/** Delete an uploaded image's file from Blob. No-op for original seed images. */
export async function deleteUploadedBlob(src: string): Promise<void> {
  if (!isBlobConfigured() || !isUploadedBlob(src)) return;
  try {
    await del(src);
  } catch (error) {
    console.error("[studio] Failed to delete blob file (metadata already updated).", error);
  }
}
