/**
 * Team / staff data — source of truth for the /team page.
 * ───────────────────────────────────────────────────────
 * PLACEHOLDERS: swap the names, roles and bios for the real team.
 * For photos, drop image files into /public/team/ and set `photo` to e.g.
 * "/team/sophie.jpg". Leave `photo` undefined to show a branded initials
 * placeholder (no layout shift when you add the real photo later).
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Path to a photo in /public, e.g. "/team/sophie.jpg". Optional. */
  photo?: string;
};

export const team: TeamMember[] = [
  {
    name: "Sophie Bennett",
    role: "Owner & Founder",
    bio: "Sophie started Harry's with a simple idea: proper coffee, proper food and a proper welcome. You'll usually find her behind the counter learning everyone's order by heart.",
  },
  {
    name: "Tom Hayes",
    role: "Café Manager",
    bio: "Tom keeps the whole place running like clockwork — and makes a mean flat white while he's at it. Ask him about this weekend's specials.",
  },
  {
    name: "Priya Sharma",
    role: "Head Barista",
    bio: "Priya is our resident coffee nerd, dialling in every espresso to perfection. Latte art is her not-so-secret talent.",
  },
  {
    name: "Jack Doyle",
    role: "Kitchen & Brunch",
    bio: "Jack is the man behind the bagels, brunches and those famous breakfast baps. Big portions, even bigger smiles.",
  },
  {
    name: "Mia Clarke",
    role: "Front of House",
    bio: "Mia makes sure every visit feels like coming home — dogs and little ones included. She's the friendly face you'll see first.",
  },
];
