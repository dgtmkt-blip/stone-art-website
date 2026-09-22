import Link from "next/link";
import { StoneSwatch } from "@/components/StoneSwatch";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-[var(--radius-sm)]">
        <StoneSwatch
          tone={product.thumbnailTone}
          alt={`${product.name} stone surface`}
          className="aspect-[4/5] transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.06]"
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
