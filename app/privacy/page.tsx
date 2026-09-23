import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        tone="limestone"
      />
      <section className="py-20 md:py-28">
        <Container wide className="max-w-2xl">
          <p className="text-[15px] leading-relaxed text-stone-600">
            This page is a placeholder. Stoneart / Panelart Decor Pvt Ltd&rsquo;s final privacy
            policy — covering what information is collected through this site (including the
            enquiry forms), how it is used and how it is stored — will be published here once
            approved.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            In the meantime, for any question about data submitted through this site, please{" "}
            <a href="/contact" className="text-ember hover:underline">contact us directly</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
