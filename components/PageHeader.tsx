import type { ReactNode } from "react";

/*
 * Reusable header band for inner pages (Menu, Team, Events…).
 * Owns the page's single <h1>. `highlight` renders in the cursive brand font,
 * matching the section headings on the home page.
 */
export default function PageHeader({
  eyebrow,
  title,
  highlight,
  intro,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  intro?: ReactNode;
}) {
  return (
    <section className="border-b border-blush bg-blush py-16 sm:py-20">
      <div className="container-px mx-auto max-w-2xl text-center">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
          {highlight && (
            <>
              {" "}
              <span className="heading-cursive text-4xl text-pink-600 sm:text-5xl">
                {highlight}
              </span>
            </>
          )}
        </h1>
        {intro && <p className="mt-4 text-lg text-navy/80">{intro}</p>}
      </div>
    </section>
  );
}
