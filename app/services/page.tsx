import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
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

export default function ServicesPage() {
  const visibleServices = publish(services);
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

      <Section tone="tint" containerSize="wide" id="services">
        <SectionHeading
          eyebrow="The menu"
          title="Seven ways Narrativa partners with you."
          lead="Each engagement is scoped to the work in front of you — bundled or standalone, depending on the moment."
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6 lg:gap-8">
          {visibleServices.map((s) => (
            <ServiceCard key={s.id} service={s} detailed />
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="How we work"
          title="Four steps. No mystery."
          lead="Engagements are intentionally short and tightly scoped. We say no to vague — and yes to repeatable."
        />
        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PROCESS.map((p) => (
            <li
              key={p.step}
              className="rounded-3xl bg-white border border-[color:var(--color-purple-200)] p-7"
            >
              <p className="font-display text-4xl text-[color:var(--color-purple-500)] font-medium">
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

      <Section tone="tint">
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
