import type { MetadataRoute } from "next";
import { business } from "@/lib/site-data";

// Generates /robots.txt at build time. Allows all crawlers and points
// them at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${business.url}/sitemap.xml`,
    host: business.url,
  };
}
