import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { team } from "@/lib/team";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the friendly, family-run team behind Harry's Coffee Shop in Burghfield Common — the people serving your coffee, brunch and cakes with a smile.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: `Meet the Team | ${business.name}`,
    description:
      "The friendly faces behind Harry's Coffee Shop in Burghfield Common.",
    url: "/team",
    type: "website",
  },
};

/** First letters of the name, for the photo placeholder (e.g. "Sophie Bennett" → "SB"). */
function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="The friendly faces"
        title="Meet the"
        highlight="Team"
        intro="Harry's is family-run, and it shows. Here are the people who'll greet you, make your coffee and remember your order."
      />

      <div className="bg-white py-16 sm:py-20">
        <div className="container-px mx-auto max-w-5xl">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li
                key={member.name}
                className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-blush"
              >
                {/* Portrait area — real photo if provided, else a branded
                    initials placeholder (same footprint = no layout shift). */}
                <div className="relative aspect-[4/5] w-full bg-blush">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role} at ${business.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy to-pink-700"
                    >
                      <span className="heading-cursive text-6xl text-white">
                        {initials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold text-navy">{member.name}</h2>
                  <p className="mt-0.5 text-sm font-semibold uppercase tracking-wide text-pink-700">
                    {member.role}
                  </p>
                  <p className="mt-3 text-navy/80">{member.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
