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
  /** Real pixel size of the exported MP4 (sets the player's proportions). */
  width: number;
  height: number;
  /** Accessible name for the player. Describes the clip; never shown. */
  label: string;
  /** CSS object-position for the clip inside a fixed-shape frame. */
  objectPosition?: string;
  /** The MP4 keeps its audio track. The home hero shows its sound
   *  button only when this is true. */
  hasAudio?: boolean;
};

/**
 * Home hero. Plays muted on a loop. Source:
 * `HomePageLehighValleyShort.MOV`. The conversion notes say no audio
 * (`-an`); keep the audio track and set `hasAudio: true` if the sound
 * button should show. Once set, delete components/HeroRotator.tsx and
 * its fallback in PremiumHomeHero.
 */
export const HOME_HERO_VIDEO: ClientVideo | null = null;
