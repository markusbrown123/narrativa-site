/**
 * Google Drive links pasted into the Sheet.
 *
 * Nicole keeps her pictures in Google Drive. When she pastes the link
 * the Share → "Copy link" button gives her, it points at Drive's viewer
 * page, not at the picture, so it cannot be shown as an image. For
 * picture cells this turns any Drive file link into Drive's direct
 * download address, which returns the image itself (the file must be
 * shared as "Anyone with the link").
 *
 * Shapes handled (ID = the file's id):
 *   https://drive.google.com/file/d/ID/view?usp=sharing   (and /edit, /preview)
 *   https://drive.google.com/open?id=ID
 *   https://drive.google.com/uc?id=ID&export=download
 *   https://docs.google.com/uc?id=ID
 *   https://drive.usercontent.google.com/download?id=ID   (already direct)
 *
 * Folder links, Google Docs/Slides links and anything else are returned
 * unchanged; the Sheet check (lib/cms/sheetCheck.ts) explains those to
 * her instead.
 */

const DRIVE_HOSTS = new Set([
  "drive.google.com",
  "docs.google.com",
  "drive.usercontent.google.com",
]);

const FILE_ID = /^[A-Za-z0-9_-]{10,}$/;

/** The Drive file id in a link, or null if it is not a Drive file link. */
export function driveFileId(input: string | undefined | null): string | null {
  if (!input) return null;
  let url: URL;
  try {
    url = new URL(String(input).trim());
  } catch {
    return null;
  }
  if (!DRIVE_HOSTS.has(url.hostname)) return null;

  // /file/d/ID/...
  const fileMatch = url.pathname.match(/^\/file\/d\/([^/]+)/);
  if (fileMatch && FILE_ID.test(fileMatch[1])) return fileMatch[1];

  // /open?id=ID, /uc?id=ID, /download?id=ID
  if (/^\/(open|uc|download)\/?$/.test(url.pathname)) {
    const id = url.searchParams.get("id");
    if (id && FILE_ID.test(id)) return id;
  }
  return null;
}

/** True for a link to a Drive folder (never a single picture). */
export function isDriveFolderUrl(input: string | undefined | null): boolean {
  if (!input) return false;
  try {
    const url = new URL(String(input).trim());
    return (
      url.hostname === "drive.google.com" &&
      /\/folders\//.test(url.pathname)
    );
  } catch {
    return false;
  }
}

/** True for a Google Docs, Sheets, Slides or Forms link. */
export function isGoogleDocUrl(input: string | undefined | null): boolean {
  if (!input) return false;
  try {
    const url = new URL(String(input).trim());
    return (
      url.hostname === "docs.google.com" &&
      /^\/(document|spreadsheets|presentation|forms)\//.test(url.pathname)
    );
  } catch {
    return false;
  }
}

/**
 * Turn a Drive file link into an address that returns the picture.
 * Anything that is not a Drive file link comes back unchanged.
 */
export function driveImageUrl(input: string | undefined | null): string {
  if (!input) return "";
  const value = String(input).trim();
  const id = driveFileId(value);
  if (!id) return value;
  return `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=view`;
}
