import { business, openingHours, menu } from "@/lib/site-data";

/*
 * JSON-LD structured data (schema.org).
 * ─────────────────────────────────────
 * This is the single biggest local-SEO win for a café: it tells Google
 * *exactly* what this business is — name, address, geo, phone, hours, price
 * range, socials and menu — so it can power rich results, the Maps knowledge
 * panel and "open now" badges in search.
 *
 * Rendered as a <script type="application/ld+json"> in the document. It is
 * invisible to users and stays in sync with lib/site-data.ts automatically.
 */
export default function StructuredData() {
  // Map opening hours → schema OpeningHoursSpecification (skip closed days).
  const openingHoursSpecification = openingHours
    .filter((d) => d.open && d.close)
    .map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${d.day}`,
      opens: d.open,
      closes: d.close,
    }));

  // Map the sample menu → schema Menu (helps "menu" rich results).
  const hasMenu = {
    "@type": "Menu",
    name: `${business.name} Menu`,
    hasMenuSection: menu.map((section) => ({
      "@type": "MenuSection",
      name: section.category,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        offers: {
          "@type": "Offer",
          price: item.price.replace(/[£\s]/g, ""),
          priceCurrency: "GBP",
        },
      })),
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${business.url}/#website`,
        url: business.url,
        name: business.name,
        inLanguage: "en-GB",
        publisher: { "@id": `${business.url}/#business` },
      },
      {
        "@type": "CafeOrCoffeeShop",
        "@id": `${business.url}/#business`,
        name: business.name,
        description: business.blurb,
        url: business.url,
        image: `${business.url}/banner.jpg`,
        logo: `${business.url}/banner.jpg`,
        telephone: business.phoneHref,
        email: business.email,
        priceRange: business.priceRange,
        currenciesAccepted: "GBP",
        servesCuisine: ["Coffee", "Breakfast", "Brunch", "Lunch", "Cakes"],
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.locality,
          addressRegion: business.address.region,
          postalCode: business.address.postcode,
          addressCountry: business.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        },
        hasMap: business.googleMapsUrl,
        openingHoursSpecification,
        sameAs: [business.socials.facebook, business.socials.instagram],
        hasMenu,
        // Amenities that show up as attributes in local results.
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Dog friendly", value: true },
          { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Outdoor seating", value: true },
          { "@type": "LocationFeatureSpecification", name: "Wheelchair accessible", value: true },
        ],
        publicAccess: true,
        smokingAllowed: false,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user input); this is the
      // standard Next.js pattern for injecting JSON-LD.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
