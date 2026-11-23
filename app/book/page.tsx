import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/Button";
import { BookCover } from "@/components/BookCover";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { ParallaxVisualPanel } from "@/components/ParallaxVisualPanel";
import { PremiumBookCTA } from "@/components/PremiumBookCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { Quote } from "@/components/Quote";
import { Container } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { BARNES_AND_NOBLE_BOOK_URL } from "@/lib/mock/book";
import { getAmazonBookUrl, getPrimaryBook } from "@/lib/cms/contentSource";

export async function generateMetadata(): Promise<Metadata> {
  const book = await getPrimaryBook();
  return {
    title: "Unapologetic — the book",
    description: `${book.title}: ${book.subtitle}. ${book.tagline}`,
  };
}

const SOCIAL_PROMOS: { src: string; alt: string }[] = [
  {
    src: "/book/social/narrativa-social-1.jpg",
    alt: "Unapologetic — Available Now: a stack of the book with a QR code to narrativaconsulting.com.",
  },
  {
    src: "/book/social/narrativa-social-2.jpg",
    alt: "Unapologetic promo card — 'What if the very thing you've been taught to hide is the key to the career you want?'",
  },
  {
    src: "/book/social/narrativa-social-3.jpg",
    alt: "Unapologetic promo card describing who the book is for — entering the workforce, negotiating value, pursuing a promotion, or questioning what's next.",
  },
  {
    src: "/book/social/narrativa-social-4.jpg",
    alt: "Unapologetic promo card describing what the book is about — authenticity as a career strategy.",
  },
  {
    src: "/book/social/narrativa-social-5.jpg",
    alt: "Unapologetic promo card with details about the book's release and author Nicole Stephenson.",
  },
];

export default async function BookPage() {
  const [book, amazonUrl] = await Promise.all([
    getPrimaryBook(),
    getAmazonBookUrl(),
  ]);
  const barnesNobleUrl =
    book.purchase_links.find((l) => /barnesandnoble\.com/i.test(l.url))?.url ??
    BARNES_AND_NOBLE_BOOK_URL;
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--color-purple-100)] via-[color:var(--color-purple-50)] to-[color:var(--color-purple-200)] text-ink min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] flex items-center hero-backdrop-drift">
        <HeroAtmosphere tone="lavender" />
        <Container className="relative w-full py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div className="relative order-1 flex justify-center lg:justify-start">
              <ParallaxVisualPanel intensity={24} scale={0.03} innerClassName="relative">
                {/* Glow halo behind cover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-[color:var(--color-purple-300)] via-[color:var(--color-purple-200)] to-[color:var(--color-teal-500)]/40 opacity-70 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-white/50 blur-2xl"
                />
                <BookCover size="xl" priority className="drop-shadow-[0_40px_70px_rgba(43,15,68,0.4)]" />
              </ParallaxVisualPanel>
            </div>
            <div className="order-2 space-y-7">
              <Eyebrow>A book by Nicole Stephenson, IOM</Eyebrow>
              <h1 className="font-display font-medium tracking-tight text-ink hero-title-page">
                {book.title}.
              </h1>
              <p className="font-display text-2xl sm:text-3xl text-brand italic leading-snug">
                {book.subtitle}
              </p>
              <p className="text-lg text-ink-soft leading-relaxed max-w-xl">
                {book.tagline}
              </p>
              {book.release_date || book.publisher ? (
                <p className="text-sm text-muted">
                  {book.publisher ? `Published by ${book.publisher}` : null}
                  {book.publisher && book.release_date ? " · " : null}
                  {book.release_date
                    ? `Released ${new Date(book.release_date).toLocaleDateString(
                        "en-US",
                        { month: "long", year: "numeric" },
                      )}`
                    : null}
                </p>
              ) : null}
              <div id="pre-order" className="flex flex-wrap gap-3 pt-2">
                <LinkButton href={amazonUrl} external size="lg">
                  Order on Amazon
                </LinkButton>
                <LinkButton
                  href="#about-the-book"
                  size="lg"
                  variant="secondary"
                >
                  What it&apos;s about
                </LinkButton>
                <LinkButton
                  href="/contact"
                  size="lg"
                  variant="secondary"
                >
                  Bulk + book events
                </LinkButton>
              </div>
              <p className="pt-1 text-xs uppercase tracking-[0.22em] text-muted">
                Print + Kindle on Amazon
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Sections in .section-stack alternate white / lavender by position. */}
      <div className="section-stack">
        <Section id="about-the-book" className="scroll-mt-20">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <SectionHeading
              eyebrow="About the book"
              title={<>The book your ambition has been waiting for.</>}
            />
            <RichText
              text={book.description}
              className="max-w-2xl text-lg text-ink-soft leading-relaxed"
            />
          </div>
        </Section>

        <Section>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <SectionHeading eyebrow="Where to buy" title={<>Get your copy.</>} />
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <LinkButton href={amazonUrl} external variant="primary" size="lg">
                  Amazon
                </LinkButton>
                <LinkButton
                  href={barnesNobleUrl}
                  external
                  variant="secondary"
                  size="lg"
                >
                  Barnes &amp; Noble
                </LinkButton>
              </div>
              <p className="text-base text-ink-soft leading-relaxed">
                Also available to distributors and bookstores through IngramSpark.
              </p>
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            <ScrollReveal direction="up" duration={800} className="relative aspect-[3/2] w-full max-w-xl mx-auto lg:mx-0 overflow-hidden rounded-3xl ring-1 ring-[color:var(--color-purple-200)] shadow-[0_30px_70px_-30px_rgba(36,16,47,0.4)]">
              <Image
                src="/photos/book-launch-author-holding-book.jpg"
                alt="Nicole Stephenson holding up Unapologetic at her book launch event."
                fill
                sizes="(min-width: 1024px) 24rem, 22rem"
                className="object-cover"
              />
            </ScrollReveal>
            <div className="space-y-5">
              <Eyebrow>From the launch</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-ink">
                Unapologetic, in the wild.
              </h2>
              <p className="text-lg text-ink-soft leading-relaxed">
                Snapshots from the book launch — author, books, and a room of
                readers picking up their copies.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                src: "/photos/book-launch-books-table.jpg",
                alt: "Stacks of Unapologetic copies on a purple-draped table at the book launch.",
              },
              {
                src: "/photos/book-launch-author-with-display.jpg",
                alt: "Nicole Stephenson standing in front of her book launch display and signing table.",
              },
              {
                src: "/photos/book-launch-signing-hand.jpg",
                alt: "Close-up of Nicole signing a copy of Unapologetic at the launch event.",
              },
            ].map((p) => (
              <div
                key={p.src}
                className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-line bg-surface-tint"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading
            eyebrow="Share the book"
            title="Promo cards from the launch."
            lead="Share-ready snapshots of the book's themes and back-cover copy."
          />
          <div className="mt-12 grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SOCIAL_PROMOS.map((promo) => (
              <figure
                key={promo.src}
                className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-white"
              >
                <Image
                  src={promo.src}
                  alt={promo.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </Section>

        {book.excerpts.length > 0 ? (
          <Section>
            <SectionHeading eyebrow="Inside" title="A taste of the book." />
            <div className="mt-14 grid lg:grid-cols-3 gap-6">
              {book.excerpts.map((e) => (
                <article
                  key={e.heading}
                  className="rounded-3xl bg-white border border-line p-8"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Excerpt
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-ink leading-snug">
                    {e.heading}
                  </h3>
                  <p className="mt-4 text-ink-soft leading-relaxed">{e.body}</p>
                </article>
              ))}
            </div>
          </Section>
        ) : null}

        {book.praise.length > 0 ? (
          <Section>
            <SectionHeading
              eyebrow="Praise"
              title="What early readers are saying."
              align="center"
            />
            <div className="mt-14 grid lg:grid-cols-3 gap-6">
              {book.praise.map((p, i) => (
                <Quote
                  key={i}
                  quote={p.quote}
                  attribution={p.attribution}
                  tone="tint"
                />
              ))}
            </div>
          </Section>
        ) : null}
      </div>

      <PremiumBookCTA amazonUrl={amazonUrl} />
    </>
  );
}
