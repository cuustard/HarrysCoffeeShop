/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  images: {
    // Serve modern, smaller formats (AVIF first, WebP fallback).
    formats: ["image/avif", "image/webp"],
    // Allow Unsplash placeholder photos to be served via next/image.
    // Swap these out for your own hosted images before launch.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
