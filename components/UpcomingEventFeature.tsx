import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types/content";
import { formatDate, formatDateRange } from "@/lib/content";
import { clsx } from "@/lib/clsx";

/**
 * Premium feature treatment for a single upcoming event. Three variants:
 * - `glass`: dark glass strip, used inside the hero
 * - `panel`: large editorial split panel with the event flyer
 * - `light`: light surface variant for use mid-page on a tinted section
 */
type Variant = "glass" | "panel" | "light";

export function UpcomingEventFeature({
  event,
  variant = "panel",
  className,
  href = "/events",
}: {
  event: Event;
  variant?: Variant;
  className?: string;
  href?: string;
}) {
  const dateLong = event.date
    ? formatDateRange(event.date, event.end_date)
    : null;
  const dateShort = event.date
    ? formatDate(event.date, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  if (variant === "glass") {
    return (
      <div
        className={clsx(
          "relative overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--color-purple-900)]/85 text-white shadow-[0_30px_80px_-40px_rgba(43,15,68,0.7)] backdrop-blur-md",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[color:var(--color-purple-500)] opacity-50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-[color:var(--color-purple-700)] opacity-50 blur-3xl"
        />
        <div className="relative flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-7 lg:p-7">
          <div className="flex items-center gap-3 lg:shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-purple-300)] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--color-purple-200)]" />
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
              Next stage
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1 lg:flex-row lg:items-center lg:gap-6">
            {dateShort ? (
              <p className="font-display text-lg leading-tight text-white lg:text-xl">
                {dateShort}
                <span className="ml-2 text-[color:var(--color-purple-200)]">
                  · {event.format}
                </span>
              </p>
            ) : null}
            <p className="font-display text-xl leading-tight text-white lg:text-2xl">
              {event.title}
            </p>
            <p className="text-sm text-[color:var(--color-purple-100)] lg:ml-auto">
              {event.location}
            </p>
          </div>
          <div className="lg:shrink-0">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--color-purple-700)] transition-colors hover:bg-[color:var(--color-purple-50)]"
            >
              Event details <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "light") {
    return (
      <div
        className={clsx(
          "relative overflow-hidden rounded-3xl border border-[color:var(--color-purple-200)] bg-white text-ink shadow-[0_20px_60px_-30px_rgba(43,15,68,0.35)]",
          className,
        )}
      >
        <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-7 lg:p-7">
          <div className="flex items-center gap-3 lg:shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-purple-300)] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand">
              Upcoming
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1 lg:flex-row lg:items-center lg:gap-6">
            {dateShort ? (
              <p className="font-display text-lg leading-tight lg:text-xl">
                {dateShort}
                <span className="ml-2 text-muted">· {event.format}</span>
              </p>
            ) : null}
            <p className="font-display text-xl leading-tight lg:text-2xl">
              {event.title}
            </p>
            <p className="text-sm text-ink-soft lg:ml-auto">{event.location}</p>
          </div>
          <div className="lg:shrink-0">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-purple-700)]"
            >
              Event details <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // panel
  return (
    <article
      className={clsx(
        "relative overflow-hidden rounded-[2rem] border border-[color:var(--color-purple-200)] bg-white shadow-[0_40px_100px_-50px_rgba(43,15,68,0.5)]",
        className,
      )}
    >
      <div className="grid items-stretch gap-0 md:grid-cols-[1fr_1.1fr]">
        {event.image ? (
          <div className="relative aspect-[4/5] w-full bg-[color:var(--color-purple-50)] md:aspect-auto">
            <Image
              src={event.image}
              alt={`Event flyer — ${event.title}`}
              fill
              sizes="(min-width: 1024px) 32rem, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="relative flex flex-col gap-5 bg-gradient-to-br from-white via-[color:var(--color-purple-50)] to-white p-7 sm:p-9 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-purple-300)] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand">
              Confirmed · Upcoming
            </span>
          </div>
          <h3 className="font-display text-3xl leading-[1.1] tracking-tight text-ink sm:text-4xl">
            {event.title}
          </h3>
          <dl className="grid grid-cols-1 gap-y-3 text-sm text-ink-soft sm:grid-cols-2">
            {dateLong ? (
              <div>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  Date
                </dt>
                <dd className="mt-0.5 font-display text-base text-ink">
                  {dateLong}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Location
              </dt>
              <dd className="mt-0.5 font-display text-base text-ink">
                {event.location}
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Role
              </dt>
              <dd className="mt-0.5 font-display text-base text-ink">
                {event.format}
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Audience
              </dt>
              <dd className="mt-0.5 font-display text-base text-ink">
                {event.audience}
              </dd>
            </div>
          </dl>
          <p className="text-ink-soft leading-relaxed">{event.summary}</p>
          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-purple-700)]"
            >
              Event details <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-purple-200)] bg-white px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-[color:var(--color-purple-50)]"
            >
              Book Nicole for your stage
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
