# Harry's Coffee Shop — Website

A single-page, fully responsive marketing site for **Harry's Coffee Shop**, Burghfield Common.
Built with **Next.js 16** (App Router) + **React 19** + **Tailwind CSS**, deployed to
**Cloudflare Workers** via the [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter.

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

To check the **production** build on the real Cloudflare `workerd` runtime
(not a plain Node server), use the parity preview — see
[Deployment](#️-deployment--cloudflare-workers-opennextjscloudflare) below:

```bash
npm run dev:preview
```

---

## ☁️ Deployment — Cloudflare Workers (`@opennextjs/cloudflare`)

This project deploys to **Cloudflare Workers** via the OpenNext adapter (not
Vercel, and not Cloudflare *Pages* — see the note at the bottom). The build must
use **webpack**, not Turbopack (`next build --webpack`), because the adapter's
webpack output is what `workerd` loads reliably.

### Scripts

| Script | What it does |
| ------ | ------------ |
| `npm run dev` | Fast local dev (native Next.js + HMR) → http://localhost:3000 |
| `npm run clean` | Purge `.next`, `.open-next`, `.wrangler` (cross-platform, zero-dep) |
| `npm run build:clean` | `clean` → full Cloudflare worker build (webpack) |
| `npm run dev:preview` | `build:clean` → run on the **local `workerd`** runtime for production parity |
| `npm run deploy:prod` | `build:clean` → deploy to Cloudflare Workers |

> **Why every CF script cleans first:** `opennextjs-cloudflare deploy` and
> `preview` do **not** build — they act on whatever is already in `.open-next/`.
> Always rebuilding from a clean slate is what prevents stale "Frankenstein"
> bundles (the `ComponentMod.handler is not a function` / `ChunkLoadError` 500s).
> Stop any running `npm run dev` before `clean`/`deploy:prod` so Windows doesn't
> lock `.next`.

### ✅ Pre-flight checklist (run before `npm run deploy:prod`)

1. **Git is clean & correct branch** — `git status` shows no stray changes; you're on `main`.
2. **Right Cloudflare account** — `npx wrangler whoami`.
3. **Production secrets exist on the Worker** — `npx wrangler secret list`
   → expect `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
   (Set/rotate with `npx wrangler secret put <NAME>`.)
4. **Local runtime parity smoke test** — `npm run dev:preview`, open the
   `workerd` URL Wrangler prints (http://localhost:8787), click through Menu &
   Reviews, and confirm no errors in `npx wrangler tail`.
5. **Confirm it's a webpack build** — the build log says webpack and
   `.next/server/webpack-runtime.js` exists (no `[turbopack]_runtime.js`).
6. **Deploy** — `npm run deploy:prod`.
7. **Post-deploy verification** — `npx wrangler tail` while loading the live URL:
   expect `200`s, and confirm a row lands in the Supabase `website_interactions`
   table when you scroll the Menu/Reviews sections.

### 🔐 Local vs Production configuration (Supabase)

**Use two separate Supabase projects** — e.g. `harrys-dev` and `harrys-prod` —
so a local mistake can never read or write the production database. Keys are
stored in **three physically separate places**, and local files always point at
the **dev** project:

| Context | Command | Where keys come from | Points at |
| ------- | ------- | -------------------- | --------- |
| Native dev | `npm run dev` | `.env.local` | **dev** Supabase |
| Local `workerd` preview | `npm run dev:preview` | `.dev.vars` | **dev** Supabase |
| Production | `npm run deploy:prod` | `wrangler secret put` (encrypted on the Worker) | **prod** Supabase |

```ini
# .env.local      → used by `npm run dev`        (GITIGNORED)
# .dev.vars       → used by `npm run dev:preview` (GITIGNORED)
SUPABASE_URL=https://harrys-dev.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<DEV service-role key>
```

```bash
# Production keys — never in a file, only on the Worker:
npx wrangler secret put SUPABASE_URL                # → https://harrys-prod.supabase.co
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY   # → PROD service-role key
```

> **Rules of thumb**
> - The `service_role` key bypasses Row Level Security — it is **server-only**.
>   Never prefix it with `NEXT_PUBLIC_`, never commit it, never expose it to the client.
> - `npm run dev` reads `.env.local`; `wrangler dev` (used by `dev:preview`)
>   reads `.dev.vars`. They're different files — keep **both**, both with **dev** keys.
> - Both files are already covered by [`.gitignore`](.gitignore).

> **Windows note:** `npm run dev:preview` runs the real `workerd` runtime via
> `wrangler dev`. If it misbehaves on native Windows (path quirks), fall back to
> `npm run dev` for logic and deploy to a **separate staging Worker** for true
> runtime parity rather than fighting the local emulator.

### 📊 First-party analytics

Section views (Menu, Reviews) are logged with the native browser
**IntersectionObserver** → a **Server Action** ([`app/actions.ts`](app/actions.ts))
→ Supabase. No third-party trackers, no cookies. A view is logged **at most once
per section per tab session**, and only after the section dwells in view ~1s
(see [`components/ViewTracker.tsx`](components/ViewTracker.tsx)).

Create the table once per Supabase project (dev **and** prod):

```sql
create table if not exists website_interactions (
  id          bigint generated always as identity primary key,
  section     text        not null,              -- 'menu' | 'reviews'
  event_type  text        not null default 'view',
  session_id  uuid,                              -- per-tab session: uniques & funnels
  created_at  timestamptz not null default now()
);
create index if not exists idx_wi_section_created
  on website_interactions (section, created_at desc);
```

`created_at` is set by Postgres (never trusted from the client). `session_id`
is a client-generated UUID, validated server-side before insert.

### Toward "as seamless as Vercel"

For push-to-deploy automation, connect the repo to **Workers Builds** (Cloudflare's
native Git CI) or add a GitHub Action that runs `npm run deploy:prod` on push to
`main`. Per-PR preview URLs are available via `wrangler versions upload`.

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
