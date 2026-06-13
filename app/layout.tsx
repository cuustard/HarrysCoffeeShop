import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/site-data";

// Clean sans-serif for body text.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Playful cursive for highlight headers (mimics the logo).
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
  display: "swap",
});

// ── SEO / social metadata ──────────────────────────────────────────
export const metadata: Metadata = {
  title: `${business.name} | Coffee Shop in Burghfield Common`,
  description:
    "Family run coffee shop in Burghfield Common serving specialty coffee, banging breakfasts and good vibes. Dog friendly, free WiFi, and a warm welcome for the whole community.",
  keywords: [
    "Harry's Coffee Shop",
    "Burghfield Common coffee",
    "Reading coffee shop",
    "dog friendly cafe Burghfield",
    "breakfast Burghfield",
  ],
  openGraph: {
    title: `${business.name} | Burghfield Common`,
    description:
      "Specialty coffee, banging breakfasts and good vibes in Burghfield Common.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${pacifico.variable}`}>
      <body>{children}</body>
    </html>
  );
}
