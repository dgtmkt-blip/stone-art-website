import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MaterialDisclaimer } from "@/components/MaterialDisclaimer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StoneSwatch } from "@/components/StoneSwatch";

export const metadata: Metadata = {
  title: "The Product",
  description: "What Stoneart veneer is and how it's constructed — material composition, character and flexibility.",
};

const anatomyLayers = [
  { title: "Natural Stone Face", description: "A fine layer of genuine slate or quartz, carrying the stone's true colour and grain." },
  { title: "Flexible Backing", description: "A backing layer that gives the sheet its bend and its ability to adhere to varied substrates." },
  { title: "Substrate Ready", description: "Prepared for application to walls, furniture and curved architectural surfaces." },
];

export default function TheProductPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="The Product"
        description="What Stoneart is, and how a thin slice of genuine stone becomes an architectural surface."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "The Product" },
        ]}
        tone="slate"
      />

      <section className="py-24 md:py-32">
        <Container wide className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-ember">
              What is Stoneart?
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-normal leading-tight">
              A thin slice of genuine stone
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-stone-600">
              Stoneart veneer is created by carefully separating a fine layer from natural slate
              and quartz. The result retains the exact colour, grain and texture of the parent
              stone — because it is the stone — while weighing only a fraction of a conventional
              slab.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-stone-600">
              That combination — the honest character of natural stone with a flexible backing —
              is what lets Stoneart clad walls, furniture and curved surfaces that solid stone
              could never reach.
            </p>
          </Reveal>
          <Reveal delay={2} className="order-1 lg:order-2">
            <StoneSwatch tone="slate" alt="Natural stone veneer sheet detail" className="aspect-[4/5] rounded-[var(--radius-sm)]" />
          </Reveal>
        </Container>
      </section>

      {/* MATERIAL ANATOMY */}
      <section className="bg-stone-900 py-24 text-stone-50 md:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="Material Anatomy"
            title="How a sheet is built"
            dark
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {anatomyLayers.map((layer, i) => (
              <Reveal key={layer.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="border border-stone-700 p-8">
                <span className="font-display text-[34px] text-ember-light">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[18px] font-medium">{layer.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-stone-400">{layer.description}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-xl text-[13px] text-stone-500">
            Simplified representation for illustration. A detailed construction diagram will
            replace this once approved by Stoneart.
          </p>
        </Container>
      </section>

      {/* SURFACE CHARACTER + FLEXIBILITY */}
      <section className="py-24 md:py-32">
        <Container wide className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <StoneSwatch tone="copper" alt="Natural stone veneer showing surface character" className="aspect-[4/3] rounded-[var(--radius-sm)]" />
            <h3 className="mt-6 font-display text-[22px] text-stone-900">Surface Character</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-stone-600">
              Because each sheet is genuine stone, colour and grain vary naturally from sheet to
              sheet — a quality treated as a feature, not an inconsistency.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <StoneSwatch tone="clay" alt="Natural stone veneer applied to a curved surface" className="aspect-[4/3] rounded-[var(--radius-sm)]" />
            <h3 className="mt-6 font-display text-[22px] text-stone-900">Flexibility</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-stone-600">
              The flexible backing allows sheets to bend around columns, curved furniture edges
              and detailing that solid stone slab cannot follow.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container wide className="max-w-2xl">
          <MaterialDisclaimer />
        </Container>
      </section>

      <CTASection
        eyebrow="Specify With Confidence"
        title="Need the technical detail?"
        tone="graphite"
        actions={[{ label: "View Technical Data", href: "/about/technical-data" }]}
      />
    </>
  );
}
