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
  address: {
    line1: "Glendale House",
    line2: "Reading Road, Burghfield",
    postcode: "RG7 3BL",
    full: "Glendale House, Reading Road, Burghfield, RG7 3BL",
  },
  email: "thefamilyblend@hotmail.com",
  // Placeholder — swap in the shop's real number.
  phone: "0118 000 0000",
  phoneHref: "+441180000000",
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    website: "https://harryscoffeeshop.co.uk",
  },
  // Used for the "Write a Google Review" button and the map embed.
  googleReviewUrl: "https://www.google.com/maps",
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
    name: "The Morning Regular",
    meta: "Local visitor",
    text: "Best hot chocolate for miles and the atmosphere is so cosy. The floral wall and neon sign make it the perfect spot for a catch-up. The team always remember my order — proper community feel.",
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
  { day: "Monday", weekday: 1, open: "08:00", close: "16:00" },
  { day: "Tuesday", weekday: 2, open: "08:00", close: "16:00" },
  { day: "Wednesday", weekday: 3, open: "08:00", close: "16:00" },
  { day: "Thursday", weekday: 4, open: "08:00", close: "16:00" },
  { day: "Friday", weekday: 5, open: "08:00", close: "16:00" },
  { day: "Saturday", weekday: 6, open: "09:00", close: "16:00" },
  { day: "Sunday", weekday: 0, open: "09:00", close: "14:00" },
];
