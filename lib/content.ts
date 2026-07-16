import type { BaseRecord, ContentStatus } from "@/types/content";
import { VISIBLE_STATUSES } from "@/types/content";

const visibleSet = new Set<ContentStatus>(VISIBLE_STATUSES);

export function isVisible<T extends BaseRecord>(record: T): boolean {
  return visibleSet.has(record.status);
}

/**
 * Filter to publicly visible records and sort by featured first, then
 * `sort_order` ascending. Stable across renders since inputs are static.
 */
export function publish<T extends BaseRecord>(records: T[]): T[] {
  return records
    .filter(isVisible)
    .slice()
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.sort_order - b.sort_order;
    });
}

export function featured<T extends BaseRecord>(records: T[]): T[] {
  return publish(records).filter((r) => r.featured);
}

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  },
): string {
  return new Date(iso).toLocaleDateString("en-US", options);
}

export function formatDateRange(start: string, end?: string): string {
  if (!end) return formatDate(start);
  const startDate = new Date(start);
  const endDate = new Date(end);
  const sameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();
  if (sameMonth) {
    return `${startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })}–${endDate.getDate()}, ${endDate.getFullYear()}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}
