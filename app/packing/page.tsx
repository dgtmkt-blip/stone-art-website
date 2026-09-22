import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StoneSwatch } from "@/components/StoneSwatch";

export const metadata: Metadata = {
  title: "Packing",
  description: "How Stoneart surfaces are packed and protected for transport and handling.",
};

const principles = [
  {
    title: "Packing Philosophy",
    description: "Sheets are packed with the goal of arriving in the same condition they left the facility — protecting both the stone face and the flexible backing.",
  },
  {
    title: "Sheet Protection",
    description: "Individual sheets are separated and cushioned to prevent surface contact damage during transit.",
  },
  {
    title: "Packaging Process",
    description: "Sheets are bundled and reinforced for palletised handling, matched to shipment scale.",
  },
  {
    title: "Handling Guidance",
    description: "Sheets should be stored flat, kept dry, and handled by two people for larger formats.",
  },
];

export default function PackingPage() {
  return (
    <>
      <PageHero
        eyebrow="Packing"
        title="Protected from facility to site"
        description="An overview of how Stoneart sheets are packed, protected and prepared for transport."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Packing" }]}
        tone="sand"
      />

      <section className="py-20 md:py-28">
        <Container wide className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <StoneSwatch tone="sand" alt="Packed stone veneer sheets" className="aspect-[4/5] rounded-[var(--radius-sm)]" />
          </Reveal>
          <Reveal delay={2} className="space-y-10">
            {principles.map((p) => (
              <div key={p.title}>
                <h3 className="font-display text-[20px] text-stone-900">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{p.description}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-stone-100 py-16">
        <Container wide className="max-w-2xl">
          <p className="text-[13px] leading-relaxed text-stone-500">
            Exact packing specifications (bundle sizes, pallet counts, weight limits) will be
            confirmed with Panelart Decor and published here — figures are intentionally omitted
            rather than estimated.
          </p>
        </Container>
      </section>

      <CTASection
        eyebrow="Next"
        title="Ready to plan an installation?"
        tone="graphite"
        actions={[{ label: "Installation Guidance", href: "/installation" }]}
      />
    </>
  );
}
