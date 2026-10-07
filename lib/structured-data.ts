import { siteSettings } from "@/lib/data/site-settings";
import type { Product } from "@/lib/types";

const SITE_URL = "https://panelart.in";
const ORG_ID = `${SITE_URL}/#organization`;

/** Street, postcode and city come from the single address in site-settings. */
function addressParts() {
  const lines = siteSettings.contact.addressLines.map((l) => l.replace(/,\s*$/, ""));
  const streetAddress = lines.slice(0, -1).join(", ");
  const last = lines[lines.length - 1];
  return { streetAddress, postalCode: last.match(/\d{6}/)?.[0] };
}

export function organizationJsonLd() {
  const { streetAddress, postalCode } = addressParts();
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: siteSettings.company,
    alternateName: siteSettings.brand,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/stoneart-logo-color.png`,
    image: `${SITE_URL}/images/site/home/hero.webp`,
    email: siteSettings.contact.email,
    telephone: siteSettings.contact.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      ...(postalCode ? { postalCode } : {}),
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:30",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Stoneart",
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
  };
}

export function articleJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image: string;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
    url,
  };
}

export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href === "/" ? "" : item.href}` } : {}),
    })),
  };
}

export function productJsonLd(product: Product) {
  const isNatural = product.category === "natural-stone";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.typeLabel}`,
    sku: product.productCode,
    description: product.shortDescription,
    url: `${SITE_URL}/products/${product.category}/${product.slug}`,
    ...(product.images[0]?.src ? { image: `${SITE_URL}${product.images[0].src}` } : {}),
    category: isNatural ? "Natural Stone Veneer" : "Poly Stone Surface",
    color: product.colourFamily,
    ...(isNatural ? { material: product.collection } : {}),
    size: product.sheetSizes.join(" / "),
    ...(product.thickness
      ? { additionalProperty: { "@type": "PropertyValue", name: "Thickness", value: product.thickness } }
      : {}),
    brand: { "@type": "Brand", name: siteSettings.brand },
    manufacturer: { "@id": ORG_ID },
  };
}
