#!/usr/bin/env node
/**
 * extract-icons.mjs  slice a "contact sheet" of line-art icons into individual assets.
 *
 * Many AI image tools (and stock icon sheets) hand you a single PNG with several
 * icons stacked vertically on a white background. This tool auto-detects each icon
 * by scanning for horizontal bands of "ink" (dark pixels), crops each one tightly,
 * and writes out:
 *   - a trimmed, transparent PNG (white -> alpha, original colour preserved)
 *   - an optimised SVG traced with potrace, filled with `currentColor` so it can be
 *     recoloured by CSS (needed on dark backgrounds like our navy Services section)
 *
 * Usage:
 *   node scripts/extract-icons.mjs <input.png> [options]
 *
 * Options:
 *   --out <dir>        Output directory (default: public/images/icons)
 *   --names a,b,c      Comma-separated base filenames, top-to-bottom (default: icon-1, icon-2, ...)
 *   --threshold <n>    Luminance below which a pixel counts as ink, 0-255 (default: 200)
 *   --merge-gap <n>    Vertical gap (px) smaller than this is treated as part of the
 *                      same icon, e.g. a heart sparkle floating above wedding rings (default: 24)
 *   --min-height <n>   Ignore bands shorter than this many px (stray specks) (default: 8)
 *   --pad <n>          Transparent padding added around each crop (default: 12)
 *   --no-svg           Skip SVG tracing, write PNGs only
 *
 * Examples:
 *   node scripts/extract-icons.mjs "C:/path/sheet.png" \
 *     --names rings,cake,family,headshot,briefcase,cart,events,paw
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import { trace } from "potrace";
import { optimize } from "svgo";

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--no-svg") args.svg = false;
    else if (a.startsWith("--")) args[a.slice(2)] = argv[++i];
    else args._.push(a);
  }
  return args;
}

const traceAsync = (buf, opts) =>
  new Promise((resolve, reject) =>
    trace(buf, opts, (err, svg) => (err ? reject(err) : resolve(svg)))
  );

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const input = args._[0];
  if (!input) {
    console.error("Usage: node scripts/extract-icons.mjs <input.png> [--out dir] [--names a,b,c] [--no-svg]");
    process.exit(1);
  }

  const outDir = args.out ?? "public/images/icons";
  const threshold = Number(args.threshold ?? 200);
  const mergeGap = Number(args["merge-gap"] ?? 24);
  const minHeight = Number(args["min-height"] ?? 8);
  const pad = Number(args.pad ?? 12);
  const writeSvg = args.svg !== false;
  const names = args.names ? args.names.split(",").map((s) => s.trim()) : null;

  await mkdir(outDir, { recursive: true });

  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  const isInk = (x, y) => {
    const i = (y * W + x) * C;
    const a = data[i + 3];
    if (a <= 20) return false;
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    return lum < threshold;
  };

  // 1. Row projection -> raw bands of consecutive inked rows.
  const rowHasInk = new Array(H).fill(false);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (isInk(x, y)) { rowHasInk[y] = true; break; }
    }
  }
  const raw = [];
  for (let y = 0, start = -1; y <= H; y++) {
    const on = y < H && rowHasInk[y];
    if (on && start < 0) start = y;
    else if (!on && start >= 0) { raw.push([start, y - 1]); start = -1; }
  }

  // 2. Merge bands separated by a gap smaller than mergeGap (sparkles, dotted bits).
  const merged = [];
  for (const band of raw) {
    const prev = merged[merged.length - 1];
    if (prev && band[0] - prev[1] - 1 < mergeGap) prev[1] = band[1];
    else merged.push([...band]);
  }
  const bands = merged.filter(([s, e]) => e - s + 1 >= minHeight);

  if (!bands.length) {
    console.error("No icon bands detected  try lowering --threshold or --min-height.");
    process.exit(1);
  }
  console.log(`Detected ${bands.length} icon(s) in ${path.basename(input)} (${W}x${H}).`);

  const results = [];
  for (let idx = 0; idx < bands.length; idx++) {
    const [y0, y1] = bands[idx];
    // Tight horizontal bounding box within this band.
    let minx = W, maxx = -1;
    for (let y = y0; y <= y1; y++) {
      for (let x = 0; x < W; x++) {
        if (isInk(x, y)) { if (x < minx) minx = x; if (x > maxx) maxx = x; }
      }
    }
    const left = Math.max(0, minx);
    const top = y0;
    const cw = maxx - minx + 1;
    const ch = y1 - y0 + 1;

    const base = names?.[idx] ?? `icon-${idx + 1}`;
    const cropped = sharp(input).extract({ left, top, width: cw, height: ch });

    // Transparent PNG: derive alpha from darkness so the white background drops out
    // while the original stroke colour is preserved.
    const { data: cd, info: ci } = await cropped
      .clone()
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const out = Buffer.alloc(cw * ch * 4);
    for (let p = 0; p < cw * ch; p++) {
      const s = p * ci.channels;
      const r = cd[s], g = cd[s + 1], b = cd[s + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const alpha = lum >= 255 ? 0 : Math.round(255 - lum); // darker stroke = more opaque
      out[p * 4] = r; out[p * 4 + 1] = g; out[p * 4 + 2] = b; out[p * 4 + 3] = alpha;
    }
    const pngPath = path.join(outDir, `${base}.png`);
    await sharp(out, { raw: { width: cw, height: ch, channels: 4 } })
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(pngPath);

    let svgPath = null;
    if (writeSvg) {
      // Feed a padded, hard bilevel raster to potrace; fill traced paths with currentColor.
      const bilevel = await cropped
        .clone()
        .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 255, g: 255, b: 255 } })
        .greyscale()
        .png()
        .toBuffer();
      let svg = await traceAsync(bilevel, { threshold, color: "currentColor", background: "transparent" });
      svg = optimize(svg, {
        plugins: [
          { name: "preset-default" },
          { name: "removeDimensions" }, // keep viewBox, drop fixed width/height for CSS sizing
        ],
      }).data;
      svgPath = path.join(outDir, `${base}.svg`);
      await writeFile(svgPath, svg, "utf8");
    }

    results.push({ base, box: { left, top, width: cw, height: ch } });
    console.log(`  ${String(idx + 1).padStart(2)}. ${base}  ${cw}x${ch} @ (${left},${top})` + (svgPath ? "  +svg" : ""));
  }

  console.log(`\nWrote ${results.length} icon(s) to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
