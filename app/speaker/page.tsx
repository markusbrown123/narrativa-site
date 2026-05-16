import type { Metadata } from "next";
import Image from "next/image";
import { BookCover } from "@/components/BookCover";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { EventCard } from "@/components/EventCard";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { Pill } from "@/components/Pill";
import { publish } from "@/lib/content";
import { events } from "@/lib/mock/events";

export const metadata: Metadata = {
  title: "Speaker",
  description:
    "Book Nicole Stephenson, IOM — author, Wharton lecturer, and transformational speaker — for your keynote, panel, workshop, or fireside.",
};

const TALK_THEMES = [
  {
    name: "Unapologetic Leadership",
    audience: "Executive women · Leadership summits · Conferences",
    description:
      "A keynote built around the themes of Unapologetic: authenticity, courage, self-advocacy, and the work of leading without permission.",
    formats: ["Keynote", "Fireside", "Workshop"],
  },
  {
    name: "Storytelling & Communication",
    audience: "Founders · Operators · Communication teams",
    description:
      "How leaders unlock potential in themselves, their teams, and their organizations through narrative, voice, and clear communication.",
    formats: ["Keynote", "Workshop"],
  },
  {
    name: "Redefining Success",
    audience: "Career-stage women · Mid-career leaders · Mentorship programs",
    description:
      "A conversation on career clarity, burnout, people-pleasing, and what it really means to define success on your own terms.",
    formats: ["Keynote", "Fireside", "Panel"],
  },
];

const AUDIENCES = [
  "Executive leadership summits",
  "Corporate ERGs and DEI programs",
  "Founder and operator conferences",
  "University and MBA programs",
  "Book clubs and author events",
  "Women's leadership and mentorship programs",
];

export default function SpeakerPage() {
  const upcoming = publish(events).filter((e) => e.is_upcoming);
  const past = publish(events).filter((e) => !e.is_upcoming);

  return (
    <>
      <PageHero
        eyebrow="Speaker"
        title={
          <>
            Book Nicole for your
            <br className="hidden lg:block" /> next keynote or fireside.
          </>
        }
        lead="Nicole Stephenson, IOM is a transformational speaker, Lecturer at The Wharton School / University of Pennsylvania, Founder of Narrativa Consulting, and author of Unapologetic: Boldly Lead the Life and Career You Deserve."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/contact" size="lg">
            Book Nicole
          </LinkButton>
          <LinkButton href="#talks" size="lg" variant="secondary">
            See talk themes
          </LinkButton>
          <LinkButton
            href="/speaker/nicole-speaker-one-sheet.pdf"
            size="lg"
            variant="secondary"
            external
          >
            Download one-sheet (PDF)
          </LinkButton>
        </div>
      </PageHero>

      <Section tone="default" id="talks">
        <SectionHeading
          eyebrow="Talk themes"
          title="What Nicole speaks about."
          lead="Each talk is tailored. Every booking begins with a discovery conversation so the talk matches your audience and moment."
        />
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {TALK_THEMES.map((talk) => (
            <article
              key={talk.name}
              className="flex flex-col h-full rounded-3xl border border-line bg-white p-8 hover:border-[color:var(--color-purple-300)] transition-all"
            >
              <Eyebrow>Theme</Eyebrow>
              <h3 className="mt-4 font-display text-2xl text-ink leading-snug">
                {talk.name}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{talk.audience}</p>
              <p className="mt-4 text-ink-soft leading-relaxed">
                {talk.description}
              </p>
              <div className="mt-6 pt-6 border-t border-line">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  Formats
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {talk.formats.map((f) => (
                    <li key={f}>
                      <Pill tone="brand">{f}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          <SectionHeading
            eyebrow="Audiences"
            title="Built for the room you are about to fill."
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {AUDIENCES.map((a) => (
              <li
                key={a}
                className="flex items-start gap-3 rounded-2xl bg-white border border-line p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand"
                />
                <span className="text-ink">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="default">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <div className="flex justify-center lg:justify-start">
            <BookCover size="lg" />
          </div>
          <div className="space-y-5">
            <Eyebrow>The book on stage</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-ink">
              Talks rooted in Unapologetic.
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed">
              Nicole&apos;s keynotes draw on the same material as her book —{" "}
              <em>Unapologetic: Boldly Lead the Life and Career You Deserve</em>{" "}
              — so attendees walk out with a through-line, not just takeaways.
            </p>
            <div className="relative mt-4 aspect-[3/2.2] w-full overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_90px_-40px_rgba(43,15,68,0.45)]">
              <Image
                src="/book/unapologetic-book-stack.jpg"
                alt="Printed copies of Unapologetic — the book Nicole's talks are built around."
                fill
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="pt-2">
              <LinkButton href="/book" variant="secondary">
                About the book
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      {upcoming.length > 0 ? (
        <Section tone="default">
          <SectionHeading
            eyebrow="Upcoming stages"
            title="Where to find Nicole next."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </Section>
      ) : null}

      {past.length > 0 ? (
        <Section tone="default">
          <SectionHeading
            eyebrow="Past stages"
            title="Rooms that have already had Nicole."
          />
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {past.map((e) => (
              <li
                key={e.id}
                className="rounded-2xl border border-line bg-white px-5 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  {e.format}
                </p>
                <p className="mt-1 font-display text-lg text-ink leading-snug">
                  {e.title}
                </p>
                {e.location ? (
                  <p className="text-sm text-ink-soft">{e.location}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CTA
        title="Add Nicole to the lineup."
        body="Share your date, venue, and audience — we'll come back with availability, fees, and a recommended format."
        primary={{ label: "Submit a speaking inquiry", href: "/contact" }}
        secondary={{
          label: "Download speaker one-sheet",
          href: "/speaker/nicole-speaker-one-sheet.pdf",
        }}
      />
    </>
  );
}
