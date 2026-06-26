import Link from "next/link";
import { menu, type MenuCategory } from "@/lib/site-data";

/*
 * Home-page MENU TEASER.
 * The full menu lives at /menu (its own SEO page). Here we show a few signature
 * categories as a taste, then link through. Analytics for "menu" engagement now
 * live on the /menu page itself.
 */
const HIGHLIGHT_CATEGORIES = [
  "Our Famous Coffee",
  "Breakfast & Brunch",
  "Smoothies",
];

export default function Menu() {
  // Pull the highlighted categories from the real menu data (skip any that
  // get renamed/removed, so this never breaks).
  const highlights = HIGHLIGHT_CATEGORIES.map((name) =>
    menu.find((c) => c.category === name),
  ).filter((c): c is MenuCategory => Boolean(c));

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-blush py-14 sm:py-16"
    >
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Something for everyone</p>
          <h2
            id="menu-heading"
            className="mt-3 text-3xl font-extrabold sm:text-4xl"
          >
            Our{" "}
            <span className="heading-cursive text-4xl text-pink-600 sm:text-5xl">
              Menu
            </span>
          </h2>
          <p className="mt-4 text-navy/80">
            From our famous coffee to bagels, smoothies, breakfasts and freshly
            baked cakes — here&apos;s just a taste.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((cat) => (
            <div
              key={cat.category}
              className="flex flex-col rounded-3xl bg-white p-6 shadow-soft"
            >
              <h3 className="border-b-2 border-pink-600/30 pb-3 text-lg font-bold text-navy">
                {cat.category}
              </h3>
              <ul className="mt-4 space-y-3">
                {cat.items.slice(0, 4).map((item, i) => (
                  <li
                    key={`${item.name}-${i}`}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-navy/80">{item.name}</span>
                    {item.price && (
                      <>
                        <span className="mx-1 flex-1 border-b border-dotted border-navy/20" />
                        <span className="shrink-0 font-semibold text-pink-700">
                          {item.price}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/menu" className="btn-primary px-8 py-3.5 text-base">
            View the full menu
          </Link>
        </div>
      </div>
    </section>
  );
}
