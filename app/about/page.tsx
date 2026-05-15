import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { StatRow } from "@/components/StatRow";
import { publish } from "@/lib/content";
import { recognition } from "@/lib/mock/recognition";

export const metadata: Metadata = {
  title: "About Nicole Stephenson",
  description:
    "Nicole Stephenson is a dynamic communicator, author, transformational speaker, Founder of Narrativa Consulting, and Lecturer at The Wharton School / University of Pennsylvania.",
};

const TIMELINE = [
  {
    year: "2014",
    title: "Begins coaching executives",
    body: "Nicole starts working privately with senior leaders on narrative, voice, and visibility.",
  },
  {
    year: "2018",
    title: "Founds Narrativa Consulting",
    body: "The consultancy is built to make narrative leadership a discipline — not a vibe.",
  },
  {
    year: "2022",
    title: "First Wharton lectures",
    body: "Joins The Wharton School to teach narrative authority to MBAs.",
  },
  {
    year: "2025",
    title: "Becomes Lecturer at Wharton",
    body: "Promoted to Lecturer in Marketing & Communication at The University of Pennsylvania.",
  },
  {
    year: "2026",
    title: "Publishes Unapologetic",
    body: "Her debut book — Unapologetic: Boldly Lead the Life and Career You Deserve — arrives this fall.",
  },
];

export default function AboutPage() {
  const visibleRecognition = publish(recognition);
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A communicator, author, and the founder
            <br className="hidden lg:block" /> of Narrativa Consulting.
          </>
        }
        lead="Nicole Stephenson teaches leaders to stop performing competence and start telling the truth — out loud, on the record, on the stage."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/speaker">Book Nicole to speak</LinkButton>
          <LinkButton href="/contact" variant="secondary">
            Get in touch
          </LinkButton>
        </div>
      </PageHero>

      <Section tone="default">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 items-start">
          <SectionHeading
            eyebrow="Bio"
            title={<>The short version.</>}
          />
          <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
            <p>
              Nicole Stephenson is a dynamic communicator, author, and
              transformational speaker — and the Founder of{" "}
              <strong className="text-ink">Narrativa Consulting</strong>, a
              boutique advisory built around storytelling, communication,
              authenticity, and leadership.
            </p>
            <p>
              She lectures at The Wharton School at the University of
              Pennsylvania, where she teaches the language of leadership to
              MBAs, executives, and creators. Her client work runs from
              Fortune 500 executives navigating succession to authors,
              founders, and creators preparing for the platform their work has
              outgrown.
            </p>
            <p>
              Her debut book —{" "}
              <em>Unapologetic: Boldly Lead the Life and Career You Deserve</em>{" "}
              — publishes this fall.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="tint" containerSize="wide">
        <SectionHeading
          eyebrow="By the numbers"
          title="A decade of narrative work."
        />
        <div className="mt-12">
          <StatRow
            stats={[
              { value: "10+", label: "Years coaching executives & founders" },
              { value: "300", label: "Talks, keynotes, workshops delivered" },
              { value: "40", label: "Industries served across the bench" },
              { value: "Wharton", label: "Lecturer in Marketing & Communication" },
            ]}
          />
        </div>
      </Section>

      <Section tone="default">
        <SectionHeading
          eyebrow="Timeline"
          title="How Narrativa got here."
        />
        <ol className="mt-14 space-y-10 lg:space-y-12">
          {TIMELINE.map((step) => (
            <li
              key={step.year}
              className="grid lg:grid-cols-[10rem_1fr] gap-6 lg:gap-12 items-start"
            >
              <div className="text-brand font-display text-3xl font-medium tracking-tight">
                {step.year}
              </div>
              <div className="space-y-2 border-l-2 border-[color:var(--color-purple-100)] pl-6">
                <p className="font-display text-2xl text-ink leading-snug">
                  {step.title}
                </p>
                <p className="text-ink-soft leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="Recognition"
          title="Where the work shows up."
          align="center"
        />
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleRecognition.map((r) => (
            <li
              key={r.id}
              className="rounded-3xl bg-white border border-line p-6 space-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {r.year}
              </p>
              <p className="font-display text-lg text-ink leading-snug">
                {r.organization}
              </p>
              <p className="text-sm text-ink-soft">{r.award}</p>
              {r.summary ? (
                <p className="text-sm text-ink-soft pt-1 leading-relaxed">
                  {r.summary}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <CTA
        title="Talk to Nicole about your moment."
        body="Whether it's a keynote, a book, a launch, or a season of work — start with a note."
        primary={{ label: "Send a note", href: "/contact" }}
        secondary={{ label: "Apply to the mentor program", href: "/mentor-program" }}
      />
    </>
  );
}
