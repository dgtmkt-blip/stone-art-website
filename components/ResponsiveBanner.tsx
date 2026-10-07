/* eslint-disable @next/next/no-img-element */

/**
 * Full-bleed background photo that serves a small file to phones and a large
 * one to desktops. Expects three files: `name-800.webp`, `name-1600.webp` and
 * `name.webp` (see scripts/import-site-images.mjs). Plain <img> because the
 * site is a static export, where next/image cannot build responsive srcsets.
 */
export function ResponsiveBanner({ src, alt = "" }: { src: string; alt?: string }) {
  const base = src.replace(/\.webp$/, "");
  return (
    <img
      src={src}
      srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w, ${src} 2400w`}
      sizes="100vw"
      alt={alt}
      fetchPriority="high"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
