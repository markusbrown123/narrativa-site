# Dropbox media workflow

Nicole stores all images and PDFs (event flyers, partner logos, headshots,
press kits) in Dropbox, and pastes the share link into the relevant Google
Sheet cell — `image_url`, `logo_url`, `cover_image_url`, `cta_url`,
`file_url`, etc.

The site normalizes the link on the fly. She does not need to manage
file IDs, raw=1 flags, dl=0 vs dl=1, or anything else.

---

## How Nicole adds an asset

1. Drop the file into Dropbox (any folder).
2. Right-click the file → **Share → Copy link**.
3. Paste the link into the matching cell in the Google Sheet. Examples:
   - Event flyer → `Events` tab → `image_url` column.
   - Partner logo → `Partners` tab → `logo_url` column.
   - Book cover → `Books` tab → `cover_image_url` column.
   - One-sheet PDF → `Events` tab → `cta_url` column with `cta_label = "Download flyer"`.
4. Save the row. The next render (within `CONTENT_REVALIDATE_SECONDS`)
   serves the image straight from Dropbox.

That's it. No file renames, no folder rules, no IDs.

---

## What the site does behind the scenes

`lib/cms/dropbox.ts` exports `normalizeDropboxUrl(url)`. Whenever a sheet
mapper sees an asset URL, it runs it through this helper, which:

- Detects Dropbox-hosted URLs by hostname (`dropbox.com`,
  `www.dropbox.com`, `dl.dropboxusercontent.com`).
- Rewrites the host to `dl.dropboxusercontent.com` so the browser
  receives the file bytes instead of Dropbox's share page HTML.
- Drops `dl=0`, sets `dl=1` (unless `raw=1` is already present).
- Preserves `rlkey` and other query params.
- Returns the original string untouched for non-Dropbox URLs (so local
  `/photos/...` paths still work).

Supported share-link shapes:

| Input                                                                   | Result                                                                    |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `https://www.dropbox.com/scl/fi/abc/foo.jpg?rlkey=xyz&dl=0`             | `https://dl.dropboxusercontent.com/scl/fi/abc/foo.jpg?rlkey=xyz&dl=1`     |
| `https://www.dropbox.com/s/abc/file.pdf?dl=0`                           | `https://dl.dropboxusercontent.com/s/abc/file.pdf?dl=1`                   |
| `https://www.dropbox.com/.../foo.jpg?raw=1`                             | `https://dl.dropboxusercontent.com/.../foo.jpg?raw=1`                     |
| `https://dl.dropboxusercontent.com/scl/fi/abc/foo.jpg?rlkey=xyz`        | unchanged (already direct)                                                |
| `/photos/headshot.jpg` (local)                                          | unchanged                                                                 |

---

## Image rendering

`next/image` is configured in `next.config.ts` to allow Dropbox
hostnames:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "www.dropbox.com" },
    { protocol: "https", hostname: "dropbox.com" },
    { protocol: "https", hostname: "dl.dropboxusercontent.com" },
  ],
}
```

The site continues to use `next/image` for optimization. If a specific
asset has trouble being optimized (rare, usually due to a redirect
quirk), the safe fallback is to set the image to render unoptimized by
using a plain `<img>` tag — or just upload that one asset under
`public/` instead.

---

## When NOT to use Dropbox

- **Logo files and ultra-frequently displayed images** — these are
  best committed to `public/` so they're served from the same CDN as
  the rest of the site. The CMS still works with Dropbox here; it's
  just slightly faster to serve from `/public/`.
- **The Unapologetic book cover and social promo cards** — already
  shipped in `public/book/`; no reason to move them.

---

## Future: API-based Dropbox sync

The placeholders `DROPBOX_APP_KEY`, `DROPBOX_APP_SECRET`,
`DROPBOX_REFRESH_TOKEN` in `.env.example` are reserved for a future
iteration where we mirror a Dropbox folder into `public/`. They are
NOT used today. The current pasted-link workflow is intentionally
zero-config.
