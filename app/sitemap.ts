import type { MetadataRoute } from "next";
import { business } from "@/lib/site-data";

// Generates /sitemap.xml at build time. Single-page site, so one entry.
// Add more objects here if extra pages (e.g. /menu, /blog) are added later.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: business.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
