import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { PodcastCard, PressCard } from "@/components/MediaCard";
import { SmartMediaGallery } from "@/components/SmartMediaGallery";
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

  const featured =
    visiblePodcasts.find((p) => p.id === "pod-influential-women-video") ??
    visiblePodcasts[0];
  const galleryTiles = [
    ...visiblePodcasts
      .filter((p) => p.id !== featured?.id)
      .slice(0, 2)
      .map((item) => ({ kind: "podcast" as const, item })),
    ...visiblePress.slice(0, 2).map((item) => ({ kind: "press" as const, item })),
  ];
  const galleryFeaturedIds = new Set<string>([
    featured?.id ?? "",
    ...galleryTiles.map((t) => t.item.id),
  ]);
  const remainingPodcasts = visiblePodcasts.filter(
    (p) => !galleryFeaturedIds.has(p.id),
  );
  const remainingPress = visiblePress.filter(
    (p) => !galleryFeaturedIds.has(p.id),
  );

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="In the press, on the show, on the record."
        lead="A running list of recent press features, podcast appearances, and on-camera conversations."
      />

      <Section tone="default" containerSize="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div className="space-y-5 lg:order-1">
            <Eyebrow>For press</Eyebrow>
            <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-4xl">
              A press-ready headshot, on file.
            </h2>
            <p className="text-lg leading-relaxed text-ink-soft">
              Nicole is available for interviews, quotes, podcast bookings, and
              review copies of <em>Unapologetic</em>. For higher-resolution
              assets or specific bios, email{" "}
              <a
                href="mailto:nicole@narrativaconsulting.com"
                className="text-brand underline-offset-4 hover:text-[color:var(--color-purple-700)] hover:underline"
              >
                nicole@narrativaconsulting.com
              </a>
              .
            </p>
          </div>
          <div className="relative lg:order-2">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[color:var(--color-purple-100)] via-white to-[color:var(--color-purple-50)] opacity-80 blur-2xl"
            />
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] ring-1 ring-line shadow-[0_30px_70px_-30px_rgba(43,15,68,0.4)] lg:mx-0">
              <Image
                src="/photos/nicole-stephenson-headshot-blue.jpg"
                alt="Nicole Stephenson — press headshot in a royal blue top."
                fill
                sizes="(min-width: 1024px) 22rem, 20rem"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {featured || galleryTiles.length > 0 ? (
        <Section tone="tint" containerSize="wide">
          <SectionHeading
            eyebrow="Featured"
            title="The interviews and conversations leading the year."
          />
          <div className="mt-12">
            <SmartMediaGallery
              featured={
                featured ? { kind: "podcast", item: featured } : undefined
              }
              tiles={galleryTiles}
            />
          </div>
        </Section>
      ) : null}

      {remainingPodcasts.length > 0 ? (
        <Section tone="default" containerSize="wide">
          <SectionHeading
            eyebrow="Podcasts & interviews"
            title="Listen and watch."
            lead="Long-form conversations and on-camera interviews."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {remainingPodcasts.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {remainingPress.length > 0 ? (
        <Section tone="alt" containerSize="wide">
          <SectionHeading
            eyebrow="Press"
            title="On the record, in print."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {remainingPress.map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
          </div>
        </Section>
      ) : null}

      {visiblePress.length === 0 && remainingPodcasts.length === 0 ? (
        <Section tone="default" containerSize="wide">
          <SectionHeading eyebrow="More coming" title="Coming soon." />
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">
            Additional press features and podcast appearances are being added.
          </p>
        </Section>
      ) : null}

      <CTA
        eyebrow="For press"
        title="Working on a story?"
        body="For interviews, quotes, or review copies of Unapologetic, send a note with your deadline and outlet."
        primary={{ label: "Press inquiry", href: "/contact" }}
      />
    </>
  );
}
