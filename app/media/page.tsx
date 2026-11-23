import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { PodcastLinkList } from "@/components/PodcastLinkList";
import { getPodcasts } from "@/lib/cms/contentSource";
import { publish } from "@/lib/content";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Podcast interviews, press features, and recent media appearances with Nicole Stephenson and Narrativa Consulting.",
};

export default async function MediaPage() {
  const podcasts = publish(await getPodcasts());

  return (
    <>
      <PageHero
        eyebrow="Media"
        variant="split"
        tone="lavender"
        title="Stories, Interviews, and Press."
        lead="A running list of recent press features, podcast appearances, and on-camera conversations."
        image={{
          src: "/photos/nicole-stephenson-speaking-3.jpg",
          alt: "Nicole Stephenson mid-keynote, microphone in hand.",
          objectPosition: "center 30%",
          aspect: "portrait",
        }}
      >
        <LinkButton href="#featured" size="lg">
          Watch & listen
        </LinkButton>
        <LinkButton href="/contact" size="lg" variant="secondary">
          Press inquiries
        </LinkButton>
      </PageHero>

      {/* Sections in .section-stack alternate white / lavender by position. */}
      <div className="section-stack">
        <Section containerSize="wide">
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

        {podcasts.length > 0 ? (
          <Section containerSize="wide" id="featured" className="scroll-mt-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <SectionHeading
                eyebrow="Featured"
                title="The interviews and conversations leading the year."
              />
              <PodcastLinkList podcasts={podcasts} />
            </div>
          </Section>
        ) : null}
      </div>

      <CTA
        eyebrow="For press"
        title="Working on a story?"
        body="For interviews, quotes, or review copies of Unapologetic, send a note with your deadline and outlet."
        primary={{ label: "Press inquiry", href: "/contact" }}
      />
    </>
  );
}
