# Waiting on Nicole's USE_UPDATE folder

These parts of the November 2026 update need files from Nicole's USE_UPDATE
Drive folder. Put the folder in the project as `client-assets/` (it is
git-ignored: the repo is public, so raw files must not be committed), then
export web sizes into `public/`.

## Built, waiting for the file

The code for the three videos is in. Each one is switched on by filling in
its entry in `lib/videos.ts` (all three are `null` today, so the live pages
are unchanged). An entry needs the MP4 path, the poster path, the MP4's real
pixel size and a short description for screen readers.

| Where | Entry in `lib/videos.ts` | File | Then |
|---|---|---|---|
| Home hero (`HeroVideo`, shattered frame) | `HOME_HERO_VIDEO` | `HomePageLehighValleyShort.MOV` → `public/video/home-hero.mp4` | Delete `components/HeroRotator.tsx` and the rotator fallback in `components/PremiumHomeHero.tsx`. The frame takes the clip's own proportions (no crop or zoom). |
| Book, "Unapologetic, in the wild" (`VideoEmbed`) | `BOOK_SIGNING_VIDEO` | `PAConferenceBookSigning.MOV` → `public/video/pa-conference-book-signing.mp4` | Nothing else: the video leads the section, and the launch photo it replaces moves into the row below. |
| Partners, Realm feature (`VideoEmbed`) | `REALM_PARTNERS_VIDEO` | `REALM_PartnersPageVideo` → `public/video/realm-partners.mp4` | Nothing else: the card becomes text beside video. |

Open question for the home hero: the brief asks for a sound button, but the
conversion below drops the audio (`-an`). The sound button shows only when
the entry has `hasAudio: true`, so either keep the audio (drop `-an`) and set
it, or leave both as they are and the hero has a pause button only.

## Waiting for the files

| Where | What to do | Files |
|---|---|---|
| Home + Speaker logo strip, Partners grid | Replace `public/partners` with every logo, as supplied: `node scripts/prepare-logos.mjs client-assets/Partners public/partners`, then paste the printed entries into `lib/mock/partners.ts` (fix names by hand) and update `docs/sheet-templates/Partners.csv` | `Partners/` subfolder |
| About hero | Whichever crops best | `NICOLE STEPHENSON-082V1.jpg`, `NICOLE STEPHENSON-082V1-2.jpg`, `NICOLE STEPHENSON-194V1.jpg` |
| About Media Kit | Add to `MEDIA_KIT_PORTRAITS` in `lib/mock/mediaKit.ts` (web-size display file, full-size download file, real pixel size) | the three above, `NS_BlackForal_LongHeadshot.png`, the two files starting `025-` and `028-` |
| Speaker hero | Sharpest photo that shows the audience | `AudaciousSummitSpeak.jpg`, `StephanoSlackERGPresentation.jpeg`, `LVSummit.png` |
| Media hero | One of the two speaking photos not used on Speaker. The hero is text-only until then: every speaking photo the site already has is on the Speaker page. Switch `app/media/page.tsx` back to `variant="split"` with the image. | as above |
| Media + Home podcast list | Add `image` to these two entries in `lib/mock/podcasts.ts` (and `image_url` in the Sheet) | `HWW-Nicole-S.png`, `Justwantedtoaskpodcast.png` |

## Video conversion

One file at a time:

```bash
ffmpeg -i client-assets/HomePageLehighValleyShort.MOV -vf "scale='min(1920,iw)':-2,setsar=1" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  -an public/video/home-hero.mp4
```

Never crop or zoom the clip in the conversion: every player on the site
takes the clip's own proportions. `setsar=1` keeps the pixels square, so the
size in `lib/videos.ts` is exactly the shape the browser shows.

Drop `-an` for the click-to-play videos (they keep sound), and make a poster
with `ffmpeg -ss 1 -i <file> -frames:v 1 -q:v 3 public/video/<name>-poster.jpg`.
Read the real size for `lib/videos.ts` with
`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 <mp4>`
(phone clips can carry a rotation flag; use the size the browser shows).

Rename every file to lowercase-hyphen, and do not add files the site does
not use.

## Also asked for (not in the brief's file list)

| For | What | Why |
|---|---|---|
| Events calendar | Flyer or graphic for each new event (AmeriHealth Caritas, Villa Maria, The Power of Professional Women), and a one-line description for each, if she has them | The calendar shows a flyer and description when there is one; all three are blank now |
| Media + Home podcast list | Cover art for Brilliantly Resilient, Dare to Lead and Women & Wealth | Otherwise only two of the five rows have a cover |
| Speaker | The new one-sheet PDF | The brief says one is coming; it replaces `public/speaker/nicole-stephenson-one-sheet.pdf` |
| Footer credit | Studio logo (white/reversed, SVG) and site address | Fills `lib/credit.ts` |
| Footer logo, favicon | Narrativa logo and N mark as SVG (colour and white) | Both are made from a 242 × 61 px PNG today; SVG is sharper |
| Older photos still on the site | Yes/no to keep, or which file replaces each | Her answer to "which photos are from 2026" was "the only approved photos are in client-assets". These are not in that folder: `nicole-stephenson-wharton.jpg` (Home "Meet Nicole"; About hero until replaced), `nicole-stephenson-headshot-blue.jpg` (About bio), `nicole-stephenson-speaking-2.jpg` (Home hero inset; Speaker "On stage"), `nicole-stephenson-speaking-3.jpg` (Speaker; Events hero when no flyer), the three hero rotator portraits (go when the hero video lands), and the recognition images. She asked to keep the Book launch photos, promo cards, and Media press headshot. |
