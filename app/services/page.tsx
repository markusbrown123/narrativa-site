import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { AnimatedSectionBand } from "@/components/AnimatedSectionBand";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { publish } from "@/lib/content";
import { services } from "@/lib/mock/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Speaker brand development, marketing and visibility, content and writing, speaker assets, media production, speaking engagement development, and event strategy.",
};

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    body: "A focused intro call — your moment, your audience, your real goal.",
  },
  {
    step: "02",
    title: "Proposal",
    body: "A written proposal with the scope and the deliverables.",
  },
  {
    step: "03",
    title: "Build",
    body: "Working sessions in regular increments. You see drafts in progress — not just at the end.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Hand-off of the final assets, with optional ongoing support if it makes sense.",
  },
];

/**
 * Service categories are grouped into four phases — Foundation,
 * Visibility, Assets, Engagements — so a visitor can self-locate. The
 * phase labels are descriptive only; they do not promise any sequence,
 * timeline, or guarantee.
 */
type Phase = {
  key: string;
  number: string;
  name: string;
  caption: string;
  body: string;
  serviceIds: string[];
};

const PHASES: Phase[] = [
  {
    key: "foundation",
    number: "01",
    name: "Foundation",
    caption: "Position",
    body: "Define who you are on stage, who you serve, and what makes the work yours.",
    serviceIds: ["svc-speaker-brand-development"],
  },
  {
    key: "visibility",
    number: "02",
    name: "Visibility",
    caption: "Get seen",
    body: "Turn expertise into reach with a plan for website, social, newsletter, and outreach.",
    serviceIds: ["svc-marketing-visibility-strategy", "svc-content-writing"],
  },
  {
    key: "assets",
    number: "03",
    name: "Assets",
    caption: "Look the part",
    body: "Design and produce the speaker assets that turn interest into booked engagements.",
    serviceIds: ["svc-speaker-assets-design", "svc-media-production-referrals"],
  },
  {
    key: "engagements",
    number: "04",
    name: "Engagements",
    caption: "Take the stage",
    body: "Shape the keynote, build the program, host the room — and execute the moment.",
    serviceIds: [
      "svc-speaking-engagement-development",
      "svc-event-strategy",
    ],
  },
];

export default function ServicesPage() {
  const visibleServices = publish(services);
  const serviceById = new Map(visibleServices.map((s) => [s.id, s]));

  return (
    <>
      <PageHero
        eyebrow="Services"
        variant="centered"
        tone="lavender"
        title="Build, Elevate, and Monetize Your Speaking Brand."
        lead="A focused set of engagements built for leaders, authors, and organizations turning a body of work into a platform — and a platform into a business."
      >
        <LinkButton href="/contact" size="lg">
          Start a conversation
        </LinkButton>
        <LinkButton href="#services" size="lg" variant="secondary">
          See the menu
        </LinkButton>
      </PageHero>

      {/* Premium intro band — gives the page a deliberate lavender beat
          before the cards and tells the visitor how to read the menu. */}
      <AnimatedSectionBand tone="lavender" hairline>
        <ScrollReveal direction="up" duration={700}>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="space-y-5">
              <Eyebrow>How to use this page</Eyebrow>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Choose the support you need now — from brand foundation to booked stages.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                Narrativa engagements are scoped to the moment in front of
                you. They&apos;re sequenced into four phases so you can
                self-locate — but you don&apos;t have to start at phase one.
                Pick the work that matches where you are.
              </p>
              <p>
                Every engagement is built around your voice, your audience,
                and your real goal. Bundles and standalone scopes are both
                on the table.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {PHASES.map((phase) => (
                  <a
                    key={phase.key}
                    href={`#phase-${phase.key}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-purple-300)] bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-brand uppercase backdrop-blur transition-colors hover:bg-white"
                  >
                    <span className="text-[color:var(--color-purple-500)]">
                      {phase.number}
                    </span>
                    {phase.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </AnimatedSectionBand>

      {/* Phase-grouped service menu */}
      <Section tone="tint" containerSize="wide" id="services">
        <SectionHeading
          eyebrow="The menu"
          title="Seven ways Narrativa partners with you."
          lead="Grouped by phase — pick the work that matches where you are."
        />
        <div className="mt-14 space-y-16">
          {PHASES.map((phase) => {
            const cards = phase.serviceIds
              .map((id) => serviceById.get(id))
              .filter((s): s is NonNullable<typeof s> => Boolean(s));
            if (cards.length === 0) return null;
            return (
              <ScrollReveal
                key={phase.key}
                as="section"
                direction="up"
                duration={700}
                className="scroll-mt-24"
              >
                <div id={`phase-${phase.key}`} className="scroll-mt-24" />
                <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
                  <div className="space-y-3">
                    <p className="font-display text-5xl font-medium text-[color:var(--color-purple-400)]">
                      {phase.number}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                      {phase.caption}
                    </p>
                    <h3 className="font-display text-3xl font-medium leading-tight text-ink">
                      {phase.name}
                    </h3>
                    <p className="text-ink-soft leading-relaxed">{phase.body}</p>
                  </div>
                  <div
                    className={
                      cards.length === 1
                        ? "grid gap-6"
                        : "grid gap-6 md:grid-cols-2 lg:gap-8"
                    }
                  >
                    {cards.map((s) => (
                      <ServiceCard key={s.id} service={s} detailed />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="How we work"
          title="Four steps. No mystery."
          lead="Engagements are intentionally short and tightly scoped. We say no to vague — and yes to repeatable."
        />
        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PROCESS.map((p, i) => (
            <ScrollReveal
              key={p.step}
              as="li"
              direction="up"
              delay={i * 80}
              duration={650}
              className="rounded-3xl bg-white border border-[color:var(--color-purple-200)] p-7"
            >
              <p className="font-display text-4xl text-[color:var(--color-purple-500)] font-medium">
                {p.step}
              </p>
              <h3 className="mt-3 font-display text-xl text-ink leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{p.body}</p>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      <AnimatedSectionBand tone="twilight" hairline containerSize="default">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="space-y-5">
            <Eyebrow tone="light">Engagements</Eyebrow>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl">
              Straightforward, by the engagement.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-[color:var(--color-purple-100)]">
            <p>
              Every engagement is scoped to the work in front of you. Speaking,
              advisory, and project work are quoted on request.
            </p>
            <p>Send a note and Nicole will be in touch.</p>
            <div className="pt-2">
              <LinkButton href="/contact" variant="light" size="lg">
                Send a note
              </LinkButton>
            </div>
          </div>
        </div>
      </AnimatedSectionBand>

      <CTA
        title="Start the conversation."
        body="Tell us the moment you're building toward and we'll come back with the right shape of engagement."
        primary={{ label: "Send a note", href: "/contact" }}
        secondary={{ label: "Apply to the mentor program", href: "/mentor-program" }}
      />
    </>
  );
}
