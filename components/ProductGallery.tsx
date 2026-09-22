"use client";

import { useEffect, useState } from "react";
import { StoneSwatch } from "@/components/StoneSwatch";
import type { ProductImage } from "@/lib/types";

const KIND_LABEL: Record<ProductImage["kind"], string> = {
  texture: "Texture",
  sheet: "Full Sheet",
  application: "Application",
  detail: "Detail",
};

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const active = images[activeIndex];

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, images.length]);

  if (!active) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="block w-full overflow-hidden rounded-[var(--radius-sm)] text-left"
        aria-label={`Open ${active.alt} in full screen`}
      >
        <StoneSwatch tone={active.tone} alt={active.alt} className="aspect-[4/5] md:aspect-[16/11]" />
      </button>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={`${img.kind}-${i}`}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`overflow-hidden rounded-[var(--radius-xs)] outline-offset-2 ${
              i === activeIndex ? "ring-2 ring-stone-900" : "opacity-80 hover:opacity-100"
            }`}
            aria-label={`Show ${img.alt}`}
            aria-pressed={i === activeIndex}
          >
            <StoneSwatch tone={img.tone} alt="" className="aspect-square" />
          </button>
        ))}
      </div>
      <p className="mt-2 text-[13px] text-stone-500">{KIND_LABEL[active.kind]}</p>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product image, full screen"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/95 p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-stone-100"
            aria-label="Close full screen image"
          >
            Close ✕
          </button>
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <StoneSwatch tone={active.tone} alt={active.alt} className="aspect-[4/3] rounded-[var(--radius-sm)]" />
            <div className="mt-4 flex items-center justify-between text-stone-300">
              <button
                type="button"
                onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                className="text-[13px] font-semibold uppercase tracking-[0.1em] hover:text-stone-50"
              >
                ← Previous
              </button>
              <span className="text-[13px]">{KIND_LABEL[active.kind]}</span>
              <button
                type="button"
                onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                className="text-[13px] font-semibold uppercase tracking-[0.1em] hover:text-stone-50"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
