import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types/content";
import { LinkButton } from "./Button";
import { Container } from "./Container";
import { FloatingVisualLayer } from "./FloatingVisualLayer";
import { HeroDepthScene } from "./HeroDepthScene";
import { HeroRotator, type HeroPhoto } from "./HeroRotator";
import { ParallaxVisualPanel } from "./ParallaxVisualPanel";
import { ScrollReveal } from "./ScrollReveal";
import { UpcomingEventFeature } from "./UpcomingEventFeature";
import { clsx } from "@/lib/clsx";

const IDENTITY_CHIPS: string[] = [
  "Founder, Narrativa Consulting",
  "Author of Unapologetic",
  "Wharton Lecturer",
  "Transformational Speaker",
];

// A small, curated rotation of visually distinct portraits. The
// rotator only ever shows one at a time, so two similar headshots
// never share the viewport.
const HERO_PORTRAITS: HeroPhoto[] = [
  {
    src: "/photos/nicole-stephenson-power-women.jpg",
    alt: "Nicole Stephenson — editorial portrait in an emerald green dress against a floral background, from Main Line Today's 2024 Power Women feature.",
    objectPosition: "center 18%",
  },
  {
    src: "/photos/nicole-stephenson-headshot-plaid.jpg",
    alt: "Nicole Stephenson, IOM — studio portrait in a navy and red plaid blazer.",
    objectPosition: "center 22%",
  },
  {
    src: "/photos/nicole-stephenson-portrait-outdoor.jpg",
    alt: "Nicole Stephenson — outdoor portrait in a striped dress with a rolling lawn behind her.",
    objectPosition: "center 25%",
  },
];

export function PremiumHomeHero({
  nextEvent,
  className,
}: {
  nextEvent?: Event | null;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden bg-gradient-to-br from-[color:var(--color-purple-100)] via-[color:var(--color-purple-50)] to-[color:var(--color-purple-200)] hero-backdrop-drift",
        "min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] flex items-center",
        className,
      )}
    >
      {/* Dimensional backdrop — Spline-style depth scene (rotating
          gradient mesh, floating orbs, layered glass planes, mouse
          parallax) topped with a sparse floating-shapes layer. */}
      <HeroDepthScene tone="lavender" intensity={0.9} />
      <FloatingVisualLayer tone="lavender" density="sparse" />

      <Container className="relative w-full pt-14 pb-14 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14 xl:gap-20">
          {/* Editorial copy */}
          <div className="order-2 space-y-7 lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-purple-200)] bg-white/70 px-3.5 py-1.5 hero-eyebrow text-brand backdrop-blur">
              <span
                aria-hidden="true"
                className="inline-flex h-1.5 w-1.5 rounded-full bg-brand"
              />
              Nicole Stephenson, IOM · Narrativa Consulting
            </p>

            <h1 className="font-display font-medium tracking-tight text-ink hero-title-home">
              Lead Like the Story You Came to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-brand">Tell.</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-1 bottom-1 h-2 -skew-y-1 bg-[color:var(--color-purple-200)]"
                />
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Narrativa Consulting is the storytelling, communication, and
              leadership practice of author, transformational speaker, and
              Wharton lecturer Nicole Stephenson, IOM — built on authenticity,
              courage, and the work of becoming.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <LinkButton href="/contact" size="lg">
                Book Nicole to speak
              </LinkButton>
              <LinkButton href="/book" size="lg" variant="secondary">
                Explore the book
              </LinkButton>
              <LinkButton href="/events" size="lg" variant="ghost">
                Upcoming events
              </LinkButton>
            </div>

            <ul className="flex flex-wrap gap-2 pt-2">
              {IDENTITY_CHIPS.map((chip, i) => (
                <ScrollReveal
                  key={chip}
                  as="li"
                  direction="up"
                  delay={120 + i * 90}
                  duration={650}
                  className="inline-flex items-center rounded-full border border-[color:var(--color-purple-200)] bg-white/80 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[color:var(--color-purple-800)] backdrop-blur"
                >
                  {chip}
                </ScrollReveal>
              ))}
            </ul>
          </div>

          {/* Visual composition — rotating portrait + book + speaking inset.
              ParallaxVisualPanel adds subtle scroll-driven motion, with
              two opposing intensities so the foreground insets drift
              against the main portrait. */}
          <div className="relative order-1 lg:order-2">
            <ParallaxVisualPanel
              className="mx-auto w-full max-w-[28rem] lg:ml-auto lg:mr-0"
              intensity={28}
              scale={0.02}
              innerClassName="relative"
            >
              {/* Soft halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[color:var(--color-purple-200)] via-white to-[color:var(--color-purple-100)] opacity-70 blur-2xl"
              />
              {/* Decorative outline frame */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 hidden h-28 w-28 rounded-3xl border border-[color:var(--color-purple-200)] sm:block"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-3xl border border-[color:var(--color-purple-200)] sm:block"
              />

              {/* Main rotating portrait */}
              <HeroRotator
                photos={HERO_PORTRAITS}
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 22rem, 88vw"
                className="aspect-[4/5] w-full rounded-[2.25rem] bg-surface-tint shadow-[0_40px_100px_-40px_rgba(43,15,68,0.55)] ring-1 ring-[color:var(--color-purple-200)]"
              />

              {/* Floating book inset — pairs the portrait with a non-portrait visual.
                  Wrapped in a parallax panel with stronger intensity so it
                  appears to float independently as the page scrolls. */}
              <ParallaxVisualPanel
                className="absolute -top-4 right-4 z-10 hidden sm:-top-6 sm:right-6 lg:block"
                intensity={44}
                scale={0.03}
              >
                <Link
                  href="/book"
                  className="hero-float pointer-events-auto flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-3.5 py-2.5 shadow-[0_25px_50px_-25px_rgba(43,15,68,0.45)] backdrop-blur transition-colors hover:border-[color:var(--color-purple-300)]"
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
                    <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-brand">
                      New book · March 2026
                    </span>
                    <span className="font-display text-base text-ink">
                      Unapologetic
                    </span>
                  </span>
                </Link>
              </ParallaxVisualPanel>

              {/* Floating speaking thumbnail — drifts the opposite direction
                  on scroll so the composition feels alive. */}
              <ParallaxVisualPanel
                className="absolute -bottom-8 -left-4 z-10 hidden lg:block"
                intensity={-36}
                scale={0.02}
              >
                <Link
                  href="/speaker"
                  className="pointer-events-auto block overflow-hidden rounded-2xl border border-white/40 bg-white/80 shadow-[0_25px_60px_-25px_rgba(43,15,68,0.45)] backdrop-blur transition-transform hover:-translate-y-0.5"
                >
                  <span className="relative block h-28 w-44">
                    <Image
                      src="/photos/nicole-stephenson-speaking-2.jpg"
                      alt="Nicole Stephenson on stage with a microphone, mid-keynote."
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    />
                    <span className="absolute inset-x-3 bottom-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white">
                      On stage
                    </span>
                  </span>
                </Link>
              </ParallaxVisualPanel>
            </ParallaxVisualPanel>
          </div>
        </div>

        {/* Now / Upcoming strip — surfaces the next confirmed event */}
        {nextEvent ? (
          <ScrollReveal direction="up" delay={120} className="relative mt-12 sm:mt-16">
            <UpcomingEventFeature event={nextEvent} variant="glass" />
          </ScrollReveal>
        ) : null}
      </Container>
    </section>
  );
}
