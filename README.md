# Harry's Coffee Shop — Website

A single-page, fully responsive marketing site for **Harry's Coffee Shop**, Burghfield Common.
Built with **Next.js 14** (App Router) + **Tailwind CSS**, ready to deploy on **Vercel's free tier**.

> Aesthetic: _Instagrammable Floral Village Cafe_ — Crisp White & Soft Blush
> backgrounds, Deep Navy text/nav/footer, Neon Pink accents, and a playful
> cursive (Pacifico) for highlight headers to mimic the logo.

---

## 🚀 Quick start (local)

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

To check the production build locally:

```bash
npm run build
npm run start
```

---

## ☁️ Deploy to Vercel

1. Push this folder to a new **GitHub** repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**. No env vars needed.

Every `git push` to `main` redeploys automatically.

---

## ✏️ What to edit before launch

Almost all content lives in one file: [`lib/site-data.ts`](lib/site-data.ts).

| Want to change…            | Edit                                                        |
| -------------------------- | ----------------------------------------------------------- |
| Phone / email / address    | `business` object in `site-data.ts`                         |
| Production domain (SEO)    | `business.url` in `site-data.ts`                            |
| Social media links         | `business.socials` in `site-data.ts`                        |
| Menu items & prices        | `menu` array in `site-data.ts`                              |
| Reviews                    | `reviews` array in `site-data.ts`                           |
| Opening hours              | `openingHours` array in `site-data.ts`                      |
| Hero banner image          | `public/banner.jpg`                                         |
| About photo                | Unsplash placeholder URL in `components/About.tsx`          |
| Footer credit `[Your Name]`| `components/Footer.tsx`                                      |

### Placeholders to replace

- **`business.url`** in `site-data.ts` — set to the final domain before launch
  (it drives the canonical URL, Open Graph tags, sitemap and robots.txt).
- **About photo** still uses an Unsplash stock placeholder — swap in a real shop photo.
- **`[Your Name]`** in the footer credit.

---

## 🕒 Dynamic opening hours

The **WE ARE OPEN / CLOSED NOW** badge in the _Visit Us_ section is computed
live from the **current UK time** (`Europe/London`), independent of the
visitor's own timezone. See [`components/OpeningHours.tsx`](components/OpeningHours.tsx).
It re-checks every minute and highlights today's row. Change the hours in
`lib/site-data.ts` and the logic adapts automatically.

---

## 🔍 SEO

Built for local search ("coffee shop near me", "café Burghfield Common"):

- **Rich metadata** — keyword + location title, 155-char description, canonical
  URL, Open Graph + Twitter cards (using `public/banner.jpg`), theme colour.
  All in [`app/layout.tsx`](app/layout.tsx), driven by `business.url`.
- **JSON-LD structured data** — a `CafeOrCoffeeShop` schema in
  [`components/StructuredData.tsx`](components/StructuredData.tsx) with the name,
  address, **geo-coordinates**, phone, **opening hours**, price range, menu,
  amenities (dog friendly, WiFi, outdoor seating) and social profiles. This is
  what powers Google's "open now" badge and the Maps knowledge panel. It stays
  in sync with `site-data.ts` automatically.
- **`/robots.txt`** and **`/sitemap.xml`** — generated at build time from
  [`app/robots.ts`](app/robots.ts) and [`app/sitemap.ts`](app/sitemap.ts).
- **Semantic HTML & a11y** — one `<h1>`, section `<h2>`s with
  `aria-labelledby`, landmark elements, alt/aria text on all imagery and icons.

### Two things to finish for full SEO

1. **Set `business.url`** to the real domain (see above) — everything else
   derives from it.
2. **Add a favicon / icons.** Drop these files into the `app/` folder and
   Next.js wires them automatically (no code needed):
   - `app/favicon.ico` (browser tab)
   - `app/icon.png` (512×512, modern browsers)
   - `app/apple-icon.png` (180×180, iOS home screen)

   _(These are image files, so they couldn't be generated in-code — export them
   from the logo.)_

> **Note on review stars in search:** review/`aggregateRating` schema was
> intentionally left out. Google's policy only permits it for ratings genuinely
> collected and shown by the site itself; self-applied star markup risks a
> manual penalty. The real Google reviews already carry their own rich results
> on Google's side.

After deploying, validate with the
[Rich Results Test](https://search.google.com/test/rich-results) and submit the
sitemap in [Google Search Console](https://search.google.com/search-console).

---

## 🗂️ Project structure

```
app/
  layout.tsx          Fonts (Inter + Pacifico), <html> shell, SEO metadata + viewport
  page.tsx            Composes all sections in order
  globals.css         Tailwind layers + reusable button/utility classes
  robots.ts           Generates /robots.txt
  sitemap.ts          Generates /sitemap.xml
components/
  Navbar.tsx          Sticky nav + mobile menu (client component)
  Hero.tsx            Full-width hero with CTAs
  About.tsx           Two-column about
  Menu.tsx            Card-based menu snapshot
  Reviews.tsx         Customer review grid
  Contact.tsx         Map embed + contact details + opening hours
  OpeningHours.tsx    Dynamic open/closed badge (client component)
  DirectionsButton.tsx  Platform-aware Get Directions (Apple Maps on iOS)
  StructuredData.tsx  JSON-LD CafeOrCoffeeShop schema (local SEO)
  Footer.tsx          Navy footer
  icons.tsx           Inline SVG icons (no icon library needed)
lib/
  site-data.ts        ← All editable content lives here
public/
  banner.jpg          Hero background (the shop's Facebook banner)
tailwind.config.ts    Brand colours + fonts
```

---

© 2026 Harry's Coffee Shop.
