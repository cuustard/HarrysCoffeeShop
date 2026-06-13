/**
 * Central content file for Harry's Coffee Shop.
 * ─────────────────────────────────────────────
 * Edit business details, menu items, reviews and opening hours HERE.
 * Everything else on the page reads from this file, so the owner only
 * has to touch one place to update the site.
 */

export const business = {
  name: "Harry's Coffee Shop",
  tagline: "Your Local Community Hub in Burghfield Common.",
  blurb:
    "Family run coffee shop serving the best specialty coffee, banging breakfasts, and good vibes.",

  // Canonical site URL — used for metadata, Open Graph, sitemap & robots.
  // Update this to the final production domain before launch.
  url: "https://harryscoffeeshop.co.uk",

  address: {
    line1: "Reading Rd",
    line2: "Burghfield Common, Reading",
    postcode: "RG7 3BL",
    full: "Reading Rd, Burghfield Common, Reading RG7 3BL",
    // Broken-out parts for schema.org PostalAddress (local SEO).
    street: "Reading Rd",
    locality: "Burghfield Common",
    region: "Reading",
    country: "GB",
  },
  email: "thefamilyblend@hotmail.com",
  phone: "07576 093893",
  phoneHref: "+447576093893",

  // Coordinates from Harry's verified Google listing (used for schema geo).
  geo: { latitude: 51.40072627178916, longitude: -1.0561631226469759 },
  priceRange: "£1–10",
  placeId: "ChIJK6fcyYCfdkgRiFLyvDLrYxs",

  socials: {
    facebook: "https://www.facebook.com/harrysburghfield/",
    instagram: "https://www.instagram.com/harrys_coffee_shop/",
    website: "https://harryscoffeeshop.co.uk",
  },

  // Used for the "Write a Google Review" button.
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJK6fcyYCfdkgRiFLyvDLrYxs",
  // Direct link to the verified Maps listing (used in schema hasMap).
  googleMapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJK6fcyYCfdkgRiFLyvDLrYxs",
};

/** Menu snapshot — a sample, not the full list. */
export const menu: {
  category: string;
  items: { name: string; price: string }[];
}[] = [
  {
    category: "Specialty Coffee",
    items: [
      { name: "Flat White", price: "£3.40" },
      { name: "Cappuccino", price: "£3.40" },
      { name: "Mocha", price: "£3.95" },
      { name: "Deluxe Hot Chocolate", price: "£4.20" },
    ],
  },
  {
    category: "Banging Breakfasts",
    items: [
      { name: "The Family Fry-Up", price: "£8.95" },
      { name: "Eggs & Avocado on Sourdough", price: "£7.50" },
      { name: "Bacon or Sausage Bap", price: "£4.50" },
      { name: "Breakfast Crepe", price: "£6.50" },
    ],
  },
  {
    category: "Lunch",
    items: [
      { name: "Peri Chicken Toastie", price: "£6.50" },
      { name: "Caesar Salad Wrap", price: "£6.00" },
      { name: "Soup of the Day", price: "£5.50" },
      { name: "Sausage Roll", price: "£3.50" },
    ],
  },
  {
    category: "Weekend Treats",
    items: [
      { name: "Fresh Crepes", price: "£7.00" },
      { name: "Cornflake Malteser Rocky Road", price: "£3.50" },
      { name: "Brownie", price: "£3.00" },
      { name: "Cake of the Week", price: "£3.95" },
    ],
  },
];

/** Customer reviews — real wording from the shop's public reviews. */
export const reviews: {
  name: string;
  meta: string;
  text: string;
}[] = [
  {
    name: "April Millie",
    meta: "5 reviews · 2 photos",
    text: "Stopped off at Harry's during my run today — I had the cornflake Malteser rocky road which was delicious! I also grabbed a brownie to take home for my partner, who confirmed it was top-tier. The staff were so lovely and polite. Highly recommend!",
  },
  {
    name: "Layla Stuart",
    meta: "3 reviews",
    text: "Popped in the other day to meet the new owners and I must say they are lovely!!! So welcoming and friendly. The sausage roll was brilliant and the flat white was piping hot and served with a smile. Will definitely be coming back.",
  },
  {
    name: "Gina Soden",
    meta: "Local Guide · 170 reviews",
    text: "Absolutely fantastic coffee here! The desserts and cakes are always amazing too. Great service and lovely staff. My dog loves it in here too — doggy friendly and treats for her. My favourite place to grab lunch.",
  },
  {
    name: "Rachel C",
    meta: "Local Guide · 34 reviews · 13 photos",
    text: "First visit and I was super impressed. Had a sandwich and cake and both were delicious. Will be back!",
  },
  {
    name: "Mike",
    meta: "Local Guide · 103 reviews · 734 photos",
    text: "What a rather exquisite way to spend the afternoon, drinking delicious coffee and eating a delightful sausage and bacon roll. Even the dog got some treats and a puppuccino!",
  },
  {
    name: "Lisa Hewitt",
    meta: "Local Guide · 32 reviews · 6 photos",
    text: "What a find!! Hidden little gem. Love it — fresh, tasty, gorgeous food. Amazing hot chocolates and smoothies. Staff always so kind and nice.",
  },
  {
    name: "Julie Evans",
    meta: "5 reviews",
    text: "Just visited for a take away lunch — we had the fajita bowls with halloumi which were really lovely with just the right amount of dressing. I also had a tea with oat milk, and it was perfect! The best lunch I've had out in a very long time. Definitely worth a visit!",
  },
];

/**
 * Opening hours.
 * `open`/`close` are 24-hour "HH:MM" strings in UK local time.
 * Set `open` to null for a closed day.
 */
export const openingHours: {
  day: string;
  // 0 = Sunday … 6 = Saturday (matches JS Date.getDay()).
  weekday: number;
  open: string | null;
  close: string | null;
}[] = [
  { day: "Monday", weekday: 1, open: null, close: null },
  { day: "Tuesday", weekday: 2, open: "08:00", close: "16:00" },
  { day: "Wednesday", weekday: 3, open: "08:00", close: "16:00" },
  { day: "Thursday", weekday: 4, open: "08:00", close: "16:00" },
  { day: "Friday", weekday: 5, open: "08:00", close: "16:00" },
  { day: "Saturday", weekday: 6, open: "09:00", close: "15:00" },
  { day: "Sunday", weekday: 0, open: "09:00", close: "15:00" },
];
