import type { NavItem } from "@/lib/types";

/**
 * Single source of truth for the global navigation. Header (desktop mega-menu
 * + mobile drawer) and Footer both read from this — edit here only.
 */
export const mainNav: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Natural Stone",
        href: "/products/natural-stone",
        description: "Genuine slate & quartz veneer, cut thin and flexible.",
      },
      {
        label: "Poly Stone",
        href: "/products/poly-stone",
        description: "Large-format Poly Stone sheets with natural stone textures.",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "The Product", href: "/about/the-product" },
      { label: "Why Stoneart", href: "/about/why-stoneart" },
      {
        label: "Technical Data",
        href: "/about/technical-data",
        children: [
          { label: "Sheet Sizes", href: "/about/technical-data#sheet-sizes" },
          { label: "Technical Data Sheet", href: "/about/technical-data#downloads" },
        ],
      },
    ],
  },
  {
    label: "About Product",
    href: "/manufacturing",
    children: [
      {
        label: "Manufacturing",
        href: "/manufacturing",
        description: "How Stoneart turns raw stone into thin, flexible sheets.",
      },
      {
        label: "Backing",
        href: "/backing",
        description: "Poly, translucent and fleece backings and where each one fits.",
      },
      {
        label: "Packing",
        href: "/packing",
        description: "How sheets are packed and protected for transport.",
      },
      {
        label: "Installation",
        href: "/installation",
        description: "A general guide to installing Stoneart veneer.",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  products: [
    { label: "Natural Stone", href: "/products/natural-stone" },
    { label: "Poly Stone", href: "/products/poly-stone" },
  ],
  about: [
    { label: "The Product", href: "/about/the-product" },
    { label: "Why Stoneart", href: "/about/why-stoneart" },
    { label: "Technical Data", href: "/about/technical-data" },
  ],
  resources: [
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Backing", href: "/backing" },
    { label: "Packing", href: "/packing" },
    { label: "Installation", href: "/installation" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ],
};
