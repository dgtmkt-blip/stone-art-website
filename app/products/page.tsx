import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StoneSwatch } from "@/components/StoneSwatch";
import { CATEGORY_META } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Natural Stone and Poly Stone surfaces from Stoneart by Panelart Decor.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Two material worlds"
        description="Every Stoneart surface belongs to one of two families — genuine Natural Stone, or engineered Poly Stone."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        tone="graphite"
      />
      <section className="py-24 md:py-32">
        <Container wide className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {(Object.entries(CATEGORY_META) as [keyof typeof CATEGORY_META, (typeof CATEGORY_META)[keyof typeof CATEGORY_META]][]).map(
            ([slug, meta]) => (
              <Reveal key={slug}>
                <Link href={`/products/${slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-[var(--radius-sm)]">
                    <StoneSwatch
                      tone={meta.tone}
                      alt={`${meta.label} collection`}
                      className="aspect-[4/5] transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.05] md:aspect-[16/11]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <h2 className="font-display text-[28px] text-stone-50">{meta.label}</h2>
                      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-stone-300">
                        {meta.description}
                      </p>
                      <span className="mt-5 inline-block text-[13px] font-semibold uppercase tracking-[0.1em] text-ember-light">
                        Explore Collection →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          )}
        </Container>
      </section>
    </>
  );
}
