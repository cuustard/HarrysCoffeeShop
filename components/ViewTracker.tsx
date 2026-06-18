"use client";

import { useEffect, useRef } from "react";
import { logSectionView, type TrackedSection } from "@/app/actions";

// A section must stay in view this long before it counts as a real view —
// filters out fast scroll-throughs.
const DWELL_MS = 1000;

/** Stable per-tab session id (sessionStorage → resets when the tab closes). */
function getSessionId(): string {
  const KEY = "hcs_sid";
  let sid = sessionStorage.getItem(KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(KEY, sid);
  }
  return sid;
}

/**
 * First-party viewport analytics.
 * ───────────────────────────────
 * Uses the native browser IntersectionObserver (no third-party script) to log a
 * section view via a Server Action. Logs at most once per section per tab
 * session, and only after the section has dwelled in view for DWELL_MS. Renders
 * a zero-height sentinel — drop it in as the first child of the tracked section.
 */
export default function ViewTracker({ section }: { section: TrackedSection }) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    // Already logged this section in this tab session? Skip entirely.
    const seenKey = `hcs_seen_${section}`;
    if (sessionStorage.getItem(seenKey)) return;

    let dwellTimer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Start the dwell clock; only log if still visible after DWELL_MS.
          dwellTimer = setTimeout(() => {
            sessionStorage.setItem(seenKey, "1");
            // Fire-and-forget; .catch avoids an unhandled rejection if the
            // Server Action POST itself fails (errors are handled in the action).
            void logSectionView(section, getSessionId()).catch(() => {});
            observer.disconnect();
          }, DWELL_MS);
        } else if (dwellTimer) {
          // Scrolled away before the dwell completed — cancel.
          clearTimeout(dwellTimer);
          dwellTimer = undefined;
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => {
      if (dwellTimer) clearTimeout(dwellTimer);
      observer.disconnect();
    };
  }, [section]);

  return <div ref={sentinelRef} aria-hidden className="h-px w-full" />;
}
