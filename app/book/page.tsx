import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/Button";
import { BookCover } from "@/components/BookCover";
import { CTA } from "@/components/CTA";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { Quote } from "@/components/Quote";
import { Container } from "@/components/Container";
import { book } from "@/lib/mock/book";

export const metadata: Metadata = {
  title: "Unapologetic — the book",
  description: `${book.title}: ${book.subtitle}. ${book.tagline}`,
};

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

export default function BookPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-700)] to-[color:var(--color-purple-500)] text-white">
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full bg-[color:var(--color-purple-400)] blur-3xl opacity-40"
        />
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-center">
            <div className="flex justify-center lg:justify-start">
              <BookCover size="xl" priority />
            </div>
            <div className="space-y-6">
              <Eyebrow tone="light">A book by Nicole Stephenson, IOM</Eyebrow>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight">
                {book.title}.
              </h1>
              <p className="font-display text-2xl sm:text-3xl text-[color:var(--color-purple-100)] italic leading-snug">
                {book.subtitle}
              </p>
              <p className="text-lg text-[color:var(--color-purple-100)] leading-relaxed max-w-xl">
                {book.tagline}
              </p>
              {book.release_date || book.publisher ? (
                <p className="text-sm text-[color:var(--color-purple-200)]">
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
              {book.purchase_links.length > 0 ? (
                <div id="pre-order" className="flex flex-wrap gap-3 pt-2">
                  {book.purchase_links.map((link) => (
                    <LinkButton
                      key={link.url}
                      href={link.url}
                      external
                      variant="light"
                      size="lg"
                    >
                      {link.label}
                    </LinkButton>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-16 lg:mt-20">
            <div className="relative mx-auto aspect-[3/2.2] w-full max-w-4xl overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55)]">
              <Image
                src="/book/unapologetic-book-stack.jpg"
                alt="A stack of Unapologetic by Nicole Stephenson — printed copies, front and side view."
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="default">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <SectionHeading
            eyebrow="About the book"
            title={<>The book your ambition has been waiting for.</>}
          />
          <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
            <p>{book.description}</p>
            <p>
              <em>Unapologetic</em> is more than a career guide. It is an
              invitation to stop shrinking, stop apologizing, and start trusting
              yourself. Because when you lead from who you truly are, success
              stops feeling like something you chase and starts feeling like
              something you create.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Themes" title="What the book is about." />
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {[
            "Authenticity",
            "Courage",
            "Self-advocacy",
            "Confidence",
            "Mentorship",
            "Burnout",
            "People-pleasing",
            "Career clarity",
            "Redefining success",
          ].map((theme) => (
            <li
              key={theme}
              className="rounded-2xl bg-white border border-line p-5 font-display text-lg text-ink"
            >
              {theme}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="default">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_70px_-30px_rgba(43,15,68,0.4)]">
            <Image
              src="/photos/book-launch-author-holding-book.jpg"
              alt="Nicole Stephenson holding up Unapologetic at her book launch event."
              fill
              sizes="(min-width: 1024px) 24rem, 22rem"
              className="object-cover"
            />
          </div>
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
              className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface-tint"
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

      <Section tone="tint">
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
        <Section tone="default">
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
        <Section tone="alt">
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

      <CTA
        title="Bring Unapologetic to your team or event."
        body="Bulk orders, book clubs, leadership retreats, and launch-week speaking — start with a note."
        primary={{ label: "Inquire about bulk + events", href: "/contact" }}
        secondary={{ label: "See Nicole's speaking", href: "/speaker" }}
      />
    </>
  );
}
