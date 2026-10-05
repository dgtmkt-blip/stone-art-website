import Image from "next/image";
import { StoneSwatch } from "@/components/StoneSwatch";
import type { StoneTone } from "@/lib/types";

interface ProductMediaProps {
  /** Photograph path. When absent, a tinted placeholder is shown instead. */
  src?: string;
  tone: StoneTone;
  alt: string;
  /** Sizing/aspect classes for the frame (the photo fills it). */
  className?: string;
  sizes?: string;
  fit?: "cover" | "contain";
}

export function ProductMedia({ src, tone, alt, className = "", sizes, fit = "cover" }: ProductMediaProps) {
  if (!src) return <StoneSwatch tone={tone} alt={alt} className={className} />;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={fit === "cover" ? "object-cover" : "object-contain"}
      />
    </div>
  );
}
