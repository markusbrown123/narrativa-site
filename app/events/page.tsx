import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { EventCard } from "@/components/EventCard";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { UpcomingEventFeature } from "@/components/UpcomingEventFeature";
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
  const [nextEvent, ...moreUpcoming] = upcoming;
  const past = all.filter((e) => !e.is_upcoming);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Where the work is happening."
        lead="Keynotes, workshops, fireside conversations, and the Unapologetic book tour — in one place."
      />

      {nextEvent ? (
        <Section tone="default" containerSize="wide">
          <SectionHeading
            eyebrow="Next up"
            title="The next confirmed stage."
            lead="Date, venue, role, and audience — at a glance."
          />
          <div className="mt-10">
            <UpcomingEventFeature event={nextEvent} variant="panel" />
          </div>
        </Section>
      ) : (
        <Section tone="default" containerSize="wide">
          <SectionHeading
            eyebrow="Upcoming"
            title="No public events on the calendar right now."
          />
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">
            Check back soon, or get in touch about a private booking.
          </p>
        </Section>
      )}

      {moreUpcoming.length > 0 ? (
        <Section tone="tint" containerSize="wide">
          <SectionHeading
            eyebrow="Also upcoming"
            title={`${moreUpcoming.length} more on the calendar.`}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {moreUpcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </Section>
      ) : null}

      {past.length > 0 ? (
        <Section
          tone={moreUpcoming.length > 0 ? "default" : "tint"}
          containerSize="wide"
        >
          <SectionHeading
            eyebrow="Past"
            title="The road so far."
            lead="Selected past events. Recordings are available on request, where permitted."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {past.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </Section>
      ) : null}

      <CTA
        title="Invite Narrativa to your stage."
        body="Tell us the audience, date, and dream takeaway — Nicole will be in touch."
        primary={{ label: "Send a speaking inquiry", href: "/contact" }}
      />
    </>
  );
}
