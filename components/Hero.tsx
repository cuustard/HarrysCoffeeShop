import { business } from "@/lib/site-data";

// Google Maps "directions to" link built from the shop address.
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  business.address.full
)}`;

/*
 * HERO
 * Full-width banner. The background is a stock cafe photo (swap the URL for
 * a real photo of the shop). A navy gradient is layered *underneath* the photo
 * as a fallback + over it for text contrast, so the section always looks good.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center bg-navy bg-cover bg-center"
      style={{
        backgroundImage:
          // 1) dark gradient for text contrast  2) placeholder photo
          "linear-gradient(180deg, rgba(30,58,138,0.55) 0%, rgba(30,58,138,0.75) 100%), url('https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="container-px py-24 text-white sm:py-32">
        <div className="max-w-2xl animate-fade-up">
          <p className="heading-cursive mb-3 text-3xl text-pink sm:text-4xl">
            Welcome to Harry&apos;s
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
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white/0 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-navy"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
