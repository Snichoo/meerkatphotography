// Server-only. Reads/writes the live gallery data as JSON in Vercel Blob.
//
// Every save is written to a NEW, never-overwritten file
// (`studio/galleries/v0000000042.json`) and the newest version wins. We can't
// overwrite one fixed file: the Blob CDN caches each URL for at least 60s and
// ignores query strings, so a read right after a save got the PREVIOUS data.
// The next upload/delete/reorder then wrote that old data back — silently
// dropping photos and resurrecting deleted ones (broken images on the site).
//
// Falls back to the static seed in `@/lib/gallery` when nothing has been saved
// yet, so the public site works before the Studio is ever used.
import { del, list, put } from "@vercel/blob";
import { serviceGalleries, type GalleryImage } from "@/lib/gallery";

export type Galleries = Record<string, GalleryImage[]>;

// Pre-versioning location of the gallery data. Only read, as the starting
// point until the first versioned save.
const LEGACY_PATH = "studio/galleries.json";
const VERSIONS_PREFIX = "studio/galleries/";
const VERSION_PATTERN = /^studio\/galleries\/v(\d+)\.json$/;
// Old versions kept as a safety net; anything older is pruned after a save.
const KEEP_VERSIONS = 30;
const MAX_SAVE_ATTEMPTS = 10;

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

type VersionRef = { version: number; url: string };
type Snapshot = { galleries: Galleries; version: number; versions: VersionRef[] };

function versionPath(version: number): string {
  return `${VERSIONS_PREFIX}v${String(version).padStart(10, "0")}.json`;
}

/** All saved versions, newest first. `list` hits the Blob API, not the CDN. */
async function listVersions(): Promise<VersionRef[]> {
  const versions: VersionRef[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: VERSIONS_PREFIX, cursor });
    for (const blob of page.blobs) {
      const match = VERSION_PATTERN.exec(blob.pathname);
      if (match) versions.push({ version: Number(match[1]), url: blob.url });
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return versions.sort((a, b) => b.version - a.version);
}

async function fetchJson(url: string): Promise<unknown> {
  // Each version URL is immutable, so a CDN-cached copy is always correct.
  // (No `no-store` so this can also run inside `unstable_cache`.)
  // A just-written file can briefly 404 at the CDN, so retry that a few times.
  for (let attempt = 1; ; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return response.json();
    if (response.status !== 404 || attempt >= 4) {
      throw new Error(`Blob read failed (${response.status}) for ${url}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
  }
}

/** Newest saved galleries. Throws if Blob can't be read (never guesses). */
async function readSnapshot(): Promise<Snapshot> {
  const versions = await listVersions();
  const latest = versions[0];
  if (latest) {
    return { galleries: normalize(await fetchJson(latest.url)), version: latest.version, versions };
  }

  // Nothing versioned yet: start from the legacy single file, else the seed.
  const { blobs } = await list({ prefix: LEGACY_PATH, limit: 1 });
  const legacy = blobs.find((item) => item.pathname === LEGACY_PATH);
  const galleries = legacy ? normalize(await fetchJson(legacy.url)) : seedGalleries();
  return { galleries, version: 0, versions };
}

/**
 * Current galleries, throwing on a Blob read failure so callers can decide
 * (and so a failure is never cached as if it were real data).
 */
export async function loadGalleries(): Promise<Galleries> {
  if (!isBlobConfigured()) return seedGalleries();
  return (await readSnapshot()).galleries;
}

/** Current galleries, falling back to the seed if Blob can't be read. */
export async function readGalleries(): Promise<Galleries> {
  try {
    return await loadGalleries();
  } catch (error) {
    console.error("[studio] Failed to read galleries from Blob, using seed.", error);
    return seedGalleries();
  }
}

async function pruneOldVersions(versions: VersionRef[]): Promise<void> {
  const stale = versions.slice(KEEP_VERSIONS).map((ref) => ref.url);
  if (stale.length === 0) return;
  try {
    await del(stale);
  } catch (error) {
    console.error("[studio] Failed to prune old gallery versions.", error);
  }
}

/**
 * Apply `mutate` to the newest galleries and save the result as a new version.
 *
 * Creating `v(N+1)` with `allowOverwrite: false` acts as a compare-and-swap:
 * if another save got there first, we re-read and re-apply `mutate` on top of
 * it instead of overwriting it. `mutate` must therefore be safe to re-run.
 */
export async function updateGalleries(
  mutate: (galleries: Galleries) => void,
): Promise<Galleries> {
  if (!isBlobConfigured()) {
    throw new StudioConfigError(
      "Photo storage isn't set up yet. Add a Vercel Blob store to this project so changes can be saved.",
    );
  }

  for (let attempt = 1; attempt <= MAX_SAVE_ATTEMPTS; attempt += 1) {
    const { galleries, version, versions } = await readSnapshot();
    mutate(galleries);
    const nextVersion = version + 1;

    try {
      const saved = await put(versionPath(nextVersion), JSON.stringify({ galleries }), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: "application/json",
      });
      await pruneOldVersions([{ version: nextVersion, url: saved.url }, ...versions]);
      return galleries;
    } catch (error) {
      // Lost the race for this version number — retry on top of the winner,
      // after a short random pause so competing saves don't collide again.
      const latest = await listVersions().catch(() => []);
      if (!latest[0] || latest[0].version < nextVersion) throw error;
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 * attempt));
    }
  }

  throw new Error("The gallery is busy saving another change. Please try again.");
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
