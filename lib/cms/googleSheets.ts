/**
 * Server-side Google Sheets fetcher.
 *
 * Uses the public `values` endpoint with an API key, so no service
 * account is required. The sheet must be set to "Anyone with the link
 * can view" — the API key only authorizes the request, it does not
 * grant access.
 *
 * One fetch per tab so callers can keep working when a single tab is
 * mis-spelled or temporarily missing.
 */

import {
  numberedRowsFromValues,
  type NumberedRow,
  type SheetRow,
} from "./parseRows";
import type { SheetTab } from "./types";

const DEFAULT_REVALIDATE_SECONDS = 300;

export interface SheetsConfig {
  sheetId: string;
  apiKey: string;
  revalidateSeconds: number;
}

/**
 * Read the env vars that select Google Sheets as the content source.
 * Returns null if any required value is missing — callers should fall
 * back to mock data when this happens.
 */
export function readSheetsConfig(): SheetsConfig | null {
  const source = process.env.CMS_SOURCE?.trim();
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim();
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY?.trim();
  if (source !== "google_sheets") return null;
  if (!sheetId || !apiKey) return null;
  const revalidate = parsePositiveInt(
    process.env.CONTENT_REVALIDATE_SECONDS,
    DEFAULT_REVALIDATE_SECONDS,
  );
  return { sheetId, apiKey, revalidateSeconds: revalidate };
}

export function defaultRevalidateSeconds(): number {
  return parsePositiveInt(
    process.env.CONTENT_REVALIDATE_SECONDS,
    DEFAULT_REVALIDATE_SECONDS,
  );
}

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export interface SheetTabResult {
  rows: SheetRow[];
  /** The same rows with their row numbers in the Sheet. */
  numbered: NumberedRow[];
  /** Header cells as typed, and the column key each one maps to. */
  headers: { label: string; key: string }[];
  error?: string;
  /** HTTP status of a failed call (0 when the request itself failed). */
  httpStatus?: number;
}

/**
 * Fetch one tab. Returns parsed rows, or an error. We do NOT throw — the
 * caller falls back to mock data tab-by-tab so a single typo doesn't take
 * the whole site offline. `fresh` skips the cache (the Sheet check reads
 * the Sheet as it is right now).
 */
export async function fetchSheetTab(
  config: SheetsConfig,
  tab: SheetTab,
  { fresh = false }: { fresh?: boolean } = {},
): Promise<SheetTabResult | null> {
  const range = encodeURIComponent(`${tab}!A1:Z`);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      config.sheetId,
    )}/values/${range}` +
    `?key=${encodeURIComponent(config.apiKey)}&majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE` +
    // Dates and times typed into cells come back as text ("11/18/2026",
    // "11:30:00 AM") rather than spreadsheet serial numbers.
    `&dateTimeRenderOption=FORMATTED_STRING`;

  try {
    const res = await fetch(
      url,
      fresh
        ? { cache: "no-store" }
        : { next: { revalidate: config.revalidateSeconds, tags: ["cms"] } },
    );
    if (!res.ok) {
      const text = await safeReadText(res);
      return {
        rows: [],
        numbered: [],
        headers: [],
        error: `Sheets API ${res.status}: ${truncate(text, 160)}`,
        httpStatus: res.status,
      };
    }
    const data = (await res.json()) as { values?: unknown };
    const values = Array.isArray(data.values)
      ? (data.values as unknown[][]).map((row) =>
          row.map((cell) =>
            cell === null || cell === undefined ? "" : String(cell),
          ),
        )
      : [];
    const { headers, rows } = numberedRowsFromValues(values);
    return { rows: rows.map((r) => r.row), numbered: rows, headers };
  } catch (err) {
    return {
      rows: [],
      numbered: [],
      headers: [],
      error: err instanceof Error ? err.message : "Unknown fetch error",
      httpStatus: 0,
    };
  }
}

/**
 * Each tab's numeric id (the `gid` in the Sheet's address), so the Sheet
 * check can link straight to a row. Empty when the call fails.
 */
export async function fetchTabIds(
  config: SheetsConfig,
): Promise<Record<string, number>> {
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      config.sheetId,
    )}?key=${encodeURIComponent(config.apiKey)}` +
    `&fields=${encodeURIComponent("sheets.properties(sheetId,title)")}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return {};
    const data = (await res.json()) as {
      sheets?: { properties?: { sheetId?: number; title?: string } }[];
    };
    const ids: Record<string, number> = {};
    for (const sheet of data.sheets ?? []) {
      const { sheetId, title } = sheet.properties ?? {};
      if (typeof sheetId === "number" && title) ids[title] = sheetId;
    }
    return ids;
  } catch {
    return {};
  }
}

/** The Sheet's address, for links from the Sheet check. */
export function sheetUrl(config: SheetsConfig): string {
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(
    config.sheetId,
  )}/edit`;
}

async function safeReadText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max)}…` : s;
}
