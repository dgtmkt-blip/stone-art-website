import * as Flags from "country-flag-icons/react/3x2";

/** Renders a country's flag as a real SVG (not an emoji — flag emoji rendering is unreliable on Windows/Chrome). */
export function CountryFlag({ iso2, className = "" }: { iso2: string; className?: string }) {
  const Flag = Flags[iso2.toUpperCase() as keyof typeof Flags];
  if (!Flag) return null;
  return <Flag className={`inline-block ${className}`} />;
}
