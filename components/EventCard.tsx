import type { Event } from "@/types/content";
import { formatDateRange } from "@/lib/content";
import { clsx } from "@/lib/clsx";

export function EventCard({ event }: { event: Event }) {
  return (
    <article
      className={clsx(
        "group flex flex-col h-full rounded-3xl border border-line bg-white p-7 transition-all",
        "hover:border-[color:var(--color-purple-300)] hover:shadow-[0_20px_60px_-30px_rgba(107,44,145,0.35)]",
        event.featured && "ring-1 ring-[color:var(--color-purple-200)]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-[color:var(--color-purple-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {event.format}
        </span>
        {event.is_upcoming ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--color-green-700)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-green-700)]" />
            Upcoming
          </span>
        ) : (
          <span className="text-xs font-medium text-muted">Past</span>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink leading-snug">
        {event.title}
      </h3>
      <dl className="mt-4 space-y-1.5 text-sm text-ink-soft">
        <div className="flex gap-2">
          <dt className="font-medium text-ink">Date</dt>
          <dd>{formatDateRange(event.date, event.end_date)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium text-ink">Where</dt>
          <dd>{event.location}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium text-ink">Audience</dt>
          <dd>{event.audience}</dd>
        </div>
      </dl>
      <p className="mt-5 text-ink-soft leading-relaxed">{event.summary}</p>
      {event.url ? (
        <div className="mt-6 pt-6 border-t border-line">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-[color:var(--color-purple-700)]"
          >
            {event.cta_label ?? "Learn more"} <span aria-hidden="true">→</span>
          </a>
        </div>
      ) : null}
    </article>
  );
}
