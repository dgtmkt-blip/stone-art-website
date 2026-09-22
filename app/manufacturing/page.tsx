import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StoneSwatch } from "@/components/StoneSwatch";
import type { StoneTone } from "@/lib/types";

export const metadata: Metadata = {
  title: "Manufacturing",
  description: "How Stoneart surfaces move from raw stone to a finished architectural sheet.",
};

const stages: { title: string; description: string; tone: StoneTone }[] = [
  {
    title: "Material Sourcing",
    description: "Natural Stone begins with selected slate and quartz; Poly Stone begins with engineered mineral compounds.",
    tone: "slate",
  },
  {
    title: "Surface Preparation",
    description: "Raw material is prepared and evaluated for colour, grain and structural consistency.",
    tone: "sand",
  },
  {
    title: "Backing & Processing",
    description: "A flexible backing is bonded to the stone face, giving the sheet its bend and workability.",
    tone: "graphite",
  },
  {
    title: "Quality Inspection",
    description: "Sheets are checked for consistency before moving to finishing.",
    tone: "silver",
  },
  {
    title: "Finishing",
    description: "Sheets are trimmed and finished to standard format ahead of packing.",
    tone: "clay",
  },
  {
    title: "Packing Preparation",
    description: "Finished sheets are prepared for protective packing — see the Packing page for detail.",
    tone: "charcoal",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="From Stone to Surface"
        description="An overview of how Stoneart sheets are made — from raw material to a finished architectural product."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Manufacturing" }]}
        tone="graphite"
      />

      <section className="py-6 md:py-10">
        <Container wide className="max-w-2xl pt-10">
          <p className="text-[13px] leading-relaxed text-stone-500">
            The stages below describe the general manufacturing sequence at a development-content
            level. Process-specific detail will be reviewed and confirmed with Panelart Decor
            before this page is finalised.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container wide>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
            {stages.map((stage, i) => (
              <Reveal key={stage.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="flex gap-6">
                <div className="w-32 shrink-0 overflow-hidden rounded-[var(--radius-sm)] sm:w-40">
                  <StoneSwatch tone={stage.tone} alt="" className="aspect-square" />
                </div>
                <div>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ember">
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-[20px] text-stone-900">{stage.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{stage.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Next"
        title="See how sheets are packed and installed"
        tone="clay"
        actions={[
          { label: "Packing", href: "/packing", variant: "outline-light" },
          { label: "Installation", href: "/installation" },
        ]}
      />
    </>
  );
}
