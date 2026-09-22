import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
        tone="graphite"
      />
      <section className="py-20 md:py-28">
        <Container wide className="max-w-2xl">
          <p className="text-[15px] leading-relaxed text-stone-600">
            This page is a placeholder. Stoneart / Panelart Decor Pvt Ltd&rsquo;s final terms of
            use for this website will be published here once approved.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            For any question in the meantime, please{" "}
            <a href="/contact" className="text-ember hover:underline">contact us directly</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
