# The Sheet's "Website" menu

`website-menu.gs` is a small Google Apps Script that adds a **Website**
menu to the content Google Sheet:

| Menu item | What it does |
|---|---|
| **Publish changes now** | Updates the website from the Sheet (the same as opening the "update site" link) and shows what needs fixing, with a **Go to row** button for each. |
| **Set up dropdowns and tick boxes** | Status becomes a dropdown (Draft, Ready to Publish, Published, Archived; typos are refused), Featured becomes a tick box (existing TRUE/Yes/✓ are kept), visibility, logo_background, kind and category get dropdowns, date columns flag non-dates, every column the website reads gets a help note on its header, rows the website hides are greyed out, tabs the website shows turn purple and tabs it doesn't (Media, Press, Photos) turn grey. Safe to run again; it keeps any formatting rules Nicole added herself. |
| **Connect to the website…** | Asks once for the update key and keeps it with the Sheet's script. People who can only *view* the Sheet (the Sheet has to be "Anyone with the link can view" for the website) never see it. |

It needs nothing on the website beyond what is already there: it calls
`/api/refresh?key=…&format=json`.

## Install (once, about five minutes)

1. Open the Sheet. **Extensions → Apps Script.**
2. Delete everything in `Code.gs`, paste the whole of `website-menu.gs`,
   and click **Save** (the disk icon). Name the project "Website menu".
3. Close the Apps Script tab and reload the Sheet. After a few seconds a
   **Website** menu appears next to Help.
4. **Website → Set up dropdowns and tick boxes.** The first time, Google
   asks for permission: **Continue**, pick the account, then on "Google
   hasn't verified this app" click **Advanced → Go to Website menu** and
   **Allow**. Google shows this for every script a person writes for
   their own Sheet. The script can only touch this Sheet (`@OnlyCurrentDoc`)
   and only talks to narrativaconsulting.com.
5. **Website → Connect to the website…** and paste the "update site" link
   (or just the key after `key=`). The key is `REFRESH_SECRET` in Netlify
   (Site configuration → Environment variables).

From then on: edit the Sheet, then **Website → Publish changes now**.

## Notes

- Changes still reach the site on their own within
  `CONTENT_REVALIDATE_SECONDS` (5 minutes by default); the menu is for
  "now", and for the check.
- If `REFRESH_SECRET` is changed in Netlify, the menu says the key has
  changed; use **Connect to the website…** again.
- Not tested inside Google itself from this repo (no Google account in the
  build environment). The script was syntax-checked and run end to end
  against a stand-in for Google's Sheets objects.
