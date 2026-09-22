import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { StoneSwatch } from "@/components/StoneSwatch";

export const metadata: Metadata = {
  title: "Why Stoneart",
  description: "The architectural case for choosing Stoneart natural stone and poly stone surfaces.",
};

const benefits = [
  {
    title: "Genuine Material",
    description: "Natural Stone surfaces are authentic slate and quartz — not a printed or laminated imitation.",
    tone: "slate" as const,
  },
  {
    title: "Thin & Flexible",
    description: "A format that reaches curves, columns and detailing conventional stone slab cannot follow.",
    tone: "clay" as const,
  },
  {
    title: "Lightweight Handling",
    description: "Reduced weight simplifies transport, handling and on-site installation.",
    tone: "sand" as const,
  },
  {
    title: "Design Versatility",
    description: "One material family spans feature walls, furniture, facades and hospitality interiors.",
    tone: "copper" as const,
  },
  {
    title: "Specification Consistency",
    description: "Poly Stone surfaces are engineered for predictable tone across large-scale projects.",
    tone: "graphite" as const,
  },
  {
    title: "Considered Character",
    description: "Every finish is developed to read as intentional material choice, not decorative surface.",
    tone: "silver" as const,
  },
];

export default function WhyStoneartPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Why Stoneart"
        description="An architectural material built around design freedom — without giving up material honesty."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Why Stoneart" },
        ]}
        tone="clay"
      />

      <section className="py-24 md:py-32">
        <Container wide className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <StoneSwatch tone={benefit.tone} alt="" className="aspect-[4/3] rounded-[var(--radius-sm)]" />
              <h3 className="mt-5 font-display text-[20px] text-stone-900">{benefit.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{benefit.description}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <CTASection
        eyebrow="Ready to Specify?"
        title="See the full collection"
        tone="slate"
        actions={[
          { label: "Explore Products", href: "/products" },
          { label: "Talk to Our Team", href: "/contact", variant: "outline-light" },
        ]}
      />
    </>
  );
}
