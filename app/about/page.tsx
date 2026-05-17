import type { Metadata } from "next";
import Image from "next/image";
import { BookFeaturePanel } from "@/components/BookFeaturePanel";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { EditorialImageRail, type RailItem } from "@/components/EditorialImageRail";
import { FloatingAccentLayer } from "@/components/FloatingAccentLayer";
import { PageHero } from "@/components/PageHero";
import { ParallaxVisualPanel } from "@/components/ParallaxVisualPanel";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section, SectionHeading } from "@/components/Section";
import { getPrimaryBook, getRecognition } from "@/lib/cms/contentSource";
import { publish } from "@/lib/content";

const ABOUT_RAIL: RailItem[] = [
  {
    src: "/photos/nicole-stephenson-speaking-1.jpg",
    alt: "Nicole Stephenson on stage with a handheld microphone.",
    aspect: "landscape",
    tag: "On stage",
  },
  {
    src: "/photos/nicole-stephenson-portrait-outdoor.jpg",
    alt: "Nicole Stephenson in an outdoor portrait, striped dress, arms folded.",
    aspect: "portrait",
    tag: "Portrait",
  },
  {
    src: "/photos/nicole-stephenson-wharton.jpg",
    alt: "Nicole Stephenson on the University of Pennsylvania campus, in front of the Wharton glass facade.",
    aspect: "landscape",
    tag: "Wharton",
    caption: "Lecturer, Wharton Communication Program",
  },
  {
    src: "/photos/nicole-stephenson-power-women.jpg",
    alt: "Editorial portrait of Nicole Stephenson in an emerald green dress for Main Line Today's Power Women feature.",
    aspect: "portrait",
    tag: "Power Women '24",
  },
  {
    src: "/photos/book-launch-author-with-display.jpg",
    alt: "Nicole at her Unapologetic book launch, standing beside a purple-draped table of copies.",
    aspect: "landscape",
    tag: "Book launch",
  },
  {
    src: "/photos/nicole-stephenson-speaking-2.jpg",
    alt: "Nicole Stephenson holding a microphone and smiling at the audience.",
    aspect: "landscape",
    tag: "Keynote",
  },
];

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

      <Section tone="tint" className="relative overflow-hidden">
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
              <ScrollReveal direction="up" duration={700} delay={80}>
                <p>
                  Nicole Stephenson, IOM is a dynamic communicator, author, and
                  transformational speaker dedicated to helping individuals and
                  organizations redefine success and step confidently into their
                  full potential.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" duration={700} delay={140}>
                <p>
                  Her career began at KYW Newsradio in Philadelphia, where she
                  entered the workforce during the 2008 financial crisis and
                  quickly distinguished herself across the newsroom and marketing
                  departments. She helped shape the station&apos;s first digital
                  marketing role — launching its Facebook presence when social
                  media was still emerging — and rose to become Marketing
                  Director at 22, the youngest woman and only female director
                  among senior leaders.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" duration={700} delay={200}>
                <p>
                  Her path then led her to The Main Line Chamber of Commerce,
                  where she initially joined as an assistant through a mentorship
                  connection and quickly advanced to become Executive Director of
                  the Society of Professional Women. Over a decade in that role,
                  she led transformative programming, hosted high-profile
                  speakers, and built a thriving community focused on advancing
                  women in leadership.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" duration={700} delay={260}>
                <p>
                  She spent three years writing her debut book,{" "}
                  <em>Unapologetic: Boldly Lead the Life and Career You Deserve</em>,
                  a powerful exploration of how women can overcome self-doubt
                  through mentorship, sponsorship, and skill-building.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" duration={700} delay={320}>
                <p>
                  Today, as Founder of{" "}
                  <strong className="text-ink">Narrativa Consulting</strong> and a
                  Lecturer in the Wharton Communication Program at the University
                  of Pennsylvania, she empowers leaders, teams, and emerging
                  professionals to communicate with clarity and lead with
                  authenticity. She also serves on the board of Girls Spark.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="alt" containerSize="wide">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="A look around"
            title="Stages, portraits, and rooms."
            lead="A moving gallery of speaking, editorial, and book-launch work."
          />
        </div>
        <div className="mt-10 -mx-6 sm:-mx-8 lg:-mx-12">
          <EditorialImageRail items={ABOUT_RAIL} speed="medium" />
        </div>
      </Section>

      <Section tone="tint">
        <BookFeaturePanel book={book} />
      </Section>

      {visibleRecognition.length > 0 ? (
        <Section tone="alt">
          <SectionHeading
            eyebrow="Recognition"
            title="Where the work shows up."
            align="center"
          />
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {visibleRecognition.map((r, i) => (
              <ScrollReveal
                as="li"
                key={r.id}
                direction="up"
                delay={i * 70}
                duration={650}
                className="overflow-hidden rounded-3xl bg-white border border-line card-lift hover:border-[color:var(--color-purple-200)]"
              >
                {r.image ? (
                  <div className="relative aspect-[4/3] w-full bg-surface-tint">
                    <Image
                      src={r.image}
                      alt={`${r.organization} — ${r.award}`}
                      fill
                      sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
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

      <CTA
        title="Talk to Nicole about your moment."
        body="Whether it's a keynote, a book, a launch, or a season of work — start with a note."
        primary={{ label: "Send a note", href: "/contact" }}
        secondary={{ label: "Apply to the mentor program", href: "/mentor-program" }}
      />
    </>
  );
}
