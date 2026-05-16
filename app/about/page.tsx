import type { Metadata } from "next";
import Image from "next/image";
import { BookCover } from "@/components/BookCover";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { publish } from "@/lib/content";
import { recognition } from "@/lib/mock/recognition";

export const metadata: Metadata = {
  title: "About Nicole Stephenson",
  description:
    "Nicole Stephenson, IOM is a dynamic communicator, author, transformational speaker, Founder of Narrativa Consulting, and Lecturer at The Wharton School / University of Pennsylvania.",
};

export default function AboutPage() {
  const visibleRecognition = publish(recognition);
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A communicator, author, and the founder
            <br className="hidden lg:block" /> of Narrativa Consulting.
          </>
        }
        lead="Nicole Stephenson, IOM is a dynamic communicator, author, transformational speaker, Founder of Narrativa Consulting, and Lecturer at The Wharton School / University of Pennsylvania."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/speaker">Book Nicole to speak</LinkButton>
          <LinkButton href="/contact" variant="secondary">
            Get in touch
          </LinkButton>
        </div>
      </PageHero>

      <Section tone="default">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 items-start">
          <SectionHeading
            eyebrow="Bio"
            title={<>The short version.</>}
          />
          <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
            <p>
              Nicole Stephenson, IOM is a dynamic communicator, author, and
              transformational speaker — and the Founder of{" "}
              <strong className="text-ink">Narrativa Consulting</strong>, which
              helps individuals and organizations unlock human potential
              through storytelling, communication, authenticity, and
              leadership.
            </p>
            <p>
              She is a Lecturer at The Wharton School at the University of
              Pennsylvania.
            </p>
            <p>
              Her book —{" "}
              <em>Unapologetic: Boldly Lead the Life and Career You Deserve</em>{" "}
              — explores authenticity, courage, self-advocacy, confidence,
              mentorship, burnout, people-pleasing, career clarity, and what
              it really means to redefine success.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div className="relative aspect-[3/2.2] w-full overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_90px_-40px_rgba(43,15,68,0.45)]">
            <Image
              src="/book/unapologetic-book-stack.jpg"
              alt="Printed copies of Unapologetic by Nicole Stephenson, IOM."
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <Eyebrow>The book</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-ink">
              Unapologetic, in print.
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed">
              Nicole&apos;s debut book is the long-form expression of the work
              behind every keynote and engagement.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <BookCover size="md" />
              <LinkButton href="/book" variant="secondary">
                Read more about the book
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      {visibleRecognition.length > 0 ? (
        <Section tone="alt">
          <SectionHeading
            eyebrow="Recognition"
            title="Where the work shows up."
            align="center"
          />
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleRecognition.map((r) => (
              <li
                key={r.id}
                className="overflow-hidden rounded-3xl bg-white border border-line"
              >
                {r.image ? (
                  <div className="relative aspect-[16/11] w-full bg-surface-tint">
                    <Image
                      src={r.image}
                      alt={`${r.organization} — ${r.award}`}
                      fill
                      sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6 space-y-1">
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
              </li>
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
