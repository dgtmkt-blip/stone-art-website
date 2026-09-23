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
        description: "Engineered mineral-composite surfaces for scale and consistency.",
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
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Backing", href: "/backing" },
  { label: "Packing", href: "/packing" },
  { label: "Installation", href: "/installation" },
  { label: "Projects", href: "/projects" },
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
  ],
};
