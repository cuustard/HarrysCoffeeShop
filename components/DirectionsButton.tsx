"use client";

import { useEffect, useState, type ReactNode } from "react";

/*
 * Platform-aware "Get Directions" link.
 *
 * Default (SSR + Android/desktop): Google Maps directions.
 * iOS / iPadOS: Apple Maps, so users without the Google Maps app installed
 * get native turn-by-turn in their default map app instead of web Google Maps.
 *
 * Coordinates come straight from Harry's verified Google listing, so the pin
 * is exact regardless of which map app opens.
 */
const COORDS = "51.40072627178916,-1.0561631226469759";
const LABEL = "Harry's Coffee Shop";

const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`;
const appleUrl = `https://maps.apple.com/?daddr=${COORDS}&q=${encodeURIComponent(
  LABEL
)}`;

export default function DirectionsButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  // Start with Google (matches the server render → no hydration mismatch).
  const [href, setHref] = useState(googleUrl);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPhone|iPad|iPod/.test(ua) ||
      // iPadOS 13+ reports as a Mac, so check for touch support too.
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (isIOS) setHref(appleUrl);
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
