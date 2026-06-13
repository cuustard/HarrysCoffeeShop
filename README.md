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
| Phone number               | `business.phone` / `business.phoneHref` in `site-data.ts`   |
| Email / address            | `business` object in `site-data.ts`                         |
| Social media links         | `business.socials` in `site-data.ts`                        |
| Menu items & prices        | `menu` array in `site-data.ts`                              |
| Reviews                    | `reviews` array in `site-data.ts`                           |
| Opening hours              | `openingHours` array in `site-data.ts`                      |
| Photos (hero / about)      | Unsplash placeholder URLs in `components/Hero.tsx` & `About.tsx` |
| Footer credit `[Your Name]`| `components/Footer.tsx`                                      |

### Placeholders to replace

- **Phone number** is a placeholder (`0118 000 0000`).
- **Photos** use Unsplash stock placeholders — swap in real shop photos.
- **Social links** point to the platform home pages — update with the real profiles.
- **`[Your Name]`** in the footer credit.

---

## 🕒 Dynamic opening hours

The **WE ARE OPEN / CLOSED NOW** badge in the _Visit Us_ section is computed
live from the **current UK time** (`Europe/London`), independent of the
visitor's own timezone. See [`components/OpeningHours.tsx`](components/OpeningHours.tsx).
It re-checks every minute and highlights today's row. Change the hours in
`lib/site-data.ts` and the logic adapts automatically.

---

## 🗂️ Project structure

```
app/
  layout.tsx        Fonts (Inter + Pacifico), <html> shell, SEO metadata
  page.tsx          Composes all sections in order
  globals.css       Tailwind layers + reusable button/utility classes
components/
  Navbar.tsx        Sticky nav + mobile menu (client component)
  Hero.tsx          Full-width hero with CTAs
  About.tsx         Two-column about
  Menu.tsx          Card-based menu snapshot
  Reviews.tsx       Customer review grid
  Contact.tsx       Map embed + contact details + opening hours
  OpeningHours.tsx  Dynamic open/closed badge (client component)
  Footer.tsx        Navy footer
  icons.tsx         Inline SVG icons (no icon library needed)
lib/
  site-data.ts      ← All editable content lives here
tailwind.config.ts  Brand colours + fonts
```

---

© 2026 Harry's Coffee Shop.
