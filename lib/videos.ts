/**
 * Videos from Nicole's USE_UPDATE folder.
 *
 * Each entry stays `null` until its file has been exported into
 * `public/video/` (see docs/pending-client-assets.md). While an entry is
 * null, the page it belongs to keeps its current layout, so nothing on
 * the live site points at a file that is not there.
 */
export type ClientVideo = {
  /** H.264 MP4 in public/video, e.g. "/video/home-hero.mp4". */
  src: string;
  /** A frame from the clip, exported as JPEG next to it. */
  poster: string;
  /** Real pixel size of the exported MP4. Every player takes these
   *  proportions, so a clip is never cropped, stretched or zoomed. */
  width: number;
  height: number;
  /** Accessible name for the player. Describes the clip; never shown. */
  label: string;
  /** The MP4 keeps its audio track. The home hero shows its sound
   *  button only when this is true. */
  hasAudio?: boolean;
};

/**
 * Home hero. Plays muted on a loop. Source:
 * `HomePageLehighValleyShort.MOV`. The conversion notes say no audio
 * (`-an`); keep the audio track and set `hasAudio: true` if the sound
 * button should show. Export the poster from the same clip, so it has
 * the same proportions. Once set, delete components/HeroRotator.tsx and
 * its fallback in PremiumHomeHero.
 */
export const HOME_HERO_VIDEO: ClientVideo | null = null;

/**
 * Book page, "Unapologetic, in the wild." Click to play, with sound.
 * Source: `PAConferenceBookSigning.MOV`.
 */
export const BOOK_SIGNING_VIDEO: ClientVideo | null = null;

/**
 * Partners page, beside the Realm brand-ambassador text. Click to play,
 * with sound. Source: `REALM_PartnersPageVideo`.
 */
export const REALM_PARTNERS_VIDEO: ClientVideo | null = null;
