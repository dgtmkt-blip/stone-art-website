import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { StoneSwatch } from "@/components/StoneSwatch";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-stone-900 text-stone-50">
      <StoneSwatch tone="charcoal" alt="" className="absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30" />
      <Container wide className="relative text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-ember-light">404</p>
        <h1 className="mt-4 font-display text-[clamp(34px,5vw,54px)]">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-stone-300">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/products" variant="outline-light">Explore Products</Button>
        </div>
      </Container>
    </section>
  );
}
