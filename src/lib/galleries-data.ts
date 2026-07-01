// Public read path for gallery photos. Cached with a tag so the live site stays
// fast, and invalidated on demand from the Studio admin whenever photos change.
import { unstable_cache } from "next/cache";
import type { GalleryImage } from "@/lib/gallery";
import { readGalleries } from "@/lib/studio/galleries-store";

export const GALLERIES_TAG = "galleries";

const getGalleriesCached = unstable_cache(
  async () => readGalleries(),
  ["studio-galleries-v1"],
  { tags: [GALLERIES_TAG], revalidate: 300 },
);

/** Photos for one service gallery, as shown on the public site. */
export async function getGalleryImages(serviceId: string): Promise<GalleryImage[]> {
  const galleries = await getGalleriesCached();
  return galleries[serviceId] ?? [];
}
