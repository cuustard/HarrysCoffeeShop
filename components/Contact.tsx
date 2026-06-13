import { business } from "@/lib/site-data";
import OpeningHours from "./OpeningHours";
import {
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  FacebookIcon,
  InstagramIcon,
  GlobeIcon,
} from "./icons";

// Keyless Google Maps embed built from the address.
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  business.address.full
)}&output=embed`;

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  business.address.full
)}`;

/*
 * VISIT US (Contact / Local SEO).
 * Left: embedded Google Map.  Right: contact details + opening hours.
 */
export default function Contact() {
  return (
    <section id="contact" className="bg-blush py-20 sm:py-28">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Come say hello</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Visit <span className="heading-cursive text-4xl text-pink-dark sm:text-5xl">Us</span>
          </h2>
          <p className="mt-4 text-navy/70">
            Find us on Reading Road in Burghfield — there&apos;s always a warm
            welcome (and a great coffee) waiting.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left — Google Map embed */}
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <iframe
              title={`Map showing the location of ${business.name}`}
              src={mapEmbedSrc}
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Right — details + hours */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl bg-white p-7 shadow-soft">
              <h3 className="heading-cursive text-3xl">{business.name}</h3>

              <ul className="mt-5 space-y-4 text-navy/80">
                <li className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-pink-dark" />
                  <span>
                    {business.address.line1}
                    <br />
                    {business.address.line2}
                    <br />
                    {business.address.postcode}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <MailIcon className="h-5 w-5 shrink-0 text-pink-dark" />
                  <a
                    href={`mailto:${business.email}`}
                    className="transition hover:text-pink-dark"
                  >
                    {business.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 shrink-0 text-pink-dark" />
                  <a
                    href={`tel:${business.phoneHref}`}
                    className="transition hover:text-pink-dark"
                  >
                    {business.phone}
                  </a>
                </li>
              </ul>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={business.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Harry's Coffee Shop on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition hover:bg-pink"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={business.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Harry's Coffee Shop on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition hover:bg-pink"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={business.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Harry's Coffee Shop website"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition hover:bg-pink"
                >
                  <GlobeIcon className="h-5 w-5" />
                </a>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary ml-auto"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Dynamic opening hours component */}
            <OpeningHours />
          </div>
        </div>
      </div>
    </section>
  );
}
