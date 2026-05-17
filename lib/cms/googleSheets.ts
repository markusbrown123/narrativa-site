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

import { rowsFromValues, type SheetRow } from "./parseRows";
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

/**
 * Fetch one tab. Returns parsed rows or null if the tab is missing /
 * the call fails. We do NOT throw — the caller falls back to mock data
 * tab-by-tab so a single typo doesn't take the whole site offline.
 */
export async function fetchSheetTab(
  config: SheetsConfig,
  tab: SheetTab,
): Promise<{ rows: SheetRow[]; error?: string } | null> {
  const range = encodeURIComponent(`${tab}!A1:Z`);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      config.sheetId,
    )}/values/${range}` +
    `?key=${encodeURIComponent(config.apiKey)}&majorDimension=ROWS&valueRenderOption=UNFORMATTED_VALUE`;

  try {
    const res = await fetch(url, {
      next: { revalidate: config.revalidateSeconds, tags: ["cms"] },
    });
    if (!res.ok) {
      const text = await safeReadText(res);
      return {
        rows: [],
        error: `Sheets API ${res.status}: ${truncate(text, 160)}`,
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
    return { rows: rowsFromValues(values) };
  } catch (err) {
    return {
      rows: [],
      error: err instanceof Error ? err.message : "Unknown fetch error",
    };
  }
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
