/**
 * Central content-model types for the Stoneart site.
 * Keep the UI reading from these shapes only — never let a component
 * assume fields that aren't declared here, so swapping placeholder data
 * for the real catalogue later is a data-layer change, not a UI rewrite.
 */

export type ProductCategorySlug = "natural-stone" | "poly-stone";

export type StoneTone =
  | "graphite"
  | "sand"
  | "clay"
  | "slate"
  | "limestone"
  | "charcoal"
  | "copper"
  | "silver";

export interface ProductImage {
  /** Which role this image plays in the gallery. */
  kind: "texture" | "sheet" | "application" | "detail";
  tone: StoneTone;
  alt: string;
}

export interface ProductDownload {
  label: string;
  /** When absent, the UI renders the download as disabled/coming soon rather than linking nowhere. */
  href?: string;
}

export interface TechnicalDataRow {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  productCode: string;
  category: ProductCategorySlug;
  collection: string;
  shortDescription: string;
  description: string;
  thumbnailTone: StoneTone;
  images: ProductImage[];
  colourFamily: string;
  finish: string;
  sheetSizes: string[];
  thickness?: string;
  weight?: string;
  backing?: string;
  features: string[];
  applications: string[];
  technicalData: TechnicalDataRow[];
  downloads: ProductDownload[];
  featured?: boolean;
  relatedProducts?: string[];
}

export type ProjectCategory =
  | "Residential"
  | "Hospitality"
  | "Commercial"
  | "Retail"
  | "Furniture";

export interface Project {
  id: string;
  slug: string;
  title: string;
  location?: string;
  category: ProjectCategory;
  year?: string;
  productsUsed: string[];
  architect?: string;
  description: string;
  coverTone: StoneTone;
  gallery: { tone: StoneTone; alt: string }[];
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}
