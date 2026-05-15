import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { EventCard } from "@/components/EventCard";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { publish } from "@/lib/content";
import { events } from "@/lib/mock/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming keynotes, workshops, panels, and book events with Nicole Stephenson and Narrativa Consulting.",
};

export default function EventsPage() {
  const all = publish(events);
  const upcoming = all.filter((e) => e.is_upcoming);
  const past = all.filter((e) => !e.is_upcoming);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Where the work is happening."
        lead="Keynotes, workshops, fireside conversations, and the Unapologetic book tour — in one place."
      />

      <Section tone="default" containerSize="wide">
        <SectionHeading
          eyebrow="Upcoming"
          title={`${upcoming.length} on the calendar.`}
        />
        {upcoming.length > 0 ? (
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-ink-soft text-lg">
            Nothing on the public calendar right now — check back soon, or get
            in touch about a private booking.
          </p>
        )}
      </Section>

      {past.length > 0 ? (
        <Section tone="tint" containerSize="wide">
          <SectionHeading
            eyebrow="Past"
            title="The road so far."
            lead="Selected past events. Recordings are available on request, where permitted."
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </Section>
      ) : null}

      <CTA
        title="Invite Narrativa to your stage."
        body="Tell us the audience, date, and dream takeaway — we'll respond within three business days."
        primary={{ label: "Send a speaking inquiry", href: "/contact" }}
      />
    </>
  );
}
