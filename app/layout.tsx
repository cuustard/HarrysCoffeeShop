import type { Metadata, Viewport } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/site-data";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const title = `${business.name} | Specialty Coffee & Breakfast in Burghfield Common, Reading`;
const description =
  "Harry's Coffee Shop is a family-run café in Burghfield Common, Reading, serving specialty coffee, banging breakfasts, fresh crepes and homemade cakes. Dog friendly, free WiFi and outdoor seating — a warm welcome for the whole community.";

// ── SEO / social metadata ──────────────────────────────────────────
export const metadata: Metadata = {
  // metadataBase makes every relative URL below (canonical, OG image) absolute.
  metadataBase: new URL(business.url),
  title: {
    default: title,
    template: `%s | ${business.name}`,
  },
  description,
  applicationName: business.name,
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  category: "restaurant",
  keywords: [
    "Harry's Coffee Shop",
    "coffee shop Burghfield Common",
    "café Burghfield",
    "coffee shop Reading",
    "breakfast Burghfield Common",
    "brunch Reading RG7",
    "dog friendly café Reading",
    "specialty coffee Burghfield",
    "fresh crepes Reading",
  ],
  alternates: {
    canonical: "/",
  },
  // Explicitly invite indexing + rich snippets.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: business.name,
    title,
    description,
    images: [
      {
        url: "/banner.jpg",
        width: 1686,
        height: 624,
        alt: `${business.name} — floral branding banner`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/banner.jpg"],
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

// themeColor / viewport live in their own export in the App Router.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3A8A", // brand navy — tints the mobile browser chrome
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${pacifico.variable}`}>
      <body>
        {/* Keyboard a11y: jump straight to content. Hidden until focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-pink-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-soft"
        >
          Skip to content
        </a>
        <StructuredData />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
