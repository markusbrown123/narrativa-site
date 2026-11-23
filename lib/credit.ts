/**
 * Footer design credit: "Designed for the unapologetic by <studio logo>".
 *
 * PLACEHOLDER: the studio's logo and site address have not been supplied yet.
 * To switch the credit on:
 *   1. Add the studio logo (white or reversed, SVG preferred) to
 *      public/brand/studio-logo.svg (or .png).
 *   2. Fill in name, url, logo, and the logo's width/height below.
 * Until `url` and `logo` are both set, the footer keeps its current line,
 * "Designed for the unapologetic.", so no unfinished credit shows on the site.
 */
export const DESIGN_CREDIT: {
  name: string;
  url: string | null;
  logo: string | null;
  logoWidth: number;
  logoHeight: number;
} = {
  name: "", // studio name, used as the logo's alt text
  url: null, // e.g. "https://studio.example"
  logo: null, // e.g. "/brand/studio-logo.svg"
  logoWidth: 120,
  logoHeight: 24,
};
