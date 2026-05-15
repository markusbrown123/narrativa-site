# Narrativa Consulting — Site

The MVP marketing site for **Narrativa Consulting** and **Nicole Stephenson** —
author of _Unapologetic: Boldly Lead the Life and Career You Deserve_, founder
of Narrativa Consulting, and Lecturer at The Wharton School at the University
of Pennsylvania.

This first release runs on **mock data and local assets**. No Google Sheets,
Dropbox, email, or live integrations are wired up yet — placeholder API routes
log submissions to the server and return success.

## Stack

- [Next.js 16](https://nextjs.org/docs) App Router
- React 19
- TypeScript (strict)
- Tailwind CSS v4

> **Heads-up:** Next.js 16 is newer than most reference material. Read the
> bundled docs in `node_modules/next/dist/docs/` before reaching for older
> patterns.

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

### Scripts

| Command         | What it does                                |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start the dev server                        |
| `npm run build` | Production build                            |
| `npm run start` | Run the production build                    |
| `npm run lint`  | ESLint (Next + TypeScript core rules)       |

## Project structure

```
app/
  layout.tsx          Root layout — header, footer, fonts, metadata
  page.tsx            Home
  about/              /about
  book/               /book — Unapologetic
  speaker/            /speaker
  services/           /services
  events/             /events
  media/              /media — press + podcasts
  mentor-program/     /mentor-program — cohort program + apply form
  contact/            /contact — general contact form
  api/
    contact/route.ts  Placeholder POST handler (logs + 200)
    mentor/route.ts   Placeholder POST handler (logs + 200)
  globals.css         Tailwind v4 + brand tokens

components/           Reusable sections, cards, forms
lib/
  clsx.ts             Tiny class-merge helper
  content.ts          Visibility filter + sorting + date helpers
  mock/               Mock data (events, podcasts, press, services, book, recognition)
types/
  content.ts          Shared content models
public/               Static assets
```

## Content model

Every public record carries identity, lifecycle, and ordering fields so the
mock layer can later be swapped for a CMS or Google Sheet without changes to
the UI:

```ts
{
  id: string;
  title: string;
  status: "Draft" | "Ready to Publish" | "Published" | "Archived";
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
```

The `publish()` helper in `lib/content.ts` enforces the visibility rule:
**only `Ready to Publish` and `Published` records are surfaced**. `Draft` and
`Archived` are hidden from every page.

Featured records float to the top, then the list sorts by `sort_order`
ascending.

## Brand

| Token             | Hex       | Notes                                       |
| ----------------- | --------- | ------------------------------------------- |
| Brand purple      | `#6b2c91` | Primary brand color                         |
| Soft lavender     | `#ebddf4` | Soft surfaces, pills, highlights            |
| Deep green        | `#1f4d3a` | Status accents (upcoming events)            |
| Ink               | `#1a1322` | Body text                                   |
| Surface           | `#ffffff` | Page background                             |
| Surface alt       | `#f7f5f9` | Section backgrounds                         |
| Surface tint      | `#faf7fc` | Soft section backgrounds                    |
| Light gray (line) | `#e7e2ec` | Borders, dividers                           |

Fonts: **Geist Sans** (UI) and **Fraunces** (display) via `next/font/google`.

## Forms

The contact and mentor forms POST JSON to `/api/contact` and `/api/mentor`. The
route handlers validate required fields, log the submission to the server, and
return `{ ok: true }`. Wire real integrations (email, CRM, Sheet) inside those
handlers when ready.

## Next steps (not in scope for this MVP)

- Wire `/api/contact` and `/api/mentor` to email / CRM / Google Sheet
- Replace mock data with a CMS or Google Sheets data layer
- Replace placeholder press/podcast logos with licensed images
- Add OG images (`opengraph-image.tsx`) per route
- Add a sitemap and robots route
- Add analytics
