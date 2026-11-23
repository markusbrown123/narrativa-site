# Updating your website

Everything on the website that changes (events, partner logos, podcasts,
awards, the book's details) comes from your Google Sheet. Change the
Sheet and the website follows. No code, nothing to upload.

## The easy way: the Website editor

In the Sheet, choose **Website → Open the editor**. A panel opens beside
the Sheet:

- **Calendar**: your events by month. Click a day, then **+ Add** to put
  an event on it, or click an event to change it.
- **Pictures**: every flyer, logo and cover. **Replace** uploads a new one
  from your computer. No sharing settings to remember: the editor does it.
- **Edit**: everything else (partners, podcasts, awards, the book, the
  Amazon link) as simple forms.
- **Fixes**: anything that won't show the way you expect, with a button
  that fixes it.
- **Ask**: type what you want in your own words ("Add my keynote at…")
  and check the change before it's saved.

When you're done, press **Publish to website** at the bottom.

You can still edit the Sheet directly; the rest of this guide explains
how.

## The basics

- **Each tab is one part of the site:** Events, Partners, Books,
  Podcasts, Recognition and Settings. (Media, Press and Photos aren't on
  the site at the moment, so changes there won't show.)
- **One row is one item:** one event, one logo, one podcast.
- **Status decides whether a row shows:**
  - **Published**: on the website.
  - **Draft**: not yet. Use it while details are being confirmed.
  - **Archived**: taken down, but kept so you can bring it back.
- **Your changes appear within 5 minutes.** To see them straight away,
  use **Website → Publish changes now** in the Sheet (or your "update
  site" bookmark).
- **Hover over a column's title** to see what goes in it.

## Add an event

1. Go to the **Events** tab and use the first empty row.
2. Fill in the **title**, **event_date** (like 6/4/2026),
   **event_time** (like 11:30am), **location**, **role** (Keynote,
   Panel…) and a line of **description**.
3. Registration link? Paste it into **cta_url**. The button says
   "Register" unless you write something else in **cta_label**.
4. Private event? Set **visibility** to *private*. It shows as a
   private event, with no registration button.
5. A flyer or photo? See *Pictures* below; it goes in **image_url**.
6. Set **status** to *Published*, then **Website → Publish changes now**.

Past events stay on the calendar, faded. You don't need to move them.

## Take something down

Set its **status** to *Archived*. It disappears from the site, and you
can bring it back any time by setting it to *Published* again.

## Pictures (from Google Drive)

1. Upload the picture to Google Drive.
2. Right-click it → **Share** → under *General access* choose **Anyone
   with the link** → **Done**. (Without this the website can't show it.)
3. Right-click it again → **Share** → **Copy link**.
4. Paste the link into **image_url** (events, podcasts, awards) or
   **logo_url** (partners).

Use a link to the picture itself, not to the folder it's in. Dropbox
links work too.

## Add a partner logo

On the **Partners** tab: the **name**, the logo's link in **logo_url**,
and **status** *Published*. If the logo is white (made for a dark
background), set **logo_background** to *dark*.

## Add a podcast or interview

On the **Podcasts** tab: the **show** name, the episode **title**, the
episode link in **url**, the cover picture in **image_url**, the
**published_date**, and **status** *Published*.

## Add an award

On the **Recognition** tab: the award in **title**, who gave it in
**organization**, the **year**, and **status** *Published*.

## Change the book's Amazon link

On the **Settings** tab, put the new link in the **value** next to
*amazon_book_url*.

## If something doesn't look right

Open the editor's **Fixes** (or use **Website → Publish changes now**,
or your "update site" bookmark). After updating the site it lists anything in the Sheet that needs
fixing, in plain words, with a button that takes you to the row. The
usual ones:

- a status with a typo (the row is hidden until it says *Published*)
- a Drive picture that isn't shared as *Anyone with the link*
- a date the site can't read (write it like 6/4/2026)
- a tab that was renamed

## Please don't

- **Rename the tabs.** The website looks for them by name.
- **Give a column a different name.** Capitals and spaces don't matter
  ("Image URL" is fine), but "Photo" instead of "image_url" isn't.
- **Change the Sheet's sharing.** It has to stay *Anyone with the link
  can view* for the website to read it. Only people you invite can edit.
