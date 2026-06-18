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

export type MenuItem = {
  name: string;
  // Null for items with no fixed price (e.g. "see display cabinet").
  price?: string | null;
  description?: string;
  // Optional extras line, e.g. "Add bacon £1.50 · Add halloumi £1.50".
  addOns?: string;
};

export type MenuCategory = {
  category: string;
  // Section-wide price note shown by the heading, e.g. "+65p" for syrups.
  priceNote?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    category: "Our Famous Coffee",
    items: [
      { name: "Americano", price: "£3.20" },
      { name: "Espresso", price: "£2.80" },
      { name: "Double Espresso", price: "£3.00" },
      { name: "Flat White", price: "£3.75" },
      { name: "Latte", price: "£3.95" },
      { name: "Cappuccino", price: "£3.95" },
      { name: "Caffe Mocha", price: "£3.95" },
      { name: "Iced Latte", price: "£4.50" },
    ],
  },
  {
    category: "Syrups",
    priceNote: "+65p",
    items: [
      { name: "Vanilla" },
      { name: "Gingerbread" },
      { name: "Hazelnut" },
      { name: "Caramel" },
      { name: "Salted Caramel" },
      { name: "Pumpkin" },
      { name: "Cinnamon" },
      { name: "Chai" },
    ],
  },
  {
    category: "Dairy Free",
    priceNote: "+50p",
    items: [
      { name: "Almond / Soya" },
      { name: "Oat / Coconut" },
    ],
  },
  {
    category: "Tea",
    items: [
      { name: "Yorkshire Tea", price: "£2.60" },
      { name: "Yorkshire Decaf", price: "£2.60" },
      { name: "Earl Grey", price: "£3.00" },
      { name: "Turmeric", price: "£3.00" },
      { name: "Lemon", price: "£3.00" },
      { name: "Green", price: "£3.00" },
      { name: "Peppermint", price: "£3.00" },
      { name: "Camomile", price: "£3.00" },
      { name: "Jasmine", price: "£3.00" },
      { name: "Berry", price: "£3.00" },
    ],
  },
  {
    category: "Hot Chocolate",
    items: [
      { name: "Hot Chocolate", price: "£3.95" },
      {
        name: "Deluxe Hot Chocolate",
        price: "£4.20",
        description: "Served with whipped cream & marshmallows",
      },
      { name: "Baby Hot Chocolate", price: "£3.75" },
      { name: "Babycino", price: "£1.50" },
      { name: "Puppycino", price: "£1.50" },
    ],
  },
  {
    category: "Iced Tea",
    items: [
      {
        name: "Iced Tea",
        price: "£3.95",
        description: "Raspberry, Peach or Passion Fruit flavour",
      },
    ],
  },
  {
    category: "Smoothies",
    items: [
      { name: "Raspberry Heaven", price: "£5.25", description: "Apple, raspberry, mango & blueberry" },
      { name: "Green Reviver", price: "£5.25", description: "Banana, kale, mango & blueberry" },
      { name: "Acai Kick", price: "£5.25", description: "Strawberry, mango, blueberry & acai" },
      { name: "Passion Storm", price: "£5.25", description: "Peach, pineapple, papaya, passionfruit juice, guava puree & aloe vera juice" },
      { name: "Dazzling Dragon", price: "£5.25", description: "Dragon fruit, mango, banana, apple & wild blueberry" },
      { name: "Matcha Power", price: "£5.25", description: "Pineapple, banana, apple, spinach & matcha powder" },
    ],
  },
  {
    category: "Milkshakes",
    items: [
      { name: "Cookies and Cream", price: "£5.50" },
      { name: "Banana Fudge", price: "£5.50" },
      { name: "Strawberry", price: "£5.50" },
      { name: "Salted Caramel", price: "£5.50" },
      { name: "Vanilla", price: "£5.50" },
      { name: "Chocolate Chip", price: "£5.50" },
    ],
  },
  {
    category: "Breakfast & Brunch",
    items: [
      {
        name: "Breakfast Bap — Sausage & Bacon",
        price: "£8.00",
        description: "White or brioche roll, served with ketchup or brown sauce",
      },
      {
        name: "Breakfast Bap — Sausage or Bacon",
        price: "£7.00",
        description: "White or brioche roll, served with ketchup or brown sauce",
      },
      { name: "Bacon and Brie Croissant", price: "£6.25" },
      {
        name: "Smashed Avocado on Toast",
        price: "£6.50",
        description: "Sourdough toast topped with smashed avocado, salt & pepper and a sprinkle of red pepper flakes for a bit of heat",
        addOns: "Add bacon £1.50 · Add halloumi £1.50",
      },
      {
        name: "Granola Pot",
        price: "£3.75",
        description: "Strawberry compote topped with natural greek yoghurt & super berry granola",
      },
      { name: "All Butter Croissant", price: "£3.50", description: "Served with jam and butter" },
      { name: "Almond Croissant", price: "£3.95", description: "Served warm" },
      { name: "Cinnamon Bun", price: "£3.95", description: "Served warm" },
      { name: "Toasted Teacake", price: "£3.50", description: "Served with jam and butter" },
    ],
  },
  {
    category: "Bagels",
    items: [
      { name: "The Maple One", price: "£7.00", description: "Smashed avocado, lemon juice & bacon brushed with maple syrup" },
      { name: "The Fresh One", price: "£7.00", description: "Smashed avocado, lemon juice, sundried tomatoes & creamy buffalo mozzarella" },
      { name: "The Ocean One", price: "£7.75", description: "Smoked salmon, cream cheese, lemon juice & rocket" },
      { name: "The Med One", price: "£7.00", description: "Creamy buffalo mozzarella, pesto & fresh tomato" },
    ],
  },
  {
    category: "Soup of the Day",
    items: [
      {
        name: "Soup of the Day",
        price: "£5.00",
        description: "Served with crusty bread and butter — ask your server for today's soup",
      },
    ],
  },
  {
    category: "Kids Meal Deal",
    items: [
      {
        name: "Kids Meal Deal",
        price: "£5.95",
        description: "Cheese or ham sandwich, portion of fruit, soft drink and a treat (cookies or choc bar). Swap the treat for a cake for £2 extra",
      },
    ],
  },
  {
    category: "Pastries",
    items: [
      { name: "Pastries Selection", description: "We have a selection of pastries available each day" },
    ],
  },
  {
    category: "Freshly Baked Cakes & Tray Bakes",
    items: [
      { name: "Display Cabinet Selection", description: "Check out our display cabinet for this week's selection" },
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
