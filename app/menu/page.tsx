import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import MenuList from "@/components/MenuList";
import ViewTracker from "@/components/ViewTracker";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full menu at Harry's Coffee Shop, Burghfield Common — our famous coffee, teas, hot chocolate, smoothies, milkshakes, breakfast & brunch, bagels, soup, kids meals and freshly baked cakes.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: `Menu | ${business.name}`,
    description:
      "Coffee, brunch, bagels, smoothies and freshly baked cakes in Burghfield Common.",
    url: "/menu",
    type: "website",
  },
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Freshly made, locally loved"
        title="Our"
        highlight="Menu"
        intro="Everything is made fresh daily. Prices are a guide and may change — check our socials for weekly specials."
      />

      <div className="bg-blush pb-16 sm:pb-20">
        {/* First-party analytics: logs a "menu" view when the menu is seen. */}
        <ViewTracker section="menu" />

        <MenuList />

        {/* Allergen note + route back to opening hours / location */}
        <div className="container-px">
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-7 text-center shadow-soft">
            <p className="text-sm text-navy/80">
              If you have a food allergy or dietary requirement, please inform a
              member of the team — we&apos;re always happy to help.
            </p>
            <Link
              href="/#contact"
              className="btn-primary mt-5 px-8 py-3.5 text-base"
            >
              Find Us &amp; Opening Hours
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
