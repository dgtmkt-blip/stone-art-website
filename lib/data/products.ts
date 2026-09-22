import type { Product } from "@/lib/types";

/**
 * PLACEHOLDER PRODUCT DATA — replace with approved Stoneart product catalogue.
 *
 * Every name, code, collection, dimension and technical value below is a
 * development placeholder invented for layout/testing purposes. None of it
 * should be treated as a real Stoneart/Panelart specification, and none of
 * it should ship to production unreviewed. Sheet size "610 x 1220 mm" is the
 * one verified figure (carried over from the live v1 site's confirmed spec)
 * and is used only on Natural Stone placeholders as a plausible default.
 *
 * To replace: swap the arrays below for the real catalogue, keeping the
 * `Product` shape in lib/types.ts. Nothing in components/ should need to
 * change.
 */

const NATURAL_STONE_APPLICATIONS = [
  "Feature Walls",
  "Residential Interiors",
  "Hospitality Interiors",
  "Furniture",
  "Curved Surfaces",
  "Exterior Cladding",
];

const POLY_STONE_APPLICATIONS = [
  "Commercial Spaces",
  "Retail Environments",
  "Feature Walls",
  "Furniture",
  "Hospitality Interiors",
  "Curved Surfaces",
];

const NATURAL_STONE_FEATURES = [
  "Genuine natural stone surface",
  "Thin, flexible sheet format",
  "Lightweight compared to solid slab",
  "Distinctive, non-repeating texture",
];

const POLY_STONE_FEATURES = [
  "Consistent surface character across sheets",
  "Engineered for large-scale specification",
  "Simplified handling and installation",
  "Broad, coordinated colour range",
];

export const naturalStoneProducts: Product[] = [
  {
    id: "ns-101",
    slug: "alpine-slate",
    name: "Alpine Slate",
    productCode: "NS-101",
    category: "natural-stone",
    collection: "Alpine Collection",
    shortDescription: "Cool grey slate with a fine, riven natural texture.",
    description:
      "Alpine Slate carries the quiet, layered texture of genuine slate — a restrained grey tone suited to architectural interiors that want material honesty without visual noise.",
    thumbnailTone: "slate",
    images: [
      { kind: "texture", tone: "slate", alt: "Close-up texture of Alpine Slate stone veneer" },
      { kind: "sheet", tone: "slate", alt: "Full sheet of Alpine Slate stone veneer" },
      { kind: "application", tone: "slate", alt: "Alpine Slate veneer applied to an interior feature wall" },
      { kind: "detail", tone: "slate", alt: "Edge detail of Alpine Slate veneer" },
    ],
    colourFamily: "Grey",
    finish: "Riven Natural",
    sheetSizes: ["610 × 1220 mm (2 × 4 ft)"],
    thickness: "≈ 2–3 mm",
    weight: "≈ 1.3–1.6 kg/m²",
    backing: "Non-woven fibre backing",
    features: NATURAL_STONE_FEATURES,
    applications: NATURAL_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Natural Stone — Slate" },
      { label: "Finish", value: "Riven Natural" },
      { label: "Sheet Size", value: "610 × 1220 mm (2 × 4 ft)" },
      { label: "Thickness", value: "≈ 2–3 mm" },
      { label: "Backing", value: "Non-woven fibre backing" },
      { label: "Weight", value: "≈ 1.3–1.6 kg/m²" },
      { label: "Recommended Applications", value: "Interior & exterior feature surfaces" },
    ],
    downloads: [{ label: "Technical Data Sheet" }, { label: "Installation Guide" }],
    featured: true,
    relatedProducts: ["silver-strata", "graphite-ridge", "autumn-rock"],
  },
  {
    id: "ns-102",
    slug: "desert-vein",
    name: "Desert Vein",
    productCode: "NS-102",
    category: "natural-stone",
    collection: "Desert Collection",
    shortDescription: "Warm sand-toned stone with soft, sweeping veining.",
    description:
      "Desert Vein brings a warm, sun-bleached tone to natural stone veneer, with soft veining that reads as calm rather than decorative — a natural fit for warm architectural palettes.",
    thumbnailTone: "sand",
    images: [
      { kind: "texture", tone: "sand", alt: "Close-up texture of Desert Vein stone veneer" },
      { kind: "sheet", tone: "sand", alt: "Full sheet of Desert Vein stone veneer" },
      { kind: "application", tone: "sand", alt: "Desert Vein veneer applied to a residential wall" },
      { kind: "detail", tone: "sand", alt: "Grain detail of Desert Vein veneer" },
    ],
    colourFamily: "Sand / Beige",
    finish: "Natural Cleft",
    sheetSizes: ["610 × 1220 mm (2 × 4 ft)"],
    thickness: "≈ 2–3 mm",
    weight: "≈ 1.3–1.6 kg/m²",
    backing: "Non-woven fibre backing",
    features: NATURAL_STONE_FEATURES,
    applications: NATURAL_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Natural Stone — Quartz" },
      { label: "Finish", value: "Natural Cleft" },
      { label: "Sheet Size", value: "610 × 1220 mm (2 × 4 ft)" },
      { label: "Thickness", value: "≈ 2–3 mm" },
      { label: "Backing", value: "Non-woven fibre backing" },
      { label: "Weight", value: "≈ 1.3–1.6 kg/m²" },
      { label: "Recommended Applications", value: "Interior feature surfaces" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    featured: true,
    relatedProducts: ["autumn-rock", "copper-earth", "alpine-slate"],
  },
  {
    id: "ns-103",
    slug: "graphite-ridge",
    name: "Graphite Ridge",
    productCode: "NS-103",
    category: "natural-stone",
    collection: "Ridge Collection",
    shortDescription: "Deep charcoal slate with pronounced ridged texture.",
    description:
      "Graphite Ridge is the darkest tone in the natural stone range — a deep charcoal slate with a pronounced ridged surface, suited to feature moments that want visual weight.",
    thumbnailTone: "charcoal",
    images: [
      { kind: "texture", tone: "charcoal", alt: "Close-up texture of Graphite Ridge stone veneer" },
      { kind: "sheet", tone: "charcoal", alt: "Full sheet of Graphite Ridge stone veneer" },
      { kind: "application", tone: "charcoal", alt: "Graphite Ridge veneer on a hospitality reception wall" },
      { kind: "detail", tone: "charcoal", alt: "Ridge texture detail of Graphite Ridge veneer" },
    ],
    colourFamily: "Charcoal",
    finish: "Ridged Natural",
    sheetSizes: ["610 × 1220 mm (2 × 4 ft)"],
    thickness: "≈ 2–3 mm",
    weight: "≈ 1.4–1.7 kg/m²",
    backing: "Non-woven fibre backing",
    features: NATURAL_STONE_FEATURES,
    applications: NATURAL_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Natural Stone — Slate" },
      { label: "Finish", value: "Ridged Natural" },
      { label: "Sheet Size", value: "610 × 1220 mm (2 × 4 ft)" },
      { label: "Thickness", value: "≈ 2–3 mm" },
      { label: "Backing", value: "Non-woven fibre backing" },
      { label: "Weight", value: "≈ 1.4–1.7 kg/m²" },
      { label: "Recommended Applications", value: "Feature walls, hospitality interiors" },
    ],
    downloads: [{ label: "Technical Data Sheet" }, { label: "Installation Guide" }],
    relatedProducts: ["alpine-slate", "silver-strata", "carbon-vein"],
  },
  {
    id: "ns-104",
    slug: "copper-earth",
    name: "Copper Earth",
    productCode: "NS-104",
    category: "natural-stone",
    collection: "Earth Collection",
    shortDescription: "Rust and copper mineral tones with rich variation.",
    description:
      "Copper Earth carries oxide-rich mineral tones, from rust to burnt umber, with the natural colour variation that only genuine stone can produce — no two sheets read identically.",
    thumbnailTone: "copper",
    images: [
      { kind: "texture", tone: "copper", alt: "Close-up texture of Copper Earth stone veneer" },
      { kind: "sheet", tone: "copper", alt: "Full sheet of Copper Earth stone veneer" },
      { kind: "application", tone: "copper", alt: "Copper Earth veneer applied to a fireplace surround" },
      { kind: "detail", tone: "copper", alt: "Mineral detail of Copper Earth veneer" },
    ],
    colourFamily: "Copper / Rust",
    finish: "Natural Cleft",
    sheetSizes: ["610 × 1220 mm (2 × 4 ft)"],
    thickness: "≈ 2–3 mm",
    weight: "≈ 1.3–1.6 kg/m²",
    backing: "Non-woven fibre backing",
    features: NATURAL_STONE_FEATURES,
    applications: NATURAL_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Natural Stone — Quartz" },
      { label: "Finish", value: "Natural Cleft" },
      { label: "Sheet Size", value: "610 × 1220 mm (2 × 4 ft)" },
      { label: "Thickness", value: "≈ 2–3 mm" },
      { label: "Backing", value: "Non-woven fibre backing" },
      { label: "Weight", value: "≈ 1.3–1.6 kg/m²" },
      { label: "Recommended Applications", value: "Feature walls, fireplaces" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    relatedProducts: ["desert-vein", "autumn-rock", "alpine-slate"],
  },
  {
    id: "ns-105",
    slug: "silver-strata",
    name: "Silver Strata",
    productCode: "NS-105",
    category: "natural-stone",
    collection: "Strata Collection",
    shortDescription: "Layered silver-grey stone with a fine horizontal grain.",
    description:
      "Silver Strata shows the sedimentary layering natural stone is known for — fine horizontal striation in cool silver-grey, well suited to large uninterrupted wall runs.",
    thumbnailTone: "silver",
    images: [
      { kind: "texture", tone: "silver", alt: "Close-up texture of Silver Strata stone veneer" },
      { kind: "sheet", tone: "silver", alt: "Full sheet of Silver Strata stone veneer" },
      { kind: "application", tone: "silver", alt: "Silver Strata veneer applied to a commercial lobby wall" },
      { kind: "detail", tone: "silver", alt: "Striation detail of Silver Strata veneer" },
    ],
    colourFamily: "Silver / Grey",
    finish: "Riven Natural",
    sheetSizes: ["610 × 1220 mm (2 × 4 ft)"],
    thickness: "≈ 2–3 mm",
    weight: "≈ 1.3–1.6 kg/m²",
    backing: "Non-woven fibre backing",
    features: NATURAL_STONE_FEATURES,
    applications: NATURAL_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Natural Stone — Slate" },
      { label: "Finish", value: "Riven Natural" },
      { label: "Sheet Size", value: "610 × 1220 mm (2 × 4 ft)" },
      { label: "Thickness", value: "≈ 2–3 mm" },
      { label: "Backing", value: "Non-woven fibre backing" },
      { label: "Weight", value: "≈ 1.3–1.6 kg/m²" },
      { label: "Recommended Applications", value: "Commercial lobbies, large wall runs" },
    ],
    downloads: [{ label: "Technical Data Sheet" }, { label: "Installation Guide" }],
    featured: true,
    relatedProducts: ["graphite-ridge", "alpine-slate", "carbon-vein"],
  },
  {
    id: "ns-106",
    slug: "autumn-rock",
    name: "Autumn Rock",
    productCode: "NS-106",
    category: "natural-stone",
    collection: "Seasonal Collection",
    shortDescription: "Amber and umber tones with warm seasonal variation.",
    description:
      "Autumn Rock moves through amber, umber and soft brown across a single sheet — a warm, characterful stone for spaces that want richness without pattern repetition.",
    thumbnailTone: "clay",
    images: [
      { kind: "texture", tone: "clay", alt: "Close-up texture of Autumn Rock stone veneer" },
      { kind: "sheet", tone: "clay", alt: "Full sheet of Autumn Rock stone veneer" },
      { kind: "application", tone: "clay", alt: "Autumn Rock veneer applied to a furniture panel" },
      { kind: "detail", tone: "clay", alt: "Colour variation detail of Autumn Rock veneer" },
    ],
    colourFamily: "Amber / Brown",
    finish: "Natural Cleft",
    sheetSizes: ["610 × 1220 mm (2 × 4 ft)"],
    thickness: "≈ 2–3 mm",
    weight: "≈ 1.3–1.6 kg/m²",
    backing: "Non-woven fibre backing",
    features: NATURAL_STONE_FEATURES,
    applications: NATURAL_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Natural Stone — Quartz" },
      { label: "Finish", value: "Natural Cleft" },
      { label: "Sheet Size", value: "610 × 1220 mm (2 × 4 ft)" },
      { label: "Thickness", value: "≈ 2–3 mm" },
      { label: "Backing", value: "Non-woven fibre backing" },
      { label: "Weight", value: "≈ 1.3–1.6 kg/m²" },
      { label: "Recommended Applications", value: "Furniture, feature walls" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    relatedProducts: ["copper-earth", "desert-vein", "alpine-slate"],
  },
];

export const polyStoneProducts: Product[] = [
  {
    id: "ps-201",
    slug: "arctic-mist",
    name: "Arctic Mist",
    productCode: "PS-201",
    category: "poly-stone",
    collection: "Arctic Collection",
    shortDescription: "Near-white mineral surface with a soft, even grain.",
    description:
      "Arctic Mist is engineered for consistency — a near-white surface with a soft, repeatable grain suited to projects that need many sheets to read as one continuous material.",
    thumbnailTone: "limestone",
    images: [
      { kind: "texture", tone: "limestone", alt: "Close-up texture of Arctic Mist poly stone surface" },
      { kind: "sheet", tone: "limestone", alt: "Full sheet of Arctic Mist poly stone surface" },
      { kind: "application", tone: "limestone", alt: "Arctic Mist surface applied to a retail interior" },
      { kind: "detail", tone: "limestone", alt: "Surface detail of Arctic Mist poly stone" },
    ],
    colourFamily: "White / Grey",
    finish: "Matte Even",
    sheetSizes: ["1220 × 2440 mm (4 × 8 ft)"],
    thickness: "≈ 1.5–2 mm",
    weight: "≈ 1.1–1.4 kg/m²",
    backing: "Composite backing",
    features: POLY_STONE_FEATURES,
    applications: POLY_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Poly Stone" },
      { label: "Finish", value: "Matte Even" },
      { label: "Sheet Size", value: "1220 × 2440 mm (4 × 8 ft)" },
      { label: "Thickness", value: "≈ 1.5–2 mm" },
      { label: "Backing", value: "Composite backing" },
      { label: "Weight", value: "≈ 1.1–1.4 kg/m²" },
      { label: "Recommended Applications", value: "Large-scale commercial specification" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    featured: true,
    relatedProducts: ["mineral-grey", "terra-cloud", "sand-drift"],
  },
  {
    id: "ps-202",
    slug: "urban-graphite",
    name: "Urban Graphite",
    productCode: "PS-202",
    category: "poly-stone",
    collection: "Urban Collection",
    shortDescription: "Consistent dark graphite surface for contemporary spaces.",
    description:
      "Urban Graphite delivers a deep, uniform graphite tone across every sheet — built for contemporary commercial interiors where colour consistency matters as much as character.",
    thumbnailTone: "graphite",
    images: [
      { kind: "texture", tone: "graphite", alt: "Close-up texture of Urban Graphite poly stone surface" },
      { kind: "sheet", tone: "graphite", alt: "Full sheet of Urban Graphite poly stone surface" },
      { kind: "application", tone: "graphite", alt: "Urban Graphite surface applied to a commercial facade" },
      { kind: "detail", tone: "graphite", alt: "Surface detail of Urban Graphite poly stone" },
    ],
    colourFamily: "Graphite",
    finish: "Matte Even",
    sheetSizes: ["1220 × 2440 mm (4 × 8 ft)"],
    thickness: "≈ 1.5–2 mm",
    weight: "≈ 1.1–1.4 kg/m²",
    backing: "Composite backing",
    features: POLY_STONE_FEATURES,
    applications: POLY_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Poly Stone" },
      { label: "Finish", value: "Matte Even" },
      { label: "Sheet Size", value: "1220 × 2440 mm (4 × 8 ft)" },
      { label: "Thickness", value: "≈ 1.5–2 mm" },
      { label: "Backing", value: "Composite backing" },
      { label: "Weight", value: "≈ 1.1–1.4 kg/m²" },
      { label: "Recommended Applications", value: "Commercial facades, retail interiors" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    relatedProducts: ["carbon-vein", "mineral-grey", "arctic-mist"],
  },
  {
    id: "ps-203",
    slug: "sand-drift",
    name: "Sand Drift",
    productCode: "PS-203",
    category: "poly-stone",
    collection: "Drift Collection",
    shortDescription: "Warm, even sand tone engineered for repeatable specification.",
    description:
      "Sand Drift offers a warm neutral tone with a fine, engineered grain — designed to specify predictably across large hospitality and retail programmes.",
    thumbnailTone: "sand",
    images: [
      { kind: "texture", tone: "sand", alt: "Close-up texture of Sand Drift poly stone surface" },
      { kind: "sheet", tone: "sand", alt: "Full sheet of Sand Drift poly stone surface" },
      { kind: "application", tone: "sand", alt: "Sand Drift surface applied to a hospitality interior" },
      { kind: "detail", tone: "sand", alt: "Surface detail of Sand Drift poly stone" },
    ],
    colourFamily: "Sand",
    finish: "Matte Even",
    sheetSizes: ["1220 × 2440 mm (4 × 8 ft)"],
    thickness: "≈ 1.5–2 mm",
    weight: "≈ 1.1–1.4 kg/m²",
    backing: "Composite backing",
    features: POLY_STONE_FEATURES,
    applications: POLY_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Poly Stone" },
      { label: "Finish", value: "Matte Even" },
      { label: "Sheet Size", value: "1220 × 2440 mm (4 × 8 ft)" },
      { label: "Thickness", value: "≈ 1.5–2 mm" },
      { label: "Backing", value: "Composite backing" },
      { label: "Weight", value: "≈ 1.1–1.4 kg/m²" },
      { label: "Recommended Applications", value: "Hospitality, retail interiors" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    relatedProducts: ["terra-cloud", "arctic-mist", "mineral-grey"],
  },
  {
    id: "ps-204",
    slug: "mineral-grey",
    name: "Mineral Grey",
    productCode: "PS-204",
    category: "poly-stone",
    collection: "Mineral Collection",
    shortDescription: "Balanced mid-grey with subtle engineered veining.",
    description:
      "Mineral Grey sits at the centre of the poly stone palette — a balanced mid-grey with subtle veining that pairs easily with both warm and cool material palettes.",
    thumbnailTone: "graphite",
    images: [
      { kind: "texture", tone: "graphite", alt: "Close-up texture of Mineral Grey poly stone surface" },
      { kind: "sheet", tone: "graphite", alt: "Full sheet of Mineral Grey poly stone surface" },
      { kind: "application", tone: "graphite", alt: "Mineral Grey surface applied to an office interior" },
      { kind: "detail", tone: "graphite", alt: "Surface detail of Mineral Grey poly stone" },
    ],
    colourFamily: "Grey",
    finish: "Matte Even",
    sheetSizes: ["1220 × 2440 mm (4 × 8 ft)"],
    thickness: "≈ 1.5–2 mm",
    weight: "≈ 1.1–1.4 kg/m²",
    backing: "Composite backing",
    features: POLY_STONE_FEATURES,
    applications: POLY_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Poly Stone" },
      { label: "Finish", value: "Matte Even" },
      { label: "Sheet Size", value: "1220 × 2440 mm (4 × 8 ft)" },
      { label: "Thickness", value: "≈ 1.5–2 mm" },
      { label: "Backing", value: "Composite backing" },
      { label: "Weight", value: "≈ 1.1–1.4 kg/m²" },
      { label: "Recommended Applications", value: "Commercial interiors" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    featured: true,
    relatedProducts: ["urban-graphite", "arctic-mist", "carbon-vein"],
  },
  {
    id: "ps-205",
    slug: "terra-cloud",
    name: "Terra Cloud",
    productCode: "PS-205",
    category: "poly-stone",
    collection: "Terra Collection",
    shortDescription: "Soft beige-cloud tone with a gentle cloudy grain.",
    description:
      "Terra Cloud reads soft and quiet — a beige-toned surface with a gentle cloud-like grain, suited to interiors that want warmth without competing for attention.",
    thumbnailTone: "limestone",
    images: [
      { kind: "texture", tone: "limestone", alt: "Close-up texture of Terra Cloud poly stone surface" },
      { kind: "sheet", tone: "limestone", alt: "Full sheet of Terra Cloud poly stone surface" },
      { kind: "application", tone: "limestone", alt: "Terra Cloud surface applied to a residential interior" },
      { kind: "detail", tone: "limestone", alt: "Surface detail of Terra Cloud poly stone" },
    ],
    colourFamily: "Beige / Cloud",
    finish: "Matte Even",
    sheetSizes: ["1220 × 2440 mm (4 × 8 ft)"],
    thickness: "≈ 1.5–2 mm",
    weight: "≈ 1.1–1.4 kg/m²",
    backing: "Composite backing",
    features: POLY_STONE_FEATURES,
    applications: POLY_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Poly Stone" },
      { label: "Finish", value: "Matte Even" },
      { label: "Sheet Size", value: "1220 × 2440 mm (4 × 8 ft)" },
      { label: "Thickness", value: "≈ 1.5–2 mm" },
      { label: "Backing", value: "Composite backing" },
      { label: "Weight", value: "≈ 1.1–1.4 kg/m²" },
      { label: "Recommended Applications", value: "Residential interiors" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    relatedProducts: ["sand-drift", "arctic-mist", "mineral-grey"],
  },
  {
    id: "ps-206",
    slug: "carbon-vein",
    name: "Carbon Vein",
    productCode: "PS-206",
    category: "poly-stone",
    collection: "Carbon Collection",
    shortDescription: "Near-black surface with fine engineered veining.",
    description:
      "Carbon Vein is the deepest tone in the poly stone range — a near-black surface with fine, controlled veining for spaces that want drama with dimensional consistency.",
    thumbnailTone: "charcoal",
    images: [
      { kind: "texture", tone: "charcoal", alt: "Close-up texture of Carbon Vein poly stone surface" },
      { kind: "sheet", tone: "charcoal", alt: "Full sheet of Carbon Vein poly stone surface" },
      { kind: "application", tone: "charcoal", alt: "Carbon Vein surface applied to a hospitality bar front" },
      { kind: "detail", tone: "charcoal", alt: "Surface detail of Carbon Vein poly stone" },
    ],
    colourFamily: "Black / Charcoal",
    finish: "Matte Even",
    sheetSizes: ["1220 × 2440 mm (4 × 8 ft)"],
    thickness: "≈ 1.5–2 mm",
    weight: "≈ 1.1–1.4 kg/m²",
    backing: "Composite backing",
    features: POLY_STONE_FEATURES,
    applications: POLY_STONE_APPLICATIONS,
    technicalData: [
      { label: "Category", value: "Poly Stone" },
      { label: "Finish", value: "Matte Even" },
      { label: "Sheet Size", value: "1220 × 2440 mm (4 × 8 ft)" },
      { label: "Thickness", value: "≈ 1.5–2 mm" },
      { label: "Backing", value: "Composite backing" },
      { label: "Weight", value: "≈ 1.1–1.4 kg/m²" },
      { label: "Recommended Applications", value: "Hospitality feature surfaces" },
    ],
    downloads: [{ label: "Technical Data Sheet" }],
    relatedProducts: ["urban-graphite", "mineral-grey", "arctic-mist"],
  },
];

export const CATEGORY_META: Record<
  "natural-stone" | "poly-stone",
  { label: string; description: string; tone: "slate" | "graphite" }
> = {
  "natural-stone": {
    label: "Natural Stone",
    description:
      "Genuine slate and quartz veneer, cut thin and flexible while retaining the authentic texture and colour variation of real stone.",
    tone: "slate",
  },
  "poly-stone": {
    label: "Poly Stone",
    description:
      "Engineered mineral-composite surfaces designed for scale, tonal consistency and large-format architectural specification.",
    tone: "graphite",
  },
};

export const allProducts: Product[] = [...naturalStoneProducts, ...polyStoneProducts];

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function getProductBySlug(category: string, slug: string): Product | undefined {
  return allProducts.find((p) => p.category === category && p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  if (!product.relatedProducts?.length) return [];
  return product.relatedProducts
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
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
