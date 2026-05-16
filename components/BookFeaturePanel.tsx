import Link from "next/link";
import { BookCover } from "./BookCover";
import { Eyebrow } from "./Section";
import { clsx } from "@/lib/clsx";
import type { Book } from "@/types/content";

/**
 * Editorial book panel — front cover on one side, back-cover copy and
 * an optional excerpt on the other. Designed to be the *only* book
 * visual in the section, so it does not place the book stack and the
 * front cover next to each other.
 */
export function BookFeaturePanel({
  book,
  className,
}: {
  book: Book;
  className?: string;
}) {
  const releaseLabel = book.release_date
    ? new Date(book.release_date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;
  const excerpt = book.excerpts[0];

  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-[2rem] border border-[color:var(--color-purple-200)] bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-700)] to-[color:var(--color-purple-500)] text-white shadow-[0_50px_120px_-60px_rgba(43,15,68,0.65)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-[color:var(--color-purple-400)] opacity-40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[color:var(--color-purple-300)] opacity-25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay bg-grain"
      />

      <div className="relative grid items-center gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14 lg:p-14">
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-3xl bg-white/10 blur-2xl"
            />
            <BookCover size="xl" priority />
          </div>
        </div>

        <div className="space-y-6">
          <Eyebrow tone="light">From the back cover</Eyebrow>
          <h3 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            {book.title}.
          </h3>
          <p className="font-display text-xl italic leading-snug text-[color:var(--color-purple-100)] sm:text-2xl">
            {book.subtitle}
          </p>
          <p className="text-lg leading-relaxed text-[color:var(--color-purple-100)]">
            {book.tagline}
          </p>

          {excerpt ? (
            <figure className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
                Inside the book
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-white">
                {excerpt.heading}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-purple-100)]">
                {excerpt.body}
              </p>
            </figure>
          ) : null}

          <dl className="grid grid-cols-2 gap-4 pt-2 text-sm">
            {book.publisher ? (
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-purple-200)]">
                  Publisher
                </dt>
                <dd className="mt-1 font-display text-base text-white">
                  {book.publisher}
                </dd>
              </div>
            ) : null}
            {releaseLabel ? (
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-purple-200)]">
                  Released
                </dt>
                <dd className="mt-1 font-display text-base text-white">
                  {releaseLabel}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[color:var(--color-purple-700)] transition-colors hover:bg-[color:var(--color-purple-50)]"
            >
              Explore the book <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Bulk orders & book talks
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
