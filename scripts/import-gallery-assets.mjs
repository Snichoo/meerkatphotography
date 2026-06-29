import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot =
  process.env.MEERKAT_PHOTO_SOURCE ??
  "C:\\Users\\samsn\\Downloads\\PhotosWebsiteMeerkat2026\\PhotosWebsiteMeerkat2026";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public", "images", "gallery");
const manifestPath = path.join(projectRoot, "src", "lib", "gallery.ts");

const serviceFolders = {
  "event-photography": {
    label: "Event Photography",
    folders: ["Events photos"],
  },
  "birthday-parties": {
    label: "Birthday Parties",
    folders: ["Birthday26"],
  },
  headshots: {
    label: "Headshots",
    folders: ["HeadShots", "Portrait Corporate", "myWebsite profile"],
  },
  "product-photography": {
    label: "Product Photography",
    folders: ["Products"],
  },
  "family-lifestyle": {
    label: "Family & Lifestyle",
    folders: ["Family&Lifestyle"],
  },
  "wedding-photography": {
    label: "Wedding Photography",
    folders: ["Wedding"],
  },
  "meerkats-pets": {
    label: "Meerkats & Pets",
    folders: ["Pet Photography"],
  },
};

const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function titleFromFile(filePath) {
  const stem = path.basename(filePath, path.extname(filePath));
  return stem
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b([a-z])/g, (letter) => letter.toUpperCase())
    .trim();
}

async function collectImages(folderPath) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await collectImages(fullPath)));
      continue;
    }

    if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }

  return images.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

async function convertImage(sourcePath, destinationPath) {
  try {
    const existing = await sharp(destinationPath).metadata();
    return {
      width: existing.width ?? 0,
      height: existing.height ?? 0,
    };
  } catch {
    // Missing or unreadable output; create it below.
  }

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: 1800,
      height: 1800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(destinationPath);

  const metadata = await sharp(destinationPath).metadata();
  return {
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
  };
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (nextIndex < items.length) {
        const currentIndex = nextIndex;
        nextIndex += 1;
        results[currentIndex] = await mapper(items[currentIndex], currentIndex);
      }
    })
  );

  return results;
}

function toManifest(manifest) {
  const lines = [
    "export type GalleryImage = {",
    "  src: string;",
    "  alt: string;",
    "  caption: string;",
    "  width: number;",
    "  height: number;",
    "};",
    "",
    "export const serviceGalleries = {",
  ];

  for (const [serviceId, images] of Object.entries(manifest)) {
    lines.push(`  ${JSON.stringify(serviceId)}: [`);
    for (const image of images) {
      lines.push(
        `    { src: ${JSON.stringify(image.src)}, alt: ${JSON.stringify(
          image.alt
        )}, caption: ${JSON.stringify(image.caption)}, width: ${image.width}, height: ${
          image.height
        } },`
      );
    }
    lines.push("  ],");
  }

  lines.push("} as const satisfies Record<string, readonly GalleryImage[]>;");
  lines.push("");
  return lines.join("\n");
}

async function main() {
  await fs.mkdir(publicRoot, { recursive: true });

  const manifest = {};
  let total = 0;

  for (const [serviceId, config] of Object.entries(serviceFolders)) {
    const serviceOutputDir = path.join(publicRoot, serviceId);
    await fs.mkdir(serviceOutputDir, { recursive: true });
    manifest[serviceId] = [];

    const sources = (
      await Promise.all(
        config.folders.map((folder) => collectImages(path.join(sourceRoot, folder)))
      )
    ).flat();

    const usedSlugs = new Map();
    const plannedImages = sources.map((sourcePath, index) => {
      const folderName = path.basename(path.dirname(sourcePath));
      const baseSlug = slugify(`${folderName}-${path.basename(sourcePath, path.extname(sourcePath))}`);
      const count = usedSlugs.get(baseSlug) ?? 0;
      usedSlugs.set(baseSlug, count + 1);
      const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
      const fileName = `${String(index + 1).padStart(3, "0")}-${slug}.webp`;
      const caption = titleFromFile(sourcePath) || `${config.label} ${index + 1}`;

      return {
        sourcePath,
        destinationPath: path.join(serviceOutputDir, fileName),
        src: `/images/gallery/${serviceId}/${fileName}`,
        alt: `${config.label} gallery photo - ${caption}`,
        caption,
      };
    });

    manifest[serviceId] = await mapLimit(plannedImages, 6, async (image) => {
      const metadata = await convertImage(image.sourcePath, image.destinationPath);

      return {
        src: image.src,
        alt: image.alt,
        caption: image.caption,
        ...metadata,
      };
    });

    total += sources.length;
    console.log(`Imported ${sources.length} ${config.label} images`);
  }

  await fs.writeFile(manifestPath, toManifest(manifest));
  console.log(`Imported ${total} gallery images to ${path.relative(projectRoot, publicRoot)}`);
  console.log(`Wrote ${path.relative(projectRoot, manifestPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
