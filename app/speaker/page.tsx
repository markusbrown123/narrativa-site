import type { Metadata } from "next";
import Image from "next/image";
import { BookCover } from "@/components/BookCover";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { EventCard } from "@/components/EventCard";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { Pill } from "@/components/Pill";
import { PartnerLogos } from "@/components/PartnerLogos";
import { publish } from "@/lib/content";
// Events + partners come from code so Nicole's first-round edits render
// consistently with the rest of the site (the Google Sheet is stale here).
import { events as eventsData } from "@/lib/mock/events";
import { partners as partnersData } from "@/lib/mock/partners";
import {
  SPEAKER_AUDIENCES,
  SPEAKER_FORMATS,
  SPEAKER_TOPICS,
} from "@/lib/mock/speaker";

export const metadata: Metadata = {
  title: "Speaker",
  description:
    "Book Nicole Stephenson, IOM — author, Wharton lecturer, and transformational speaker — for your keynote, fireside, breakout, retreat, or workshop.",
};

export default async function SpeakerPage() {
  const events = eventsData;
  const partners = partnersData;
  const upcoming = publish(events).filter((e) => e.is_upcoming);
  const visiblePartners = publish(partners);

  return (
    <>
      <PageHero
        eyebrow="Speaker"
        variant="split"
        tone="dark"
        title="Book Nicole for Your Next Keynote or Fireside."
        lead="Nicole Stephenson, IOM is a transformational speaker, Lecturer at The Wharton School / University of Pennsylvania, Founder of Narrativa Consulting, and author of Unapologetic: Boldly Lead the Life and Career You Deserve."
        image={{
          src: "/photos/nicole-stephenson-speaking-1.jpg",
          alt: "Nicole Stephenson on stage with a handheld microphone, mid-keynote.",
          objectPosition: "center 25%",
          aspect: "portrait",
          caption: { label: "On stage", value: "Keynotes & firesides" },
        }}
      >
        <LinkButton href="/contact" size="lg" variant="light">
          Book Nicole
        </LinkButton>
        <LinkButton
          href="#talks"
          size="lg"
          variant="ghost"
          className="border border-white/30 text-white hover:bg-white/10 hover:text-white"
        >
          See talk themes
        </LinkButton>
        <LinkButton
          href="/speaker/nicole-stephenson-one-sheet.pdf"
          size="lg"
          variant="ghost"
          external
          className="border border-white/30 text-white hover:bg-white/10 hover:text-white"
        >
          One-sheet (PDF)
        </LinkButton>
      </PageHero>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-3xl ring-1 ring-[color:var(--color-purple-200)] shadow-[0_30px_70px_-30px_rgba(36,16,47,0.4)]">
            <Image
              src="/photos/nicole-stephenson-speaking-2.jpg"
              alt="Nicole Stephenson holding a microphone, smiling toward the audience."
              fill
              sizes="(min-width: 1024px) 24rem, 22rem"
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <Eyebrow>On stage</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-ink">
              A speaker who connects, then transforms.
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed">
              Known for blending real-world experience with compelling
              storytelling and practical strategies, Nicole delivers content
              that inspires immediate action and lasting growth. With nearly
              two decades of experience across marketing, promotions, sales,
              operations, and events, she brings a rare combination of
              strategic insight and human-centered leadership to every
              engagement.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="alt" id="talks">
        <SectionHeading
          eyebrow="Talk themes"
          title="What Nicole speaks about."
          lead="Four signature topics from the Unapologetic curriculum — tailored to your audience and moment."
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6 lg:gap-8">
          {SPEAKER_TOPICS.map((topic) => (
            <article
              key={topic.number}
              className="flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-8 hover:border-[color:var(--color-purple-300)] transition-all"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Topic {topic.number}
              </p>
              <h3 className="mt-3 font-display text-2xl text-ink leading-snug">
                {topic.title}
              </h3>
              <ul className="mt-5 space-y-2 text-ink-soft text-sm sm:text-base leading-relaxed">
                {topic.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <SectionHeading
            eyebrow="Engagement formats"
            title="Pick the shape that fits the room."
          />
          <ul className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {SPEAKER_FORMATS.map((f) => (
              <li
                key={f.format}
                className="rounded-2xl border border-line bg-white p-5"
              >
                <p className="font-display text-lg text-ink leading-snug">
                  {f.format}
                </p>
                <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                  {f.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">
          <SectionHeading
            eyebrow="Ideal audiences"
            title="Built for the room you are about to fill."
          />
          <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {SPEAKER_AUDIENCES.map((a) => (
              <li
                key={a}
                className="flex items-start gap-3 rounded-2xl bg-white border border-line p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand"
                />
                <span className="text-ink leading-snug">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center rounded-[2rem] bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-800)] to-[color:var(--color-purple-700)] p-8 sm:p-12 text-white shadow-[0_40px_120px_-50px_rgba(36,16,47,0.6)]">
          <div className="flex justify-center lg:justify-start">
            <BookCover size="lg" />
          </div>
          <div className="space-y-5">
            <Eyebrow tone="light">The book on stage</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-white">
              Talks rooted in Unapologetic.
            </h2>
            <p className="text-lg text-[color:var(--color-purple-100)] leading-relaxed">
              Nicole&apos;s keynotes draw on the same material as her book —{" "}
              <em>Unapologetic: Boldly Lead the Life and Career You Deserve</em>{" "}
              — so attendees walk out with a through-line, not just takeaways.
            </p>
            <div className="relative mt-4 aspect-[3/2.2] w-full overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.45)]">
              <Image
                src="/photos/nicole-stephenson-speaking-3.jpg"
                alt="Nicole Stephenson mid-keynote, microphone in hand."
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <LinkButton href="/book" variant="light">
                About the book
              </LinkButton>
              <LinkButton
                href="/speaker/nicole-stephenson-one-sheet.pdf"
                variant="ghost"
                external
                className="border border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Download one-sheet (PDF)
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      {upcoming.length > 0 ? (
        <Section tone="tint">
          <SectionHeading
            eyebrow="Upcoming stages"
            title="Where to find Nicole next."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </Section>
      ) : null}

      {visiblePartners.length > 0 ? (
        <Section tone="alt">
          <SectionHeading
            eyebrow="Recent rooms"
            title="A few of the organizations Narrativa has worked with."
            align="center"
            lead={
              <Pill tone="brand">Partner relationships listed where confirmed</Pill>
            }
          />
          <div className="mt-12">
            <PartnerLogos partners={visiblePartners} />
          </div>
        </Section>
      ) : null}

      <CTA
        title="Add Nicole to the lineup."
        body="Share your date, venue, and audience — we'll come back with availability and a recommended format."
        primary={{ label: "Submit a speaking inquiry", href: "/contact" }}
        secondary={{
          label: "Download speaker one-sheet",
          href: "/speaker/nicole-stephenson-one-sheet.pdf",
        }}
      />
    </>
  );
}
