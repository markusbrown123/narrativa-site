import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./Section";
import { AMAZON_BOOK_URL } from "@/lib/mock/book";

/**
 * Closing dark-purple CTA band for the book page. Pairs the Amazon
 * purchase action with the two adjacent asks Nicole receives most often
 * — speaking and branded/organizational copies — without inventing any
 * bulk pricing.
 */
export function PremiumBookCTA({ amazonUrl = AMAZON_BOOK_URL }: { amazonUrl?: string } = {}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--color-purple-900)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/book/unapologetic-book-stack.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-900)]/85 to-[color:var(--color-purple-700)]/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-[color:var(--color-purple-500)] opacity-40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-44 -left-24 h-[36rem] w-[36rem] rounded-full bg-[color:var(--color-purple-700)] opacity-50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grain opacity-25 mix-blend-overlay"
      />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="space-y-5">
            <Eyebrow tone="light">Take the book further</Eyebrow>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Order Unapologetic.
            </h2>
            <p className="text-lg leading-relaxed text-[color:var(--color-purple-100)]">
              Pick up your copy on Amazon, invite Nicole to bring the book
              into the room, or explore branded copies for your team or
              event.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton href={amazonUrl} external variant="light" size="lg">
                Order on Amazon
              </LinkButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Invite Nicole to speak
              </Link>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
                Order
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-white">
                Order Unapologetic
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-purple-100)]">
                Available now on Amazon — print and digital copies for
                readers, teams, and book clubs.
              </p>
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[color:var(--color-purple-200)]"
              >
                Amazon listing <span aria-hidden="true">→</span>
              </a>
            </li>
            <li className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
                Invite
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-white">
                A book-centered keynote or workshop
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-purple-100)]">
                Bring the themes of <em>Unapologetic</em> into your stage,
                team offsite, or leadership development series.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[color:var(--color-purple-200)]"
              >
                Start a conversation <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
                Explore
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-white">
                Organizational or branded copies
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-purple-100)]">
                For ERGs, leadership programs, and launch-week events —
                get in touch and we&apos;ll scope what fits.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[color:var(--color-purple-200)]"
              >
                Inquire <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
