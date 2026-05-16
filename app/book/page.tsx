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
    src: "/book/social/book-promo-1.jpg",
    alt: "Unapologetic promo card — 'What if the very thing you've been taught to hide is the key to the career you want?'",
  },
  {
    src: "/book/social/book-promo-2.jpg",
    alt: "Unapologetic promo card describing who the book is for — entering the workforce, negotiating value, pursuing a promotion, or questioning what's next.",
  },
  {
    src: "/book/social/book-promo-3.jpg",
    alt: "Unapologetic praise card with endorsements from Cheldin Barlatt Rumer, Lu Ann Cahn, and Gina Lizzo.",
  },
  {
    src: "/book/social/book-promo-4.jpg",
    alt: "Unapologetic praise card with endorsements from Tracy Davidson and Susan Jin Davis.",
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
        <Container className="relative py-24 sm:py-32">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-14 items-center">
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
              It is built for the leader who has the resume, the receipts, and
              the proof — and is tired of presenting them with a question mark
              at the end.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Themes"
          title="What the book is about."
        />
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <SectionHeading
          eyebrow="From the launch"
          title="Unapologetic, in the wild."
          lead="Promo cards and quotes from the Unapologetic launch — share-ready snapshots of the book's themes and early endorsements."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
          <figure className="relative col-span-1 aspect-square overflow-hidden rounded-3xl border border-line bg-white lg:row-span-2 lg:aspect-auto">
            <Image
              src="/book/social/book-available-now.png"
              alt="Unapologetic — Available Now, a stack of the book with a QR code linking to narrativaconsulting.com."
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
          </figure>
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
        <Section tone="tint">
          <SectionHeading
            eyebrow="Inside"
            title="A taste of the book."
          />
          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            {book.excerpts.map((e) => (
              <article
                key={e.heading}
                className="rounded-3xl bg-white border border-line p-8 sm:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  Excerpt
                </p>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl text-ink leading-snug">
                  {e.heading}
                </h3>
                <p className="mt-4 text-ink-soft leading-relaxed italic">
                  “{e.body}”
                </p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {book.praise.length > 0 ? (
        <Section tone="default">
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
