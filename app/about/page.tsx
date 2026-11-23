import type { Metadata } from "next";
import Image from "next/image";
import { BookFeaturePanel } from "@/components/BookFeaturePanel";
import { LinkButton } from "@/components/Button";
import { MediaKit } from "@/components/MediaKit";
import { CTA } from "@/components/CTA";
import { FloatingAccentLayer } from "@/components/FloatingAccentLayer";
import { PageHero } from "@/components/PageHero";
import { ParallaxVisualPanel } from "@/components/ParallaxVisualPanel";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section, SectionHeading } from "@/components/Section";
import { getPrimaryBook, getRecognition } from "@/lib/cms/contentSource";
import { publish } from "@/lib/content";
import { BIO_PARAGRAPHS } from "@/lib/bio";
import {
  MEDIA_KIT_BOOK_COVER,
  MEDIA_KIT_PORTRAITS,
} from "@/lib/mock/mediaKit";

export const metadata: Metadata = {
  title: "About Nicole Stephenson",
  description:
    "Nicole Stephenson, IOM is a dynamic communicator, author, transformational speaker, Founder of Narrativa Consulting, and Lecturer at The Wharton School / University of Pennsylvania.",
};

export default async function AboutPage() {
  const [recognition, book] = await Promise.all([
    getRecognition(),
    getPrimaryBook(),
  ]);
  const visibleRecognition = publish(recognition);
  return (
    <>
      <PageHero
        eyebrow="About"
        variant="split"
        tone="lavender"
        titleSize="compact"
        title={
          // "A Communicator," is wrapped in a `whitespace-nowrap` span so the
          // leading article can never wrap onto its own line at any breakpoint.
          // Paired with `hero-title-page-compact` typography and
          // `text-wrap: balance` for editorial line breaks.
          <>
            <span className="whitespace-nowrap">A Communicator,</span>{" "}
            Author, and Founder of Narrativa Consulting.
          </>
        }
        image={{
          src: "/photos/nicole-stephenson-wharton.jpg",
          alt: "Nicole Stephenson on the University of Pennsylvania campus in front of the Wharton glass facade, in a floral dress and white blazer.",
          objectPosition: "center 22%",
          aspect: "portrait",
          caption: {
            label: "Wharton Communication Program",
            value: "University of Pennsylvania",
          },
        }}
      >
        <LinkButton href="/speaker" size="lg">
          Book Nicole to speak
        </LinkButton>
        <LinkButton href="/contact" size="lg" variant="secondary">
          Get in touch
        </LinkButton>
      </PageHero>

      {/* Sections in .section-stack alternate white / lavender by position. */}
      <div className="section-stack">
        <Section>
          <BookFeaturePanel book={book} />
        </Section>

        <Section className="relative overflow-hidden">
          <FloatingAccentLayer variant="pale" />
          <div className="relative grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
            <ParallaxVisualPanel
              className="mx-auto w-full max-w-sm lg:mx-0"
              intensity={32}
              scale={0.025}
              innerClassName="relative"
            >
              {/* Soft halo behind portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[color:var(--color-purple-200)] via-white to-[color:var(--color-purple-100)] opacity-80 blur-2xl hero-orb-drift-alt"
              />
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 hidden h-20 w-20 rounded-3xl border border-[color:var(--color-purple-300)] sm:block"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -right-5 hidden h-24 w-24 rounded-3xl border border-[color:var(--color-purple-300)] sm:block"
              />
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl ring-1 ring-[color:var(--color-purple-200)] shadow-[0_30px_70px_-30px_rgba(36,16,47,0.4)] portrait-float">
                <Image
                  src="/photos/nicole-stephenson-headshot-blue.jpg"
                  alt="Nicole Stephenson — studio headshot in a royal blue top."
                  fill
                  sizes="(min-width: 1024px) 24rem, 22rem"
                  className="object-cover"
                />
              </div>
            </ParallaxVisualPanel>
            <div className="space-y-6">
              <ScrollReveal direction="up" duration={700}>
                <SectionHeading eyebrow="Bio" title={<>The full picture.</>} />
              </ScrollReveal>
              <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
                {BIO_PARAGRAPHS.map((para, i) => (
                  <ScrollReveal
                    key={i}
                    direction="up"
                    duration={700}
                    delay={Math.min(80 + i * 40, 240)}
                  >
                    <p>{para}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="media-kit">
          <SectionHeading
            eyebrow="Media kit"
            title={
            MEDIA_KIT_PORTRAITS.length > 0
              ? "Photos, cover, and bio, ready to use."
              : "Cover and bio, ready to use."
          }
          />
          <div className="mt-10">
            <MediaKit
              portraits={MEDIA_KIT_PORTRAITS}
              bookCover={MEDIA_KIT_BOOK_COVER}
              bio={BIO_PARAGRAPHS.join("\n\n")}
            />
          </div>
        </Section>

        {visibleRecognition.length > 0 ? (
          <Section>
            <SectionHeading
              eyebrow="Recognition"
              title="Where the work shows up."
              align="center"
            />
            <ul className="mt-12 flex flex-wrap justify-center gap-6 lg:gap-8">
              {visibleRecognition.map((r, i) => (
                <ScrollReveal
                  as="li"
                  key={r.id}
                  direction="up"
                  delay={i * 70}
                  duration={650}
                  className="w-full overflow-hidden rounded-3xl bg-white border border-line card-lift hover:border-[color:var(--color-purple-200)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)]"
                >
                  {r.image ? (
                    <div className="relative aspect-[4/3] w-full bg-surface-tint">
                      <Image
                        src={r.image}
                        alt={`${r.organization} — ${r.award}`}
                        fill
                        sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
                        className="object-contain p-3"
                      />
                    </div>
                  ) : null}
                  <div className="p-6 space-y-1.5">
                    {r.year ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                        {r.year}
                      </p>
                    ) : null}
                    <p className="font-display text-lg text-ink leading-snug">
                      {r.organization}
                    </p>
                    <p className="text-sm text-ink-soft">{r.award}</p>
                    {r.summary ? (
                      <p className="text-sm text-ink-soft pt-1 leading-relaxed">
                        {r.summary}
                      </p>
                    ) : null}
                  </div>
                </ScrollReveal>
              ))}
            </ul>
          </Section>
        ) : null}
      </div>

      <CTA
        title="Talk to Nicole about your moment."
        body="Whether it's a keynote, a book, a launch, or a season of work — start with a note."
        primary={{ label: "Send a note", href: "/contact" }}
      />
    </>
  );
}
