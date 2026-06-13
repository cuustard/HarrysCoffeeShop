import Image from "next/image";
import { business } from "@/lib/site-data";
import DirectionsButton from "./DirectionsButton";

/*
 * HERO
 * Controlled-height banner (min-h-[75vh] max-h-[80vh]) so the white "About"
 * card peeks above the fold as a scroll cue.
 *
 * The background is built from three stacked layers:
 *   1. solid navy base (fallback + colour anchor)
 *   2. the Facebook banner pattern (next/image, priority-loaded as the LCP) —
 *      softened with opacity + a light blur so the pink flowers / croissants
 *      blend into the navy sketches instead of reading as floating stickers
 *   3. a left→right navy vignette so the white text stays high-contrast
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[75vh] max-h-[80vh] items-center overflow-hidden bg-navy"
    >
      {/* Layer 2 — softened pattern. scale-110 hides the blurred edges.
          `priority` preloads it as the Largest Contentful Paint element. */}
      <Image
        src="/banner.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover object-center opacity-60 blur-[2px]"
      />

      {/* Layer 3 — navy vignette for text contrast (darkest on the left). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[rgba(10,20,60,0.92)] via-[rgba(10,20,60,0.72)] to-[rgba(10,20,60,0.20)]"
      />

      {/* Content */}
      <div className="container-px relative py-16 text-white sm:py-20">
        <div className="max-w-2xl animate-fade-up">
          <p className="heading-cursive mb-3 text-3xl text-pink-400 sm:text-4xl">
            Welcome to Harry&apos;s Coffee Shop
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {business.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">
            {business.blurb}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#menu" className="btn-primary px-8 py-3.5 text-base">
              View Today&apos;s Specials
            </a>
            <DirectionsButton className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/0 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-navy">
              Get Directions
            </DirectionsButton>
          </div>
        </div>
      </div>
    </section>
  );
}
