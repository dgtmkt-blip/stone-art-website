import Image from "next/image";

type LogoVariant = "color" | "color-tagline" | "white" | "white-tagline";

const SRC: Record<LogoVariant, string> = {
  color: "/images/brand/stoneart-logo-color.png",
  "color-tagline": "/images/brand/stoneart-logo-color-tagline.png",
  white: "/images/brand/stoneart-logo-white.png",
  "white-tagline": "/images/brand/stoneart-logo-white-tagline.png",
};

interface LogoProps {
  variant: LogoVariant;
  className?: string;
  priority?: boolean;
}

/** Source PNGs are 400x100 (4:1) — explicit width/height avoids layout shift; className controls displayed size. */
export function Logo({ variant, className = "", priority }: LogoProps) {
  return (
    <Image
      src={SRC[variant]}
      alt="Stoneart — Panelart Decor"
      width={400}
      height={100}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
