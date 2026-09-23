import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StoneSwatch } from "@/components/StoneSwatch";
import type { StoneTone } from "@/lib/types";

export const metadata: Metadata = {
  title: "Backing",
  description: "The backing types behind every Stoneart sheet — Poly Backing, Translucent and Fleece Backing — and what each is suited for.",
};

// Verified from the live panelart.in "Backing" page.
const backingTypes: { title: string; description: string; tone: StoneTone }[] = [
  {
    title: "Poly Backing",
    description:
      "A fibreglass and polyresin backing, black in colour and opaque. Used on panels for decorative purposes and affixed with resin — the standard backing across most applications.",
    tone: "charcoal",
  },
  {
    title: "Translucent",
    description:
      "Made from a clear, transparent resin rather than an opaque one. Designed for backlit panels, where light passes through and the natural veining of the stone becomes visible.",
    tone: "limestone",
  },
  {
    title: "Fleece Backing",
    description:
      "A slightly improved version of Poly Backing — a little more flexible and a little more expensive, with otherwise the same characteristics.",
    tone: "sand",
  },
];

export default function BackingPage() {
  return (
    <>
      <PageHero
        eyebrow="Technical Data"
        title="Backing"
        description="The flexible layer bonded to every Stoneart sheet — what gives genuine stone its bend, and its ability to adhere to almost any surface."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Backing" }]}
        tone="charcoal"
      />

      <section className="py-20 md:py-28">
        <Container wide className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-[26px] text-stone-900">Why backing matters</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
              A thin slice of natural stone has no structural strength of its own — the backing
              is what turns it into a workable architectural sheet. It gives the material its
              flexibility, its ability to bend around curves and columns, and its adhesion to
              substrates that solid stone could never be applied to.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-stone-100 py-20 md:py-28">
        <Container wide>
          <h2 className="mb-12 font-display text-[26px] text-stone-900">Types of Backing</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {backingTypes.map((type, i) => (
              <Reveal key={type.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <StoneSwatch tone={type.tone} alt={`${type.title} sample`} className="aspect-[4/3] rounded-[var(--radius-sm)]" />
                <h3 className="mt-5 font-display text-[20px] text-stone-900">{type.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{type.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Specify With Confidence"
        title="Not sure which backing suits your project?"
        description="Tell us about the application and our team will recommend the right option."
        tone="slate"
        actions={[{ label: "Contact Us", href: "/contact" }]}
      />
    </>
  );
}
