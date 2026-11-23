# Sheet updates for the November 2026 site update

If the live site reads the Google Sheet (`CMS_SOURCE=google_sheets` in
Netlify), these rows must match the new site. Where a tab is used, the
Sheet wins over the files in `lib/mock/`. If the Sheet is not connected,
skip this: the site already carries all of it.

Each CSV in `docs/sheet-templates/` holds the exact rows. Paste them in
(File → Import → Append, or copy the cells), then open the "update site"
link (see `docs/google-sheets-cms.md`).

## Events tab

Add two columns to the header, `end_time` after `event_time`, and
`visibility` after `location`. Then add:

| id | status | featured | sort_order | title | event_date | event_time | end_time | location | visibility | cta_label | cta_url |
|---|---|---|---|---|---|---|---|---|---|---|---|
| evt-amerihealth-caritas-erg-2026-11-18 | Published | FALSE | 1 | Private Employee Resource Group Event at AmeriHealth Caritas | 2026-11-18 | | | AmeriHealth Caritas | private | | |
| evt-villa-maria-academy-2026-11-19 | Published | FALSE | 2 | Private Event at Villa Maria Academy High School | 2026-11-19 | | | Villa Maria Academy High School | private | | |
| evt-power-of-professional-women-2027-01-13 | Published | TRUE | 3 | The Power of Professional Women: "The Unseen Work That Changes Everything" | 2027-01-13 | 11:30am | 1:00pm | Virtual | public | Register | https://powerw.org/events/EventDetails.aspx?id=2100900&group= |

Leave the other columns blank. If there is an `is_upcoming` column, it is
no longer used for dated events and can be deleted.

On the Lehigh Valley Women's Summit row, set `role` to `Breakout Session
Speaker` (it said Keynote; her flyer says breakout session speaker).

## Podcasts tab

Add the five rows in `docs/sheet-templates/Podcasts.csv` (Brilliantly
Resilient, Dare to Lead, How Women Write, Just Wanted to Ask, Women &
Wealth, sort_order 1–5). Set every other row's `status` to `Archived`,
including Beyond Empty Nest, the Forge Wealth Women & Wealth page,
Brilliantly Resilient on LinkedIn, Influential Women, The Lowdown, and the
YouTube interviews.

When the two covers are in the project, put their paths in `image_url`
(How Women Write and Just Wanted to Ask).

## Books tab

Update the Unapologetic row from `docs/sheet-templates/Books.csv`:

- `description`: Nicole's new description. In the cell, separate
  paragraphs with a blank line (Alt+Enter twice); each "learn how to" line
  starts with `- `.
- `tagline`: add this column if missing, so the book box shows the short
  line instead of the whole description.
- `amazon_url`: `https://www.amazon.com/dp/B0GP3RZ4SR`
- `barnes_noble_url` (new column):
  `https://www.barnesandnoble.com/w/unapologetic-nicole-stephenson/1150349544?ean=9798987476093`

If the **Settings** tab has an `amazon_book_url` row, set it to the same
Amazon link (it overrides the Books row).

## Recognition tab

Add the Women's Resource Center row from
`docs/sheet-templates/Recognition.csv` (title "Leadership Award",
organization "Women's Resource Center", year 2025, summary "October 2025.",
no image).

## Partners tab

Replace the rows with `docs/sheet-templates/Partners.csv` (new `.webp`
logo paths, `logo_width`, `logo_height`, `logo_background`). All six logos
are Published, Northeast Institute included. Remove any
`website_url`: logos no longer link out. When Nicole's new Partners folder
is in, run `node scripts/prepare-logos.mjs client-assets/Partners
public/partners` and use the rows it prints.

## Services tab

No longer read. It can be deleted.
