import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { EventCard } from "@/components/EventCard";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { StatRow } from "@/components/StatRow";
import { BookCover } from "@/components/BookCover";
import { Quote } from "@/components/Quote";
import { publish, featured } from "@/lib/content";
import { book } from "@/lib/mock/book";
import { events } from "@/lib/mock/events";
import { press } from "@/lib/mock/press";
import { recognition } from "@/lib/mock/recognition";
import { services } from "@/lib/mock/services";

export default function Home() {
  const upcomingEvents = publish(events)
    .filter((e) => e.is_upcoming)
    .slice(0, 3);
  const featuredServices = featured(services).slice(0, 3);
  const featuredPress = publish(press).slice(0, 4);
  const visibleRecognition = publish(recognition);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-purple-50)] via-surface-tint to-surface">
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 h-[40rem] w-[40rem] rounded-full bg-[color:var(--color-purple-100)] blur-3xl opacity-60"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-20 h-[32rem] w-[32rem] rounded-full bg-[color:var(--color-purple-200)] blur-3xl opacity-40"
        />
        <Container className="relative py-24 sm:py-32 lg:py-36">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14 items-center">
            <div className="space-y-7">
              <Eyebrow>Narrativa Consulting</Eyebrow>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-ink">
                Lead the room you are already in —{" "}
                <span className="text-brand">unapologetically.</span>
              </h1>
              <p className="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-xl">
                Narrativa Consulting helps individuals and organizations unlock
                human potential through storytelling, communication,
                authenticity, and leadership. Founded by author and Wharton
                lecturer Nicole Stephenson.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <LinkButton href="/book" size="lg">
                  Read the book
                </LinkButton>
                <LinkButton href="/speaker" size="lg" variant="secondary">
                  Book Nicole to speak
                </LinkButton>
              </div>
              <div className="pt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
                <span className="font-semibold text-ink">As featured in</span>
                <span>Forbes</span>
                <span aria-hidden="true">·</span>
                <span>Fast Company</span>
                <span aria-hidden="true">·</span>
                <span>Wall Street Journal</span>
                <span aria-hidden="true">·</span>
                <span>HBR Women at Work</span>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <BookCover size="xl" />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="default" containerSize="wide">
        <StatRow
          stats={[
            { value: "10+", label: "Years coaching executives & founders" },
            { value: "300", label: "Talks, keynotes, and workshops delivered" },
            { value: "Wharton", label: "Lecturer in Marketing & Communication" },
            { value: "2026", label: "Unapologetic publishes this fall" },
          ]}
        />
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <SectionHeading
            eyebrow="Meet Nicole"
            title={<>A dynamic voice for the leaders writing what&apos;s next.</>}
          />
          <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
            <p>
              Nicole Stephenson is a transformational speaker, communicator, and
              the Founder of Narrativa Consulting. She lectures at The Wharton
              School at the University of Pennsylvania, where she teaches the
              language of leadership to the next generation of operators,
              founders, and creators.
            </p>
            <p>
              Her debut book — <em>Unapologetic: Boldly Lead the Life and Career
              You Deserve</em> — arrives in the fall, and her work shows up in
              every room where the story has finally outgrown the script.
            </p>
            <div className="pt-3">
              <LinkButton href="/about" variant="secondary">
                More about Nicole
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="default">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeading
              eyebrow="Work with Narrativa"
              title="Three ways we move the needle."
              lead="Each engagement is built around your specific room, your specific moment, and the body of work you want to leave behind."
            />
            <LinkButton href="/services" variant="secondary">
              See all services
            </LinkButton>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div className="flex justify-center lg:justify-start">
            <BookCover size="lg" />
          </div>
          <div className="space-y-6">
            <Eyebrow>The Book — Fall 2026</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-ink">
              {book.title}: {book.subtitle}
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed">
              {book.tagline}
            </p>
            <p className="text-ink-soft leading-relaxed">{book.description}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton href="/book" size="lg">
                Read more
              </LinkButton>
              <LinkButton href="/book#pre-order" variant="secondary" size="lg">
                Pre-order
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="default">
        <div className="space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeading
              eyebrow="What's next"
              title="Upcoming events."
              lead="Where to find Nicole on stage, in print, and in person this season."
            />
            <LinkButton href="/events" variant="secondary">
              See all events
            </LinkButton>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <SectionHeading
            eyebrow="In the press"
            title="The story has been everywhere."
            lead="A selection of the rooms that have asked Nicole to bring the work."
          />
          <div className="space-y-3">
            {featuredPress.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-line bg-white p-5 hover:border-[color:var(--color-purple-300)] hover:shadow-[0_10px_30px_-15px_rgba(107,44,145,0.3)] transition-all"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    {p.outlet}
                  </p>
                  <p className="mt-1 font-display text-xl text-ink leading-snug">
                    {p.headline}
                  </p>
                </div>
                <span className="text-sm font-semibold text-brand group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </a>
            ))}
            <div className="pt-2">
              <LinkButton href="/media" variant="secondary">
                Full media coverage
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="default">
        <Quote
          quote={book.praise[0].quote}
          attribution={book.praise[0].attribution}
        />
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="Recognition"
          title="Where the work shows up."
          align="center"
        />
        <ul className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-center">
          {visibleRecognition.map((r) => (
            <li key={r.id} className="space-y-1">
              <p className="font-display text-lg text-ink leading-snug">
                {r.organization}
              </p>
              <p className="text-sm text-ink-soft">{r.award}</p>
              <p className="text-xs text-muted">{r.year}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CTA
        title="Bring Nicole into your next room."
        body="For speaking, advisory, and media — start with a note. We respond within three business days."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Apply for the mentor program", href: "/mentor-program" }}
      />
    </>
  );
}
