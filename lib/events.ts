/**
 * Events data — source of truth for the /events page.
 * ───────────────────────────────────────────────────
 * PLACEHOLDERS: replace with the shop's real events. The page automatically
 * hides events whose date has passed and sorts the rest soonest-first, so you
 * can just leave past events here or delete them — your call.
 *
 * `date` / `endDate` are ISO "YYYY-MM-DD". `time` and `price` are free text.
 */

export type CafeEvent = {
  id: string;
  title: string;
  /** ISO start date, "YYYY-MM-DD". */
  date: string;
  /** ISO end date for multi-day events. Defaults to `date`. */
  endDate?: string;
  /** Human-readable time, e.g. "7:00pm – 9:30pm". */
  time?: string;
  description: string;
  /** Free text, e.g. "Free entry" or "£12 per person". */
  price?: string;
};

export const events: CafeEvent[] = [
  {
    id: "fathers-day-brunch",
    title: "Father's Day Brunch",
    date: "2026-06-21",
    time: "9:00am – 1:00pm",
    description:
      "A special Father's Day brunch menu with a free coffee for every dad. Thanks to everyone who joined us!",
  },
  {
    id: "midweek-coffee-morning",
    title: "Midweek Coffee Morning",
    date: "2026-06-28",
    time: "10:00am – 12:00pm",
    description:
      "A relaxed midweek catch-up over fresh coffee and cake. All welcome — bring a friend.",
    price: "Free entry",
  },
  {
    id: "acoustic-night-jul",
    title: "Live Acoustic Night",
    date: "2026-07-11",
    time: "7:00pm – 9:30pm",
    description:
      "Wind down the week with live acoustic sets from local musicians, great coffee and a relaxed evening vibe. Cake and soft drinks available all night.",
    price: "Free entry",
  },
  {
    id: "kids-craft-jul",
    title: "Kids' Craft Morning",
    date: "2026-07-26",
    time: "10:00am – 12:00pm",
    description:
      "A fun-filled morning of crafts for little ones while you enjoy a coffee. Includes a babycino and a biscuit for every child. Booking recommended.",
    price: "£5 per child",
  },
  {
    id: "coffee-cupping-aug",
    title: "Coffee Cupping & Tasting",
    date: "2026-08-15",
    time: "11:00am – 12:30pm",
    description:
      "Go behind the beans with our head barista. Taste your way through our specialty roasts and learn how we brew the perfect cup at home.",
    price: "£12 per person",
  },
  {
    id: "dog-brunch-sep",
    title: "Dog-Friendly Brunch Club",
    date: "2026-09-06",
    time: "9:30am – 12:00pm",
    description:
      "Bring your four-legged friend to our monthly brunch club. Puppuccinos and treats on the house for the good boys and girls.",
    price: "Free entry",
  },
];
