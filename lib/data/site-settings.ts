/**
 * Site-wide settings sourced from verified content — the v1 repo and the
 * live panelart.in site. Nothing here is invented; anything left undefined
 * simply wasn't found in either verified source, so the UI omits it rather
 * than fabricating a value.
 */
export const siteSettings = {
  brand: "STONEART",
  company: "Panelart Decor Pvt Ltd",
  domain: "panelart.in",
  tagline: "Natural stone, reimagined for architecture.",

  contact: {
    addressLines: [
      "Unit 3, 5th Floor, The Regency,",
      "6 Hungerford Street,",
      "Kolkata 700017, India",
    ],
    phones: ["+91 33 4066 0166", "+91 33 2283 0166"],
    hours: "Monday – Saturday · 10:00 AM – 6:30 PM",
    // Verified from the live panelart.in contact page.
    email: "global@panelart.in" as string | undefined,
    mapEmbedSrc:
      "https://maps.google.com/maps?q=6%20Hungerford%20Street%20Kolkata%20700017&t=m&z=15&output=embed&iwloc=near",
  },

  // Social links: none verified from existing website/repository — omit until confirmed.
  socialLinks: [] as { label: string; href: string }[],

  materialDisclaimer:
    "Natural materials may display variations in colour, texture and pattern. Please refer to physical samples when making final selections.",
} as const;
