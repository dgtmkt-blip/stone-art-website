import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/data/products";
import { projects } from "@/lib/data/projects";

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
  "/booking",
  "/packing",
  "/installation",
  "/projects",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const productRoutes = allProducts.map((p) => ({
    url: `${SITE_URL}/products/${p.category}/${p.slug}`,
    lastModified: now,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: now,
  }));

  return [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: now })),
    ...productRoutes,
    ...projectRoutes,
  ];
}
