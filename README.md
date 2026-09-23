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

- `lib/data/products.ts` — the full product catalogue (**currently placeholder data** — see the file header comment)
- `lib/data/projects.ts` — project gallery entries (**currently placeholder data**)
- `lib/data/navigation.ts` — global nav + footer structure
- `lib/data/site-settings.ts` — company info, contact details, material disclaimer

To replace the placeholder catalogue with the real product list, edit `lib/data/products.ts` only — no component code should need to change, as long as the new data matches the `Product` shape in `lib/types.ts`.

## Images

No stock or competitor imagery is used anywhere. Every "photo" on the site is a CSS/SVG-generated stone-toned placeholder (`components/StoneSwatch.tsx`), driven by a `tone` + `alt` prop on each data entry. Swap in real photography by replacing `StoneSwatch` usages with `next/image` once approved assets exist — the data layer already carries `alt` text for every image slot.

## Deployment

Deployed as a **static export** (`output: "export"` in `next.config.ts` — the site has no server-only features, so plain static hosting is enough). Connected to Cloudflare via **Workers Builds** (`wrangler.jsonc`, assets-only Worker serving `out/`), with `redesign-v2` set as the build branch. Build command `npm run build`, deploy command `npx wrangler deploy`. The two `NEXT_PUBLIC_SUPABASE_*` values must be set as build variables in the Cloudflare project settings — Next.js bakes them into the static output at build time.
