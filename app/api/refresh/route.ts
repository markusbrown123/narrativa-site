import { revalidatePath, revalidateTag } from "next/cache";
import { clearContentCache } from "@/lib/cms/contentSource";
import { checkSheet } from "@/lib/cms/sheetCheck";
import { renderUpdatePage } from "@/lib/cms/sheetReportHtml";

/**
 * "Update site" link for Nicole: /api/refresh?key=<REFRESH_SECRET>
 *
 * Bookmarkable (a plain GET), unlike a Netlify build hook, which needs a
 * POST. It throws away cached Sheet data and marks every page for
 * re-rendering, so the next visit to any page shows the Sheet as it is
 * now. Then it checks the Sheet (lib/cms/sheetCheck.ts) and lists, in
 * plain words, anything that won't show the way she expects, with a link
 * to each row. Add &format=json for the same report as JSON (used by the
 * Sheet's "Website" menu). Without the right key it answers 404, as if
 * it did not exist.
 */
export async function GET(request: Request) {
  const secret = process.env.REFRESH_SECRET?.trim();
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!secret || key !== secret) {
    return new Response("Not found", { status: 404 });
  }

  clearContentCache();
  revalidateTag("cms", { expire: 0 });
  revalidatePath("/", "layout");

  const check = await checkSheet();

  if (url.searchParams.get("format") === "json") {
    return Response.json(check, { headers: { "Cache-Control": "no-store" } });
  }

  return new Response(renderUpdatePage(check, url.origin), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
