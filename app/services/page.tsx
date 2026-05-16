import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
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
    body: "A focused intro call — your moment, your audience, your hard constraints, your real goal.",
  },
  {
    step: "02",
    title: "Proposal",
    body: "A written proposal with the scope, the deliverables, and the timeline.",
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

export default function ServicesPage() {
  const visibleServices = publish(services);
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            How Narrativa shows up
            <br className="hidden lg:block" /> for your work.
          </>
        }
        lead="A focused set of engagements built for leaders, authors, and organizations turning a body of work into a platform — and a platform into a business."
      />

      <Section tone="default" containerSize="wide">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {visibleServices.map((s) => (
            <ServiceCard key={s.id} service={s} detailed />
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="How we work"
          title="Four steps. No mystery."
          lead="Engagements are intentionally short and tightly scoped. We say no to vague — and yes to repeatable."
        />
        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PROCESS.map((p) => (
            <li
              key={p.step}
              className="rounded-3xl bg-white border border-line p-7"
            >
              <p className="font-display text-4xl text-[color:var(--color-purple-300)] font-medium">
                {p.step}
              </p>
              <h3 className="mt-3 font-display text-xl text-ink leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-ink-soft leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="default">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <SectionHeading
            eyebrow="Engagements"
            title="Straightforward, by the engagement."
          />
          <div className="space-y-4 text-ink-soft leading-relaxed text-lg">
            <p>
              Every engagement is scoped to the work in front of you. Speaking,
              advisory, and project work are quoted on request.
            </p>
            <p>
              Send a note and Nicole will be in touch.
            </p>
          </div>
        </div>
      </Section>

      <CTA
        title="Start the conversation."
        body="Tell us the moment you're building toward and we'll come back with the right shape of engagement."
        primary={{ label: "Send a note", href: "/contact" }}
        secondary={{ label: "Apply to the mentor program", href: "/mentor-program" }}
      />
    </>
  );
}
