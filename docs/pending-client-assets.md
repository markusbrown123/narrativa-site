# Waiting on Nicole's USE_UPDATE folder

These parts of the November 2026 update need files from Nicole's USE_UPDATE
Drive folder. Put the folder in the project as `client-assets/` (it is
git-ignored: the repo is public, so raw files must not be committed), then
export web sizes into `public/`.

| Where | What to do | Files |
|---|---|---|
| Home hero | Build `HeroVideo` (muted, looping, inline, poster, pause and sound buttons, still image for reduced motion) in the approved "shattered frame"; keep the H1; light colour grade. Retire `HeroRotator`. | `HomePageLehighValleyShort.MOV` → H.264 MP4, ≤1080p, a few MB |
| Book, "Unapologetic, in the wild" | Click-to-play `VideoEmbed` with sound | `PAConferenceBookSigning.MOV` |
| Partners, Realm feature | Click-to-play `VideoEmbed` beside the text | `REALM_PartnersPageVideo` |
| Home + Speaker logo strip, Partners grid | Replace `public/partners` with every logo, as supplied: `node scripts/prepare-logos.mjs client-assets/Partners public/partners`, then paste the printed entries into `lib/mock/partners.ts` | `Partners/` subfolder |
| About hero | Whichever crops best | `NICOLE STEPHENSON-082V1.jpg`, `NICOLE STEPHENSON-082V1-2.jpg`, `NICOLE STEPHENSON-194V1.jpg` |
| About Media Kit | Add to `MEDIA_KIT_PORTRAITS` in `lib/mock/mediaKit.ts` (true proportions, download link each) | the three above, `NS_BlackForal_LongHeadshot.png`, the two files starting `025-` and `028-` |
| Speaker hero | Sharpest photo that shows the audience | `AudaciousSummitSpeak.jpg`, `StephanoSlackERGPresentation.jpeg`, `LVSummit.png` |
| Media hero | One of the two speaking photos not used on Speaker (it temporarily uses `nicole-stephenson-speaking-3.jpg`) | as above |
| Media + Home podcast list | Add `image` to these two entries in `lib/mock/podcasts.ts` (and `image_url` in the Sheet) | `HWW-Nicole-S.png`, `Justwantedtoaskpodcast.png` |

Video conversion (one file at a time):

```bash
ffmpeg -i client-assets/HomePageLehighValleyShort.MOV -vf "scale='min(1920,iw)':-2" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  -an public/video/home-hero.mp4
```

Drop `-an` for the click-to-play videos (they keep sound), and make a poster
with `ffmpeg -ss 1 -i <file> -frames:v 1 -q:v 3 public/video/<name>-poster.jpg`.

Rename every file to lowercase-hyphen, and do not add files the site does
not use.
