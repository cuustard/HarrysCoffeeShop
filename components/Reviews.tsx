import { reviews, business } from "@/lib/site-data";
import { StarIcon } from "./icons";

function StarRating() {
  return (
    <div className="flex gap-0.5 text-pink" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-5 w-5" />
      ))}
    </div>
  );
}

/*
 * WHAT LOCALS SAY — grid of customer reviews.
 */
export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 sm:py-28">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">96% recommend · 35 reviews</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            What the <span className="heading-cursive text-4xl text-pink-dark sm:text-5xl">Locals</span> Say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {reviews.map((review) => (
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
                  <span className="block text-xs text-navy/60">
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
