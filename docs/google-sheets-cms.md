# Google Sheets as the Narrativa CMS

The site reads content from a Google Sheet at build/render time. When the
sheet is configured the site uses live data; when it isn't (or a tab is
empty/broken), the site falls back to the bundled mock data under
`lib/mock/`.

Nicole only has to edit the Sheet. No code, no deploys.

---

## How it works

1. Pages call async getters (`getEvents()`, `getPartners()`, `getServices()`,
   `getBooks()`, `getMedia()`, `getPodcasts()`, `getPress()`,
   `getRecognition()`, `getPhotos()`) from `lib/cms/contentSource.ts`.
2. The content source reads the Google Sheets API once per cache window
   (`CONTENT_REVALIDATE_SECONDS`, default 300s) and parses each tab into
   the same typed shape the site already uses.
3. Any row whose `status` is `Draft` or `Archived` is filtered out by
   `publish()` in `lib/content.ts` before it reaches the page.
4. If a tab is missing, empty, or returns an error, that tab silently
   falls back to its mock counterpart. The rest of the site keeps
   working.

The debug endpoint at `/api/content-health` reports which source is in
use, what counts came back per tab, and which tabs (if any) fell back
to mock — without leaking any secrets.

---

## Environment variables

Set these in your local `.env.local` (and in Netlify → Site → Build &
deploy → Environment):

```
CMS_SOURCE=google_sheets
GOOGLE_SHEET_ID=<the long id from the sheet URL>
GOOGLE_SHEETS_API_KEY=<a Google Cloud API key with the Sheets API enabled>
CONTENT_REVALIDATE_SECONDS=300
```

- `CMS_SOURCE` must be exactly `google_sheets` to switch on the live
  CMS. Anything else (or unset) keeps the mock data live.
- `GOOGLE_SHEET_ID` is the segment between `/d/` and `/edit` in the
  sheet URL.
- `GOOGLE_SHEETS_API_KEY` only authorizes the request — it does NOT
  grant access to private sheets. The sheet must be set to "Anyone with
  the link can view".
- `CONTENT_REVALIDATE_SECONDS` controls how often Next.js refreshes the
  data on production. 300 (5 minutes) is a good default.

---

## Setting up the Google Cloud API key

1. Go to https://console.cloud.google.com/, create a project (or pick
   one).
2. In APIs & Services → Library, enable **Google Sheets API**.
3. In APIs & Services → Credentials, click **Create credentials → API
   key**. Copy it.
4. Click "Edit API key". Restrict it to:
   - **Application restrictions**: HTTP referrers or "None" (server
     calls don't carry a referrer). For Netlify you can leave it None.
   - **API restrictions**: select only the Google Sheets API.
5. Paste the value into `GOOGLE_SHEETS_API_KEY`.

---

## Setting up the Google Sheet

1. Create a new Google Sheet (or use the one Nicole already shared).
2. **Share → Anyone with the link → Viewer.** The API key cannot read
   private sheets.
3. Add one tab per content type, named exactly as shown below. Names
   are case-sensitive.

### Required tabs

| Tab           | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `Events`      | Keynotes, workshops, panels, book events                       |
| `Partners`    | Logos, clients, hosts, venues                                  |
| `Services`    | The services menu                                              |
| `Books`       | Books (one row per title)                                      |
| `Media`       | Catch-all media items (newsletters, embeds, etc.)              |
| `Podcasts`    | Podcast and on-camera interviews                               |
| `Press`       | Press features and mentions                                    |
| `Recognition` | Awards and honors                                              |
| `Photos`      | Photo library                                                  |
| `Settings`    | Flat key/value bag (e.g. `amazon_book_url`)                    |

Each tab's first row is the header row. The site reads rows by header
name, so column order doesn't matter — only spelling does.

### Shared lifecycle columns

Every content tab (everything except `Settings`) supports these columns:

| Column        | Type    | Notes                                                                 |
| ------------- | ------- | --------------------------------------------------------------------- |
| `id`          | string  | Unique slug, e.g. `evt-lvws-2026`. Auto-generated if blank.            |
| `status`      | string  | `Draft`, `Ready to Publish`, `Published`, `Archived`. Default: Draft. |
| `featured`    | boolean | `TRUE`/`FALSE` (or `Yes`/`No`/`1`/`0`). Floats item to top of lists.  |
| `sort_order`  | number  | Lower numbers render first within their featured group.               |
| `title` / `name` | string | Display title.                                                     |
| `created_at`  | date    | Any parseable date. Used for diagnostics; not rendered.               |
| `updated_at`  | date    | Same as above.                                                        |

`status` is the on/off switch. Only `Ready to Publish` and `Published`
rows render. Setting a row to `Draft` or `Archived` instantly hides it.

### Tab column reference

See [`sheet-templates/`](./sheet-templates/) for CSV templates Nicole can
import into a fresh sheet. The columns:

- **Events**:
  `id,status,featured,sort_order,title,event_date,event_time,location,role,description,cta_label,cta_url,image_url,created_at,updated_at`
- **Partners**:
  `id,status,featured,sort_order,name,relationship,description,website_url,logo_url,created_at,updated_at`
- **Services**:
  `id,status,featured,sort_order,title,category,short_description,description,outcomes,deliverables,ideal_for,icon,created_at,updated_at`
- **Books**:
  `id,status,featured,sort_order,title,subtitle,author,publisher,release_date,description,amazon_url,cover_image_url,stack_image_url,created_at,updated_at`
- **Media**:
  `id,status,featured,sort_order,title,kind,source,summary,url,image_url,published_date,created_at,updated_at`
- **Podcasts**:
  `id,status,featured,sort_order,title,show,host,summary,url,image_url,published_date,created_at,updated_at`
- **Press**:
  `id,status,featured,sort_order,title,publication,summary,url,image_url,published_date,created_at,updated_at`
- **Recognition**:
  `id,status,featured,sort_order,title,organization,year,summary,url,image_url,created_at,updated_at`
- **Photos**:
  `id,status,featured,sort_order,title,category,alt,image_url,caption,created_at,updated_at`
- **Settings**: `key,value`

### Multi-value fields (pipe-separated)

For services, `outcomes` and `deliverables` are pipe-separated:

```
Brand positioning | Messaging architecture | Niche and audience definition
```

The site splits on `|` and trims whitespace.

### Status values

| Status              | Visible? | When to use                                |
| ------------------- | -------- | ------------------------------------------ |
| `Draft`             | No       | Anything not yet confirmed.                |
| `Ready to Publish`  | Yes      | Confirmed, intended to go live.            |
| `Published`         | Yes      | Live and stable.                           |
| `Archived`          | No       | Past content kept for reference, hidden.   |

### Allowed values for `icon` (Services)

`spark | compass | pen | stage | camera | calendar | globe`

### Allowed values for `kind`

- **Podcasts**: `Podcast | Interview | Spotify | Apple | YouTube | Vimeo`
- **Press**: `Feature | Quote | Op-Ed | Profile | Mention`

### Allowed values for `category` (Photos)

`Headshot | Speaking | Portrait | Book Launch | Editorial`

---

## Updating content

Whenever Nicole edits the Sheet:

1. She saves the row (Google Sheets auto-saves).
2. Within `CONTENT_REVALIDATE_SECONDS` (default 5 minutes), the live
   site picks up the change automatically. No rebuild needed.
3. If she needs the change to appear immediately, she can trigger a
   redeploy in Netlify ("Deploy → Trigger deploy"), which forces a
   fresh fetch.

---

## What if the sheet breaks?

The CMS is designed to fail safe:

- **No env vars / wrong env vars** → falls back to mock data.
- **Sheet shared as Restricted** → 403 from the API → mock data.
- **One tab renamed or empty** → that tab falls back to mock; the
  other tabs keep working.
- **Bad value in one row (e.g. `format: "Fireseide"`)** → mappers
  coerce to a safe default and keep going.

The `/api/content-health` endpoint surfaces which tabs fell back, with
a short error message for each. Useful when diagnosing why something
isn't showing up.

---

## Files in this system

- `lib/cms/googleSheets.ts` — fetches one tab from the Sheets API.
- `lib/cms/parseRows.ts` — string/number/boolean/array/date/status helpers.
- `lib/cms/mappers.ts` — row → typed-record converters per tab.
- `lib/cms/contentSource.ts` — orchestrator; per-tab fallback to mock.
- `lib/cms/dropbox.ts` — `normalizeDropboxUrl()` for image/file links.
- `lib/cms/types.ts` — shared CMS contracts.
- `app/api/content-health/route.ts` — diagnostics endpoint.
