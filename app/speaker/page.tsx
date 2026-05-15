import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { EventCard } from "@/components/EventCard";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { Pill } from "@/components/Pill";
import { Quote } from "@/components/Quote";
import { publish } from "@/lib/content";
import { events } from "@/lib/mock/events";
import { book } from "@/lib/mock/book";

export const metadata: Metadata = {
  title: "Speaker",
  description:
    "Book Nicole Stephenson — author, Wharton lecturer, and transformational speaker — for your keynote, panel, workshop, or fireside.",
};

const SIGNATURE_TALKS = [
  {
    name: "The Unapologetic Leader",
    audience: "Executive women · Leadership summits · Conferences",
    description:
      "A keynote on the moment polite ambition stops paying — and what replaces it. Built around the framework from Unapologetic.",
    formats: ["45-min keynote", "60-min keynote + Q&A", "90-min workshop"],
  },
  {
    name: "Narrative Authority",
    audience: "Senior leaders · Founders · Marketing teams",
    description:
      "Authority isn't a louder voice — it's a story you can be trusted to tell the same way twice. How to build one.",
    formats: ["45-min keynote", "Half-day intensive"],
  },
  {
    name: "The Authenticity Premium",
    audience: "Founders · Creators · Brand & marketing leaders",
    description:
      "Why audiences reward leaders who tell the truth — and the specific cost paid by the ones who don't.",
    formats: ["45-min keynote", "60-min fireside", "Panel"],
  },
];

const AUDIENCES = [
  "Executive leadership summits",
  "Annual sales kickoffs",
  "Corporate ERGs and DEI programs",
  "Founder and operator conferences",
  "University and MBA programs",
  "Book clubs and author events",
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
            The keynote your audience
            <br className="hidden lg:block" /> still quotes a year later.
          </>
        }
        lead="Nicole Stephenson is a transformational speaker, Wharton lecturer, and the author of Unapologetic. She has spoken to thousands of leaders across stages from Wharton to SXSW."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/contact" size="lg">
            Book Nicole
          </LinkButton>
          <LinkButton href="#talks" size="lg" variant="secondary">
            See signature talks
          </LinkButton>
        </div>
      </PageHero>

      <Section tone="default" id="talks">
        <SectionHeading
          eyebrow="Signature talks"
          title="Three talks. Built for the rooms that matter."
          lead="Each can be tailored — and Nicole will. Every booking begins with a 30-minute discovery call so the talk matches the moment."
        />
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {SIGNATURE_TALKS.map((talk) => (
            <article
              key={talk.name}
              className="flex flex-col h-full rounded-3xl border border-line bg-white p-8 hover:border-[color:var(--color-purple-300)] transition-all"
            >
              <Eyebrow>Keynote</Eyebrow>
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

      <Section tone="alt">
        <Quote
          quote={book.praise[1].quote}
          attribution={book.praise[1].attribution}
        />
      </Section>

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
                <p className="text-sm text-ink-soft">{e.location}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CTA
        title="Add Nicole to the lineup."
        body="Share your date, venue, and audience — we'll come back with availability, fees, and a recommended format."
        primary={{ label: "Submit a speaking inquiry", href: "/contact" }}
        secondary={{ label: "Download bio + one-sheet", href: "/contact" }}
      />
    </>
  );
}
