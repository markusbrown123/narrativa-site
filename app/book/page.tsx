import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { BookCover } from "@/components/BookCover";
import { CTA } from "@/components/CTA";
import { Eyebrow, Section, SectionHeading } from "@/components/Section";
import { Quote } from "@/components/Quote";
import { Container } from "@/components/Container";
import { formatDate } from "@/lib/content";
import { book } from "@/lib/mock/book";

export const metadata: Metadata = {
  title: "Unapologetic — the book",
  description: `${book.title}: ${book.subtitle}. ${book.tagline}`,
};

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
              <BookCover size="xl" />
            </div>
            <div className="space-y-6">
              <Eyebrow tone="light">Fall 2026 · {book.publisher}</Eyebrow>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight">
                {book.title}.
              </h1>
              <p className="font-display text-2xl sm:text-3xl text-[color:var(--color-purple-100)] italic leading-snug">
                {book.subtitle}
              </p>
              <p className="text-lg text-[color:var(--color-purple-100)] leading-relaxed max-w-xl">
                {book.tagline}
              </p>
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
              <p className="text-sm text-[color:var(--color-purple-200)] pt-2">
                Releases {formatDate(book.release_date)}.
              </p>
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
              It&apos;s built for the leader who has the resume, the receipts,
              and the proof — and is tired of presenting them with a question
              mark at the end.
            </p>
          </div>
        </div>
      </Section>

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

      <CTA
        title="Bring Unapologetic to your team or event."
        body="Bulk orders, book clubs, leadership retreats, and launch-week speaking — start with a note."
        primary={{ label: "Inquire about bulk + events", href: "/contact" }}
        secondary={{ label: "See Nicole's speaking", href: "/speaker" }}
      />
    </>
  );
}
