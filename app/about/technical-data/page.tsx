import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MaterialDisclaimer } from "@/components/MaterialDisclaimer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SpecificationTable } from "@/components/SpecificationTable";
import { CATEGORY_META, naturalStoneProducts, polyStoneProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Technical Data",
  description: "Sheet sizes, general material information and downloadable technical documentation for Stoneart surfaces.",
};

const overviewRows = [
  { label: "Natural Stone — Sheet Size", value: naturalStoneProducts[0]?.sheetSizes[0] ?? "—" },
  { label: "Natural Stone — Thickness", value: naturalStoneProducts[0]?.thickness ?? "—" },
  { label: "Natural Stone — Backing", value: naturalStoneProducts[0]?.backing ?? "—" },
  { label: "Poly Stone — Sheet Size", value: polyStoneProducts[0]?.sheetSizes[0] ?? "—" },
  { label: "Poly Stone — Thickness", value: polyStoneProducts[0]?.thickness ?? "—" },
  { label: "Poly Stone — Backing", value: polyStoneProducts[0]?.backing ?? "—" },
];

const downloads = [
  { label: "Natural Stone — Technical Data Sheet", href: undefined as string | undefined },
  { label: "Poly Stone — Technical Data Sheet", href: undefined as string | undefined },
  { label: "Installation Guide", href: undefined as string | undefined },
];

export default function TechnicalDataPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Technical Data"
        description="General specifications for professional specification. Individual product pages carry per-product detail."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Technical Data" },
        ]}
        tone="graphite"
      />

      <section className="py-20 md:py-28">
        <Container wide className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-[26px] text-stone-900">Overview</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
              Figures below are indicative development placeholders pending the final approved
              specification sheet from Panelart Decor. Individual products list their own values
              on their respective product pages.
            </p>
            <div className="mt-8">
              <SpecificationTable rows={overviewRows} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="sheet-sizes" className="scroll-mt-28 bg-stone-100 py-20 md:py-28">
        <Container wide className="max-w-3xl">
          <h2 className="font-display text-[26px] text-stone-900">Sheet Sizes</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {(Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[]).map((cat) => {
              const list = cat === "natural-stone" ? naturalStoneProducts : polyStoneProducts;
              const sizes = Array.from(new Set(list.flatMap((p) => p.sheetSizes)));
              return (
                <div key={cat} className="border border-stone-300 bg-stone-50 p-6">
                  <h3 className="font-display text-[18px] text-stone-900">{CATEGORY_META[cat].label}</h3>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-stone-600">
                    {sizes.map((size) => (
                      <li key={size}>{size}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="downloads" className="scroll-mt-28 py-20 md:py-28">
        <Container wide className="max-w-2xl">
          <h2 className="font-display text-[26px] text-stone-900">Downloads</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
            Documents will be published here once approved. Buttons are disabled rather than
            linking to a placeholder file.
          </p>
          <ul className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
            {downloads.map((d) => (
              <li key={d.label} className="flex items-center justify-between py-4">
                <span className="text-[15px] text-stone-800">{d.label}</span>
                {d.href ? (
                  <a href={d.href} className="text-[13px] font-semibold uppercase tracking-[0.08em] text-ember hover:underline">
                    Download
                  </a>
                ) : (
                  <span className="text-[13px] uppercase tracking-[0.08em] text-stone-400">Coming Soon</span>
                )}
              </li>
            ))}
          </ul>
          <MaterialDisclaimer className="mt-8" />
        </Container>
      </section>
    </>
  );
}
