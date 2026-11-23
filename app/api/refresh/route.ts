import { revalidatePath, revalidateTag } from "next/cache";
import { clearContentCache } from "@/lib/cms/contentSource";

/**
 * "Update site" link for Nicole: /api/refresh?key=<REFRESH_SECRET>
 *
 * Bookmarkable (a plain GET), unlike a Netlify build hook, which needs a
 * POST. It throws away cached Sheet data and marks every page for
 * re-rendering, so the next visit to any page shows the Sheet as it is
 * now. Without the right key it answers 404, as if it did not exist.
 */
export async function GET(request: Request) {
  const secret = process.env.REFRESH_SECRET?.trim();
  const key = new URL(request.url).searchParams.get("key");
  if (!secret || key !== secret) {
    return new Response("Not found", { status: 404 });
  }

  clearContentCache();
  revalidateTag("cms", { expire: 0 });
  revalidatePath("/", "layout");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Site updated</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fcf8ff;color:#1b1223;font:16px/1.6 Lato,system-ui,sans-serif}
main{max-width:30rem;margin:1.5rem;padding:2.5rem;background:#fff;border:1px solid #eadbf4;border-radius:1.5rem;text-align:center}
h1{font:500 2rem/1.1 "Cormorant Garamond",Georgia,serif;margin:0 0 .75rem}
p{margin:0 0 1.5rem;color:#3a2d49}
a{display:inline-block;padding:.75rem 1.5rem;border-radius:999px;background:#5a2896;color:#fff;text-decoration:none;font-weight:600}
</style></head>
<body><main>
<h1>Site updated.</h1>
<p>The site will show the Sheet as it is now. Open any page to see your changes (give it a few seconds).</p>
<a href="/events">View events</a>
</main></body></html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
