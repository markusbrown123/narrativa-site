# The Sheet's "Website" menu and editor

Four files to paste into the content Google Sheet's Apps Script project,
once. They add a **Website** menu to the Sheet:

| Menu item | What it does |
|---|---|
| **Open the editor** | Opens the **Website editor** beside the Sheet (below). |
| **Publish changes now** | Updates the website from the Sheet and shows what needs fixing, with a **Go to row** button for each. |
| **Set up dropdowns and tick boxes** | Status becomes a dropdown, Featured a tick box, other choice columns get dropdowns, date columns flag non-dates, every column gets a help note, hidden rows are greyed out, and tabs are coloured by whether the site shows them. Safe to run again. |
| **Connect to the website…** | Stores the update key (the editor can do this too). |

## The Website editor

A panel beside the Sheet, in the site's colours and fonts, so Nicole can
work without touching cells:

- **Calendar**: a month view with a dot on every event day (purple = on
  the site, grey = hidden), the events coming up, and **Add an event**
  (pick a day first and the date is filled in).
- **Pictures**: every event flyer, partner logo, podcast cover and award
  picture as a gallery. **Replace** uploads a picture from her computer:
  it is resized in the browser (photos to 2400 px JPEG, logos to 1200 px
  PNG), saved to a "Website pictures" folder in her Drive, shared as
  "Anyone with the link", and its link written into the Sheet. Logos also
  get their pixel size written to `logo_width` / `logo_height`.
- **Edit**: every row of Events, Partners, Podcasts, Awards and the Book,
  searchable, opening as a form with plain labels: date pickers, an
  on-the-website / draft / archived switch, toggles, dropdowns, picture
  upload, and the Amazon link under Settings. Saving writes only what
  changed. Text that starts with `=`, `+`, `-` or `@` is kept as text,
  not read as a formula; times are kept exactly as typed.
- **Fixes**: the same check as the "update site" page, with one-click
  fixes: put a row on the site or keep it hidden, add a missing
  `https://`, pick public/private, tick or untick Featured, rename a
  misspelt column, give duplicate rows their own id, share a picture the
  editor uploaded. Anything else opens the row in the editor at the field
  to fix.
- **Ask** (optional): she types a change in her own words ("Add my
  keynote at the Lehigh Valley Women's Summit on June 4 at 11:30am") and
  the helper proposes it as a card showing each field, old → new. Nothing
  is saved until she clicks **Apply** (or **Edit first**, which opens the
  form filled in). It uses Claude (Anthropic), see below.
- **Publish to website**, always at the bottom: updates the site now and
  shows how many things need fixing.

## Install (once, about ten minutes)

1. Open the Sheet. **Extensions → Apps Script.**
2. In `Code.gs`, replace everything with the whole of `website-menu.gs`.
3. **+ → Script**, name it `Editor`, and paste `Editor.gs`.
4. **+ → HTML**, name it `Editor`, and paste `Editor.html`.
5. **Project Settings** (the gear) → tick **Show "appsscript.json"
   manifest file in editor**. Back in the editor, open `appsscript.json`
   and replace it with this folder's `appsscript.json`. It limits what the
   script may do (see Permissions).
6. Click **Save**, close the Apps Script tab and reload the Sheet. A
   **Website** menu appears next to Help after a few seconds.
7. **Website → Open the editor.** The first time, Google asks for
   permission: **Continue**, pick the account, then on "Google hasn't
   verified this app" click **Advanced → Go to Website menu** and
   **Allow**. Google shows this for every script a person adds to their
   own Sheet.
8. At the bottom of the editor, paste the "update site" link (it ends in
   `key=…`; the key is `REFRESH_SECRET` in Netlify) and click
   **Connect**.
9. Optional: **Website → Set up dropdowns and tick boxes**.

## Permissions (appsscript.json)

| Permission | Why |
|---|---|
| This spreadsheet only (`spreadsheets.currentonly`) | Read and write the Sheet. It can't open any other spreadsheet. |
| Files the editor creates (`drive.file`) | Upload pictures into its "Website pictures" folder and share them. It can't see or change anything else in her Drive. |
| Connect to external services (`script.external_request`) | Reach narrativaconsulting.com (publish and check), Google Drive's upload service, and, if the AI helper is on, Anthropic. |
| Show the sidebar (`script.container.ui`) | The editor and the menu's dialogs. |

Because of `drive.file`, **Share it** in Fixes only works on pictures the
editor uploaded. For any other Drive picture it explains how to share it
in Drive, or she can upload it again through the editor.

## The AI helper (optional)

- Turn it on in the editor's **Ask** section with an Anthropic API key
  (console.anthropic.com → API keys). The key is checked with a free call
  and kept with the Sheet's script, like the update key.
- Each request sends the Sheet's content (the Sheet is already viewable
  by anyone with the link) and her request to Anthropic, and costs a few
  cents, billed to the account the key belongs to.
- Model `claude-opus-5-5` at low effort, with structured JSON output: the
  answer is one proposed change (`add_row`, `update_row`, `hide_row` or a
  question). The editor drops any column a tab doesn't have and shows
  each field old → new; nothing is written until she applies it.
- On a safety decline the API retries on a suitable model by itself
  (`fallbacks: "default"`); if the whole chain declines, the editor says
  it can't help with that one.
- Its instructions: use only facts she gives or that are in the Sheet,
  keep her wording unless she asks for a rewrite, ask one question when
  something essential is missing.
- **Turn off** in the Ask section removes the key.

## Notes

- Changes still reach the site on their own within
  `CONTENT_REVALIDATE_SECONDS` (5 minutes by default); **Publish** is for
  "now" and for the check.
- If `REFRESH_SECRET` changes in Netlify, the editor asks for the new
  link.
- Not run inside Google from this repo (no Google account in the build
  environment). The scripts were syntax-checked, and the editor was run
  end to end in Chromium against a stand-in for Google's Sheets, Drive,
  the website and Anthropic's API: calendar, editing and adding rows,
  picture upload and sharing, connecting, every quick fix, and the AI
  helper's request and apply flow.
