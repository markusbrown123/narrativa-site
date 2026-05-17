# Updating site content

Site content lives in typed TypeScript files under `lib/mock/`. Anything in
these files renders on the site the next time it builds — there is no database
yet. Each record uses a small, sheet-friendly set of fields so the same shape
can later be served from Google Sheets without changing how pages consume it.

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

## Future: Google Sheets

The schemas above are intentionally flat and use simple strings, ISO dates,
and short controlled vocabularies (`status`, `format`, `icon`) — they map 1:1
to a Google Sheet with one row per record and one column per field.

When we wire that up:
1. The Sheet will mirror the TypeScript types in `types/content.ts`.
   Each sheet (Events, Partners, Services, etc.) has the same columns as the
   matching `*.ts` file.
2. A small adapter will read the sheet, validate rows against the existing
   types, and replace the contents of `lib/mock/*.ts` at build time. Pages
   keep importing `events`, `partners`, etc. — no other code changes.
3. The `status` column is the on/off switch: `Draft` / `Archived` rows never
   reach the site; only `Ready to Publish` / `Published` do.
4. Dates stay in `YYYY-MM-DD` to avoid timezone surprises.

Until that integration ships, keep editing the TypeScript files directly and
commit the change. No special workflow required.
