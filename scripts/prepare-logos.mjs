#!/usr/bin/env node
/**
 * Turn a folder of partner logos (mixed JPG / PNG / WebP, any size) into
 * web-ready files for public/partners/.
 *
 *   node scripts/prepare-logos.mjs client-assets/Partners public/partners
 *
 * For each logo it:
 *   - trims empty borders (white or transparent) so every logo's ink fills
 *     its box and logos line up at one visual height; a logo on its own
 *     coloured background keeps it,
 *   - converts to sRGB (some supplied JPGs are CMYK) without recolouring,
 *   - resizes to at most 480 x 160 px (crisp at 2x for the ~80px display),
 *   - saves as WebP, keeping transparency,
 *   - flags logos whose ink is almost all white (made for dark backgrounds)
 *     so the site can sit them on a dark tile instead of losing them.
 *
 * It prints a lib/mock/partners.ts entry per logo with the real pixel size.
 * File names become lowercase-hyphen; edit `name` in the output by hand.
 */
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , inDir, outDir = "public/partners"] = process.argv;
if (!inDir) {
  console.error("usage: node scripts/prepare-logos.mjs <input-folder> [output-folder]");
  process.exit(1);
}

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

await mkdir(outDir, { recursive: true });
const files = (await readdir(inDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();

for (const file of files) {
  const name = slug(file);
  const out = path.join(outDir, `${name}.webp`);
  const src = sharp(path.join(inDir, file)).toColourspace("srgb");
  // Trim only empty margins (transparent or near-white). A logo printed on
  // its own coloured field, like a crest on purple, keeps that field.
  const { data: corner } = await sharp(path.join(inDir, file))
    .toColourspace("srgb")
    .ensureAlpha()
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const emptyCorner =
    corner[3] < 20 || (corner[0] > 235 && corner[1] > 235 && corner[2] > 235);
  const trimmed = await (emptyCorner ? src.trim({ threshold: 12 }) : src)
    .resize({ width: 480, height: 160, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toBuffer({ resolveWithObject: true });
  await sharp(trimmed.data).toFile(out);

  // Average colour of the visible (non-transparent) pixels.
  const { data, info } = await sharp(trimmed.data)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let lum = 0;
  let weight = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const a = data[i + 3] / 255;
    if (a < 0.2) continue;
    lum += a * (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
    weight += a;
  }
  const hasTransparency = weight < (data.length / info.channels) * 0.98;
  const onDark = hasTransparency && weight > 0 && lum / weight > 200;

  console.log(`  {
    id: "ptr-${name}",
    title: "${name}",
    status: "Published",
    featured: true,
    sort_order: 100,
    created_at: "${new Date().toISOString()}",
    updated_at: "${new Date().toISOString()}",
    name: "${name}",
    logo: "/${path.relative("public", out).split(path.sep).join("/")}",
    logo_width: ${trimmed.info.width},
    logo_height: ${trimmed.info.height},${onDark ? "\n    logo_on_dark: true," : ""}
  },`);
}
