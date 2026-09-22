import type { Project } from "@/lib/types";

/**
 * PLACEHOLDER PROJECT DATA — replace with real, client-approved project
 * photography and copy. Titles are clearly fictional demo names; no real
 * client names are used anywhere in this file, per project instructions.
 */
export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "the-atrium-residence",
    title: "The Atrium Residence",
    location: "Kolkata, India",
    category: "Residential",
    year: "2025",
    productsUsed: ["Alpine Slate", "Silver Strata"],
    description:
      "A private residence using natural stone veneer across a double-height atrium wall, chosen for the way its texture catches light through the skylight above.",
    coverTone: "slate",
    gallery: [
      { tone: "slate", alt: "Atrium wall clad in Alpine Slate stone veneer" },
      { tone: "silver", alt: "Stairwell detail in Silver Strata veneer" },
      { tone: "slate", alt: "Close view of stone veneer texture in natural light" },
      { tone: "limestone", alt: "Living space with stone feature wall" },
    ],
  },
  {
    id: "proj-2",
    slug: "meridian-hotel-lobby",
    title: "Meridian Hotel Lobby",
    location: "Mumbai, India",
    category: "Hospitality",
    year: "2024",
    productsUsed: ["Graphite Ridge", "Carbon Vein"],
    description:
      "A hotel lobby reception wall combining a dark ridged natural stone with a poly stone reception desk face, chosen for tonal consistency under low ambient lighting.",
    coverTone: "charcoal",
    gallery: [
      { tone: "charcoal", alt: "Hotel reception wall in Graphite Ridge stone veneer" },
      { tone: "charcoal", alt: "Reception desk faced in Carbon Vein poly stone" },
      { tone: "charcoal", alt: "Lobby seating area with stone-clad column" },
    ],
  },
  {
    id: "proj-3",
    slug: "harbourline-offices",
    title: "Harbourline Offices",
    location: "Bengaluru, India",
    category: "Commercial",
    year: "2025",
    productsUsed: ["Mineral Grey", "Urban Graphite"],
    description:
      "A commercial office fit-out specifying poly stone across reception and meeting room walls for predictable, repeatable colour across a large floor plate.",
    coverTone: "graphite",
    gallery: [
      { tone: "graphite", alt: "Office reception wall in Mineral Grey poly stone" },
      { tone: "graphite", alt: "Meeting room feature wall in Urban Graphite" },
      { tone: "graphite", alt: "Corridor detail showing consistent surface tone" },
    ],
  },
  {
    id: "proj-4",
    slug: "form-retail-concept-store",
    title: "Form Retail Concept Store",
    location: "Delhi, India",
    category: "Retail",
    year: "2024",
    productsUsed: ["Arctic Mist", "Sand Drift"],
    description:
      "A retail concept store using light poly stone tones to create a calm, gallery-like backdrop that keeps focus on the product displays.",
    coverTone: "limestone",
    gallery: [
      { tone: "limestone", alt: "Retail display wall in Arctic Mist poly stone" },
      { tone: "sand", alt: "Fitting room corridor in Sand Drift poly stone" },
      { tone: "limestone", alt: "Storefront entrance detail" },
    ],
  },
  {
    id: "proj-5",
    slug: "grain-furniture-collection",
    title: "Grain Furniture Collection",
    category: "Furniture",
    year: "2025",
    productsUsed: ["Autumn Rock", "Copper Earth"],
    description:
      "A furniture designer's cabinetry collection using thin natural stone veneer on curved fronts — an application only possible because of the material's flexibility.",
    coverTone: "clay",
    gallery: [
      { tone: "clay", alt: "Cabinet front veneered in Autumn Rock stone" },
      { tone: "copper", alt: "Curved furniture edge in Copper Earth stone veneer" },
      { tone: "clay", alt: "Detail of stone veneer grain on furniture surface" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .concat(projects.filter((p) => p.id !== project.id && p.category !== project.category))
    .slice(0, limit);
}
