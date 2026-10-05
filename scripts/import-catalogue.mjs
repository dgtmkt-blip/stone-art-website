/**
 * Builds the website catalogue from the product CSV + photo folders.
 *
 *   node scripts/import-catalogue.mjs [path-to-Product-folder]
 *
 * Reads   <Product folder>/Stoneart-Product-Catalogue-Template.csv and the
 *         "Natural Stone" / "Poly Stone" photo folders (default: ../Product)
 * Writes  lib/data/catalogue.json            (the data the site reads)
 *         public/images/products/...         (copied photos + small thumbnails)
 *
 * scripts/catalogue-config.json holds the few things the CSV can't express:
 * photo-to-product overrides (imageSources) and which products to feature on
 * the homepage when the CSV doesn't mark any as "Yes" (featuredFallback).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.resolve(ROOT, process.argv[2] ?? "../Product");
const CSV_PATH = path.join(SRC_DIR, "Stoneart-Product-Catalogue-Template.csv");
const OUT_JSON = path.join(ROOT, "lib/data/catalogue.json");
const OUT_IMG = path.join(ROOT, "public/images/products");
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/catalogue-config.json"), "utf8"));

const CATEGORIES = {
  "Natural Stone": { slug: "natural-stone", folder: "Natural Stone", filePrefix: "stoneart-naturalston-" },
  "Poly Stone": { slug: "poly-stone", folder: "Poly Stone", filePrefix: "stoneart-polyston-" },
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const clean = (s) => (s ?? "").replace(/\s+/g, " ").trim();
const slugify = (s) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const fileKey = (s) => s.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const titleCaseIfShouting = (s) =>
  s === s.toUpperCase() && /[A-Z]/.test(s) ? s.toLowerCase().replace(/\b([a-z])/g, (c) => c.toUpperCase()) : s;

const report = { widthFixes: 0, nameFixes: [], missingImages: [], blankRows: 0, usedFiles: new Set() };

function normaliseSize(s) {
  return clean(s)
    .replace(/^6[1-4]\d(?=\s*x\s*1220)/, (w) => {
      if (w !== "610") report.widthFixes++;
      return "610";
    })
    .replace(/\s*x\s*/gi, " × ")
    .replace(/mm\(/g, "mm (");
}

function parseWeight(raw) {
  const text = clean(raw);
  if (!text) return undefined;
  const parts = [];
  const re = /(\d+)\s*x\s*(\d+)\s*mm\s*\(\s*([\d.]+)\s*kg\s*\/\s*each\s*approx\s*\)?/gi;
  let m;
  while ((m = re.exec(text))) {
    const w = /^6[1-4]\d$/.test(m[1]) ? "610" : m[1];
    parts.push(`${w} × ${m[2]} mm: approx. ${m[3]} kg each`);
  }
  return parts.length ? parts.join("; ") : text;
}

const splitList = (s) =>
  clean(s)
    .split(/\s*,\s*/)
    .map((x) => x.replace(/\.$/, "").trim())
    .filter(Boolean)
    .map((x) => (x === "Outdoorwalls" ? "Outdoor Walls" : x));

function describe(p) {
  const colour = p.colourFamily.toLowerCase();
  const sizes = p.sheetSizes.join(" and ");
  const isNatural = p.category === "natural-stone";
  const short = isNatural
    ? `${p.collection} natural stone veneer in a ${colour} tone.`
    : `Poly Stone surface with a natural stone texture, in a ${colour} tone.`;
  const long = isNatural
    ? `${p.name} is part of the Stoneart Natural Stone range: a ${p.collection.toLowerCase()} veneer in a ${colour} tone. It is supplied in ${sizes} sheets, ${p.thickness} thick, with ${p.backing.toLowerCase()}.`
    : `${p.name} is part of the Stoneart Poly Stone range: a surface with a natural stone texture in a ${colour} tone. It is supplied in ${sizes} sheets, ${p.thickness} thick, with ${p.backing.toLowerCase()}.`;
  return { short, long };
}

async function processImages(row, cat, slug, code) {
  const dir = path.join(SRC_DIR, cat.folder);
  const override = config.imageSources?.[code] ?? {};
  const texKey = fileKey(clean(row["Texture Image Filename"]) || clean(row["Product Name"]));
  const primaryBase = override.primary ?? `${cat.filePrefix}${texKey}`;
  const detailBase = override.detail ?? `${primaryBase}-1`;
  const primaryFile = path.join(dir, `${primaryBase}.webp`);
  const detailFile = path.join(dir, `${detailBase}.webp`);

  if (!fs.existsSync(primaryFile)) {
    report.missingImages.push(`${code} ${row["Product Name"]}`);
    return null;
  }
  const outDir = path.join(OUT_IMG, cat.slug);
  fs.mkdirSync(outDir, { recursive: true });
  const web = (name) => `/images/products/${cat.slug}/${name}.webp`;

  fs.copyFileSync(primaryFile, path.join(outDir, `${slug}.webp`));
  await sharp(primaryFile)
    .resize(560, 700, { fit: "cover", position: "centre" })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, `${slug}-thumb.webp`));
  report.usedFiles.add(`${cat.folder}/${primaryBase}.webp`);

  const images = { primary: web(slug), thumb: web(`${slug}-thumb`) };
  if (fs.existsSync(detailFile)) {
    fs.copyFileSync(detailFile, path.join(outDir, `${slug}-detail.webp`));
    await sharp(detailFile)
      .resize(280, 350, { fit: "cover", position: "centre" })
      .webp({ quality: 78 })
      .toFile(path.join(outDir, `${slug}-detail-thumb.webp`));
    report.usedFiles.add(`${cat.folder}/${detailBase}.webp`);
    images.detail = web(`${slug}-detail`);
    images.detailThumb = web(`${slug}-detail-thumb`);
  }
  return images;
}

const [header, ...body] = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
const rows = body
  .map((cells) => Object.fromEntries(header.map((h, i) => [clean(h), cells[i] ?? ""])))
  .filter((r) => {
    const keep = clean(r["Product Code"]);
    if (!keep) report.blankRows++;
    return keep;
  });

fs.rmSync(OUT_IMG, { recursive: true, force: true });

const anyFeatured = rows.some((r) => /^yes$/i.test(clean(r["Featured on Homepage"])));
const records = [];
const seenSlugs = new Set();

for (const row of rows) {
  const code = clean(row["Product Code"]);
  const cat = CATEGORIES[clean(row["Category"])];
  if (!cat) throw new Error(`${code}: unknown category "${row["Category"]}"`);

  let name = clean(row["Product Name"]);
  const tex = clean(row["Texture Image Filename"]);
  if (tex && name !== tex && name.replace(/ \d+$/, "") === tex) {
    report.nameFixes.push(`${code}: "${name}" -> "${tex}"`);
    name = tex;
  }
  name = titleCaseIfShouting(name);
  const slug = slugify(name);
  if (seenSlugs.has(`${cat.slug}/${slug}`)) throw new Error(`Duplicate product slug: ${cat.slug}/${slug}`);
  seenSlugs.add(`${cat.slug}/${slug}`);

  const product = {
    id: code.toLowerCase(),
    code,
    slug,
    name,
    category: cat.slug,
    collection: clean(row["Collection"]),
    colourFamily: clean(row["Colour Family"]),
    finish: clean(row["Finish"]),
    sheetSizes: clean(row["Sheet Size(s)"]).split("/").map(normaliseSize),
    thickness: clean(row["Thickness"]).replace(/\s*-\s*/, "–"),
    weight: parseWeight(row["Weight"]),
    backing: clean(row["Backing Type"]),
    features: splitList(row["Features"]),
    applications: splitList(row["Applications"]),
    featured: anyFeatured
      ? /^yes$/i.test(clean(row["Featured on Homepage"]))
      : config.featuredFallback.includes(code),
  };
  const generated = describe(product);
  product.shortDescription = clean(row["Short Description"]) || generated.short;
  product.description = clean(row["Full Description"]) || generated.long;
  product.images = await processImages(row, cat, slug, code);
  records.push(product);
}

fs.writeFileSync(OUT_JSON, JSON.stringify(records, null, 2) + "\n");

const unused = [];
for (const cat of Object.values(CATEGORIES)) {
  const dir = path.join(SRC_DIR, cat.folder);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (f.endsWith(".webp") && !report.usedFiles.has(`${cat.folder}/${f}`)) unused.push(`${cat.folder}/${f}`);
  }
}

const byCat = records.reduce((a, r) => ((a[r.category] = (a[r.category] ?? 0) + 1), a), {});
console.log("Products written:", records.length, byCat);
console.log("With photos:", records.filter((r) => r.images).length);
console.log("Blank CSV rows skipped:", report.blankRows);
console.log("Sheet-width fixes (61x -> 610):", report.widthFixes);
console.log("Name fixes:", report.nameFixes);
console.log("Products with no matching photo:", report.missingImages);
console.log("Photos not used by any product:", unused.length ? unused : "none");
