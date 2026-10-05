# Stoneart — Website Redesign (v2)

Premium architectural material brand site for **Stoneart** by **Panelart Decor Pvt Ltd**, Kolkata. Built with Next.js (App Router), TypeScript and Tailwind CSS.

This branch (`redesign-v2`) is a ground-up redesign. It does not touch `main`, which still holds the live v1 static site.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css` via `@theme`)
- **Supabase** — `leads` table for the Contact page, `inquiries` table (same one v1 used) for product enquiries

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in the Supabase project URL/anon key (see the team for the real values — they're the same ones used by v1).

```bash
npm run build   # production build
npm run lint     # ESLint
```

## Content architecture — READ THIS BEFORE EDITING CONTENT

All business content lives in `lib/data/`, separate from UI components:

- `lib/data/catalogue.json` + `lib/data/products.ts` — the product catalogue (real data, **generated** — see "Updating the product catalogue" below; don't hand-edit the JSON)
- `lib/data/projects.ts` — project gallery entries (**currently placeholder data**)
- `lib/data/navigation.ts` — global nav + footer structure
- `lib/data/site-settings.ts` — company info, contact details, material disclaimer

## Updating the product catalogue

Products come from the `Product` folder (one level above this repo): the catalogue CSV plus the `Natural Stone` and `Poly Stone` photo folders. To refresh the site after changing them:

```bash
node scripts/import-catalogue.mjs
```

This rewrites `lib/data/catalogue.json` and copies/resizes the photos into `public/images/products/`, and prints a report (products without a photo, photos nobody uses, data it had to normalise). Photos are matched to products by name; anything the CSV can't express — a photo with a different name, a product's photo-to-product pairing for the numbered Poly Stone photos, which products feature on the homepage when none are marked "Yes" — goes in `scripts/catalogue-config.json`.

## Images

Product photography is real (see above). The homepage images and the ten wide page banners come from the `Website Images` folder; refresh them with `node scripts/import-site-images.mjs` (the file list at the top of that script says which image goes where). Anything without a photo yet — the Products pages' banner, project imagery, category tiles — is still a CSS-generated stone-toned placeholder (`components/StoneSwatch.tsx`). A product without a photo falls back to the same placeholder, tinted by its colour family.

## Deployment

Deployed as a **static export** (`output: "export"` in `next.config.ts` — the site has no server-only features, so plain static hosting is enough). Connected to Cloudflare via **Workers Builds** (`wrangler.jsonc`, assets-only Worker serving `out/`), with `redesign-v2` set as the build branch. Build command `npm run build`, deploy command `npx wrangler deploy`. The two `NEXT_PUBLIC_SUPABASE_*` values must be set as build variables in the Cloudflare project settings — Next.js bakes them into the static output at build time.
