import { menu } from "@/lib/site-data";
import ViewTracker from "@/components/ViewTracker";

/** Turn a category title into a stable URL-fragment id (e.g. "Iced Tea" → "iced-tea"). */
function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Quick-jump chips for the mobile/tablet view, where the single-column menu
 * gets long. Each links to a representative category card by id.
 */
const quickNav: { label: string; target: string }[] = [
  { label: "Coffee", target: slugify("Our Famous Coffee") },
  { label: "Tea", target: slugify("Tea") },
  { label: "Cold Drinks", target: slugify("Iced Tea") },
  { label: "Breakfast", target: slugify("Breakfast & Brunch") },
  { label: "Bagels", target: slugify("Bagels") },
  { label: "Bakery", target: slugify("Pastries") },
];

export default function Menu() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-blush py-14 sm:py-16"
    >
      {/* First-party analytics: logs a Supabase view when this section is seen. */}
      <ViewTracker section="menu" />

      {/* Sticky category quick-nav — mobile & tablet only (masonry is easy to scan on desktop). */}
      <nav
        aria-label="Jump to menu category"
        className="sticky top-0 z-10 border-b border-pink-600/10 bg-blush/85 backdrop-blur lg:hidden"
      >
        <div className="container-px">
          <ul className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none]">
            {quickNav.map((chip) => (
              <li key={chip.target}>
                <a
                  href={`#${chip.target}`}
                  className="inline-block whitespace-nowrap rounded-full border border-pink-600/30 bg-white px-4 py-1.5 text-sm font-semibold text-pink-700 shadow-soft transition hover:bg-pink-600 hover:text-white"
                >
                  {chip.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Something for everyone</p>
          <h2 id="menu-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Our <span className="heading-cursive text-4xl text-pink-600 sm:text-5xl">Menu</span>
          </h2>
          <p className="mt-4 text-navy/80">
            Freshly made, locally loved — from our famous coffee to bagels,
            smoothies and everything in between.
          </p>
        </div>

        <div className="mt-8 columns-1 gap-6 md:columns-2 lg:columns-3">
          {menu.map((cat) => (
            <div
              key={cat.category}
              id={slugify(cat.category)}
              className="mb-6 flex scroll-mt-32 break-inside-avoid flex-col rounded-3xl bg-white p-6 shadow-soft transition hover:-translate-y-1 lg:scroll-mt-24"
            >
              <div className="flex items-baseline justify-between gap-2 border-b-2 border-pink-600/30 pb-3">
                <h3 className="text-lg font-bold text-navy">{cat.category}</h3>
                {cat.priceNote && (
                  <span className="shrink-0 text-sm font-semibold text-pink-700">
                    {cat.priceNote}
                  </span>
                )}
              </div>
              <ul className="mt-4 space-y-3">
                {cat.items.map((item, i) => (
                  <li key={`${item.name}-${i}`} className="text-sm">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-navy/80">{item.name}</span>
                      {item.price && (
                        <>
                          <span className="mx-1 flex-1 border-b border-dotted border-navy/20" />
                          <span className="shrink-0 font-semibold text-pink-700">
                            {item.price}
                          </span>
                        </>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-0.5 text-xs text-navy/50">{item.description}</p>
                    )}
                    {item.addOns && (
                      <p className="mt-1 text-xs font-medium text-pink-700/80">{item.addOns}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm italic text-navy/80">
          If you have a food allergy or dietary requirement, please inform your server.
        </p>
      </div>
    </section>
  );
}
