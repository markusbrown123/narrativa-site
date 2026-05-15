import { NextResponse } from "next/server";

/**
 * Placeholder route handler for mentor program applications. Logs the
 * submission and returns success — integrations land here later.
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
  const required = ["name", "email", "role", "stage", "focus", "goal", "stuck"];
  for (const key of required) {
    if (!data[key]) {
      return NextResponse.json(
        { ok: false, error: `Missing required field: ${key}` },
        { status: 422 },
      );
    }
  }

  console.info("[mentor] application", {
    receivedAt: new Date().toISOString(),
    stage: data.stage,
    focus: data.focus,
    email: data.email,
  });

  return NextResponse.json({ ok: true });
}
