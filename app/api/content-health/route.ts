import { NextResponse } from "next/server";
import { getContentHealth } from "@/lib/cms/contentSource";

/**
 * Debug endpoint. Reports where content is coming from (Google Sheets
 * vs. bundled mock), counts per type, and per-tab errors. Never echoes
 * secrets — the sheet ID and API key are deliberately not included.
 */
export async function GET() {
  const health = await getContentHealth();
  return NextResponse.json(health, {
    headers: {
      "cache-control": "no-store",
    },
  });
}
