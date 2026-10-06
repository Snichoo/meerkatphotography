// Public read path for gallery photos. Cached with a tag so the live site stays
// fast, and invalidated on demand from the Studio admin whenever photos change.
import { unstable_cache } from "next/cache";
import type { GalleryImage } from "@/lib/gallery";
import { loadGalleries, seedGalleries } from "@/lib/studio/galleries-store";

export const GALLERIES_TAG = "galleries";

// `loadGalleries` throws on a Blob failure, so a failed read is never cached.
// (Key bumped from v1 when storage moved to versioned files.)
const getGalleriesCached = unstable_cache(
  async () => loadGalleries(),
  ["studio-galleries-v2"],
  { tags: [GALLERIES_TAG], revalidate: 300 },
);

/** Photos for one service gallery, as shown on the public site. */
export async function getGalleryImages(serviceId: string): Promise<GalleryImage[]> {
  try {
    const galleries = await getGalleriesCached();
    return galleries[serviceId] ?? [];
  } catch (error) {
    console.error("[gallery] Failed to read galleries from Blob, using seed.", error);
    return seedGalleries()[serviceId] ?? [];
  }
}
