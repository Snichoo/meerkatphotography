/**
 * Generates 1200x630 Open Graph / social-share cards from the site's own
 * photography, branded with the Meerkat wordmark and palette.
 *
 *   node scripts/generate-og.mjs
 *
 * Outputs:
 *   public/seo/og-image.jpg            default site card (wedding hero)
 *   public/seo/og-about.jpg            about page card (Nora)
 *   public/seo/services/<id>.jpg       one card per service
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const pub = (...p) => join(ROOT, "public", ...p);

const W = 1200;
const H = 630;
const CREAM = "#efe4d8";
const GOLD = "#d0a978"; // slightly lifted gold for legibility on photos
const FONT = "Segoe UI, Helvetica, Arial, sans-serif";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Meerkat brand mark (the camera-on-tripod illustration), sized for a corner. */
async function logoBuffer(width) {
  return sharp(pub("images", "meerkat-logo.png"))
    .resize({ width })
    .png()
    .toBuffer();
}

/** Cover-crop a source photo to the card size, biased to the salient region. */
async function coverPhoto(src) {
  return sharp(src)
    .resize(W, H, { fit: "cover", position: sharp.strategy.attention })
    .toBuffer();
}

/**
 * Cover-crop a portrait source by fitting the width and extracting a band that
 * keeps the subject's face (attention/entropy crop picks the wrong region on
 * tall portraits). `faceFraction` is where the face sits in the source (0=top);
 * `placeAt` is where to place it in the card.
 */
async function portraitCover(src, faceFraction = 0.36, placeAt = 0.4) {
  const meta = await sharp(src).metadata();
  const scaledH = Math.round(meta.height * (W / meta.width));
  const top = Math.max(
    0,
    Math.min(scaledH - H, Math.round(faceFraction * scaledH - placeAt * H))
  );
  return sharp(src)
    .resize({ width: W })
    .extract({ left: 0, top, width: W, height: H })
    .toBuffer();
}

async function compose({ src, photoBuffer, out, overlaySvg, logoWidth = 96 }) {
  const [photo, logo] = await Promise.all([
    photoBuffer ?? coverPhoto(src),
    logoBuffer(logoWidth),
  ]);
  await sharp(photo)
    .composite([
      { input: Buffer.from(overlaySvg), top: 0, left: 0 },
      { input: logo, top: 46, left: 66 },
    ])
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(out);
  console.log("wrote", out.replace(ROOT, "."));
}

/** Shared dark scrim: subtle overall + strong bottom for text legibility. */
const scrim = `
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1c1712" stop-opacity="0.15"/>
      <stop offset="42%" stop-color="#1c1712" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#171310" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#26201a" fill-opacity="0.28"/>
  <rect width="${W}" height="${H}" fill="url(#v)"/>`;

function defaultCard() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    ${scrim}
    <text x="72" y="446" font-family="${FONT}" font-size="25" font-weight="700"
      letter-spacing="6" fill="${GOLD}">PERTH PHOTOGRAPHER</text>
    <text x="68" y="524" font-family="${FONT}" font-size="78" font-weight="800"
      fill="${CREAM}">Meerkat Photography</text>
    <text x="72" y="566" font-family="${FONT}" font-size="27" font-weight="500"
      fill="${CREAM}" fill-opacity="0.92">Weddings · Events · Families · Headshots · Products</text>
    <text x="72" y="606" font-family="${FONT}" font-size="24" font-weight="600">
      <tspan fill="${GOLD}">★★★★★</tspan><tspan fill="${CREAM}" dx="10">5.0 from 117+ Google reviews</tspan>
    </text>
  </svg>`;
}

function personCard({ eyebrow, title, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    ${scrim}
    <text x="72" y="470" font-family="${FONT}" font-size="25" font-weight="700"
      letter-spacing="6" fill="${GOLD}">${esc(eyebrow)}</text>
    <text x="68" y="548" font-family="${FONT}" font-size="78" font-weight="800"
      fill="${CREAM}">${esc(title)}</text>
    <text x="72" y="592" font-family="${FONT}" font-size="27" font-weight="500"
      fill="${CREAM}" fill-opacity="0.92">${esc(subtitle)}</text>
  </svg>`;
}

function serviceCard(title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    ${scrim}
    <text x="72" y="516" font-family="${FONT}" font-size="23" font-weight="700"
      letter-spacing="5" fill="${GOLD}">MEERKAT PHOTOGRAPHY · PERTH</text>
    <text x="68" y="586" font-family="${FONT}" font-size="64" font-weight="800"
      fill="${CREAM}">${esc(title)}</text>
  </svg>`;
}

// Service list mirrors src/lib/services-page.ts (id + hero image + title).
const services = [
  ["event-photography", "event.webp", "Event Photography"],
  ["birthday-parties", "birthday.webp", "Birthday Parties"],
  ["headshots", "portrait.webp", "Headshots"],
  ["product-photography", "product.webp", "Product Photography"],
  ["family-lifestyle", "family.webp", "Family & Lifestyle"],
  ["wedding-photography", "wedding.webp", "Wedding Photography"],
  ["real-estate", "realestate.webp", "Real Estate"],
  ["travel", "travel.webp", "Travel"],
  ["meerkats-pets", "pet.webp", "Meerkats & Pets"],
];

async function main() {
  await mkdir(pub("seo", "services"), { recursive: true });

  await compose({
    src: pub("images", "hero", "wedding.webp"),
    out: pub("seo", "og-image.jpg"),
    overlaySvg: defaultCard(),
  });

  await compose({
    photoBuffer: await portraitCover(pub("images", "nora-about.jpg"), 0.36, 0.42),
    out: pub("seo", "og-about.jpg"),
    overlaySvg: personCard({
      eyebrow: "PERTH PHOTOGRAPHER",
      title: "Nora Wan",
      subtitle: "Meerkat Photography · 15+ years behind the camera",
    }),
  });

  for (const [id, image, title] of services) {
    await compose({
      src: pub("images", "hero", image),
      out: pub("seo", "services", `${id}.jpg`),
      overlaySvg: serviceCard(title),
      logoWidth: 84,
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
