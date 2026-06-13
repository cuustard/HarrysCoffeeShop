import { menu } from "@/lib/site-data";

/*
 * MENU SNAPSHOT — card-based layout, one card per category.
 * This is intentionally a *sample*, not the full menu.
 */
export default function Menu() {
  return (
    <section id="menu" className="bg-blush py-20 sm:py-28">
      <div className="container-px">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">A little taste</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Our <span className="heading-cursive text-4xl text-pink-dark sm:text-5xl">Menu</span>
          </h2>
          <p className="mt-4 text-navy/70">
            Freshly made, locally loved. Here&apos;s a quick taste of what we
            serve up every day.
          </p>
        </div>

        {/* Category cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menu.map((cat) => (
            <div
              key={cat.category}
              className="flex flex-col rounded-3xl bg-white p-6 shadow-soft transition hover:-translate-y-1"
            >
              <h3 className="border-b-2 border-pink/30 pb-3 text-lg font-bold text-navy">
                {cat.category}
              </h3>
              <ul className="mt-4 space-y-3">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-navy/80">{item.name}</span>
                    {/* dotted leader between name and price */}
                    <span className="mx-1 flex-1 border-b border-dotted border-navy/20" />
                    <span className="font-semibold text-pink-dark">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-center text-sm italic text-navy/60">
          This is a sample menu. Check our socials for weekly specials.
        </p>
      </div>
    </section>
  );
}
