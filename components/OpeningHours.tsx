"use client";

import { useEffect, useState } from "react";
import { openingHours } from "@/lib/site-data";
import { ClockIcon } from "./icons";

/* "08:00" -> "8am", "16:00" -> "4pm", "09:30" -> "9:30am" */
function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0
    ? `${hour12}${period}`
    : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}

const WEEKDAY_TO_NUM: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

/**
 * Read the *current UK wall-clock time* regardless of the visitor's own
 * timezone, using Intl with timeZone: "Europe/London". This is what makes the
 * OPEN / CLOSED badge correct for the shop, not for the visitor.
 */
function getUkNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekday = WEEKDAY_TO_NUM[get("weekday")] ?? new Date().getDay();
  // Some engines render midnight as "24" with hour12:false — normalise it.
  const hour = parseInt(get("hour"), 10) % 24;
  const minute = parseInt(get("minute"), 10);

  return { weekday, minutesNow: hour * 60 + minute };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

type Status = {
  isOpen: boolean;
  message: string;
  todayWeekday: number;
};

function computeStatus(): Status {
  const { weekday, minutesNow } = getUkNow();
  const today = openingHours.find((d) => d.weekday === weekday);

  // Open right now?
  if (today && today.open && today.close) {
    const openM = toMinutes(today.open);
    const closeM = toMinutes(today.close);
    if (minutesNow >= openM && minutesNow < closeM) {
      return {
        isOpen: true,
        message: `Closes at ${formatTime(today.close)}`,
        todayWeekday: weekday,
      };
    }
    // Closed now, but opens later today
    if (minutesNow < openM) {
      return {
        isOpen: false,
        message: `Opens at ${formatTime(today.open)}`,
        todayWeekday: weekday,
      };
    }
  }

  // Otherwise find the next day (within the next week) that has hours.
  for (let i = 1; i <= 7; i++) {
    const next = openingHours.find((d) => d.weekday === (weekday + i) % 7);
    if (next && next.open) {
      const label = i === 1 ? "tomorrow" : next.day;
      return {
        isOpen: false,
        message: `Opens ${label} at ${formatTime(next.open)}`,
        todayWeekday: weekday,
      };
    }
  }

  return { isOpen: false, message: "Closed", todayWeekday: weekday };
}

export default function OpeningHours() {
  // Start as null so the server render and first client render match
  // (avoids a hydration mismatch); we fill it in after mount.
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    setStatus(computeStatus());
    // Re-check every minute so the badge flips automatically.
    const id = setInterval(() => setStatus(computeStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-3xl bg-white p-7 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-navy">
          <ClockIcon className="h-5 w-5 text-pink-dark" />
          Opening Hours
        </h3>

        {/* Dynamic OPEN / CLOSED badge */}
        {status === null ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1.5 text-xs font-semibold text-navy/50">
            Checking…
          </span>
        ) : status.isOpen ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" />
            </span>
            We are open
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-700">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
            Closed now
          </span>
        )}
      </div>

      {/* Sub-status line (e.g. "Closes at 4pm") */}
      {status && (
        <p className="mt-1 text-sm text-navy/60">{status.message}</p>
      )}

      {/* Week list — today's row is highlighted */}
      <ul className="mt-5 divide-y divide-blush text-sm">
        {openingHours.map((d) => {
          const isToday = status?.todayWeekday === d.weekday;
          return (
            <li
              key={d.day}
              className={`flex items-center justify-between rounded-lg px-2 py-2.5 ${
                isToday ? "bg-blush font-semibold text-navy" : "text-navy/75"
              }`}
            >
              <span>
                {d.day}
                {isToday && (
                  <span className="ml-2 text-xs font-medium text-pink-dark">
                    Today
                  </span>
                )}
              </span>
              <span>
                {d.open && d.close
                  ? `${formatTime(d.open)} – ${formatTime(d.close)}`
                  : "Closed"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
