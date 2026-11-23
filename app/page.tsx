import Image from "next/image";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { BookFeaturePanel } from "@/components/BookFeaturePanel";
import { LogoMarquee } from "@/components/LogoMarquee";
import { PremiumHomeHero } from "@/components/PremiumHomeHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import {
  MediaGalleryFooter,
  SmartMediaGallery,
} from "@/components/SmartMediaGallery";
import {
  getEvents,
  getPartners,
  getPodcasts,
  getPress,
  getPrimaryBook,
  getRecognition,
} from "@/lib/cms/contentSource";
import { publish } from "@/lib/content";
import { nextFeaturedEvent } from "@/lib/events";

// Re-render hourly so the "Next stage" strip moves on after an event.
export const revalidate = 3600;

export default async function Home() {
  const [
    events,
    partners,
    recognition,
    podcasts,
    press,
    book,
  ] = await Promise.all([
    getEvents(),
    getPartners(),
    getRecognition(),
    getPodcasts(),
    getPress(),
    getPrimaryBook(),
  ]);

  const nextEvent = nextFeaturedEvent(publish(events));
  const visibleRecognition = publish(recognition);
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

  return (
    <>
      <PremiumHomeHero nextEvent={nextEvent} />

      {/* Sections in .section-stack alternate white / lavender on their own
          (app/globals.css), so reordering or hiding one never puts two
          same-colour bands together. */}
      <div className="section-stack">
        {/* Book box — the book leads, straight after the hero. */}
        <Section>
          <ScrollReveal direction="up" duration={800}>
            <BookFeaturePanel book={book} />
          </ScrollReveal>
        </Section>

        {/* Meet Nicole — landscape Wharton image rotates the visual type
            away from the portrait composition in the hero. */}
        <Section>
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

        {/* Smart media gallery */}
        {featuredMedia || supportingMedia.length > 0 ? (
          <Section containerSize="wide">
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
          <Section>
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
                    className="group flex flex-col gap-3 rounded-3xl border border-line bg-white p-6 transition-colors hover:border-[color:var(--color-purple-200)] sm:[&:nth-child(odd):last-child]:col-span-2"
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
          <Section>
            <SectionHeading
              eyebrow="Partners & engagements"
              title="Recent rooms Narrativa has been in."
              align="center"
            />
            <LogoMarquee
              partners={visiblePartners}
              className="mt-12 -mx-6 sm:-mx-8 lg:-mx-12"
            />
          </Section>
        ) : null}

      </div>

      <CTA
        title="Bring Nicole into your next room."
        body="For speaking, advisory, and media — start with a note."
        primary={{ label: "Get in touch", href: "/contact" }}
      />
    </>
  );
}
