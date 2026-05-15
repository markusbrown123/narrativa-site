import { NextResponse } from "next/server";

/**
 * Placeholder route handler. Logs to the server for now; downstream
 * integrations (email, CRM, Google Sheet) plug in here later.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "Missing body" },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;
  if (!data.name || !data.email || !data.message || !data.inquiry_type) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 },
    );
  }

  console.info("[contact] submission", {
    receivedAt: new Date().toISOString(),
    inquiry_type: data.inquiry_type,
    email: data.email,
  });

  return NextResponse.json({ ok: true });
}
