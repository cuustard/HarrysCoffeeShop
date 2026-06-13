import { business } from "@/lib/site-data";
import OpeningHours from "./OpeningHours";
import DirectionsButton from "./DirectionsButton";
import {
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  FacebookIcon,
  InstagramIcon,
} from "./icons";

// Official Google Maps embed for Harry's verified listing
// (from Maps → Share → Embed a map).
const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.1267196084054!2d-1.0561631226469759!3d51.40072627178916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48769f80c9dca72b%3A0x1b63eb32bcf25288!2sHarry's%20Coffee%20Shop!5e0!3m2!1sen!2suk!4v1781365032516!5m2!1sen!2suk";

/*
 * VISIT US (Contact / Local SEO).
 * Left: embedded Google Map.  Right: contact details + opening hours.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-blush py-20 sm:py-28"
    >
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Come say hello</p>
          <h2 id="contact-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Visit <span className="heading-cursive text-4xl text-pink-600 sm:text-5xl">Us</span>
          </h2>
          <p className="mt-4 text-navy/80">
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

              <ul className="mt-5 space-y-4 text-slate-900">
                <li className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />
                  <span>
                    {business.address.line1}
                    <br />
                    {business.address.line2}
                    <br />
                    {business.address.postcode}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <MailIcon className="h-5 w-5 shrink-0 text-pink-600" />
                  <a
                    href={`mailto:${business.email}`}
                    className="transition hover:text-pink-600"
                  >
                    {business.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon className="h-5 w-5 shrink-0 text-pink-600" />
                  <a
                    href={`tel:${business.phoneHref}`}
                    className="transition hover:text-pink-600"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition hover:bg-pink-600"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a
                  href={business.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Harry's Coffee Shop on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition hover:bg-pink-600"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <DirectionsButton className="btn-primary ml-auto">
                  Get Directions
                </DirectionsButton>
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
