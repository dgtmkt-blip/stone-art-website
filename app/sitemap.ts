import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { allProducts } from "@/lib/data/products";

export const dynamic = "force-static";

const SITE_URL = "https://panelart.in";

const staticRoutes = [
  "",
  "/products",
  "/products/natural-stone",
  "/products/poly-stone",
  "/about",
  "/about/the-product",
  "/about/why-stoneart",
  "/about/technical-data",
  "/manufacturing",
  "/backing",
  "/packing",
  "/installation",
  "/blog",
  "/contact",
];

// No lastModified: a build-time date on every URL would be inaccurate, and search engines ignore dates they can't trust.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}` })),
    ...allProducts.map((p) => ({ url: `${SITE_URL}/products/${p.category}/${p.slug}` })),
    ...getAllPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updated ?? p.date })),
  ];
}
