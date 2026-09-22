import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { ProductGrid } from "@/components/ProductGrid";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StoneSwatch } from "@/components/StoneSwatch";
import { getFeaturedProducts } from "@/lib/data/products";
import { projects } from "@/lib/data/projects";

const whyStoneartFeatures = [
  {
    title: "Natural Character",
    description: "Every sheet carries the grain and tonal variation only genuine stone produces.",
  },
  {
    title: "Lightweight Construction",
    description: "A fraction of the weight of solid stone, without losing material presence.",
  },
  {
    title: "Flexible Application",
    description: "Thin, bendable sheets open up curved and detailed surfaces solid slab cannot reach.",
  },
  {
    title: "Architectural Versatility",
    description: "From feature walls to furniture, one material family across many contexts.",
  },
  {
    title: "Easy Handling",
    description: "Simplified transport and installation compared to conventional stone slab.",
  },
  {
    title: "Distinctive Surfaces",
    description: "No two sheets read identically — a material signature that resists uniformity.",
  },
];

const applicationStories: { title: string; tone: "slate" | "clay" | "charcoal" | "sand" | "silver" }[] = [
  { title: "Feature Walls", tone: "slate" },
  { title: "Hospitality Interiors", tone: "clay" },
  { title: "Curved Surfaces", tone: "silver" },
  { title: "Furniture", tone: "sand" },
  { title: "Commercial Spaces", tone: "charcoal" },
];

export default function HomePage() {
  const featured = getFeaturedProducts(6);
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      {/* 01 — HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-stone-900 text-stone-50">
        <StoneSwatch tone="slate" alt="Architectural natural stone veneer surface" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/25" />
        <Container wide className="relative pb-24 pt-48 md:pb-32">
          <Reveal>
            <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.28em] text-ember-light">
              Panelart Decor · Kolkata, India
            </p>
            <h1 className="max-w-3xl text-[clamp(44px,7.5vw,104px)] font-normal leading-[0.98]">
              Stone, Reimagined.
            </h1>
            <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-stone-300">
              Stoneart brings genuine natural stone veneer and engineered poly stone surfaces to
              architecture — thin, flexible material formats built for spaces that demand real
              texture and design freedom in equal measure.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/products">Explore Products</Button>
              <Button href="/about" variant="outline-light">Discover Stoneart</Button>
            </div>
          </Reveal>
        </Container>
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-stone-400/60" />
        </div>
      </section>

      {/* 02 — MATERIAL INTRODUCTION */}
      <section className="py-24 md:py-32">
        <Container wide className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <StoneSwatch tone="limestone" alt="Macro texture of natural stone surface" className="aspect-[4/5] rounded-[var(--radius-sm)]" />
          </Reveal>
          <Reveal delay={2}>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-ember">
              About Stoneart
            </p>
            <h2 className="text-[clamp(30px,4.5vw,48px)] font-normal leading-tight">
              Nature&rsquo;s surface.
              <br />
              Engineered for possibility.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-stone-600">
              Stoneart takes the character of real stone and re-engineers it into a thin,
              workable format — giving architects and designers the freedom to specify genuine
              material on surfaces conventional stone could never reach.
            </p>
            <Button href="/about/the-product" variant="text" className="mt-7 inline-flex">
              Learn about the product
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* 03 — TWO PRODUCT WORLDS */}
      <section className="pb-24 md:pb-32">
        <Container wide>
          <SectionHeading eyebrow="Our Range" title="Two material worlds" className="mb-12" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProductWorldCard
              href="/products/natural-stone"
              tone="clay"
              title="Natural Stone"
              description="Genuine slate and quartz veneer — authentic texture, colour and grain, cut thin and flexible."
            />
            <ProductWorldCard
              href="/products/poly-stone"
              tone="graphite"
              title="Poly Stone"
              description="Engineered mineral-composite surfaces built for scale, consistency and large-format specification."
            />
          </div>
        </Container>
      </section>

      {/* 04 — WHY STONEART */}
      <section className="bg-stone-900 py-24 text-stone-50 md:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="Why Stoneart"
            title="Engineered by nature, refined by design"
            dark
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {whyStoneartFeatures.map((f, i) => (
              <Reveal key={f.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="text-center sm:text-left">
                <span className="font-display text-[38px] text-ember-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[19px] font-medium">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-stone-400">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 05 — APPLICATION / ARCHITECTURAL STORY */}
      <section className="py-24 md:py-32">
        <Container wide>
          <SectionHeading
            eyebrow="Where It Works"
            title="An architectural material, not a finish"
            description="From feature walls to furniture, Stoneart surfaces move across scales and contexts."
            className="mb-12"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
            {applicationStories.map((story, i) => (
              <Reveal
                key={story.title}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className={`relative overflow-hidden rounded-[var(--radius-sm)] ${
                  i === 0 ? "col-span-2 row-span-2" : "col-span-1"
                }`}
              >
                <StoneSwatch tone={story.tone} alt={`${story.title} application of Stoneart surfaces`} className="aspect-square h-full" />
                <span className="absolute bottom-4 left-4 text-[14px] font-medium uppercase tracking-[0.05em] text-stone-50 drop-shadow">
                  {story.title}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 06 — MANUFACTURING STORY */}
      <section className="relative overflow-hidden bg-stone-900 py-28 text-stone-50">
        <StoneSwatch tone="graphite" alt="" className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/80 to-stone-900/50" />
        <Container wide className="relative max-w-xl">
          <Reveal>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-ember-light">
              Manufacturing
            </p>
            <h2 className="text-[clamp(30px,4.5vw,48px)] font-normal">From Stone to Surface</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-stone-300">
              Every Stoneart sheet moves through sourcing, preparation, backing and finishing
              before it reaches a project — a process built around preserving what makes stone
              worth specifying in the first place.
            </p>
            <Button href="/manufacturing" variant="outline-light" className="mt-8 inline-flex">
              Discover Manufacturing
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* 07 — FEATURED PRODUCTS */}
      <section className="py-24 md:py-32">
        <Container wide>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="The Collection" title="Featured surfaces" />
            <Button href="/products/natural-stone" variant="secondary">View All Products</Button>
          </div>
          <ProductGrid products={featured} />
        </Container>
      </section>

      {/* 08 — PROJECTS */}
      <section className="bg-stone-100 py-24 md:py-32">
        <Container wide>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Our Work" title="Projects" />
            <Button href="/projects" variant="secondary">Explore Projects</Button>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProjects.map((project, i) => (
              <div key={project.id} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                <ProjectCard project={project} size={i === 0 ? "lg" : "md"} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 09 — TECHNICAL / PROFESSIONAL CTA */}
      <CTASection
        eyebrow="For Architects & Specifiers"
        title="Designed to inspire. Documented to specify."
        description="Sheet sizes, technical overviews and downloadable documentation for professional specification."
        tone="slate"
        actions={[
          { label: "Technical Data", href: "/about/technical-data", variant: "outline-light" },
          { label: "Download Technical Data Sheet", href: "/about/technical-data#downloads" },
        ]}
      />

      {/* 10 — CONTACT CTA */}
      <section className="py-28">
        <Container wide className="max-w-2xl text-center">
          <Reveal>
            <h2 className="text-[clamp(30px,4.5vw,48px)] font-normal text-stone-900">
              Let&rsquo;s build something remarkable.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-stone-600">
              Tell us about your project and our team will help you choose the right surface.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact">Contact Us</Button>
              <Button href="/booking" variant="secondary">Book / Enquire</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function ProductWorldCard({
  href,
  tone,
  title,
  description,
}: {
  href: string;
  tone: "clay" | "graphite";
  title: string;
  description: string;
}) {
  return (
    <Reveal>
      <Link href={href} className="group block">
        <div className="relative overflow-hidden rounded-[var(--radius-sm)]">
          <StoneSwatch
            tone={tone}
            alt={`${title} collection`}
            className="aspect-[4/5] transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.05] md:aspect-[16/11]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <h3 className="font-display text-[30px] text-stone-50">{title}</h3>
            <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-stone-300">{description}</p>
            <span className="mt-5 inline-block text-[13px] font-semibold uppercase tracking-[0.1em] text-ember-light">
              Explore Collection →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
