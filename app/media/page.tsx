import type { Metadata } from "next";
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

      {visiblePress.length > 0 ? (
        <Section tone="default" containerSize="wide">
          <SectionHeading
            eyebrow="Press"
            title="Recent features and bylines."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visiblePress.map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
          </div>
        </Section>
      ) : (
        <Section tone="default" containerSize="wide">
          <SectionHeading eyebrow="Press" title="Coming soon." />
          <p className="mt-6 text-ink-soft text-lg max-w-2xl">
            Recent press features are being added. For interviews, quotes, or
            review copies of <em>Unapologetic</em>, please reach out.
          </p>
        </Section>
      )}

      {visiblePodcasts.length > 0 ? (
        <Section tone="tint" containerSize="wide">
          <SectionHeading
            eyebrow="Podcasts & interviews"
            title="Listen in."
            lead="Recent long-form conversations — and where to find a fuller archive."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visiblePodcasts.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </Section>
      ) : (
        <Section tone="tint" containerSize="wide">
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
