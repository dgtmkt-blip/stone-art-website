import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StoneSwatch } from "@/components/StoneSwatch";

export const metadata: Metadata = {
  title: "About Stoneart",
  description: "The story, material philosophy and architectural focus behind Stoneart by Panelart Decor.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Stone, understood as architecture"
        description="Stoneart is Panelart Decor's material philosophy in practice — real stone, engineered for the way architects actually build."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        tone="slate"
      />

      <section className="py-24 md:py-32">
        <Container wide className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <StoneSwatch tone="limestone" alt="Natural stone veneer detail" className="aspect-[4/5] rounded-[var(--radius-sm)]" />
          </Reveal>
          <Reveal delay={2}>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-ember">
              Material Philosophy
            </p>
            <h2 className="text-[clamp(28px,4vw,42px)] font-normal leading-tight">
              Material honesty, at architectural scale
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-stone-600">
              Panelart Decor built Stoneart around a simple idea: real stone should be usable
              wherever a designer needs it, not only where a solid slab can go. By separating a
              fine layer of genuine slate and quartz and bonding it to a flexible backing,
              Stoneart keeps the authentic character of stone — its grain, its colour variation,
              its weight of presence — while opening it up to curved surfaces, furniture and
              large-format architectural applications.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-stone-100 py-24 md:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="Explore Further"
            title="Understand Stoneart in depth"
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <AboutLink
              href="/about/the-product"
              title="The Product"
              description="What Stoneart is and how it's constructed."
            />
            <AboutLink
              href="/about/why-stoneart"
              title="Why Stoneart"
              description="The architectural case for choosing Stoneart."
            />
            <AboutLink
              href="/about/technical-data"
              title="Technical Data"
              description="Sheet sizes, specifications and downloads."
            />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Talk to Us"
        title="Have a project in mind?"
        description="Our team can help you choose the right Stoneart surface for your next project."
        tone="clay"
        actions={[{ label: "Contact Us", href: "/contact" }]}
      />
    </>
  );
}

function AboutLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Reveal>
      <Link
        href={href}
        className="group block border border-stone-300 bg-stone-50 p-8 transition-colors hover:border-stone-900"
      >
        <h3 className="font-display text-[22px] text-stone-900">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-stone-600">{description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-ember">
          Read more
          <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </Reveal>
  );
}
