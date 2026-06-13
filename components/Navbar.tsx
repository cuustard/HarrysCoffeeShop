"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blush bg-white/90 backdrop-blur">
      <nav className="container-px flex h-16 items-center justify-between">
        {/* Cursive text logo (Deep Navy) */}
        <a
          href="#top"
          className="flex flex-col leading-none"
          aria-label="Harry's Coffee Shop — back to top"
        >
          <span className="heading-cursive text-3xl">Harry&apos;s</span>
          <span className="mt-3 text-[0.6rem] font-semibold uppercase leading-none tracking-[0.3em] text-navy/80">
            Coffee Shop
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-navy transition hover:text-pink-600"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary">
            Find Us
          </a>
        </div>

        {/* Mobile hamburger / close toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-blush bg-white md:hidden">
          <div className="container-px flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-semibold text-navy transition hover:bg-blush"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Find Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
