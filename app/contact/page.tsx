import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { siteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Stoneart by Panelart Decor — quotes, samples, technical guidance and general enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Reach out for quotes, samples, technical data or general enquiries — our team responds directly."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        tone="limestone"
      />

      <section className="py-20 md:py-28">
        <Container wide className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="font-display text-[24px] text-stone-900">{siteSettings.company}</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
              We manufacture and supply premium stone surfaces across India. Reach out for
              quotes, samples, technical data or installation guidance.
            </p>

            <div className="mt-8 space-y-6 border-t border-stone-200 pt-8">
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-500">Address</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-800">
                  {siteSettings.contact.addressLines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </p>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-500">Phone</h3>
                {siteSettings.contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="mt-2 block text-[15px] text-stone-800 hover:text-ember">
                    {phone}
                  </a>
                ))}
              </div>
              {siteSettings.contact.email && (
                <div>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-500">Email</h3>
                  <a href={`mailto:${siteSettings.contact.email}`} className="mt-2 block text-[15px] text-stone-800 hover:text-ember">
                    {siteSettings.contact.email}
                  </a>
                </div>
              )}
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-500">Hours</h3>
                <p className="mt-2 text-[15px] text-stone-800">{siteSettings.contact.hours}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="border border-stone-300 bg-stone-50 p-8">
              <h3 className="font-display text-[22px] text-stone-900">Send an Enquiry</h3>
              <p className="mt-1.5 text-[14px] text-stone-500">
                Fill in the form and our team will get back to you shortly.
              </p>
              <div className="mt-7">
                <EnquiryForm variant="contact" source="contact-page" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container wide>
          <div className="overflow-hidden rounded-[var(--radius-sm)] shadow-[0_10px_40px_rgba(23,19,16,0.12)]">
            <iframe
              src={siteSettings.contact.mapEmbedSrc}
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              title="Stoneart / Panelart Decor location"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
