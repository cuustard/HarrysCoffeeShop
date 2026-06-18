import Image from "next/image";
import { PawIcon, WifiIcon } from "./icons";

/*
 * ABOUT US — two-column layout.
 * Left: photo of the team / floral wall (placeholder).
 * Right: filler copy (meant to be replaced by the owner).
 */
export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white py-20 sm:py-28"
    >
      <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — image placeholder */}
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-blush shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80"
              alt="The team behind Harry's Coffee Shop in front of the floral wall"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Floating accent card */}
          <div className="absolute -bottom-5 -right-3 hidden rotate-3 rounded-2xl bg-pink-600 px-6 py-4 text-white shadow-soft sm:block">
            <p className="heading-cursive text-2xl text-white">Family run</p>
            <p className="text-xs font-medium text-white/90">since day one</p>
          </div>
        </div>

        {/* Right — copy */}
        <div>
          <p className="eyebrow">About Us</p>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl"
          >
            A warm welcome for the whole community
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-navy/90">
            Family-run and proudly local. We serve up amazing coffee, great
            food, and good vibes in the heart of Burghfield. Bring the family,
            your laptop, or the dog — everyone&apos;s welcome here.
          </p>

          {/* Quick highlight chips */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-sm font-semibold text-navy">
              <PawIcon className="h-4 w-4 text-pink-600" /> Dog Friendly
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-sm font-semibold text-navy">
              <WifiIcon className="h-4 w-4 text-pink-600" /> Free WiFi
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-sm font-semibold text-navy">
              ☕ Specialty Coffee
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-sm font-semibold text-navy">
              🌸 Outdoor Seating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
