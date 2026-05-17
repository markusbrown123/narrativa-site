/**
 * Convert Dropbox share links into renderable/direct links.
 *
 * Nicole pastes whatever the "Copy link" button gives her into the
 * sheet (`image_url`, `file_url`, `cta_url`). The most common shapes:
 *
 * - `https://www.dropbox.com/scl/fi/<id>/<name>.jpg?rlkey=...&dl=0`
 * - `https://www.dropbox.com/s/<id>/<name>.pdf?dl=0`
 * - `https://www.dropbox.com/.../file.jpg?raw=1` (already renderable)
 * - `https://dl.dropboxusercontent.com/scl/fi/<id>/<name>.jpg?...`
 *
 * For images that need to feed `next/image`, we rewrite the host to
 * `dl.dropboxusercontent.com` and force `dl=1` so Dropbox responds with
 * the file bytes instead of the share page HTML.
 *
 * Non-Dropbox URLs (or local `/...` paths) are returned untouched —
 * the helper is safe to call on every link in a sheet row.
 */

const DROPBOX_HOSTS = new Set([
  "www.dropbox.com",
  "dropbox.com",
  "dl.dropboxusercontent.com",
]);

export function isDropboxUrl(input: string | undefined | null): boolean {
  if (!input) return false;
  try {
    const url = new URL(input);
    return DROPBOX_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

/**
 * Normalize a Dropbox share link into a direct, renderable URL.
 *
 * - Rewrites host → `dl.dropboxusercontent.com`
 * - Removes `dl=0`, sets `dl=1`
 * - Leaves `raw=1` and `rlkey` query params intact
 * - Returns the input unchanged for non-Dropbox or invalid URLs
 */
export function normalizeDropboxUrl(input: string | undefined | null): string {
  if (!input) return "";
  const value = String(input).trim();
  if (value === "") return "";
  if (!isDropboxUrl(value)) return value;

  try {
    const url = new URL(value);
    url.hostname = "dl.dropboxusercontent.com";

    // Drop the explicit dl=0 if present; force dl=1.
    if (url.searchParams.has("dl")) url.searchParams.delete("dl");
    // raw=1 already streams the bytes, so we leave it. Otherwise add dl=1.
    if (url.searchParams.get("raw") !== "1") {
      url.searchParams.set("dl", "1");
    }

    return url.toString();
  } catch {
    return value;
  }
}

/**
 * Safe rendering wrapper for `next/image` `src` values.
 *
 * When external image optimization breaks (rare but possible with
 * Dropbox redirects), callers can fall back to rendering a plain
 * `<img>` using this exact URL instead.
 */
export function dropboxImageSrc(input: string | undefined | null): string {
  return normalizeDropboxUrl(input);
}
