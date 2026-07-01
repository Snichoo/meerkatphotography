import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { GALLERIES_TAG } from "@/lib/galleries-data";
import type { GalleryImage } from "@/lib/gallery";
import { isAuthenticated } from "@/lib/studio/auth";
import { readGalleries, StudioConfigError, writeGalleries } from "@/lib/studio/galleries-store";
import { isValidServiceId } from "@/lib/studio/service-meta";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Not authorized." }, { status: 401 });
}

// Current photos for every gallery (used to refresh the editor).
export async function GET() {
  if (!(await isAuthenticated())) return unauthorized();
  const galleries = await readGalleries();
  return NextResponse.json({ galleries });
}

// Save a new photo order for one gallery. `order` is the full list of photo
// `src` values in the desired sequence (drag-to-reorder, shuffle, reverse).
export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  const body = await request.json().catch(() => null);
  const serviceId = body?.serviceId;
  const order: unknown = body?.order;

  if (!isValidServiceId(serviceId)) {
    return NextResponse.json({ error: "Unknown gallery." }, { status: 400 });
  }
  if (!Array.isArray(order)) {
    return NextResponse.json({ error: "Invalid order." }, { status: 400 });
  }

  try {
    const galleries = await readGalleries();
    const current = galleries[serviceId];
    const bySrc = new Map(current.map((image) => [image.src, image]));
    const seen = new Set<string>();
    const next: GalleryImage[] = [];

    for (const src of order) {
      if (typeof src !== "string") continue;
      const image = bySrc.get(src);
      if (image && !seen.has(src)) {
        next.push(image);
        seen.add(src);
      }
    }
    // Keep any photos the client didn't mention so nothing is silently lost.
    for (const image of current) {
      if (!seen.has(image.src)) next.push(image);
    }

    galleries[serviceId] = next;
    await writeGalleries(galleries);
    revalidateTag(GALLERIES_TAG, "max");
    revalidatePath(`/services/${serviceId}`);
    return NextResponse.json({ gallery: next });
  } catch (error) {
    if (error instanceof StudioConfigError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error("[studio] reorder failed", error);
    return NextResponse.json({ error: "Could not save the new order." }, { status: 500 });
  }
}
