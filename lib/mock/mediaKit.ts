/**
 * About page Media Kit ("press folder"): approved portraits, shown at their
 * true proportions with a download link each, plus the book cover.
 *
 * Approved portraits come only from Nicole's USE_UPDATE folder
 * (client-assets/). Add these six once the folder is in the project,
 * exported to public/media-kit/ (lowercase-hyphen names):
 *   NICOLE STEPHENSON-082V1.jpg, NICOLE STEPHENSON-082V1-2.jpg,
 *   NICOLE STEPHENSON-194V1.jpg, NS_BlackForal_LongHeadshot.png,
 *   and the two files whose names start with 025- and 028-.
 * Each entry needs the display file, a full-size download file, and the
 * real pixel size so the card never crops the photo.
 */
export interface MediaKitItem {
  label: string;
  alt: string;
  /** Web-size image shown on the page. */
  src: string;
  /** Full-resolution file the download link serves. */
  download: string;
  width: number;
  height: number;
}

export const MEDIA_KIT_PORTRAITS: MediaKitItem[] = [];

export const MEDIA_KIT_BOOK_COVER: MediaKitItem = {
  label: "Book cover",
  alt: "Front cover of Unapologetic by Nicole Stephenson.",
  src: "/book/unapologetic-front-cover.jpg",
  download: "/book/unapologetic-front-cover.jpg",
  width: 1621,
  height: 2400,
};
