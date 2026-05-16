import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { PodcastCard, PressCard } from "@/components/MediaCard";
import { publish } from "@/lib/content";
import { podcasts } from "@/lib/mock/podcasts";
import { press } from "@/lib/mock/press";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Podcast interviews, press features, and recent media appearances with Nicole Stephenson and Narrativa Consulting.",
};

export default function MediaPage() {
  const visiblePodcasts = publish(podcasts);
  const visiblePress = publish(press);

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="In the press, on the show, on the record."
        lead="A running list of recent press features, podcast appearances, and on-camera conversations."
      />

      <Section tone="default" containerSize="wide">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-center">
          <div className="relative aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_70px_-30px_rgba(43,15,68,0.4)]">
            <Image
              src="/photos/nicole-stephenson-headshot-blue.jpg"
              alt="Nicole Stephenson — press headshot in a royal blue top."
              fill
              sizes="(min-width: 1024px) 22rem, 20rem"
              priority
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              For press
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-ink">
              A press-ready headshot, on file.
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed">
              Nicole is available for interviews, quotes, podcast bookings, and
              review copies of <em>Unapologetic</em>. For higher-resolution
              assets or specific bios, email{" "}
              <a
                href="mailto:nicole@narrativaconsulting.com"
                className="text-brand hover:text-[color:var(--color-purple-700)] underline-offset-4 hover:underline"
              >
                nicole@narrativaconsulting.com
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      {visiblePress.length > 0 ? (
        <Section tone="tint" containerSize="wide">
          <SectionHeading
            eyebrow="Press"
            title={`${visiblePress.length} ${visiblePress.length === 1 ? "feature" : "features"} on the record.`}
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visiblePress.map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
          </div>
        </Section>
      ) : (
        <Section tone="tint" containerSize="wide">
          <SectionHeading eyebrow="Press" title="Coming soon." />
          <p className="mt-6 text-ink-soft text-lg max-w-2xl">
            Recent press features are being added. For interviews, quotes, or
            review copies of <em>Unapologetic</em>, please reach out.
          </p>
        </Section>
      )}

      {visiblePodcasts.length > 0 ? (
        <Section tone="default" containerSize="wide">
          <SectionHeading
            eyebrow="Podcasts & interviews"
            title="Listen and watch."
            lead="Recent long-form conversations and on-camera interviews."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visiblePodcasts.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </Section>
      ) : (
        <Section tone="default" containerSize="wide">
          <SectionHeading
            eyebrow="Podcasts & interviews"
            title="Coming soon."
          />
          <p className="mt-6 text-ink-soft text-lg max-w-2xl">
            Podcast appearances are being added.
          </p>
        </Section>
      )}

      <CTA
        eyebrow="For press"
        title="Working on a story?"
        body="For interviews, quotes, or review copies of Unapologetic, send a note with your deadline and outlet."
        primary={{ label: "Press inquiry", href: "/contact" }}
      />
    </>
  );
}
