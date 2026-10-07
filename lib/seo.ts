/** Trim text to a search-result-friendly length, cutting at a word boundary. */
export function trimMeta(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}

/**
 * Product page title that stays within ~60 characters once the " | Stoneart"
 * suffix is added: full form first, then progressively shorter.
 */
export function productPageTitle(name: string, typeLabel: string, code: string): string {
  const max = 49;
  const candidates = [
    `${name} ${typeLabel} (${code})`,
    `${name} ${typeLabel.replace(/ Sheet$/, "")} (${code})`,
    `${name} Stone Veneer (${code})`,
    `${name} (${code})`,
  ];
  return candidates.find((c) => c.length <= max) ?? candidates[candidates.length - 1];
}
