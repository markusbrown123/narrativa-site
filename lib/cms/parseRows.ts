/**
 * Tiny, friendly coercion helpers for Google Sheet rows.
 *
 * Sheet cells always arrive as strings (or undefined). These helpers
 * convert them to the shapes the site expects, while staying tolerant
 * of the things Nicole will realistically type — TRUE/Yes/Y, blank
 * cells, "10" vs "10.0", "Jun 4 2026" alongside "2026-06-04", etc.
 */

import type { ContentStatus } from "@/types/content";
import { VISIBLE_STATUSES } from "@/types/content";

export type SheetRow = Record<string, string>;

const TRUTHY = new Set(["true", "yes", "y", "1", "x", "✓", "✔"]);
const FALSY = new Set(["false", "no", "n", "0", "", "-", "—"]);

/** Read a string cell, trimmed. Returns "" for missing cells. */
export function str(row: SheetRow, key: string): string {
  const raw = row[key];
  if (raw === undefined || raw === null) return "";
  return String(raw).trim();
}

/** Required string. Returns undefined if blank so callers can guard. */
export function maybeStr(row: SheetRow, key: string): string | undefined {
  const v = str(row, key);
  return v.length > 0 ? v : undefined;
}

/** Read a number cell. Falls back to `fallback` for blanks or junk. */
export function num(row: SheetRow, key: string, fallback = 0): number {
  const raw = str(row, key);
  if (raw === "") return fallback;
  const n = Number(raw.replace(/,/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

/** Boolean from TRUE/FALSE/YES/NO/1/0/checkmarks/blank. */
export function bool(row: SheetRow, key: string, fallback = false): boolean {
  const raw = str(row, key).toLowerCase();
  if (TRUTHY.has(raw)) return true;
  if (FALSY.has(raw)) return false;
  return fallback;
}

/**
 * Split a pipe-separated cell into a trimmed array.
 * "Outcome A | Outcome B|Outcome C" → ["Outcome A", "Outcome B", "Outcome C"]
 * Blank cell → [].
 */
export function arr(row: SheetRow, key: string): string[] {
  const raw = str(row, key);
  if (raw === "") return [];
  return raw
    .split("|")
    .map((piece) => piece.trim())
    .filter((piece) => piece.length > 0);
}

/**
 * Normalize a date cell to YYYY-MM-DD when possible. Accepts ISO
 * dates, US-style "Jun 4 2026", "6/4/2026", and many other Date-parseable
 * shapes. Returns "" for blank or unparseable cells.
 */
export function dateStr(row: SheetRow, key: string): string {
  const raw = str(row, key);
  if (raw === "") return "";
  // Already in YYYY-MM-DD shape — keep as-is to dodge timezone math.
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  // A spreadsheet serial number (days since 1899-12-30).
  if (/^\d{5}(\.\d+)?$/.test(raw)) {
    const d = new Date(Date.UTC(1899, 11, 30) + Math.floor(Number(raw)) * 86400000);
    return d.toISOString().slice(0, 10);
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw; // last resort: surface what was typed
  const yyyy = parsed.getUTCFullYear();
  const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** ISO timestamp. Falls back to today at midnight UTC so sort_order still works. */
export function isoTimestamp(row: SheetRow, key: string): string {
  const raw = str(row, key);
  if (raw === "") return new Date().toISOString();
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

const STATUS_ALIASES: Record<string, ContentStatus> = {
  draft: "Draft",
  "ready to publish": "Ready to Publish",
  ready: "Ready to Publish",
  approved: "Ready to Publish",
  published: "Published",
  publish: "Published",
  live: "Published",
  archived: "Archived",
  archive: "Archived",
  hidden: "Archived",
};

/** Normalize a status cell. Defaults to "Draft" so blank rows stay hidden. */
export function status(row: SheetRow, key = "status"): ContentStatus {
  const raw = str(row, key).toLowerCase();
  if (raw === "") return "Draft";
  return STATUS_ALIASES[raw] ?? "Draft";
}

/** Is the parsed status one of the visible states? */
export function isVisibleStatus(s: ContentStatus): boolean {
  return (VISIBLE_STATUSES as ReadonlyArray<string>).includes(s);
}

/**
 * The column key for a header cell. Headers are matched loosely so a
 * friendlier spelling in the Sheet still works: "Image URL", "image url"
 * and "Image-URL" all mean `image_url`; "Barnes & Noble URL" means
 * `barnes_noble_url`.
 */
export function normalizeHeader(header: string): string {
  return String(header ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** A data row with its row number in the Sheet (the header is row 1). */
export interface NumberedRow {
  sheetRow: number;
  row: SheetRow;
}

/**
 * Convert the Sheets API "values" matrix into header-keyed rows, keeping
 * each row's number in the Sheet. The first row is the header row; empty
 * header columns and blank rows are skipped. If two headers mean the same
 * column, the first non-blank cell wins.
 */
export function numberedRowsFromValues(values: string[][]): {
  headers: { label: string; key: string }[];
  rows: NumberedRow[];
} {
  if (!values || values.length === 0) return { headers: [], rows: [] };
  const [headerRow, ...dataRows] = values;
  const headers = headerRow.map((h) => {
    const label = String(h ?? "").trim();
    return { label, key: normalizeHeader(label) };
  });
  const rows: NumberedRow[] = [];
  dataRows.forEach((raw, index) => {
    if (!raw || raw.every((cell) => String(cell ?? "").trim() === "")) return;
    const row: SheetRow = {};
    headers.forEach(({ key }, i) => {
      if (key === "") return;
      const value = raw[i] !== undefined ? String(raw[i]) : "";
      if (row[key] === undefined || row[key].trim() === "") row[key] = value;
    });
    rows.push({ sheetRow: index + 2, row });
  });
  return { headers: headers.filter((h) => h.key !== ""), rows };
}

/** Header-keyed rows, without row numbers. */
export function rowsFromValues(values: string[][]): SheetRow[] {
  return numberedRowsFromValues(values).rows.map((r) => r.row);
}
