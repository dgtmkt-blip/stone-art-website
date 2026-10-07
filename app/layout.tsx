import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

/**
 * Self-hosted (not next/font/google) — the Google Fonts build-time fetch is
 * unreliable in some environments (proxies, CI network policies, rate
 * limits) and there's no reason to depend on it. Files are the same Inter
 * and Fraunces variable fonts Google serves, downloaded once into
 * public/fonts/. Each is a single variable-font file covering its whole
 * weight range, declared with a weight range so specific font-weight values
 * used elsewhere in the CSS resolve to the right instance.
 */
const fraunces = localFont({
  variable: "--font-display-loaded",
  display: "swap",
  src: [
    { path: "../public/fonts/fraunces-variable.woff2", weight: "400 600", style: "normal" },
    { path: "../public/fonts/fraunces-italic-variable.woff2", weight: "400 600", style: "italic" },
  ],
});

const inter = localFont({
  variable: "--font-sans-loaded",
  display: "swap",
  src: [{ path: "../public/fonts/inter-variable.woff2", weight: "300 700", style: "normal" }],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://panelart.in"),
  title: {
    default: "Stoneart — Natural Stone, Reimagined | Panelart Decor",
    template: "%s | Stoneart",
  },
  description:
    "Real natural stone veneer and Poly Stone sheets, thin and flexible, for walls, furniture and curved surfaces. Stoneart by Panelart Decor, Kolkata.",
  openGraph: {
    title: "Stoneart — Flexible Stone Veneer by Panelart Decor",
    description: "Real natural stone veneer and Poly Stone sheets for walls, furniture and curved surfaces.",
    siteName: "Stoneart",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/site/home/hero.webp",
        width: 2400,
        height: 1600,
        alt: "Living room with a warm stone veneer feature wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stoneart — Flexible Stone Veneer by Panelart Decor",
    description: "Real natural stone veneer and Poly Stone sheets for walls, furniture and curved surfaces.",
    images: ["/images/site/home/hero.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-stone-50 font-sans text-stone-900 antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
