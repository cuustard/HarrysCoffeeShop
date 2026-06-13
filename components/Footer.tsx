import { business } from "@/lib/site-data";
import {
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
} from "./icons";

/*
 * FOOTER — Deep Navy background, white text.
 * Repeats the address, social links and copyright.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="container-px grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="heading-cursive text-4xl text-white">Harry&apos;s</p>
          <p className="mt-4 text-xs font-semibold uppercase leading-none tracking-[0.3em] text-white/70">
            Coffee Shop
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            Family run coffee shop in Burghfield Common. Specialty coffee,
            banging breakfasts and good vibes.
          </p>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-pink-300">
            Find Us
          </h4>
          <p className="mt-4 flex items-start gap-3 text-sm text-white/80">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-pink-300" />
            <span>{business.address.full}</span>
          </p>
          <a
            href={`mailto:${business.email}`}
            className="mt-3 block text-sm text-white/80 transition hover:text-pink-300"
          >
            {business.email}
          </a>
          <a
            href={`tel:${business.phoneHref}`}
            className="mt-1 block text-sm text-white/80 transition hover:text-pink-300"
          >
            {business.phone}
          </a>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-pink-300">
            Follow Along
          </h4>
          <div className="mt-4 flex gap-3">
            <a
              href={business.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-pink-600"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={business.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-pink-600"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-6 text-center text-xs text-white/60 sm:flex-row sm:text-left">
          <p>© {year} Harry&apos;s Coffee Shop. All rights reserved.</p>
          {/* Replace [Your Name] with your name/agency before launch. */}
          <p>Local site build by [Your Name].</p>
        </div>
      </div>
    </footer>
  );
}
