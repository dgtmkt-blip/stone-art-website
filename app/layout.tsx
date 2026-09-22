import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
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
