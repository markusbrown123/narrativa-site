"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { clsx } from "@/lib/clsx";
import { byDate, eventTimeLabel } from "@/lib/events";
import type { Event } from "@/types/content";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-11" for an ISO date. Dates are plain strings; no time zones. */
const monthKey = (iso: string) => iso.slice(0, 7);

function shiftMonth(key: string, by: number): string {
  const [y, m] = key.split("-").map(Number);
  const total = y * 12 + (m - 1) + by;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}`;
}

function monthTitle(key: string) {
  const [y, m] = key.split("-").map(Number);
  return { month: MONTHS[m - 1], year: y };
}

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${weekday}, ${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Day cells for a month grid, Sunday first, padded with blanks. */
function monthCells(key: string): (string | null)[] {
  const [y, m] = key.split("-").map(Number);
  const firstWeekday = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells: (string | null)[] = Array(firstWeekday).fill(null);
  for (let d = 1; d <= days; d++) {
    cells.push(`${key}-${String(d).padStart(2, "0")}`);
  }
  while (cells.length % 7) cells.push(null);
  return cells;
}

/** Everything about one event: name, time, place, description, flyer, link. */
function EventDetails({ event, past }: { event: Event; past: boolean }) {
  const time = eventTimeLabel(event);
  const isPrivate = event.visibility === "private";
  return (
    <article className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {isPrivate ? (
          <span className="inline-flex items-center rounded-full bg-[color:var(--color-purple-900)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white">
            Private event
          </span>
        ) : null}
        {event.format ? (
          <span className="inline-flex items-center rounded-full bg-[color:var(--color-purple-100)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand">
            {event.format}
          </span>
        ) : null}
        {past ? (
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Past
          </span>
        ) : null}
      </div>
      <h3 className="font-display text-2xl leading-snug text-ink sm:text-3xl">
        {event.title}
      </h3>
      <dl className="space-y-1 text-sm text-ink-soft">
        <div>
          <dt className="sr-only">Date</dt>
          <dd className="font-medium text-ink">{longDate(event.date)}</dd>
        </div>
        {time ? (
          <div>
            <dt className="sr-only">Time</dt>
            <dd>{time}</dd>
          </div>
        ) : null}
        {event.location ? (
          <div>
            <dt className="sr-only">Where</dt>
            <dd>{event.location}</dd>
          </div>
        ) : null}
      </dl>
      {event.summary ? (
        <p className="leading-relaxed text-ink-soft">{event.summary}</p>
      ) : null}
      {event.image ? (
        // Flyers are shown whole, at their own proportions.
        <Image
          src={event.image}
          alt={`Event flyer: ${event.title}`}
          width={800}
          height={1000}
          sizes="(min-width: 1024px) 24rem, 90vw"
          className="h-auto w-full rounded-2xl border border-line bg-white"
        />
      ) : null}
      {event.url && !isPrivate && !past ? (
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-purple-700)]"
        >
          {event.cta_label || "Register"} <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </article>
  );
}

/**
 * Editorial month calendar. From tablet up: a month grid with event names
 * on their days, and the chosen event's details beside it. On phones: an
 * agenda list, month by month, with every detail shown. Past events stay
 * visible, faded, so visitors can see who Nicole works with.
 *
 * `today` (YYYY-MM-DD, site time zone) comes from the server so the server
 * and browser agree on what is past.
 */
export function MonthCalendar({
  events,
  today,
}: {
  events: Event[];
  today: string;
}) {
  const dated = useMemo(
    () => events.filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date)).sort(byDate),
    [events],
  );
  const isPast = (e: Event) => (e.end_date || e.date) < today;

  const thisMonth = monthKey(today);
  const firstMonth = dated.length
    ? [monthKey(dated[0].date), thisMonth].sort()[0]
    : thisMonth;
  const lastMonth = dated.length
    ? [monthKey(dated[dated.length - 1].date), thisMonth].sort()[1]
    : thisMonth;

  // Open on this month if it has events, else the next month that does.
  const startMonth =
    (dated.some((e) => monthKey(e.date) === thisMonth) && thisMonth) ||
    dated.find((e) => monthKey(e.date) > thisMonth)?.date.slice(0, 7) ||
    lastMonth;

  const [month, setMonth] = useState(startMonth);
  const inMonth = dated.filter((e) => monthKey(e.date) === month);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected =
    inMonth.find((e) => e.id === selectedId) ??
    inMonth.find((e) => !isPast(e)) ??
    inMonth[0] ??
    null;

  const byDay = new Map<string, Event[]>();
  for (const e of inMonth) {
    byDay.set(e.date, [...(byDay.get(e.date) ?? []), e]);
  }

  const { month: monthName, year } = monthTitle(month);
  const canPrev = month > firstMonth;
  const canNext = month < lastMonth;

  // Agenda (phones): every event, grouped by month.
  const agenda = new Map<string, Event[]>();
  for (const e of dated) {
    const k = monthKey(e.date);
    agenda.set(k, [...(agenda.get(k) ?? []), e]);
  }

  return (
    <div>
      {/* Tablet and up: month grid + details */}
      <div className="hidden md:grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10 items-start">
        <div className="rounded-[2rem] border border-line bg-white p-6 lg:p-8">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
            <h3 className="font-display text-4xl leading-none tracking-tight text-ink lg:text-5xl">
              {monthName}{" "}
              <span className="text-[color:var(--color-purple-300)]">{year}</span>
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMonth(shiftMonth(month, -1));
                  setSelectedId(null);
                }}
                disabled={!canPrev}
                aria-label="Previous month"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-purple-200)] text-brand transition-colors hover:bg-[color:var(--color-purple-50)] disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMonth(shiftMonth(month, 1));
                  setSelectedId(null);
                }}
                disabled={!canNext}
                aria-label="Next month"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-purple-200)] text-brand transition-colors hover:bg-[color:var(--color-purple-50)] disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {monthCells(month).map((day, i) => {
              if (!day) return <div key={`blank-${i}`} aria-hidden="true" />;
              const dayEvents = byDay.get(day) ?? [];
              const isToday = day === today;
              return (
                <div
                  key={day}
                  className={clsx(
                    "flex min-h-24 flex-col gap-1 rounded-2xl p-2 lg:min-h-28",
                    dayEvents.length
                      ? "bg-[color:var(--color-purple-50)]"
                      : "bg-transparent",
                  )}
                >
                  <span
                    className={clsx(
                      "font-display text-lg leading-none",
                      isToday
                        ? "inline-flex h-7 w-7 items-center justify-center self-start rounded-full bg-brand text-white"
                        : dayEvents.length
                          ? "text-ink"
                          : "text-[color:var(--color-purple-300)]",
                    )}
                  >
                    {Number(day.slice(8))}
                  </span>
                  {dayEvents.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => setSelectedId(e.id)}
                      aria-pressed={selected?.id === e.id}
                      className={clsx(
                        "rounded-lg px-1.5 py-1 text-left text-[0.7rem] font-semibold leading-tight transition-colors line-clamp-3",
                        selected?.id === e.id
                          ? "bg-brand text-white"
                          : "bg-white text-brand ring-1 ring-[color:var(--color-purple-200)] hover:bg-[color:var(--color-purple-100)]",
                        isPast(e) && "opacity-50",
                      )}
                    >
                      {e.title}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
          {inMonth.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              No events on the calendar in {monthName}.
            </p>
          ) : null}
        </div>

        <div
          aria-live="polite"
          className={clsx(
            "rounded-[2rem] border border-[color:var(--color-purple-200)] bg-white p-7 lg:sticky lg:top-28",
            selected && isPast(selected) && "[&_article]:opacity-70",
          )}
        >
          {selected ? (
            <EventDetails event={selected} past={isPast(selected)} />
          ) : (
            <p className="text-ink-soft">Choose a month with events.</p>
          )}
        </div>
      </div>

      {/* Phones: agenda list */}
      <ol className="space-y-10 md:hidden">
        {[...agenda.entries()].map(([k, list]) => {
          const t = monthTitle(k);
          return (
            <li key={k}>
              <h3 className="font-display text-3xl leading-none text-ink">
                {t.month}{" "}
                <span className="text-[color:var(--color-purple-300)]">{t.year}</span>
              </h3>
              <ul className="mt-5 space-y-4">
                {list.map((e) => (
                  <li
                    key={e.id}
                    className={clsx(
                      "rounded-3xl border border-line bg-white p-6",
                      isPast(e) && "opacity-60",
                    )}
                  >
                    <EventDetails event={e} past={isPast(e)} />
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
