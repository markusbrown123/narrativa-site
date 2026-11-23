# Narrativa Consulting — Site

The site for **Nicole Stephenson, IOM**: author of _Unapologetic: Boldly Lead
the Life and Career You Deserve_, keynote speaker, Founder of Narrativa
Consulting, and Lecturer in the Wharton Communication Program at the University
of Pennsylvania. The site leads with the book, then speaking.

Live at [narrativaconsulting.com](https://narrativaconsulting.com), hosted on
Netlify.

## Stack

- [Next.js 16](https://nextjs.org/docs) App Router, React 19, TypeScript (strict)
- Tailwind CSS v4 (tokens in `app/globals.css`, no `tailwind.config`)
- Content from a Google Sheet, with bundled fallback data per tab
- Netlify Forms for the contact form

> **Heads-up:** Next.js 16 is newer than most reference material. Read the
> bundled docs in `node_modules/next/dist/docs/` before reaching for older
> patterns (see `AGENTS.md`).

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the dev server                  |
| `npm run build` | Production build                      |
| `npm run start` | Run the production build              |
| `npm run lint`  | ESLint (Next + TypeScript core rules) |

## Pages

| Route       | What it is                                                         |
| ----------- | ------------------------------------------------------------------ |
| `/`         | Hero, book box, Meet Nicole, On the record, Recognition, Partners  |
| `/about`    | Book box, bio (`lib/bio.ts`), Media Kit, Recognition               |
| `/book`     | Unapologetic: description, where to buy, launch photos, promo cards |
| `/speaker`  | Five talk topics, formats, upcoming events, partner logos          |
| `/events`   | Next event, month calendar (agenda list on phones)                 |
| `/media`    | Press headshot, the five featured interviews                       |
| `/partners` | Realm feature, partner logo grid                                   |
| `/contact`  | Contact form (Netlify Forms)                                       |

`/services` redirects to `/speaker` and `/mentor-program` to `/`
(`next.config.ts`).

## Project structure

```
app/
  layout.tsx            Root layout: header, footer, fonts, metadata
  page.tsx              Home (and the other routes in their folders)
  api/content-health    Where content is coming from (Sheet or fallback)
  api/refresh           "Update site" link for Nicole (see below)
  sitemap.ts, robots.ts, icon.png, favicon.ico, opengraph-image.jpg
  globals.css           Tailwind v4 + brand tokens + section alternation
components/             Sections, cards, forms (MonthCalendar, LogoMarquee,
                        PodcastLinkList, MediaKit, RichText, ...)
lib/
  cms/                  Google Sheets fetch, row mappers, per-tab fallback
  mock/                 Fallback data (events, partners, podcasts, book, ...)
  bio.ts                Nicole's approved bio, word for word
  events.ts             Upcoming/past, times, "next stage" selection
  credit.ts             Footer design credit (placeholder until supplied)
  content.ts            Visibility filter, sorting, date formatting
scripts/
  prepare-logos.mjs     Trim and export partner logos at web size
public/__forms.html     Registers the contact form with Netlify Forms
docs/                   How-tos (Sheet CMS, contact form, media, sources)
```

## Content

Every record has `status` (`Draft`, `Ready to Publish`, `Published`,
`Archived`), `featured`, and `sort_order`. Only `Ready to Publish` and
`Published` records show (`publish()` in `lib/content.ts`); featured first,
then by `sort_order`.

With `CMS_SOURCE=google_sheets`, `GOOGLE_SHEET_ID` and `GOOGLE_SHEETS_API_KEY`
set, each Sheet tab replaces its fallback file; a missing or broken tab falls
back on its own. See `docs/google-sheets-cms.md`.

- **Events** are upcoming or past by date (America/New_York), worked out on
  every read. Home, Events and Speaker re-render hourly. `visibility` is
  `public` or `private`; private events show "Private event" and no link.
- **Freshness:** Sheet data is cached for `CONTENT_REVALIDATE_SECONDS`
  (default 300). For an immediate update, Nicole opens
  `https://narrativaconsulting.com/api/refresh?key=<REFRESH_SECRET>` (set
  `REFRESH_SECRET` in Netlify). Without the right key it is a 404.

## Design system

- Fonts: **Cormorant Garamond** (display) and **Lato** (body) via `next/font`.
- Colours: purple scale `--color-purple-50` … `900` (brand `#5A2896`, deep
  `#24102F`), teal accent `#3CA082`, ink `#1B1223`. All in `app/globals.css`.
- Pill buttons, `rounded-3xl` cards, slow reveal-on-scroll, at most one dark
  band per page.
- Sections placed inside `<div className="section-stack">` alternate white and
  lavender by position.

## Contact form

Netlify Forms; see `docs/contact-form.md` for the one-time Netlify setup
(enable form detection, add the notification email).
