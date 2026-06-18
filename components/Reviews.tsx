"use client";

import { useEffect, useState } from "react";
import { reviews, business } from "@/lib/site-data";
import { StarIcon } from "./icons";
import ViewTracker from "./ViewTracker";

// How many of the (all 5-star) reviews to show at once.
const DISPLAY_COUNT = 4;

function StarRating() {
  return (
    <div className="flex gap-0.5 text-pink-600" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-5 w-5" />
      ))}
    </div>
  );
}

/*
 * WHAT LOCALS SAY — grid of customer reviews.
 * Shows a rotating subset of the full pool: the server renders a stable first
 * `DISPLAY_COUNT` (so the HTML is consistent + crawlable), then on mount we
 * pick a random selection so the reviews change on each visit/refresh.
 */
export default function Reviews() {
  const [shown, setShown] = useState(() => reviews.slice(0, DISPLAY_COUNT));

  useEffect(() => {
    const shuffled = [...reviews]
      .sort(() => Math.random() - 0.5)
      .slice(0, DISPLAY_COUNT);
    setShown(shuffled);
  }, []);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="bg-white pt-14 pb-20 sm:pt-16 sm:pb-28"
    >
      {/* First-party analytics: logs a Supabase view when this section is seen. */}
      <ViewTracker section="reviews" />

      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow flex flex-col items-center justify-center gap-1">
            <span>★ 4.5 on Google · 60 reviews</span>
            <span>96% recommend on Facebook · 35 reviews</span>
          </div>
          <h2 id="reviews-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl">
            What the <span className="heading-cursive text-4xl text-pink-600 sm:text-5xl">Locals</span> Say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {shown.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-3xl border border-blush bg-blush/40 p-7 shadow-soft"
            >
              <StarRating />
              <blockquote className="mt-4 flex-1 text-navy/80">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span>
                  <span className="block font-bold text-navy">
                    {review.name}
                  </span>
                  <span className="block text-xs text-navy/80">
                    {review.meta}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={business.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3.5 text-base"
          >
            <StarIcon className="h-4 w-4" />
            Write a Google Review
          </a>
        </div>
      </div>
    </section>
  );
}
