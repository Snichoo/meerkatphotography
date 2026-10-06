import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { GALLERIES_TAG } from "@/lib/galleries-data";
import type { GalleryImage } from "@/lib/gallery";
import { isAuthenticated } from "@/lib/studio/auth";
import {
  deleteUploadedBlob,
  isUploadedBlob,
  StudioConfigError,
  updateGalleries,
} from "@/lib/studio/galleries-store";
import { buildAlt, captionFromFileName, isValidServiceId } from "@/lib/studio/service-meta";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Not authorized." }, { status: 401 });
}

function configError(error: StudioConfigError) {
  return NextResponse.json({ error: error.message }, { status: 503 });
}

function revalidateGallery(serviceId: string) {
  // `{ expire: 0 }` expires the tagged cache entry immediately so the very next
  // request reads fresh gallery data. The `"max"` profile uses
  // stale-while-revalidate instead, which serves the OLD photos on the next
  // visit and only refreshes in the background — making just-saved uploads look
  // like they didn't save. See node_modules/next/dist/docs .../revalidateTag.md.
  revalidateTag(GALLERIES_TAG, { expire: 0 });
  revalidatePath(`/services/${serviceId}`);
}

// Add a just-uploaded photo to a gallery.
export async function POST(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  const body = await request.json().catch(() => null);
  const serviceId = body?.serviceId;
  const src = body?.src;
  const width = Number(body?.width);
  const height = Number(body?.height);
  const name = typeof body?.name === "string" ? body.name : "photo";

  if (!isValidServiceId(serviceId)) {
    return NextResponse.json({ error: "Unknown gallery." }, { status: 400 });
  }
  if (typeof src !== "string" || !isUploadedBlob(src)) {
    return NextResponse.json({ error: "Invalid image reference." }, { status: 400 });
  }

  const caption = captionFromFileName(name);
  const image: GalleryImage = {
    src,
    alt: buildAlt(serviceId, caption),
    caption,
    width: Number.isFinite(width) && width > 0 ? Math.round(width) : 1200,
    height: Number.isFinite(height) && height > 0 ? Math.round(height) : 1800,
  };

  try {
    const galleries = await updateGalleries((draft) => {
      // Skip if already there, so a retried save can't add the photo twice.
      if (draft[serviceId].some((existing) => existing.src === src)) return;
      draft[serviceId] = [...draft[serviceId], image];
    });
    revalidateGallery(serviceId);
    return NextResponse.json({ gallery: galleries[serviceId] });
  } catch (error) {
    if (error instanceof StudioConfigError) return configError(error);
    console.error("[studio] add photo failed", error);
    const message = error instanceof Error ? error.message : "Could not save the photo.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Remove a photo from a gallery (and delete its file if we uploaded it).
export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  const body = await request.json().catch(() => null);
  const serviceId = body?.serviceId;
  const src = body?.src;

  if (!isValidServiceId(serviceId)) {
    return NextResponse.json({ error: "Unknown gallery." }, { status: 400 });
  }
  if (typeof src !== "string") {
    return NextResponse.json({ error: "Missing photo." }, { status: 400 });
  }

  try {
    const galleries = await updateGalleries((draft) => {
      draft[serviceId] = draft[serviceId].filter((image) => image.src !== src);
    });
    await deleteUploadedBlob(src);
    revalidateGallery(serviceId);
    return NextResponse.json({ gallery: galleries[serviceId] });
  } catch (error) {
    if (error instanceof StudioConfigError) return configError(error);
    console.error("[studio] delete photo failed", error);
    const message = error instanceof Error ? error.message : "Could not delete the photo.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Edit a photo's caption (also updates its alt text).
export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  const body = await request.json().catch(() => null);
  const serviceId = body?.serviceId;
  const src = body?.src;
  const caption = typeof body?.caption === "string" ? body.caption.trim() : "";

  if (!isValidServiceId(serviceId)) {
    return NextResponse.json({ error: "Unknown gallery." }, { status: 400 });
  }
  if (typeof src !== "string") {
    return NextResponse.json({ error: "Missing photo." }, { status: 400 });
  }

  try {
    const galleries = await updateGalleries((draft) => {
      draft[serviceId] = draft[serviceId].map((image) =>
        image.src === src
          ? { ...image, caption, alt: buildAlt(serviceId, caption || "photo") }
          : image,
      );
    });
    revalidateGallery(serviceId);
    return NextResponse.json({ gallery: galleries[serviceId] });
  } catch (error) {
    if (error instanceof StudioConfigError) return configError(error);
    console.error("[studio] edit caption failed", error);
    const message = error instanceof Error ? error.message : "Could not update the caption.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
