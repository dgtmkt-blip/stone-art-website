/**
 * Converts the designer-supplied website images to web-ready WebP.
 *
 *   node scripts/import-site-images.mjs [path-to-Website-Images-folder]
 *
 * Reads   <Website Images>/Homepage only images and /Wide Banners (reusable pool)
 *         (default: ../Website Images)
 * Writes  public/images/site/home/*.webp and public/images/site/banners/*.webp
 *
 * To add or swap an image, edit the FILES list below (source name -> output name).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.resolve(ROOT, process.argv[2] ?? "../Website Images");
const OUT = path.join(ROOT, "public/images/site");

const HOME = "Homepage only images";
const BANNERS = "Wide Banners (reusable pool)";

const FILES = [
  [HOME, "Home-hero banner.jpg", "home/hero"],
  [HOME, "Home--Nature's-surface-macro-shot.jpg", "home/nature-surface"],
  [HOME, "Home--Natural-Stone-World.jpg", "home/natural-stone-world"],
  [HOME, "Home--Poly-STone-World.jpg", "home/poly-stone-world"],
  [HOME, "Home-Application-Mosaic-large-tile.jpg", "home/mosaic-feature-walls"],
  [HOME, "Home--Application-mosaic-1-small hospitality.jpg", "home/mosaic-hospitality"],
  [HOME, "Home--Application-mosaic-2-small-tiles curved surfaces.jpg", "home/mosaic-curved-surfaces"],
  [HOME, "Home--Application-mosaic-3-small-image living room.jpg", "home/mosaic-living-room"],
  [HOME, "Home--Application-mosaic-4-small-image-Commercial-space.jpg", "home/mosaic-commercial"],
  [BANNERS, "About.jpg", "banners/about"],
  [BANNERS, "About-The-Product.png", "banners/about-the-product"],
  [BANNERS, "About-Why Stoneart.jpg", "banners/about-why-stoneart"],
  [BANNERS, "About--Technical-Data.jpg", "banners/about-technical-data"],
  [BANNERS, "Backing.jpg", "banners/backing"],
  [BANNERS, "Contact-Us.jpg", "banners/contact"],
  [BANNERS, "Installation.jpg", "banners/installation"],
  [BANNERS, "Manufacturing.jpg", "banners/manufacturing"],
  [BANNERS, "Packing.jpg", "banners/packing"],
  [BANNERS, "Projects.jpg", "banners/projects"],
];

fs.rmSync(OUT, { recursive: true, force: true });
let before = 0;
let after = 0;
for (const [dir, file, out] of FILES) {
  const src = path.join(SRC, dir, file);
  if (!fs.existsSync(src)) {
    console.warn("MISSING:", path.join(dir, file));
    continue;
  }
  const dest = path.join(OUT, `${out}.webp`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await sharp(src).webp({ quality: 80 }).toFile(dest);
  before += fs.statSync(src).size;
  after += fs.statSync(dest).size;
  console.log(`${out.padEnd(34)} ${(fs.statSync(dest).size / 1024).toFixed(0)} KB`);
}
console.log(`\nTotal: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
