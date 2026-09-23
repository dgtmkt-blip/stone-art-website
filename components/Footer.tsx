import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { footerNav } from "@/lib/data/navigation";
import { siteSettings } from "@/lib/data/site-settings";

export function Footer() {
  return (
    <footer className="bg-stone-900 pb-8 pt-20 text-stone-300">
      <Container wide>
        <div className="grid grid-cols-1 gap-12 border-b border-stone-700 pb-16 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Logo variant="white-tagline" className="h-11" />
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-stone-400">
              {siteSettings.tagline} A brand of {siteSettings.company}.
            </p>
          </div>

          <FooterColumn title="Products" items={footerNav.products} />
          <FooterColumn title="About" items={footerNav.about} />
          <FooterColumn title="Resources" items={footerNav.resources} />
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-50">
              Contact
            </h4>
            <p className="text-[14px] leading-relaxed text-stone-400">
              {siteSettings.contact.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
            <p className="mt-3 space-x-3 text-[14px]">
              {siteSettings.contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="text-stone-300 hover:text-ember-light">
                  {phone}
                </a>
              ))}
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-50">
              Enquire
            </h4>
            <p className="text-[14px] leading-relaxed text-stone-400">
              {siteSettings.contact.hours}
            </p>
            <Link
              href="/booking"
              className="mt-4 inline-block text-[14px] font-medium text-ember-light hover:underline"
            >
              Book a Consultation →
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-stone-700 pt-8 text-[13px] text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Stoneart · {siteSettings.company}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-stone-300">Privacy</Link>
            <Link href="/terms" className="hover:text-stone-300">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-stone-50">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-[14px] text-stone-400 transition-colors hover:text-ember-light">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
