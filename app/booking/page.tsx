import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { allProducts } from "@/lib/data/products";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Booking",
  description: "Request a sample, product booking or consultation with the Stoneart team.",
};

export default function BookingPage() {
  const productOptions = allProducts.map((p) => `${p.name} (${p.productCode})`);

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Book a sample or consultation"
        description="Whether you need a physical sample, a product booking or a project consultation, start here — our team will follow up to confirm details."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Booking" }]}
        tone="clay"
      />

      <section className="py-20 md:py-28">
        <Container wide className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="font-display text-[24px] text-stone-900">What happens next</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
              This form currently covers sample requests, product bookings, appointment requests
              and dealer enquiries — select the option closest to your need and add detail in
              your message. Our team will confirm specifics directly.
            </p>
            <div className="mt-8 space-y-5 border-t border-stone-200 pt-8">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                Prefer to call?
              </h3>
              {siteSettings.contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="block text-[16px] text-stone-800 hover:text-ember">
                  {phone}
                </a>
              ))}
              <p className="text-[14px] text-stone-500">{siteSettings.contact.hours}</p>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <EnquiryForm variant="booking" source="booking-page" productOptions={productOptions} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
