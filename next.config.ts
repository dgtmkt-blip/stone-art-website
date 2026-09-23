import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site (no cookies, route handlers, server actions, or ISR
  // anywhere in this app) — deploys as plain HTML/CSS/JS to Cloudflare Pages,
  // same zero-config hosting model as v1 used.
  output: "export",
  // Static export can't use the default Image Optimization API (it needs a
  // server). Our logo files are small, fixed-size local assets, so serving
  // them unoptimized costs nothing in practice.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
