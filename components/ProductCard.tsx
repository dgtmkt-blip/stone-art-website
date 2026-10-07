import Link from "next/link";
import { ProductMedia } from "@/components/ProductMedia";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-[var(--radius-sm)]">
        <ProductMedia
          src={product.thumbnailSrc}
          tone={product.thumbnailTone}
          alt={product.images[0]?.alt ?? `${product.name} ${product.typeLabel.toLowerCase()}`}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/5] bg-stone-200 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.06]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[20px] text-stone-900">{product.name}</h3>
          <p className="mt-1 text-[13px] uppercase tracking-[0.08em] text-stone-500">
            {product.productCode} · {product.collection}
          </p>
        </div>
      </div>
      <span className="mt-3 inline-block text-[13px] font-medium text-ember opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View Product →
      </span>
    </Link>
  );
}
