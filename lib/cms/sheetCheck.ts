/**
 * The Sheet check: reads the Google Sheet as it is right now and lists,
 * in plain words, anything that will not show on the site the way Nicole
 * expects, with the row number and a link straight to it. It runs on the
 * "update site" page (app/api/refresh), so the bookmark she already uses
 * both refreshes the site and tells her what to fix.
 *
 * Two levels: a "problem" means something is hidden, broken or ignored
 * on the site; a "check" is worth a look but may be intended.
 */

import { driveFileId, driveImageUrl, isDriveFolderUrl, isGoogleDocUrl } from "./drive";
import { isDropboxUrl, normalizeDropboxUrl } from "./dropbox";
import {
  fetchSheetTab,
  fetchTabIds,
  readSheetsConfig,
  sheetUrl,
  type SheetTabResult,
} from "./googleSheets";
import { mapEvent, mapPartner, mapPodcast, mapRecognition } from "./mappers";
import {
  boolFromText,
  dateStr,
  isVisibleStatus,
  knownStatus,
  str,
  type NumberedRow,
  type SheetRow,
} from "./parseRows";
import type { SheetTab } from "./types";

export type IssueLevel = "problem" | "check";

export interface SheetIssue {
  level: IssueLevel;
  /** null for something about the whole Sheet. */
  tab: SheetTab | null;
  /** Row number in the Sheet (the header is row 1). */
  row?: number;
  /** The row's title or name, to recognise it by. */
  item?: string;
  message: string;
  /** Opens the Sheet at this tab (and row). */
  link?: string;
}

export interface TabReport {
  tab: SheetTab;
  /** Where the tab's rows appear on the site, or null if nowhere. */
  shownOn: string | null;
  readable: boolean;
  /** The site is showing its built-in content instead of this tab. */
  usingBackup: boolean;
  shown: number;
  hidden: number;
  link?: string;
}

export interface SheetCheck {
  configured: boolean;
  sheetUrl?: string;
  checkedAt: string;
  tabs: TabReport[];
  issues: SheetIssue[];
  picturesChecked: number;
}

// ---------------------------------------------------------------------
// What the site reads from each tab

const LIFECYCLE = ["id", "status", "featured", "sort_order", "created_at", "updated_at"];

interface TabSpec {
  tab: SheetTab;
  shownOn: string | null;
  columns: string[];
  /** Must be filled in on a row that shows on the site. */
  required: { keys: string[]; what: string }[];
  dates: string[];
  links: string[];
  pictures: string[];
  /** Columns that name a row, first non-blank wins. */
  names: string[];
  choices: { key: string; allowed: string[]; caseSensitive?: boolean; otherwise: string }[];
  /** The record id the site will use, to catch two rows sharing one. */
  id?: (row: SheetRow) => string;
  /** The tab's rows are filtered by status on the site. */
  statusHides: boolean;
}

const PODCAST_KINDS = ["Podcast", "Interview", "Spotify", "Apple", "YouTube", "Vimeo"];

const SPECS: TabSpec[] = [
  {
    tab: "Events",
    shownOn: "Home, Speaker and Events pages",
    columns: [...LIFECYCLE, "title", "event_date", "date", "end_date", "event_time", "time", "end_time", "location", "visibility", "role", "format", "audience", "description", "summary", "cta_label", "cta_url", "url", "image_url", "image", "is_upcoming"],
    required: [
      { keys: ["title"], what: "a title" },
      { keys: ["event_date", "date"], what: "a date (event_date)" },
    ],
    dates: ["event_date", "date", "end_date"],
    links: ["cta_url", "url"],
    pictures: ["image_url", "image"],
    names: ["title"],
    choices: [{ key: "visibility", allowed: ["public", "private"], otherwise: "so it is shown as a public event" }],
    id: (row) => mapEvent(row).id,
    statusHides: true,
  },
  {
    tab: "Partners",
    shownOn: "Home, Speaker and Partners pages",
    columns: [...LIFECYCLE, "name", "title", "relationship", "logo_url", "logo", "logo_width", "logo_height", "logo_background", "website_url", "url"],
    required: [
      { keys: ["name", "title"], what: "a name" },
      { keys: ["logo_url", "logo"], what: "a logo (logo_url)" },
    ],
    dates: [],
    links: ["website_url", "url"],
    pictures: ["logo_url", "logo"],
    names: ["name", "title"],
    choices: [{ key: "logo_background", allowed: ["light", "dark"], otherwise: "so the logo sits on a light tile" }],
    id: (row) => mapPartner(row).id,
    statusHides: true,
  },
  {
    tab: "Books",
    shownOn: "Home, About and Book pages",
    columns: [...LIFECYCLE, "title", "subtitle", "tagline", "author", "publisher", "release_date", "description", "amazon_url", "barnes_noble_url", "cover_image_url", "cover_image", "stack_image_url"],
    required: [{ keys: ["title"], what: "a title" }],
    dates: ["release_date"],
    links: ["amazon_url", "barnes_noble_url"],
    pictures: [],
    names: ["title"],
    choices: [],
    // The site shows one book (featured + Published, else the first row).
    statusHides: false,
  },
  {
    tab: "Podcasts",
    shownOn: "Home and Media pages",
    columns: [...LIFECYCLE, "title", "show", "host", "kind", "summary", "url", "image_url", "published_date", "released_at"],
    required: [
      { keys: ["show"], what: "the show's name (show)" },
      { keys: ["url"], what: "a link to the episode (url)" },
    ],
    dates: ["published_date", "released_at"],
    links: ["url"],
    pictures: ["image_url"],
    names: ["show", "title"],
    choices: [{ key: "kind", allowed: PODCAST_KINDS, caseSensitive: true, otherwise: "so it is listed as a Podcast" }],
    id: (row) => mapPodcast(row).id,
    statusHides: true,
  },
  {
    tab: "Recognition",
    shownOn: "Home and About pages",
    columns: [...LIFECYCLE, "title", "organization", "year", "summary", "url", "image_url"],
    required: [
      { keys: ["title"], what: "the award (title)" },
      { keys: ["organization"], what: "the organization" },
    ],
    dates: [],
    links: ["url"],
    pictures: ["image_url"],
    names: ["title", "organization"],
    choices: [],
    id: (row) => mapRecognition(row).id,
    statusHides: true,
  },
];

/** Tabs the site reads but no page shows at the moment. */
const UNUSED_TABS: SheetTab[] = ["Media", "Press", "Photos"];

const SETTINGS_KEYS = ["amazon_book_url"];

// ---------------------------------------------------------------------

export async function checkSheet({
  checkPictures = true,
}: { checkPictures?: boolean } = {}): Promise<SheetCheck> {
  const checkedAt = new Date().toISOString();
  const config = readSheetsConfig();
  if (!config) {
    return {
      configured: false,
      checkedAt,
      tabs: [],
      issues: [
        {
          level: "problem",
          tab: null,
          message:
            "The site isn't connected to the Google Sheet, so it shows its built-in content. In Netlify, the CMS_SOURCE, GOOGLE_SHEET_ID and GOOGLE_SHEETS_API_KEY settings need to be filled in.",
        },
      ],
      picturesChecked: 0,
    };
  }

  const base = sheetUrl(config);
  const allTabs: SheetTab[] = [...SPECS.map((s) => s.tab), ...UNUSED_TABS, "Settings"];
  const [tabIds, ...results] = await Promise.all([
    fetchTabIds(config),
    ...allTabs.map((tab) => fetchSheetTab(config, tab, { fresh: true })),
  ]);
  const resultFor = (tab: SheetTab) => results[allTabs.indexOf(tab)];
  const linkTo = (tab: SheetTab, row?: number) => {
    const gid = tabIds[tab];
    if (gid === undefined) return base;
    return `${base}#gid=${gid}${row ? `&range=A${row}` : ""}`;
  };

  const issues: SheetIssue[] = [];
  const tabs: TabReport[] = [];
  const pictureJobs: PictureJob[] = [];

  // A Sheet-wide failure (not shared, wrong id) is reported once.
  const sheetWide = sheetWideProblem(results);
  if (sheetWide) {
    issues.push({ level: "problem", tab: null, message: sheetWide, link: base });
  }

  for (const spec of SPECS) {
    const result = resultFor(spec.tab);
    const report: TabReport = {
      tab: spec.tab,
      shownOn: spec.shownOn,
      readable: false,
      usingBackup: true,
      shown: 0,
      hidden: 0,
      link: linkTo(spec.tab),
    };
    tabs.push(report);

    if (!result || result.error) {
      if (!sheetWide) issues.push(tabErrorIssue(spec.tab, result, base));
      continue;
    }
    report.readable = true;
    if (result.numbered.length === 0) {
      issues.push({
        level: "problem",
        tab: spec.tab,
        message: `The ${spec.tab} tab has no rows, so the site is showing its built-in content for it instead.`,
        link: report.link,
      });
      continue;
    }
    report.usingBackup = false;
    checkHeaders(spec, result, issues, report.link);
    checkRows(spec, result.numbered, issues, pictureJobs, report, linkTo);
  }

  for (const tab of UNUSED_TABS) {
    const result = resultFor(tab);
    if (!result || result.error) continue; // not needed by the site
    const live = result.numbered.filter((r) => isVisibleStatus(knownStatus(str(r.row, "status")) ?? "Draft")).length;
    tabs.push({
      tab,
      shownOn: null,
      readable: true,
      usingBackup: false,
      shown: 0,
      hidden: result.numbered.length,
      link: linkTo(tab),
    });
    if (live > 0) {
      issues.push({
        level: "check",
        tab,
        message: `Nothing from the ${tab} tab appears on the site at the moment, so changes there won't show.`,
        link: linkTo(tab),
      });
    }
  }

  const settings = resultFor("Settings");
  if (settings && !settings.error) {
    checkSettings(settings.numbered, issues, (row) => linkTo("Settings", row));
  }

  const picturesChecked = checkPictures
    ? await runPictureChecks(pictureJobs, issues)
    : 0;

  issues.sort(
    (a, b) =>
      levelRank(a.level) - levelRank(b.level) ||
      tabRank(a.tab) - tabRank(b.tab) ||
      (a.row ?? 0) - (b.row ?? 0),
  );

  return { configured: true, sheetUrl: base, checkedAt, tabs, issues, picturesChecked };
}

// ---------------------------------------------------------------------
// Tabs and headers

function sheetWideProblem(results: (SheetTabResult | null)[]): string | null {
  const statuses = results.map((r) => r?.httpStatus);
  if (results.some((r) => /api key not valid|API_KEY_INVALID/i.test(r?.error ?? ""))) {
    return "The Google API key the site uses isn't valid, so it can't read the Sheet and shows its built-in content. The GOOGLE_SHEETS_API_KEY setting in Netlify needs replacing.";
  }
  if (statuses.some((s) => s === 403 || s === 401)) {
    return "The site isn't allowed to read the Sheet. In the Sheet, click Share and set General access to “Anyone with the link” (Viewer). If it already is, the Google API key in Netlify needs checking.";
  }
  if (statuses.some((s) => s === 404)) {
    return "The site can't find the Sheet. The GOOGLE_SHEET_ID setting in Netlify may be wrong.";
  }
  return null;
}

function tabErrorIssue(
  tab: SheetTab,
  result: SheetTabResult | null,
  link: string,
): SheetIssue {
  const error = result?.error ?? "";
  if (result?.httpStatus === 400 && /unable to parse range/i.test(error)) {
    return {
      level: "problem",
      tab,
      message: `The site can't find a tab called “${tab}”, so it's showing its built-in content for it instead. Check the tab is named exactly ${tab}.`,
      link,
    };
  }
  if (result?.httpStatus === 429) {
    return {
      level: "check",
      tab,
      message: `Google asked the site to slow down, so the ${tab} tab wasn't read this time. Try again in a minute.`,
      link,
    };
  }
  return {
    level: "problem",
    tab,
    message: `The ${tab} tab couldn't be read just now, so the site is showing its built-in content for it. Try again in a minute. (${error || "no answer"})`,
    link,
  };
}

function checkHeaders(
  spec: TabSpec,
  result: SheetTabResult,
  issues: SheetIssue[],
  link: string | undefined,
) {
  const present = new Set(result.headers.map((h) => h.key));

  if (!present.has("status") && spec.statusHides) {
    issues.push({
      level: "problem",
      tab: spec.tab,
      message: `The ${spec.tab} tab has no status column, so every row in it is hidden. Add a column called status and set rows to Published.`,
      link,
    });
  }
  for (const req of spec.required) {
    if (!req.keys.some((k) => present.has(k))) {
      issues.push({
        level: "problem",
        tab: spec.tab,
        message: `The ${spec.tab} tab has no ${req.keys[0]} column, so the site can't read ${req.what}.`,
        link,
      });
    }
  }
  for (const header of result.headers) {
    if (spec.columns.includes(header.key)) continue;
    const guess = closestColumn(header.key, spec.columns);
    if (guess && !present.has(guess)) {
      issues.push({
        level: "problem",
        tab: spec.tab,
        message: `The column “${header.label}” isn't one the site reads, so it's ignored. Did you mean ${guess}?`,
        link,
      });
    }
  }
}

/** The known column a misspelt header most likely means, if any. */
function closestColumn(key: string, columns: string[]): string | null {
  if (key.length < 3) return null;
  let best: string | null = null;
  let bestDistance = Infinity;
  for (const column of columns) {
    const d = editDistance(key, column);
    if (d < bestDistance) {
      best = column;
      bestDistance = d;
    }
  }
  const allowed = key.length <= 5 ? 1 : 2;
  return bestDistance <= allowed ? best : null;
}

function editDistance(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const up = prev[j];
      prev[j] = Math.min(
        prev[j] + 1,
        prev[j - 1] + 1,
        diag + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      diag = up;
    }
  }
  return prev[b.length];
}

// ---------------------------------------------------------------------
// Rows

function checkRows(
  spec: TabSpec,
  rows: NumberedRow[],
  issues: SheetIssue[],
  pictureJobs: PictureJob[],
  report: TabReport,
  linkTo: (tab: SheetTab, row?: number) => string,
) {
  const ids = new Map<string, number[]>();

  for (const { sheetRow, row } of rows) {
    const item = rowName(spec, row);
    const add = (level: IssueLevel, message: string) =>
      issues.push({ level, tab: spec.tab, row: sheetRow, item, message, link: linkTo(spec.tab, sheetRow) });

    const statusText = str(row, "status");
    const status = knownStatus(statusText);
    if (spec.statusHides) {
      if (statusText === "") {
        add("check", "This row has no status, so it's hidden. Set its status to Published to show it on the site.");
      } else if (!status) {
        add("problem", `The status “${statusText}” isn't Draft, Ready to Publish, Published or Archived, so this row is hidden.`);
      }
      if (!status || !isVisibleStatus(status)) {
        report.hidden += 1;
        continue;
      }
    }
    report.shown += 1;

    for (const req of spec.required) {
      if (req.keys.every((k) => str(row, k) === "")) {
        add("problem", `This row is published but is missing ${req.what}.`);
      }
    }

    for (const key of spec.dates) {
      const raw = str(row, key);
      if (raw !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(dateStr(row, key))) {
        add("problem", `The ${key} “${raw}” isn't a date the site understands. Type it like 6/4/2026.`);
      }
    }

    for (const choice of spec.choices) {
      const raw = str(row, choice.key);
      if (raw === "") continue;
      const ok = choice.caseSensitive
        ? choice.allowed.includes(raw)
        : choice.allowed.includes(raw.toLowerCase());
      if (!ok) {
        add("check", `The ${choice.key} “${raw}” isn't one of ${listOf(choice.allowed)}, ${choice.otherwise}.`);
      }
    }

    const featured = str(row, "featured");
    if (featured !== "" && boolFromText(featured) === null) {
      add("check", `Featured “${featured}” should be TRUE or FALSE (or a tick box), so it's treated as FALSE.`);
    }
    const sortOrder = str(row, "sort_order");
    if (sortOrder !== "" && !Number.isFinite(Number(sortOrder.replace(/,/g, "")))) {
      add("check", `The sort_order “${sortOrder}” isn't a number, so this row is placed as if it were 100.`);
    }
    if (spec.tab === "Recognition") {
      const year = str(row, "year");
      if (year !== "" && !/^\d{4}$/.test(year)) {
        add("check", `The year “${year}” should be a four-digit year, like 2025.`);
      }
    }

    for (const key of spec.links) {
      const raw = str(row, key);
      if (raw !== "" && !/^(https?:\/\/|\/|mailto:|tel:)/i.test(raw)) {
        add("problem", `The ${key} “${shorten(raw)}” doesn't look like a web address. It should start with https://.`);
      }
    }

    for (const key of spec.pictures) {
      const raw = str(row, key);
      if (raw === "") continue;
      const problem = pictureLinkProblem(key, raw);
      if (problem) {
        add("problem", problem);
      } else if (/^https?:\/\//i.test(raw)) {
        pictureJobs.push({
          tab: spec.tab,
          row: sheetRow,
          item,
          key,
          raw,
          url: driveImageUrl(normalizeDropboxUrl(raw)),
          link: linkTo(spec.tab, sheetRow),
        });
      }
    }

    if (spec.id) {
      const id = spec.id(row);
      ids.set(id, [...(ids.get(id) ?? []), sheetRow]);
    }
  }

  for (const [id, sheetRows] of ids) {
    if (sheetRows.length < 2) continue;
    issues.push({
      level: "problem",
      tab: spec.tab,
      row: sheetRows[0],
      message: `Rows ${listOf(sheetRows.map(String), "and")} end up with the same id (“${id}”), so only one of them may show. Give each its own id in the id column.`,
      link: linkTo(spec.tab, sheetRows[0]),
    });
  }
}

function rowName(spec: TabSpec, row: SheetRow): string | undefined {
  for (const key of spec.names) {
    const value = str(row, key);
    if (value !== "") return shorten(value, 70);
  }
  return undefined;
}

function checkSettings(
  rows: NumberedRow[],
  issues: SheetIssue[],
  linkTo: (row: number) => string,
) {
  for (const { sheetRow, row } of rows) {
    const key = str(row, "key");
    const value = str(row, "value");
    if (key === "") continue;
    if (!SETTINGS_KEYS.includes(key)) {
      issues.push({
        level: "check",
        tab: "Settings",
        row: sheetRow,
        item: key,
        message: `The site doesn't use a setting called “${key}”, so it's ignored.`,
        link: linkTo(sheetRow),
      });
    } else if (value !== "" && !/^https?:\/\//i.test(value)) {
      issues.push({
        level: "problem",
        tab: "Settings",
        row: sheetRow,
        item: key,
        message: `The ${key} “${shorten(value)}” doesn't look like a web address. It should start with https://.`,
        link: linkTo(sheetRow),
      });
    }
  }
}

// ---------------------------------------------------------------------
// Pictures

/** A picture link that can't work whatever the file, explained. */
function pictureLinkProblem(key: string, raw: string): string | null {
  if (isDriveFolderUrl(raw)) {
    return `The ${key} is a link to a Google Drive folder, not to one picture. Open the picture itself in Drive, then Share → Copy link, and paste that.`;
  }
  if (isGoogleDocUrl(raw)) {
    return `The ${key} is a link to a Google Doc, Sheet or Slides file, not to a picture. Use a link to the picture file itself.`;
  }
  if (isDropboxUrl(raw) && /\/(scl\/fo|sh)\//.test(raw)) {
    return `The ${key} is a link to a Dropbox folder, not to one picture. Open the picture itself in Dropbox, then Share → Copy link.`;
  }
  if (!/^(https?:\/\/|\/)/i.test(raw)) {
    return `The ${key} “${shorten(raw)}” doesn't look like a link. Paste the picture's share link (it starts with https://).`;
  }
  return null;
}

interface PictureJob {
  tab: SheetTab;
  row: number;
  item?: string;
  key: string;
  raw: string;
  url: string;
  link: string;
}

type PictureResult =
  | { ok: true }
  | { ok: false; reason: "not-shared" | "missing" | "not-picture" | "unreachable" };

const PICTURE_TIMEOUT_MS = 5000;
const PICTURES_DEADLINE_MS = 7000;
const PICTURE_CONCURRENCY = 6;

/** Opens each distinct picture link once, the way a browser would. */
async function runPictureChecks(jobs: PictureJob[], issues: SheetIssue[]): Promise<number> {
  const urls = [...new Set(jobs.map((j) => j.url))];
  const results = new Map<string, PictureResult>();
  const deadline = Date.now() + PICTURES_DEADLINE_MS;
  let next = 0;

  const worker = async () => {
    while (next < urls.length && Date.now() < deadline) {
      const url = urls[next++];
      results.set(url, await openPicture(url));
    }
  };
  await Promise.all(Array.from({ length: Math.min(PICTURE_CONCURRENCY, urls.length) }, worker));

  let unchecked = 0;
  for (const job of jobs) {
    const result = results.get(job.url);
    if (!result) {
      unchecked += 1;
      continue;
    }
    if (result.ok) continue;
    issues.push({
      level: result.reason === "unreachable" ? "check" : "problem",
      tab: job.tab,
      row: job.row,
      item: job.item,
      message: pictureMessage(job, result.reason),
      link: job.link,
    });
  }
  if (unchecked > 0) {
    issues.push({
      level: "check",
      tab: null,
      message: `${unchecked} picture link${unchecked === 1 ? " wasn't" : "s weren't"} checked this time (the check ran out of time). Open the update link again to check the rest.`,
    });
  }
  return results.size;
}

async function openPicture(url: string): Promise<PictureResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PICTURE_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
      headers: { range: "bytes=0-2047" },
    });
    const type = res.headers.get("content-type") ?? "";
    void res.body?.cancel().catch(() => {});
    if (res.status === 401 || res.status === 403) return { ok: false, reason: "not-shared" };
    if (res.status === 404 || res.status === 410) return { ok: false, reason: "missing" };
    if (!res.ok) return { ok: false, reason: "unreachable" };
    if (/^image\//i.test(type)) return { ok: true };
    return { ok: false, reason: "not-picture" };
  } catch {
    return { ok: false, reason: "unreachable" };
  } finally {
    clearTimeout(timer);
  }
}

function pictureMessage(job: PictureJob, reason: Exclude<PictureResult, { ok: true }>["reason"]): string {
  const onDrive = driveFileId(job.raw) !== null;
  const onDropbox = isDropboxUrl(job.raw);
  if (reason === "missing") {
    return `The picture in ${job.key} can't be found at that link. It may have been moved or deleted; copy its link again.`;
  }
  if (reason === "unreachable") {
    return `The picture in ${job.key} couldn't be checked just now. If it doesn't show on the site, copy its link again.`;
  }
  // not shared, or the link opens a page instead of the picture
  if (onDrive) {
    return `The site can't open the picture in ${job.key}. In Google Drive, right-click the picture → Share, and set General access to “Anyone with the link”.`;
  }
  if (onDropbox) {
    return `The ${job.key} link opens a Dropbox page instead of the picture. In Dropbox, use Share → Copy link on the picture file itself.`;
  }
  if (reason === "not-shared") {
    return `The site isn't allowed to open the picture in ${job.key}. The file needs to be shared publicly.`;
  }
  return `The ${job.key} link opens a web page, not a picture. Use a link to the picture file itself.`;
}

// ---------------------------------------------------------------------

function levelRank(level: IssueLevel): number {
  return level === "problem" ? 0 : 1;
}

function tabRank(tab: SheetTab | null): number {
  if (tab === null) return -1;
  const order: SheetTab[] = [...SPECS.map((s) => s.tab), ...UNUSED_TABS, "Settings"];
  return order.indexOf(tab);
}

function listOf(items: string[], conjunction: "or" | "and" = "or"): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items[items.length - 1]}`;
}

function shorten(value: string, max = 60): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}
