import { siteSettings } from "@/lib/data/site-settings";
import type { Product } from "@/lib/types";

const SITE_URL = "https://panelart.in";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.company,
    alternateName: siteSettings.brand,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.contact.addressLines.join(", "),
      addressLocality: "Kolkata",
      addressCountry: "IN",
    },
    telephone: siteSettings.contact.phones[0],
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
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.productCode,
    description: product.shortDescription,
    category: product.category === "natural-stone" ? "Natural Stone Veneer" : "Poly Stone Surface",
    brand: {
      "@type": "Brand",
      name: siteSettings.brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteSettings.company,
    },
  };
}
