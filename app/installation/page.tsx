import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MaterialDisclaimer } from "@/components/MaterialDisclaimer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Installation",
  description: "A general installation overview for Stoneart natural stone and poly stone surfaces.",
};

const steps = [
  { title: "Surface Preparation", description: "The substrate should be clean, dry, structurally sound and free of loose material before application." },
  { title: "Layout & Dry-Fit", description: "Sheets are dry-laid to plan grain direction, joins and cut lines before fixing." },
  { title: "Adhesive Application", description: "A suitable adhesive is applied per substrate type and manufacturer recommendation." },
  { title: "Sheet Application", description: "Sheets are applied and pressed firmly, working from a set reference line." },
  { title: "Corners & Edges", description: "Corners and exposed edges are treated with appropriate detailing for a finished appearance." },
  { title: "Finishing & Sealing", description: "A finishing/sealing step protects the surface depending on application and exposure." },
  { title: "Care & Maintenance", description: "Routine care recommendations will be confirmed and published here." },
];

export default function InstallationPage() {
  return (
    <>
      <PageHero
        eyebrow="Installation"
        title="A general installation overview"
        description="Guidance for architects, contractors and installers working with Stoneart surfaces."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Installation" }]}
        tone="graphite"
      />

      <section className="py-6">
        <Container wide className="max-w-2xl pt-10">
          <p className="text-[13px] leading-relaxed text-stone-500">
            The sequence below is a general, development-stage overview and is not official
            technical guidance. A verified Installation Guide (PDF) and video will replace this
            notice once approved by Panelart Decor.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container wide className="max-w-3xl">
          <ol className="space-y-10">
            {steps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="flex gap-6 border-b border-stone-200 pb-10 last:border-0">
                <span className="font-display text-[32px] text-ember">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[20px] text-stone-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-stone-100 py-16">
        <Container wide className="max-w-2xl space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="border border-stone-300 bg-stone-50 px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-stone-400">
              Installation Guide (PDF) — Coming Soon
            </span>
            <span className="border border-stone-300 bg-stone-50 px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-stone-400">
              Installation Video — Coming Soon
            </span>
          </div>
          <MaterialDisclaimer />
        </Container>
      </section>

      <CTASection
        eyebrow="Need Support?"
        title="Talk to our team before you start"
        tone="clay"
        actions={[{ label: "Contact Us", href: "/contact" }]}
      />
    </>
  );
}
