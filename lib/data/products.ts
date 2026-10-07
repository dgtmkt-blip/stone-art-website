import type { Product, ProductCategorySlug, StoneTone } from "@/lib/types";
import catalogue from "./catalogue.json";

/**
 * The product catalogue. The data lives in lib/data/catalogue.json, which is
 * generated from the product CSV and photo folders by:
 *
 *   node scripts/import-catalogue.mjs
 *
 * Edit the CSV (not the JSON) and re-run the script to update the site.
 */

interface CatalogueRecord {
  id: string;
  code: string;
  slug: string;
  name: string;
  category: ProductCategorySlug;
  collection: string;
  colourFamily: string;
  finish: string;
  sheetSizes: string[];
  thickness: string;
  weight?: string;
  backing: string;
  features: string[];
  applications: string[];
  featured: boolean;
  shortDescription: string;
  description: string;
  typeLabel: string;
  images: { primary: string; thumb: string; detail?: string; detailThumb?: string } | null;
}

export const CATEGORY_META: Record<
  ProductCategorySlug,
  { label: string; description: string; tone: "slate" | "graphite" }
> = {
  "natural-stone": {
    label: "Natural Stone",
    description:
      "Flexible natural stone veneer in slate, quartzite, sandstone, marble and limestone: real stone only 1.5–2 mm thick, in 610 × 1220 mm and 1220 × 2440 mm sheets for walls, furniture and curved surfaces.",
    tone: "slate",
  },
  "poly-stone": {
    label: "Poly Stone",
    description:
      "Flexible Poly Stone sheets with natural stone textures, 3–4 mm thick in large 1220 × 2440 mm formats, for wall cladding, decorative panels and furniture surfaces.",
    tone: "graphite",
  },
};

const TONE_BY_COLOUR: Record<string, StoneTone> = {
  Black: "charcoal",
  Grey: "slate",
  Blue: "slate",
  White: "silver",
  Beige: "limestone",
  "Sand Stone": "sand",
  Yellow: "sand",
  Brown: "clay",
  Pink: "clay",
  Red: "copper",
  Green: "graphite",
};

function toProduct(r: CatalogueRecord): Product {
  const tone = TONE_BY_COLOUR[r.colourFamily] ?? "slate";
  const img = r.images;

  const images: Product["images"] = img
    ? [
        { kind: "sheet", tone, src: img.primary, thumbSrc: img.thumb, alt: `${r.name} ${r.typeLabel.toLowerCase()}` },
        ...(img.detail
          ? [
              {
                kind: "texture" as const,
                tone,
                src: img.detail,
                thumbSrc: img.detailThumb,
                alt: `Close-up of the ${r.name} ${r.typeLabel.toLowerCase()} surface texture`,
              },
            ]
          : []),
      ]
    : [{ kind: "sheet", tone, alt: `${r.name} surface (photograph coming soon)` }];

  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    productCode: r.code,
    category: r.category,
    collection: r.collection,
    shortDescription: r.shortDescription,
    description: r.description,
    typeLabel: r.typeLabel,
    thumbnailTone: tone,
    thumbnailSrc: img?.thumb,
    images,
    colourFamily: r.colourFamily,
    finish: r.finish,
    sheetSizes: r.sheetSizes,
    thickness: r.thickness,
    weight: r.weight,
    backing: r.backing,
    features: r.features,
    applications: r.applications,
    technicalData: [
      { label: "Category", value: `${CATEGORY_META[r.category].label} — ${r.collection}` },
      { label: "Colour Family", value: r.colourFamily },
      { label: "Finish", value: r.finish },
      { label: "Sheet Size", value: r.sheetSizes.join(" / ") },
      { label: "Thickness", value: r.thickness },
      { label: "Backing", value: r.backing },
      ...(r.weight ? [{ label: "Weight", value: r.weight }] : []),
    ],
    downloads: [{ label: "Technical Data Sheet" }, { label: "Installation Guide" }],
    featured: r.featured,
  };
}

export const allProducts: Product[] = (catalogue as unknown as CatalogueRecord[]).map(toProduct);

export const naturalStoneProducts = allProducts.filter((p) => p.category === "natural-stone");
export const polyStoneProducts = allProducts.filter((p) => p.category === "poly-stone");

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function getProductBySlug(category: string, slug: string): Product | undefined {
  return allProducts.find((p) => p.category === category && p.slug === slug);
}

/** Up to three other products in the same range — same colour family first, then same collection. */
export function getRelatedProducts(product: Product): Product[] {
  const others = allProducts.filter((p) => p.category === product.category && p.id !== product.id);
  const sameColour = others.filter((p) => p.colourFamily === product.colourFamily);
  const sameCollection = others.filter(
    (p) => p.collection === product.collection && p.colourFamily !== product.colourFamily
  );
  return [...sameColour, ...sameCollection].slice(0, 3);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return allProducts.filter((p) => p.featured).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return allProducts;
  return allProducts.filter((p) =>
    [p.name, p.productCode, p.collection, p.category].some((field) =>
      field.toLowerCase().includes(q)
    )
  );
}
