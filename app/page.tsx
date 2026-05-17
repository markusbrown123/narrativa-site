import Image from "next/image";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { BookFeaturePanel } from "@/components/BookFeaturePanel";
import { Container } from "@/components/Container";
import { EditorialImageRail, type RailItem } from "@/components/EditorialImageRail";
import { HomeMomentumStrip } from "@/components/HomeMomentumStrip";
import {
  ParallaxImageConstellation,
  type ConstellationItem,
} from "@/components/ParallaxImageConstellation";
import { PartnerLogos } from "@/components/PartnerLogos";
import { PremiumHomeHero } from "@/components/PremiumHomeHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import {
  MediaGalleryFooter,
  SmartMediaGallery,
} from "@/components/SmartMediaGallery";
import { UpcomingEventFeature } from "@/components/UpcomingEventFeature";
import {
  getAmazonBookUrl,
  getEvents,
  getPartners,
  getPodcasts,
  getPress,
  getPrimaryBook,
  getRecognition,
  getServices,
} from "@/lib/cms/contentSource";
import { publish, featured } from "@/lib/content";

const HOME_CONSTELLATION: ConstellationItem[] = [
  {
    src: "/photos/nicole-stephenson-speaking-1.jpg",
    alt: "Nicole Stephenson on stage with a handheld microphone.",
    x: 22,
    y: 36,
    width: 17,
    aspect: "landscape",
    depth: 0.6,
    rotate: -4,
    caption: "On stage",
  },
  {
    src: "/photos/nicole-stephenson-power-women.jpg",
    alt: "Nicole Stephenson in an emerald dress for Main Line Today's Power Women feature.",
    x: 54,
    y: 50,
    width: 15,
    aspect: "portrait",
    depth: 1.1,
    rotate: 3,
    caption: "Power Women '24",
  },
  {
    src: "/book/unapologetic-front-cover.jpg",
    alt: "Front cover of Nicole Stephenson's book Unapologetic.",
    x: 78,
    y: 30,
    width: 11,
    aspect: "portrait",
    depth: 0.9,
    rotate: -5,
    caption: "Unapologetic",
  },
  {
    src: "/photos/book-launch-author-with-display.jpg",
    alt: "Nicole at her Unapologetic book launch, beside a purple-draped table of copies.",
    x: 36,
    y: 76,
    width: 16,
    aspect: "landscape",
    depth: 0.75,
    rotate: 5,
    caption: "Book launch",
  },
  {
    src: "/events/lehigh-valley-womens-summit.png",
    alt: "Poster for the 2026 Lehigh Valley Women's Summit.",
    x: 70,
    y: 76,
    width: 12,
    aspect: "portrait",
    depth: 1.3,
    rotate: -2,
    caption: "2026 Summit",
  },
];

const RAIL: RailItem[] = [
  {
    src: "/photos/nicole-stephenson-speaking-1.jpg",
    alt: "Nicole Stephenson on stage with a handheld microphone, gesturing during a keynote.",
    aspect: "landscape",
    tag: "On stage",
    caption: "Keynotes, fireside chats, and breakouts",
  },
  {
    src: "/photos/nicole-stephenson-headshot-blue.jpg",
    alt: "Nicole Stephenson studio headshot in a royal blue top.",
    aspect: "portrait",
    tag: "Portrait",
  },
  {
    src: "/events/lehigh-valley-womens-summit.png",
    alt: "Promo flyer for the 2026 Lehigh Valley Women's Summit at Wind Creek Bethlehem on June 4, 2026.",
    aspect: "portrait",
    tag: "2026 Summit",
    caption: "Lehigh Valley Women's Summit — June 4, 2026",
  },
  {
    src: "/photos/nicole-stephenson-speaking-3.jpg",
    alt: "Nicole Stephenson mid-keynote, microphone in hand, gesturing to the audience.",
    aspect: "landscape",
    tag: "Keynote",
  },
  {
    src: "/recognition/main-line-today-power-women.jpg",
    alt: "Main Line Today Magazine 2024 Power Women cover featuring Nicole Stephenson.",
    aspect: "landscape",
    tag: "Power Women '24",
    caption: "Main Line Today Magazine, 2024",
  },
  {
    src: "/photos/book-launch-author-with-display.jpg",
    alt: "Nicole Stephenson at her Unapologetic book launch, standing beside a purple-draped table of copies.",
    aspect: "landscape",
    tag: "Book launch",
  },
  {
    src: "/media/influential-women-headshot.png",
    alt: "Cover image for Nicole Stephenson's Influential Women long-form video interview.",
    aspect: "portrait",
    tag: "Influential Women",
    caption: "On-camera interview",
  },
  {
    src: "/photos/nicole-stephenson-headshot-floral.jpg",
    alt: "Nicole Stephenson studio headshot in a black-and-white floral top.",
    aspect: "portrait",
    tag: "Studio",
  },
];

export default async function Home() {
  const [
    events,
    partners,
    services,
    recognition,
    podcasts,
    press,
    book,
    amazonUrl,
  ] = await Promise.all([
    getEvents(),
    getPartners(),
    getServices(),
    getRecognition(),
    getPodcasts(),
    getPress(),
    getPrimaryBook(),
    getAmazonBookUrl(),
  ]);

  const upcomingEvents = publish(events).filter((e) => e.is_upcoming);
  const nextEvent = upcomingEvents[0] ?? null;
  const featuredServices = featured(services).slice(0, 3);
  const visibleRecognition = publish(recognition).slice(0, 4);
  const visiblePartners = publish(partners);

  const visiblePodcasts = publish(podcasts);
  const visiblePress = publish(press);
  const featuredMedia =
    visiblePodcasts.find((p) => p.id === "pod-influential-women-video") ??
    visiblePodcasts[0];
  const supportingMedia = [
    ...visiblePodcasts
      .filter((p) => p.id !== featuredMedia?.id)
      .slice(0, 2)
      .map((item) => ({ kind: "podcast" as const, item })),
    ...visiblePress.slice(0, 2).map((item) => ({ kind: "press" as const, item })),
  ];

  const momentumItems = [
    {
      kicker: "Speaking",
      title: "Book Nicole's keynote",
      body: "Storytelling, leadership, and the unapologetic career — for stages, summits, and offsites.",
      href: "/speaker",
    },
    {
      kicker: "The book",
      title: "Read Unapologetic",
      body: "Out now on Amazon — the field guide to leading the life and career you deserve.",
      href: amazonUrl,
    },
    {
      kicker: "Work together",
      title: "Narrativa services",
      body: "Speaker brand, visibility strategy, content, and the assets that get you booked.",
      href: "/services",
    },
    {
      kicker: "Mentor program",
      title: "Apply to be mentored",
      body: "A focused cohort for the leaders building what's next — by application.",
      href: "/mentor-program",
    },
  ];

  return (
    <>
      <PremiumHomeHero nextEvent={nextEvent} />

      {/* Momentum strip — four quick on-ramps below the hero. Replaces
          the white silence between the hero and the editorial sections. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-purple-100)] via-white to-[color:var(--color-purple-50)] py-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-purple-300)]/70 to-transparent"
        />
        <Container>
          <HomeMomentumStrip items={momentumItems} />
        </Container>
      </section>

      {/* Meet Nicole — landscape Wharton image rotates the visual type
          away from the portrait composition in the hero. */}
      <Section tone="tint">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div className="space-y-6 lg:order-1">
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
            <ul className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {[
                "Storytelling",
                "Communication",
                "Leadership",
                "Authenticity",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[color:var(--color-purple-200)] bg-white/80 px-3.5 py-2 text-center text-sm font-medium text-brand backdrop-blur"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-1">
              <LinkButton href="/about" variant="secondary">
                More about Nicole
              </LinkButton>
            </div>
          </div>
          <div className="relative lg:order-2">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-white via-[color:var(--color-purple-100)] to-transparent opacity-80 blur-2xl"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] ring-1 ring-line shadow-[0_30px_80px_-30px_rgba(43,15,68,0.45)]">
              <Image
                src="/photos/nicole-stephenson-wharton.jpg"
                alt="Nicole Stephenson on the University of Pennsylvania campus in front of the Wharton glass facade, in a floral dress and white blazer."
                fill
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 22rem, 88vw"
                className="object-cover object-[center_22%]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[color:var(--color-purple-900)]/40 to-transparent"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-white/15 px-4 py-3 text-sm text-white backdrop-blur-md">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/80">
                  Wharton Communication Program
                </p>
                <p className="font-display text-base leading-tight text-white">
                  University of Pennsylvania
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Parallax image constellation — floating editorial cluster.
          Cards rest, drift, and parallax to mouse + scroll so the cluster
          reads as a layered scene instead of a flat collage. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--color-purple-100)] via-[color:var(--color-purple-50)] to-[color:var(--color-purple-200)] py-20 sm:py-24">
        <Container size="wide" className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="space-y-6">
              <Eyebrow>A constellation of work</Eyebrow>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Stages, pages, and rooms — all moving.
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
                A drifting cluster of speaking moments, the book, and the
                next confirmed stage. Move your cursor — the cards shift
                with you.
              </p>
              <div className="pt-1">
                <LinkButton href="/about" variant="secondary">
                  See Nicole&apos;s story
                </LinkButton>
              </div>
            </div>
            <ParallaxImageConstellation items={HOME_CONSTELLATION} />
          </div>
        </Container>
      </section>

      {/* Editorial image rail — auto-scrolling marquee of mixed visual types */}
      <Section tone="alt" containerSize="wide">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="A look around"
              title={<>The work, the rooms, the receipts.</>}
              lead="Stages, book launches, editorial features, and the next-up calendar — moving."
            />
            <LinkButton href="/about" variant="secondary">
              See Nicole&apos;s story
            </LinkButton>
          </div>
        </div>
        <div className="mt-10 -mx-6 sm:-mx-8 lg:-mx-12">
          <EditorialImageRail items={RAIL} speed="slow" />
        </div>
      </Section>

      {/* Book feature panel — single editorial book treatment (front cover only) */}
      <Section tone="alt">
        <ScrollReveal direction="up" duration={800}>
          <BookFeaturePanel book={book} />
        </ScrollReveal>
      </Section>

      {/* Three featured services */}
      <Section tone="tint">
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
            {featuredServices.map((s, i) => (
              <ScrollReveal
                key={s.id}
                direction="up"
                delay={i * 100}
                duration={700}
                className="h-full"
              >
                <ServiceCard service={s} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Upcoming event — full panel treatment with flyer and details. If
          nothing is published, the whole section is dropped so we never
          show a lonely "Upcoming events" label. */}
      {nextEvent ? (
        <Section tone="alt">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="On the calendar"
                title="The next confirmed stage."
                lead="Where Nicole is speaking next — venue, audience, and role."
              />
              <LinkButton href="/events" variant="secondary">
                See all events
              </LinkButton>
            </div>
            <ScrollReveal direction="up" duration={800}>
              <UpcomingEventFeature event={nextEvent} variant="panel" />
            </ScrollReveal>
          </div>
        </Section>
      ) : null}

      {/* Smart media gallery */}
      {featuredMedia || supportingMedia.length > 0 ? (
        <Section tone="tint" containerSize="wide">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="On the record"
                title="In the press and on the show."
                lead="Recent long-form conversations, on-camera interviews, and press features."
              />
              <LinkButton href="/media" variant="secondary">
                See all media
              </LinkButton>
            </div>
            <SmartMediaGallery
              featured={
                featuredMedia
                  ? { kind: "podcast", item: featuredMedia }
                  : undefined
              }
              tiles={supportingMedia}
            />
            <MediaGalleryFooter />
          </div>
        </Section>
      ) : null}

      {/* Recognition — editorial mosaic with hairline cards */}
      {visibleRecognition.length > 0 ? (
        <Section tone="alt">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <Eyebrow>Recognition</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Where the work shows up.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Selected honors confirmed in Nicole&apos;s public record —
                press features, alumni recognition, and community awards.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {visibleRecognition.map((r, i) => (
                <ScrollReveal
                  as="li"
                  key={r.id}
                  direction="up"
                  delay={i * 80}
                  duration={650}
                  className="group flex flex-col gap-3 rounded-3xl border border-line bg-white p-6 transition-colors hover:border-[color:var(--color-purple-200)]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    {r.year ? (
                      <p className="font-display text-3xl text-[color:var(--color-purple-300)]">
                        {r.year}
                      </p>
                    ) : (
                      <p className="font-display text-3xl text-[color:var(--color-purple-200)]">
                        ·
                      </p>
                    )}
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted">
                      Recognition
                    </p>
                  </div>
                  <p className="font-display text-xl leading-snug text-ink">
                    {r.organization}
                  </p>
                  <p className="text-sm leading-snug text-ink-soft">
                    {r.award}
                  </p>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Partners */}
      {visiblePartners.length > 0 ? (
        <Section tone="alt">
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
