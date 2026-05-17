# Updating site content

Nicole's primary workflow is now **Google Sheets**. See
[`google-sheets-cms.md`](./google-sheets-cms.md) for the day-to-day
"add an event / hide a service / paste a Dropbox link" workflow.

This doc covers the **bundled mock data** under `lib/mock/`, which is
the fallback the site uses when:

- the Google Sheet env vars are missing, OR
- a single sheet tab is unreachable / empty / mis-spelled.

Pages call async getters from `lib/cms/contentSource.ts`
(`getEvents()`, `getServices()`, etc.). Those getters return the live
sheet data when configured and the mock data otherwise. The two
sources share the same TypeScript shape, so editing either one
updates the site without changing page code.

This doc covers the three areas that change most often: events, partners, and
services. Everything else (press, podcasts, recognition, photos, the book) uses
the same patterns.

---

## Where to edit

| What you want to change           | File                       |
| --------------------------------- | -------------------------- |
| Events (talks, workshops, panels) | `lib/mock/events.ts`       |
| Partner / client / venue logos    | `lib/mock/partners.ts`     |
| Services menu                     | `lib/mock/services.ts`     |
| Podcasts & interviews             | `lib/mock/podcasts.ts`     |
| Press features                    | `lib/mock/press.ts`        |
| Recognition / awards              | `lib/mock/recognition.ts`  |
| Book (Unapologetic)               | `lib/mock/book.ts`         |
| Speaker topics, formats, audiences| `lib/mock/speaker.ts`      |

All records share the same lifecycle fields, defined in
`types/content.ts`:

```ts
{
  id: string;          // unique slug, e.g. "evt-lvws-2026"
  title: string;       // internal title — used for sorting and admin
  status: ContentStatus;
  featured: boolean;   // floats this record to the top of its list
  sort_order: number;  // tiebreaker: lower numbers render first
  created_at: string;  // ISO date
  updated_at: string;  // ISO date
}
```

Everything else is type-specific.

---

## Status values

`status` is one of four strings:

| Status              | Visible on site? | When to use                               |
| ------------------- | ---------------- | ----------------------------------------- |
| `"Draft"`           | No               | Default for anything not yet confirmed.   |
| `"Ready to Publish"`| Yes              | Confirmed and approved by Nicole.         |
| `"Published"`       | Yes              | Live, intended to stay up.                |
| `"Archived"`        | No               | Past content kept on file but hidden.     |

The site-wide `publish()` helper (in `lib/content.ts`) filters out anything
that is not `Ready to Publish` or `Published`. That means setting a record to
`"Draft"` or `"Archived"` instantly removes it from every page — you do not
need to delete the record itself.

Always default new records to `"Draft"`. Move them to `"Published"` only when
all the facts (date, venue, role, link) are confirmed.

---

## Events

`lib/mock/events.ts` exports an `Event[]` array. Each event looks like:

```ts
{
  id: "evt-lvws-2026",
  title: "Lehigh Valley Women's Summit 2026",
  status: "Published",
  featured: true,
  sort_order: 10,
  created_at: "2026-05-15T00:00:00Z",
  updated_at: "2026-05-16T00:00:00Z",
  date: "2026-06-04",                 // YYYY-MM-DD
  end_date: undefined,                // optional, for multi-day
  location: "Wind Creek Bethlehem, PA",
  format: "Keynote",                  // Keynote | Workshop | Panel | Fireside | Book Event
  audience: "Lehigh Valley Women's Summit attendees",
  summary: "Breakout session speaker at the 2026 summit.",
  url: undefined,                     // optional public link
  cta_label: undefined,               // optional, defaults to "Learn more"
  image: "/events/lehigh-valley-womens-summit.png",  // file under /public/events
  is_upcoming: true,                  // true = future, false = past
}
```

### Add an event
1. Copy any existing entry, give it a new `id`.
2. Fill in date, location, format, audience, summary.
3. Drop the flyer image into `public/events/` and reference it as `/events/<file>`.
4. Set `status: "Draft"` until everything is confirmed, then flip to `"Published"`.
5. Set `is_upcoming: true` for future events, `false` for past events.

### Remove an event
- Best: set its `status` to `"Archived"` (or `"Draft"`). It disappears from the
  site but the record stays for reference.
- Or: delete the entry from the array.

### Sort order
- The site sorts by `featured` first, then `sort_order` ascending.
- For most cases just bump `sort_order` (10, 20, 30 …) so it's easy to slot a
  new event between two existing ones.

### Featured events
- `featured: true` floats an event to the top of the page list.
- The home page's "Next confirmed stage" feature picks the first
  `is_upcoming` event after `publish()` filters out drafts.

---

## Partners

`lib/mock/partners.ts` exports a `Partner[]`. Each partner looks like:

```ts
{
  id: "ptr-lvws",
  title: "Lehigh Valley Women's Summit",
  status: "Published",
  featured: true,
  sort_order: 10,
  created_at: "2026-05-16T00:00:00Z",
  updated_at: "2026-05-16T00:00:00Z",
  name: "Lehigh Valley Women's Summit",
  logo: "/partners/lehigh-valley-womens-summit-logo.png",
  relationship: "2026 Breakout Session Speaker",  // optional
  url: undefined,                                  // optional public link
}
```

### Add a partner
1. Drop the logo file into `public/partners/`.
2. Copy an existing entry and update `id`, `name`, `logo`.
3. If Nicole's role with this partner is on the record (e.g. "Faculty",
   "Keynote Speaker"), set `relationship`. If not, leave it blank — the page
   renders these in two groups: with-relationship cards on top, logos-only
   below.
4. Set `status: "Draft"` until confirmed.

### Remove a partner
- Set status to `"Archived"` (preferred) or `"Draft"`, or delete the entry.

---

## The book (Unapologetic) — purchase links

`lib/mock/book.ts` exports the verified `book` record plus a named
constant for the Amazon purchase URL:

```ts
export const AMAZON_BOOK_URL =
  "https://www.amazon.com/UNAPOLOGETIC-Boldly-Lead-Career-Deserve/dp/B0GP3RZ4SR";
```

The book page hero CTA and the closing book CTA band both link to this
URL. The homepage momentum strip also points at it. If the canonical
Amazon listing ever changes:

1. Update `AMAZON_BOOK_URL` in `lib/mock/book.ts`. Every page that
   imports it picks up the new value automatically.
2. The `book.purchase_links` array also includes a `{ label: "Order on
   Amazon", url: AMAZON_BOOK_URL }` entry — keep this entry in sync.

Do not add other retailers until Nicole confirms them. The site is
intentionally strict about not inventing purchase channels.

---

## Services

`lib/mock/services.ts` exports a `Service[]`. Each service looks like:

```ts
{
  id: "svc-speaker-brand-development",
  title: "Speaker Brand Development",
  status: "Published",
  featured: true,
  sort_order: 10,
  created_at: "2026-05-16T00:00:00Z",
  updated_at: "2026-05-16T00:00:00Z",
  slug: "speaker-brand-development",
  tagline: "Establish a strong, professional foundation for your speaking career.",
  description: "...",
  outcomes: ["...", "..."],
  deliverables: ["...", "..."],
  ideal_for: "Experts ready to move from one-off speaking to a recognized speaker brand.",
  icon: "spark",   // spark | compass | pen | stage | camera | calendar | globe
}
```

The current verified service categories are:
- Speaker Brand Development
- Marketing & Visibility Strategy
- Content & Writing Services
- Speaker Assets & Design
- Media & Production Service Referrals
- Speaking Engagement Development
- Event Strategy & Execution

### Edit a service
- Update `tagline`, `description`, `outcomes`, `deliverables`, or `ideal_for`
  in place — those drive everything that renders on the Services page.
- Do not add pricing, timelines, or guarantees. The site intentionally does not
  promise those.

### Add a service
1. Copy an existing entry. Update `id`, `slug`, `title`, and copy.
2. Pick an `icon` from the allowed set.
3. Set `featured: true` if it should show up in the home-page "Three ways"
   strip; otherwise `false`.
4. Set `status: "Draft"` until ready.

### Remove a service
- Set `status: "Archived"` (or `"Draft"`), or delete the entry.

---

## Adding a new image

1. Save the file under the matching folder in `public/`:
   - Photos of Nicole → `public/photos/`
   - Event flyers → `public/events/`
   - Partner logos → `public/partners/`
   - Book assets → `public/book/`
2. Reference it with a path starting at `/` (e.g. `/events/my-flyer.png`).
3. Always add a meaningful `alt` description in the record — it's used for
   screen readers and SEO.

---

## Google Sheets (live CMS)

The Google Sheets adapter is now live. See:

- [`google-sheets-cms.md`](./google-sheets-cms.md) — how the adapter
  works, env vars, tab names, and column reference.
- [`dropbox-media-workflow.md`](./dropbox-media-workflow.md) — how
  Nicole adds images and PDFs via Dropbox share links.
- [`sheet-templates/`](./sheet-templates/) — CSV templates for each
  tab. Import into a fresh Google Sheet, or copy/paste the headers
  into an existing one.

Quick rules of thumb:

- `status = "Draft"` or `"Archived"` → hidden, both in mock data and
  in the live sheet.
- Pages stay backwards-compatible: if the sheet is unconfigured (or
  one tab fails), the mock data here is what renders.
- Verify which source is live by visiting `/api/content-health` on
  your local or deployed site.
