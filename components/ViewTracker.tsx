"use client";

import { useEffect, useRef } from "react";
import { logSectionView, type TrackedSection } from "@/app/actions";

/**
 * First-party viewport analytics.
 * ───────────────────────────────
 * Uses the native browser IntersectionObserver (no third-party script) to fire
 * a one-shot Server Action when the host section scrolls into view. Renders a
 * zero-height sentinel — drop it in as the first child of the section you want
 * to track.
 */
export default function ViewTracker({ section }: { section: TrackedSection }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          // Fire-and-forget — errors are handled inside the action.
          void logSectionView(section);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [section]);

  return <div ref={sentinelRef} aria-hidden className="h-px w-full" />;
}
