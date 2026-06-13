import { PawIcon, WifiIcon } from "./icons";

/*
 * ABOUT US — two-column layout.
 * Left: photo of the team / floral wall (placeholder).
 * Right: filler copy (meant to be replaced by the owner).
 */
export default function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — image placeholder */}
        <div className="relative">
          <div
            className="aspect-[4/3] w-full rounded-3xl bg-blush bg-cover bg-center shadow-soft"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80')",
            }}
            role="img"
            aria-label="The team behind Harry's Coffee Shop in front of the floral wall"
          />
          {/* Floating accent card */}
          <div className="absolute -bottom-5 -right-3 hidden rotate-3 rounded-2xl bg-pink px-6 py-4 text-white shadow-soft sm:block">
            <p className="heading-cursive text-2xl text-white">Family run</p>
            <p className="text-xs font-medium text-white/90">since day one</p>
          </div>
        </div>

        {/* Right — copy */}
        <div>
          <p className="eyebrow">About Us</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            A warm welcome for the whole community
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-navy/80">
            We are a family-run coffee shop in Burghfield serving up amazing
            coffee, great food, and good vibes. Whether you are bringing the
            family, working remotely, or coming with your dog (we are dog
            friendly!), we pride ourselves on being a welcoming meeting spot for
            the community.
          </p>

          {/* Quick highlight chips */}
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-sm font-semibold text-navy">
              <PawIcon className="h-4 w-4 text-pink-dark" /> Dog Friendly
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-sm font-semibold text-navy">
              <WifiIcon className="h-4 w-4 text-pink-dark" /> Free WiFi
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
