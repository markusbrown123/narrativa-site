import type { Event } from "@/types/content";

/** The site's home time zone: event days flip at local midnight here. */
export const EVENTS_TIME_ZONE = "America/New_York";

/** Today as YYYY-MM-DD in the site's time zone. */
export function todayISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EVENTS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** True while the event (or its last day) is today or later. */
export function isUpcoming(event: Event, today: string = todayISO()): boolean {
  const last = event.end_date || event.date;
  if (!last) return event.is_upcoming;
  return last >= today;
}

/** Tidy a time typed or exported by Sheets: "11:30:00 AM" -> "11:30am". */
export function formatTime(raw?: string): string {
  if (!raw) return "";
  const m = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?(?::\d{2})?\s*([ap])\.?m\.?$/i);
  if (!m) return raw.trim();
  return `${Number(m[1])}:${m[2] ?? "00"}${m[3].toLowerCase()}m`;
}

/** "11:30am to 1:00pm", "11:30am", or "" when no time is set. */
export function eventTimeLabel(event: Event): string {
  const start = formatTime(event.time);
  const end = formatTime(event.end_time);
  if (start && end) return `${start} to ${end}`;
  return start || end;
}

/** Events in date order (undated last). */
export function byDate(a: Event, b: Event): number {
  if (!a.date) return 1;
  if (!b.date) return -1;
  return a.date.localeCompare(b.date);
}

/**
 * The event to feature as "Next stage": the soonest upcoming public event,
 * or the soonest private one if nothing public is coming up.
 */
export function nextFeaturedEvent(events: Event[]): Event | null {
  const upcoming = events.filter((e) => e.is_upcoming).sort(byDate);
  return (
    upcoming.find((e) => e.visibility === "public") ?? upcoming[0] ?? null
  );
}
