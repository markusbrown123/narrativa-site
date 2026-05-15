import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { MentorForm } from "@/components/MentorForm";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { Pill } from "@/components/Pill";

export const metadata: Metadata = {
  title: "Mentor Program",
  description:
    "A small, twice-yearly cohort for leaders rebuilding their narrative, voice, and platform — led by Nicole Stephenson.",
};

const PILLARS = [
  {
    title: "Story",
    body: "Lock in the through-line, signature talks, and bio system that travel with you for years.",
  },
  {
    title: "Voice",
    body: "Stop softening. Build the language that holds the room — on stage, on the page, in the boardroom.",
  },
  {
    title: "Platform",
    body: "Move from occasional credibility to a compounding platform: podcasts, press, op-eds, and stages.",
  },
];

const FAQ = [
  {
    q: "Who is the program for?",
    a: "Senior leaders, founders, and authors with a body of work and a season of visible work ahead — a book, a keynote tour, a fund, a launch.",
  },
  {
    q: "How is it structured?",
    a: "Twelve weeks. Eight group sessions, four 1:1 sessions with Nicole, and a private community channel. Cohorts are capped at twelve.",
  },
  {
    q: "When does it run?",
    a: "Two cohorts a year — January–March and September–November. Applications close 30 days before each start.",
  },
  {
    q: "What is the investment?",
    a: "Tuition is $9,500. Payment plans available. Partial scholarships are awarded to two seats per cohort.",
  },
];

export default function MentorProgramPage() {
  return (
    <>
      <PageHero
        eyebrow="Mentor Program"
        title={
          <>
            A twelve-week cohort for
            <br className="hidden lg:block" /> the unapologetic leader.
          </>
        }
        lead="A small, deliberate group of leaders rebuilding their story, voice, and platform with Nicole — twice a year, twelve seats per cohort."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#apply"
            className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-base font-medium text-white hover:bg-[color:var(--color-purple-700)]"
          >
            Apply now
          </a>
          <a
            href="#details"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-purple-200)] bg-white px-7 py-3.5 text-base font-medium text-brand hover:bg-[color:var(--color-purple-50)]"
          >
            See details
          </a>
        </div>
      </PageHero>

      <Section tone="default" id="details">
        <SectionHeading
          eyebrow="The work"
          title="Three pillars, twelve weeks."
        />
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="rounded-3xl border border-line bg-white p-8"
            >
              <Pill tone="brand">{p.title}</Pill>
              <p className="mt-5 text-ink-soft leading-relaxed text-lg">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <SectionHeading
            eyebrow="What you get"
            title="The full container."
          />
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              "8 live group sessions with Nicole (90 min each)",
              "4 private 1:1 sessions with Nicole",
              "Bio, positioning, and signature talk built in cohort",
              "A pitch packet ready for podcasts and press",
              "Private community channel between cohorts",
              "Lifetime access to Narrativa office hours",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-white border border-line p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand"
                />
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="default">
        <SectionHeading eyebrow="FAQ" title="Common questions." />
        <dl className="mt-12 grid lg:grid-cols-2 gap-x-12 gap-y-10">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt className="font-display text-xl text-ink leading-snug">
                {f.q}
              </dt>
              <dd className="mt-2 text-ink-soft leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="alt" containerSize="narrow" id="apply">
        <div className="text-center mb-10">
          <Eyebrow>Apply</Eyebrow>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-ink">
            Apply to the next cohort.
          </h2>
          <p className="mt-4 text-lg text-ink-soft leading-relaxed">
            Tell us about the work you&apos;re bringing in. We read every
            application carefully — and we respond.
          </p>
        </div>
        <div className="rounded-3xl bg-white border border-line p-8 sm:p-10">
          <MentorForm />
        </div>
      </Section>

      <CTA
        title="Not sure yet? Ask Nicole."
        body="If you're between cohorts or unsure whether the program is right for you, send a note — we'll point you to what fits."
        primary={{ label: "Ask a question", href: "/contact" }}
      />
    </>
  );
}
