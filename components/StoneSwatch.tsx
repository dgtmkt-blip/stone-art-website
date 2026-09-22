import type { StoneTone } from "@/lib/types";

/**
 * Placeholder "material" visual — a tinted, grained gradient block standing
 * in for real stone photography. No external/stock images are used anywhere
 * in this build (see brief §23); swap for real photography by replacing the
 * usage sites, the shape (tone + alt) stays the same.
 */
const TONE_GRADIENTS: Record<StoneTone, string> = {
  graphite: "linear-gradient(135deg, #59544c 0%, #2b271f 100%)",
  sand: "linear-gradient(135deg, #e0cba7 0%, #b9986a 100%)",
  clay: "linear-gradient(135deg, #c68c5a 0%, #8a5a35 100%)",
  slate: "linear-gradient(135deg, #7b8188 0%, #454a50 100%)",
  limestone: "linear-gradient(135deg, #e6dbbf 0%, #c2b28a 100%)",
  charcoal: "linear-gradient(135deg, #46403a 0%, #16130e 100%)",
  copper: "linear-gradient(135deg, #c67d49 0%, #7c4425 100%)",
  silver: "linear-gradient(135deg, #d6d1c5 0%, #9c9689 100%)",
};

interface StoneSwatchProps {
  tone: StoneTone;
  alt: string;
  className?: string;
}

export function StoneSwatch({ tone, alt, className = "" }: StoneSwatchProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`grain ${className}`}
      style={{ backgroundImage: TONE_GRADIENTS[tone] }}
    />
  );
}
