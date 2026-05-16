import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/Button";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { EventCard } from "@/components/EventCard";
import { HeroRotator, type HeroPhoto } from "@/components/HeroRotator";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { BookCover } from "@/components/BookCover";
import { PartnerLogos } from "@/components/PartnerLogos";
import { PodcastCard } from "@/components/MediaCard";
import { publish, featured, formatDate, formatDateRange } from "@/lib/content";
import { book } from "@/lib/mock/book";
import { events } from "@/lib/mock/events";
import { partners } from "@/lib/mock/partners";
import { photos } from "@/lib/mock/photos";
import { podcasts } from "@/lib/mock/podcasts";
import { recognition } from "@/lib/mock/recognition";
import { services } from "@/lib/mock/services";

const HERO_PHOTOS: HeroPhoto[] = [
  {
    src: "/photos/nicole-stephenson-headshot-plaid.jpg",
    alt: "Nicole Stephenson, IOM — studio portrait in a navy and red plaid blazer.",
    objectPosition: "center 20%",
  },
  {
    src: "/photos/nicole-stephenson-headshot-blue.jpg",
    alt: "Nicole Stephenson — studio headshot in a royal blue top.",
    objectPosition: "center 18%",
  },
  {
    src: "/photos/nicole-stephenson-headshot-floral.jpg",
    alt: "Nicole Stephenson — studio headshot in a black-and-white floral top.",
    objectPosition: "center 18%",
  },
  {
    src: "/photos/nicole-stephenson-portrait-outdoor.jpg",
    alt: "Nicole Stephenson — outdoor portrait in a striped dress, arms folded, with a rolling lawn behind her.",
    objectPosition: "center 25%",
  },
  {
    src: "/photos/nicole-stephenson-power-women.jpg",
    alt: "Nicole Stephenson — editorial portrait in an emerald green dress against a floral background, from Main Line Today's 2024 Power Women feature.",
    objectPosition: "center 15%",
  },
];

const IDENTITY_CHIPS = [
  "Wharton Lecturer",
  "Author of Unapologetic",
  "Transformational Speaker",
  "Founder, Narrativa Consulting",
];

export default function Home() {
  const upcomingEvents = publish(events)
    .filter((e) => e.is_upcoming)
    .slice(0, 3);
  const nextEvent = upcomingEvents[0];
  const featuredServices = featured(services).slice(0, 3);
  const visibleRecognition = publish(recognition).slice(0, 4);
  const visiblePartners = publish(partners);
  const featuredPodcasts = publish(podcasts).slice(0, 3);
  const speakingPhotos = publish(photos)
    .filter((p) => p.category === "Speaking")
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-purple-50)] via-surface-tint to-surface">
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-32 h-[44rem] w-[44rem] rounded-full bg-[color:var(--color-purple-100)] blur-3xl opacity-60"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-24 h-[36rem] w-[36rem] rounded-full bg-[color:var(--color-purple-200)] blur-3xl opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 hidden h-72 w-72 -translate-x-1/2 rounded-full bg-[color:var(--color-purple-50)] blur-3xl opacity-50 lg:block"
        />
        <Container className="relative pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div className="order-2 space-y-7 lg:order-1">
              <Eyebrow>Narrativa Consulting</Eyebrow>
              <h1 className="font-display text-[2.75rem] leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]">
                Lead like the story you came to{" "}
                <span className="text-brand">tell.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                Narrativa Consulting is the storytelling, communication, and
                leadership practice of author, transformational speaker, and
                Wharton lecturer Nicole Stephenson, IOM.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <LinkButton href="/contact" size="lg">
                  Book Nicole to speak
                </LinkButton>
                <LinkButton href="/book" size="lg" variant="secondary">
                  Read Unapologetic
                </LinkButton>
              </div>
              <ul className="flex flex-wrap gap-x-2 gap-y-2 pt-2">
                {IDENTITY_CHIPS.map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center rounded-full border border-[color:var(--color-purple-200)] bg-white/70 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[color:var(--color-purple-800)] backdrop-blur"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto w-full max-w-[26rem] lg:ml-auto lg:mr-0">
                <HeroRotator
                  photos={HERO_PHOTOS}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 22rem, 88vw"
                  className="aspect-[4/5] w-full rounded-[2rem] bg-surface-tint shadow-[0_30px_80px_-30px_rgba(43,15,68,0.55)] ring-1 ring-[color:var(--color-purple-200)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 -left-3 hidden h-24 w-24 rounded-3xl border border-[color:var(--color-purple-200)] sm:block"
                />
                <div className="pointer-events-none absolute -bottom-6 -left-6 z-10 sm:-bottom-8 sm:-left-8">
                  <Link
                    href="/book"
                    className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-[0_20px_50px_-25px_rgba(43,15,68,0.45)] transition-colors hover:border-[color:var(--color-purple-300)]"
                  >
                    <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-sm shadow-md">
                      <Image
                        src="/book/unapologetic-front-cover.jpg"
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <span className="block leading-tight">
                      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-brand">
                        New book · March 2026
                      </span>
                      <span className="font-display text-base text-ink">
                        Unapologetic
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {nextEvent ? (
          <Container className="relative pb-12 sm:pb-16">
            <NowUpcomingStrip
              eventTitle={nextEvent.title}
              eventDate={nextEvent.date}
              eventLocation={nextEvent.location}
              eventFormat={nextEvent.format}
            />
          </Container>
        ) : null}
      </section>

      {speakingPhotos.length > 0 ? (
        <Section tone="default" containerSize="wide">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="On stage"
                title="A voice built for the room."
                lead="Keynotes, fireside chats, and breakout sessions for leaders, teams, and the next generation of professionals."
              />
              <LinkButton href="/speaker" variant="secondary">
                See speaking topics
              </LinkButton>
            </div>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
              {speakingPhotos.map((photo) => (
                <li
                  key={photo.id}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface-tint"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <Section tone="tint">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-[0_30px_70px_-30px_rgba(43,15,68,0.45)] ring-1 ring-line lg:mx-0">
            <Image
              src="/photos/nicole-stephenson-wharton.jpg"
              alt="Nicole Stephenson photographed on the University of Pennsylvania campus in a floral dress and white blazer, in front of the Wharton glass facade."
              fill
              sizes="(min-width: 1024px) 24rem, 20rem"
              className="object-cover object-[center_25%]"
            />
          </div>
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Meet Nicole"
              title={
                <>A dynamic voice for the leaders writing what&apos;s next.</>
              }
            />
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                Nicole Stephenson, IOM is a dynamic communicator, author,
                transformational speaker, Founder of Narrativa Consulting, and
                Lecturer at The Wharton School / University of Pennsylvania.
              </p>
              <p>
                Her debut book —{" "}
                <em>Unapologetic: Boldly Lead the Life and Career You Deserve</em>{" "}
                — is a roadmap to authenticity, courage, and sustainable
                personal and professional development.
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

      <Section tone="alt">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex justify-center lg:justify-start">
            <BookCover size="lg" />
          </div>
          <div className="space-y-6">
            <Eyebrow>The book</Eyebrow>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {book.title}: {book.subtitle}
            </h2>
            <p className="text-lg leading-relaxed text-ink-soft">
              {book.tagline}
            </p>
            <p className="leading-relaxed text-ink-soft">{book.description}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton href="/book" size="lg">
                Read more
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="mt-16 lg:mt-20">
          <div className="relative aspect-[3/2.2] w-full overflow-hidden rounded-3xl shadow-[0_30px_90px_-40px_rgba(43,15,68,0.45)] ring-1 ring-line">
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

      <Section tone="default">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Work with Narrativa"
              title="Three ways we move the needle."
              lead="Speaker brand, visibility strategy, and the writing and design that make a body of work look like one."
            />
            <LinkButton href="/services" variant="secondary">
              See all services
            </LinkButton>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featuredServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </Section>

      {upcomingEvents.length > 1 ? (
        <Section tone="tint">
          <div className="space-y-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="What's next"
                title="Upcoming events."
                lead="Where to find Nicole on stage and in person this season."
              />
              <LinkButton href="/events" variant="secondary">
                See all events
              </LinkButton>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {upcomingEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {featuredPodcasts.length > 0 ? (
        <Section tone={upcomingEvents.length > 1 ? "default" : "tint"}>
          <div className="space-y-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="On the record"
                title="In the press and on the show."
                lead="Recent long-form conversations and podcast appearances."
              />
              <LinkButton href="/media" variant="secondary">
                See all media
              </LinkButton>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-4">
            {visibleRecognition.map((r) => (
              <li key={r.id} className="space-y-1.5">
                <p className="font-display text-lg leading-snug text-ink">
                  {r.organization}
                </p>
                <p className="text-sm leading-snug text-ink-soft">{r.award}</p>
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
        secondary={{
          label: "Apply for the mentor program",
          href: "/mentor-program",
        }}
      />
    </>
  );
}

function NowUpcomingStrip({
  eventTitle,
  eventDate,
  eventLocation,
  eventFormat,
}: {
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventFormat: string;
}) {
  const dateLabel = eventDate
    ? formatDateRange(eventDate)
    : null;
  const shortDate = eventDate
    ? formatDate(eventDate, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-purple-900)] text-white shadow-[0_30px_70px_-35px_rgba(43,15,68,0.55)]">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-[color:var(--color-purple-700)] opacity-50 blur-3xl"
      />
      <div className="relative flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex items-center gap-3 lg:shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-purple-300)] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--color-purple-200)]" />
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
            Next stage
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1 lg:flex-row lg:items-center lg:gap-6">
          {shortDate ? (
            <p className="font-display text-lg leading-tight text-white lg:text-xl">
              {shortDate}
              <span className="ml-2 text-[color:var(--color-purple-200)]">
                · {eventFormat}
              </span>
            </p>
          ) : null}
          <p className="font-display text-xl leading-tight text-white lg:text-2xl">
            {eventTitle}
          </p>
          <p className="text-sm text-[color:var(--color-purple-100)] lg:ml-auto">
            {eventLocation}
            {dateLabel ? (
              <span className="ml-2 hidden text-[color:var(--color-purple-200)] lg:inline">
                {dateLabel}
              </span>
            ) : null}
          </p>
        </div>
        <div className="lg:shrink-0">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--color-purple-700)] transition-colors hover:bg-[color:var(--color-purple-50)]"
          >
            Event details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
