import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { StoneSwatch } from "@/components/StoneSwatch";
import type { StoneTone } from "@/lib/types";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  tone?: StoneTone;
}

export function PageHero({ eyebrow, title, description, breadcrumbs, tone = "charcoal" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-stone-900 pb-16 pt-40 text-stone-50 md:pb-20 md:pt-48">
      <StoneSwatch tone={tone} alt="" className="absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-900/75 to-stone-900/90" />
      <Container wide className="relative">
        {eyebrow && (
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-ember-light">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-2xl text-[clamp(34px,5vw,58px)] font-normal">{title}</h1>
        {description && (
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-stone-300">{description}</p>
        )}
        <div className="mt-8">
          <Breadcrumbs items={breadcrumbs} dark />
        </div>
      </Container>
    </section>
  );
}
