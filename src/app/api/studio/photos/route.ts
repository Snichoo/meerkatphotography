import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { GALLERIES_TAG } from "@/lib/galleries-data";
import type { GalleryImage } from "@/lib/gallery";
import { isAuthenticated } from "@/lib/studio/auth";
import {
  deleteUploadedBlob,
  isUploadedBlob,
  readGalleries,
  StudioConfigError,
  writeGalleries,
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
  revalidateTag(GALLERIES_TAG, "max");
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
    const galleries = await readGalleries();
    galleries[serviceId] = [...galleries[serviceId], image];
    await writeGalleries(galleries);
    revalidateGallery(serviceId);
    return NextResponse.json({ gallery: galleries[serviceId] });
  } catch (error) {
    if (error instanceof StudioConfigError) return configError(error);
    console.error("[studio] add photo failed", error);
    return NextResponse.json({ error: "Could not save the photo." }, { status: 500 });
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
    const galleries = await readGalleries();
    galleries[serviceId] = galleries[serviceId].filter((image) => image.src !== src);
    await writeGalleries(galleries);
    await deleteUploadedBlob(src);
    revalidateGallery(serviceId);
    return NextResponse.json({ gallery: galleries[serviceId] });
  } catch (error) {
    if (error instanceof StudioConfigError) return configError(error);
    console.error("[studio] delete photo failed", error);
    return NextResponse.json({ error: "Could not delete the photo." }, { status: 500 });
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
    const galleries = await readGalleries();
    galleries[serviceId] = galleries[serviceId].map((image) =>
      image.src === src
        ? { ...image, caption, alt: buildAlt(serviceId, caption || "photo") }
        : image,
    );
    await writeGalleries(galleries);
    revalidateGallery(serviceId);
    return NextResponse.json({ gallery: galleries[serviceId] });
  } catch (error) {
    if (error instanceof StudioConfigError) return configError(error);
    console.error("[studio] edit caption failed", error);
    return NextResponse.json({ error: "Could not update the caption." }, { status: 500 });
  }
}
