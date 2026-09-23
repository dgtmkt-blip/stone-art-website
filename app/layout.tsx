import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";
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
    "Stoneart by Panelart Decor — natural stone veneer and engineered poly stone surfaces for architects, designers and builders. Thin, flexible, architectural.",
  openGraph: {
    title: "Stoneart — Natural Stone, Reimagined",
    description:
      "Natural stone veneer and engineered poly stone surfaces for architecture and interiors.",
    siteName: "Stoneart",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stoneart — Natural Stone, Reimagined",
    description:
      "Natural stone veneer and engineered poly stone surfaces for architecture and interiors.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-stone-50 font-sans text-stone-900 antialiased">
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
