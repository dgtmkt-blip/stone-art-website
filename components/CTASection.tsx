import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { StoneSwatch } from "@/components/StoneSwatch";
import type { StoneTone } from "@/lib/types";

interface CTAAction {
  label: string;
  href: string;
  variant?: "primary" | "outline-light" | "secondary";
}

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions: CTAAction[];
  tone?: StoneTone;
}

export function CTASection({ eyebrow, title, description, actions, tone = "charcoal" }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-stone-900 py-28 text-stone-50">
      <StoneSwatch tone={tone} alt="" className="absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/85 to-stone-900/70" />
      <div className="relative mx-auto max-w-[720px] px-6 text-center">
        <Reveal>
          {eyebrow && (
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-ember-light">
              {eyebrow}
            </p>
          )}
          <h2 className="text-[clamp(30px,4.5vw,52px)] font-normal">{title}</h2>
          {description && <p className="mt-5 text-[16px] leading-relaxed text-stone-300">{description}</p>}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {actions.map((action) => (
              <Button key={action.label} href={action.href} variant={action.variant ?? "outline-light"}>
                {action.label}
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
