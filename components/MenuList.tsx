import { menu } from "@/lib/site-data";

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
  { label: "Hot Choc", target: slugify("Hot Chocolate") },
  { label: "Smoothies", target: slugify("Smoothies") },
  { label: "Breakfast", target: slugify("Breakfast & Brunch") },
  { label: "Bagels", target: slugify("Bagels") },
  { label: "Bakery", target: slugify("Pastries") },
];

/**
 * The full menu, rendered from `site-data.menu` (the single source of truth).
 * Used by the /menu page. Category headings are <h2> (the page's <h1> is the
 * PageHeader). Masonry columns keep the long list scannable on desktop.
 */
export default function MenuList() {
  return (
    <>
      {/* Sticky category quick-nav — mobile & tablet only. Sits just below the
          sticky navbar (top-16); the desktop masonry is easy to scan without it. */}
      <nav
        aria-label="Jump to menu category"
        className="sticky top-16 z-30 border-b border-pink-600/10 bg-blush/85 backdrop-blur lg:hidden"
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

      <div className="container-px pt-10">
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {menu.map((cat) => (
            <div
              key={cat.category}
              id={slugify(cat.category)}
              className="mb-6 flex scroll-mt-32 break-inside-avoid flex-col rounded-3xl bg-white p-6 shadow-soft transition hover:-translate-y-1 lg:scroll-mt-24"
            >
              <div className="flex items-baseline justify-between gap-2 border-b-2 border-pink-600/30 pb-3">
                <h2 className="text-lg font-bold text-navy">{cat.category}</h2>
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
                      <p className="mt-0.5 text-xs text-navy/80">{item.description}</p>
                    )}
                    {item.addOns && (
                      <p className="mt-1 text-xs font-medium text-pink-700/80">
                        {item.addOns}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
