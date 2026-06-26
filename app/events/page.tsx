import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { events, type CafeEvent } from "@/lib/events";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "What's On",
  description:
    "Events at Harry's Coffee Shop in Burghfield Common — live music nights, kids' craft mornings, coffee tastings, dog-friendly brunch clubs and more.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: `What's On | ${business.name}`,
    description: "Events at Harry's Coffee Shop in Burghfield Common.",
    url: "/events",
    type: "website",
  },
};

// Re-evaluate event status periodically so "today"/"this week"/"past" stay
// correct without a manual redeploy, while keeping the page cached/fast.
export const revalidate = 3600;

const MS_PER_DAY = 86_400_000;

const longDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const shortMonth = new Intl.DateTimeFormat("en-GB", { month: "short" });

/** Parse an ISO date as local midnight (avoids timezone off-by-one). */
function parseDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

function startOfToday(): Date {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

type EventStatus = { label: string; isPast: boolean };

/**
 * A friendly, granular status for the sticker, e.g. Today!, This week,
 * Next month, Past. Handles multi-day events (ongoing → "On now").
 */
function getEventStatus(event: CafeEvent, today: Date): EventStatus {
  const start = parseDate(event.date);
  const end = parseDate(event.endDate ?? event.date);

  if (end < today) return { label: "Past", isPast: true };

  const daysToStart = Math.round(
    (start.getTime() - today.getTime()) / MS_PER_DAY,
  );

  if (daysToStart <= 0) {
    // Starts today, or started earlier and is still running.
    return { label: daysToStart === 0 ? "Today!" : "On now", isPast: false };
  }
  if (daysToStart === 1) return { label: "Tomorrow", isPast: false };
  if (daysToStart <= 7) return { label: "This week", isPast: false };

  const firstOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const firstOfMonthAfter = new Date(today.getFullYear(), today.getMonth() + 2, 1);
  if (start < firstOfNextMonth) return { label: "This month", isPast: false };
  if (start < firstOfMonthAfter) return { label: "Next month", isPast: false };
  return { label: "Upcoming", isPast: false };
}

export default function EventsPage() {
  const today = startOfToday();

  const byDateAsc = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = byDateAsc.filter(
    (e) => parseDate(e.endDate ?? e.date) >= today,
  );
  // Past events are shown after upcoming ones, most-recent first.
  const past = byDateAsc
    .filter((e) => parseDate(e.endDate ?? e.date) < today)
    .reverse();
  const displayed = [...upcoming, ...past];

  // schema.org Event markup — upcoming events only (rich results in Google).
  const eventsJsonLd = upcoming.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.date,
    endDate: e.endDate ?? e.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: e.description,
    location: {
      "@type": "Place",
      name: business.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.street,
        addressLocality: business.address.locality,
        addressRegion: business.address.region,
        postalCode: business.address.postcode,
        addressCountry: business.address.country,
      },
    },
    organizer: {
      "@type": "Organization",
      name: business.name,
      url: business.url,
    },
  }));

  return (
    <>
      {upcoming.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
        />
      )}

      <PageHeader
        eyebrow="What's on at Harry's"
        title="Our"
        highlight="Events"
        intro="From live music to coffee tastings, there's always something happening. Here's what's coming up — and what we've recently been up to."
      />

      <div className="bg-white py-16 sm:py-20">
        <div className="container-px mx-auto max-w-3xl">
          {displayed.length === 0 ? (
            // Graceful empty state
            <div className="rounded-3xl bg-blush p-10 text-center">
              <p className="heading-cursive text-3xl text-pink-700">
                Nothing on the calendar right now
              </p>
              <p className="mx-auto mt-3 max-w-md text-navy/80">
                We&apos;re busy planning our next get-together. Follow us on
                social media to be the first to know what&apos;s coming up.
              </p>
              <a
                href={business.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 px-8 py-3.5 text-base"
              >
                Follow us on Instagram
              </a>
            </div>
          ) : (
            <ul className="space-y-7">
              {displayed.map((event) => {
                const start = parseDate(event.date);
                const status = getEventStatus(event, today);
                return (
                  <li
                    key={event.id}
                    className={`relative flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-blush sm:flex-row sm:items-start sm:p-7 ${
                      status.isPast ? "opacity-80" : ""
                    }`}
                  >
                    {/* Status sticker — styled like the "Family run" sticker */}
                    <span
                      className={`absolute -top-3 right-5 rotate-3 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wide shadow-soft ${
                        status.isPast
                          ? "bg-navy text-white"
                          : "bg-pink-600 text-white"
                      }`}
                    >
                      {status.label}
                    </span>

                    {/* Date chip */}
                    <div className="flex shrink-0 flex-row items-center gap-3 sm:w-24 sm:flex-col sm:gap-0 sm:rounded-2xl sm:bg-blush sm:py-4">
                      <span
                        className={`text-4xl font-extrabold leading-none ${
                          status.isPast ? "text-navy/40" : "text-pink-700"
                        }`}
                      >
                        {start.getDate()}
                      </span>
                      <span className="text-sm font-semibold uppercase tracking-wide text-navy/80">
                        {shortMonth.format(start)} {start.getFullYear()}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-navy">
                        {event.title}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-navy/80">
                        <time dateTime={event.date}>
                          {longDate.format(start)}
                        </time>
                        {event.time && <> · {event.time}</>}
                      </p>
                      <p className="mt-3 text-navy/80">{event.description}</p>
                      {event.price && (
                        <span className="mt-4 inline-block rounded-full bg-pink-100 px-3 py-1 text-sm font-semibold text-pink-700">
                          {event.price}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
