import Image from "next/image";
import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { EventCard } from "@/components/EventCard";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { StatRow } from "@/components/StatRow";
import { BookCover } from "@/components/BookCover";
import { PartnerLogos } from "@/components/PartnerLogos";
import { PodcastCard } from "@/components/MediaCard";
import { publish, featured } from "@/lib/content";
import { book } from "@/lib/mock/book";
import { events } from "@/lib/mock/events";
import { partners } from "@/lib/mock/partners";
import { podcasts } from "@/lib/mock/podcasts";
import { recognition } from "@/lib/mock/recognition";
import { services } from "@/lib/mock/services";

export default function Home() {
  const upcomingEvents = publish(events)
    .filter((e) => e.is_upcoming)
    .slice(0, 3);
  const featuredServices = featured(services).slice(0, 3);
  const visibleRecognition = publish(recognition);
  const visiblePartners = publish(partners);
  const featuredPodcasts = publish(podcasts).slice(0, 3);

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
        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="space-y-7">
              <Eyebrow>Narrativa Consulting</Eyebrow>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-ink">
                Unlock human potential through{" "}
                <span className="text-brand">storytelling.</span>
              </h1>
              <p className="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-xl">
                Narrativa Consulting helps individuals and organizations unlock
                human potential through storytelling, communication,
                authenticity, and leadership. Founded by author, transformational
                speaker, and Wharton lecturer Nicole Stephenson, IOM.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <LinkButton href="/book" size="lg">
                  Read the book
                </LinkButton>
                <LinkButton href="/speaker" size="lg" variant="secondary">
                  Book Nicole to speak
                </LinkButton>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end gap-6 items-end">
              <div className="hidden sm:block relative h-72 w-52 lg:h-80 lg:w-56 rounded-3xl overflow-hidden ring-1 ring-line shadow-[0_20px_60px_-25px_rgba(43,15,68,0.45)]">
                <Image
                  src="/photos/nicole-stephenson-headshot-plaid.jpg"
                  alt="Nicole Stephenson, IOM — Founder of Narrativa Consulting and Lecturer at The Wharton School / University of Pennsylvania."
                  fill
                  sizes="(min-width: 1024px) 224px, 208px"
                  priority
                  className="object-cover"
                />
              </div>
              <BookCover size="lg" priority />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="default" containerSize="wide">
        <StatRow
          stats={[
            { value: "Wharton", label: "Lecturer at The Wharton School / University of Pennsylvania" },
            { value: "Author", label: "Unapologetic: Boldly Lead the Life and Career You Deserve" },
            { value: "Founder", label: "Narrativa Consulting" },
            { value: "IOM", label: "Institute for Organization Management" },
          ]}
        />
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-center">
          <div className="relative aspect-[3/4] max-w-sm w-full mx-auto lg:mx-0 overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_70px_-30px_rgba(43,15,68,0.45)]">
            <Image
              src="/photos/nicole-stephenson-power-women.jpg"
              alt="Editorial portrait of Nicole Stephenson in an emerald green dress against a floral background — from Main Line Today's 2024 Power Women feature."
              fill
              sizes="(min-width: 1024px) 24rem, 20rem"
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Meet Nicole"
              title={<>A dynamic voice for the leaders writing what&apos;s next.</>}
            />
            <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
              <p>
                Nicole Stephenson, IOM is a dynamic communicator, author,
                transformational speaker, Founder of Narrativa Consulting, and
                Lecturer at The Wharton School / University of Pennsylvania.
              </p>
              <p>
                Her debut book — <em>Unapologetic: Boldly Lead the Life and Career
                You Deserve</em> — is a roadmap to authenticity, courage, and
                sustainable personal and professional development.
              </p>
            </div>
            <div className="pt-1">
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
              lead="Speaker brand, visibility strategy, and the writing and design that make a body of work look like one."
            />
            <LinkButton href="/services" variant="secondary">
              See all services
            </LinkButton>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
            <Eyebrow>The Book</Eyebrow>
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
            </div>
          </div>
        </div>
        <div className="mt-16 lg:mt-20">
          <div className="relative aspect-[3/2.2] w-full overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_90px_-40px_rgba(43,15,68,0.45)]">
            <Image
              src="/book/unapologetic-book-stack.jpg"
              alt="A stack of Unapologetic by Nicole Stephenson — printed copies of the book in hand."
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {upcomingEvents.length > 0 ? (
        <Section tone="default">
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <SectionHeading
                eyebrow="What's next"
                title="Upcoming events."
                lead="Where to find Nicole on stage and in person this season."
              />
              <LinkButton href="/events" variant="secondary">
                See all events
              </LinkButton>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {upcomingEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {featuredPodcasts.length > 0 ? (
        <Section tone="tint">
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <SectionHeading
                eyebrow="On the record"
                title="In the press and on the show."
                lead="Recent long-form conversations and podcast appearances."
              />
              <LinkButton href="/media" variant="secondary">
                See all media
              </LinkButton>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredPodcasts.map((p) => (
                <PodcastCard key={p.id} podcast={p} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {visibleRecognition.length > 0 ? (
        <Section tone="alt">
          <SectionHeading
            eyebrow="Recognition"
            title="Where the work shows up."
            align="center"
          />
          <ul className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-center">
            {visibleRecognition.map((r) => (
              <li key={r.id} className="space-y-1.5">
                <p className="font-display text-lg text-ink leading-snug">
                  {r.organization}
                </p>
                <p className="text-sm text-ink-soft leading-snug">{r.award}</p>
                {r.year ? (
                  <p className="text-xs text-muted">{r.year}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {visiblePartners.length > 0 ? (
        <Section tone="default">
          <SectionHeading
            eyebrow="Partners & engagements"
            title="Recent rooms Narrativa has been in."
            align="center"
          />
          <div className="mt-14">
            <PartnerLogos partners={visiblePartners} />
          </div>
        </Section>
      ) : null}

      <CTA
        title="Bring Nicole into your next room."
        body="For speaking, advisory, and media — start with a note."
        primary={{ label: "Get in touch", href: "/contact" }}
        secondary={{ label: "Apply for the mentor program", href: "/mentor-program" }}
      />
    </>
  );
}
