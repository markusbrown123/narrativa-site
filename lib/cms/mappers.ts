/**
 * Row → typed-record mappers. Each helper takes a SheetRow (header
 * keys → string cells) and returns the typed shape the site already
 * uses. We do not throw on missing fields — instead we degrade
 * gracefully so a half-filled row still renders.
 */

import type {
  Book,
  Event,
  Partner,
  Photo,
  PhotoCategory,
  Podcast,
  PodcastKind,
  Press,
  Recognition,
  Service,
} from "@/types/content";
import { normalizeDropboxUrl } from "./dropbox";
import { arr, bool, dateStr, isoTimestamp, num, status, str } from "./parseRows";
import type { MediaItem, SheetRow } from "./types";

const EVENT_FORMATS = new Set<Event["format"]>([
  "Keynote",
  "Workshop",
  "Panel",
  "Fireside",
  "Book Event",
]);

const SERVICE_ICONS = new Set<Service["icon"]>([
  "spark",
  "compass",
  "pen",
  "stage",
  "camera",
  "calendar",
  "globe",
]);

const PODCAST_KINDS = new Set<PodcastKind>([
  "Podcast",
  "Interview",
  "Spotify",
  "Apple",
  "YouTube",
  "Vimeo",
]);

const PRESS_KINDS = new Set<Press["kind"]>([
  "Feature",
  "Quote",
  "Op-Ed",
  "Profile",
  "Mention",
]);

const PHOTO_CATEGORIES = new Set<PhotoCategory>([
  "Headshot",
  "Speaking",
  "Portrait",
  "Book Launch",
  "Editorial",
]);

/** Local `/public/...` paths pass through; Dropbox links get normalized. */
function asset(row: SheetRow, key: string): string {
  const raw = str(row, key);
  if (raw === "") return "";
  return normalizeDropboxUrl(raw);
}

/** Optional asset variant — returns undefined for blank cells. */
function maybeAsset(row: SheetRow, key: string): string | undefined {
  const raw = asset(row, key);
  return raw === "" ? undefined : raw;
}

function maybeStr(row: SheetRow, key: string): string | undefined {
  const v = str(row, key);
  return v === "" ? undefined : v;
}

function baseId(row: SheetRow, prefix: string): string {
  const id = str(row, "id");
  if (id !== "") return id;
  // Stable-ish fallback so rows without ids still render.
  const title = (str(row, "title") || str(row, "name") || prefix)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${prefix}-${title || Math.random().toString(36).slice(2, 8)}`;
}

/** Events tab → Event[] */
export function mapEvent(row: SheetRow): Event {
  const formatRaw = str(row, "format") || str(row, "role");
  const format = EVENT_FORMATS.has(formatRaw as Event["format"])
    ? (formatRaw as Event["format"])
    : "Keynote";
  const date = dateStr(row, "event_date") || dateStr(row, "date");
  return {
    id: baseId(row, "evt"),
    title: str(row, "title"),
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    date,
    end_date: maybeStr(row, "end_date"),
    location: str(row, "location"),
    format,
    audience: str(row, "audience") || str(row, "role"),
    summary: str(row, "description") || str(row, "summary"),
    url: maybeAsset(row, "cta_url") ?? maybeAsset(row, "url"),
    cta_label: maybeStr(row, "cta_label"),
    image: maybeAsset(row, "image_url") ?? maybeAsset(row, "image"),
    is_upcoming: computeIsUpcoming(row, date),
  };
}

function computeIsUpcoming(row: SheetRow, normalizedDate: string): boolean {
  const explicit = str(row, "is_upcoming");
  if (explicit !== "") return bool(row, "is_upcoming");
  if (!normalizedDate) return false;
  // Compare YYYY-MM-DD lexicographically against today (UTC) so we
  // avoid timezone wobble.
  const todayUtc = new Date().toISOString().slice(0, 10);
  return normalizedDate >= todayUtc;
}

/** Partners tab → Partner[] */
export function mapPartner(row: SheetRow): Partner {
  const name = str(row, "name") || str(row, "title");
  return {
    id: baseId(row, "ptr"),
    title: name,
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    name,
    logo: asset(row, "logo_url") || asset(row, "logo"),
    relationship: maybeStr(row, "relationship"),
    url: maybeAsset(row, "website_url") ?? maybeAsset(row, "url"),
  };
}

/** Services tab → Service[] */
export function mapService(row: SheetRow): Service {
  const iconRaw = str(row, "icon").toLowerCase();
  const icon = SERVICE_ICONS.has(iconRaw as Service["icon"])
    ? (iconRaw as Service["icon"])
    : "spark";
  const title = str(row, "title");
  const slug =
    maybeStr(row, "slug") ??
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  return {
    id: baseId(row, "svc"),
    title,
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    slug,
    tagline: str(row, "short_description") || str(row, "tagline"),
    description: str(row, "description"),
    outcomes: arr(row, "outcomes"),
    deliverables: arr(row, "deliverables"),
    ideal_for: str(row, "ideal_for"),
    icon,
  };
}

/** Books tab → Book[] */
export function mapBook(row: SheetRow): Book {
  const amazonUrl = str(row, "amazon_url");
  const purchaseLinks = amazonUrl
    ? [{ label: "Order on Amazon", url: amazonUrl }]
    : [];
  return {
    id: baseId(row, "book"),
    title: str(row, "title"),
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    subtitle: str(row, "subtitle"),
    tagline: str(row, "tagline") || str(row, "description"),
    description: str(row, "description"),
    publisher: str(row, "publisher"),
    release_date: dateStr(row, "release_date"),
    cover_image: asset(row, "cover_image_url") || asset(row, "cover_image"),
    praise: [],
    purchase_links: purchaseLinks,
    excerpts: [],
  };
}

/** Media tab → MediaItem[] (catch-all for non-podcast/non-press items) */
export function mapMedia(row: SheetRow): MediaItem {
  return {
    id: baseId(row, "med"),
    title: str(row, "title"),
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    kind: str(row, "kind"),
    source: str(row, "source"),
    summary: str(row, "summary"),
    url: asset(row, "url"),
    image: maybeAsset(row, "image_url"),
    published_date: dateStr(row, "published_date"),
  };
}

/** Podcasts tab → Podcast[] */
export function mapPodcast(row: SheetRow): Podcast {
  const kindRaw = str(row, "kind");
  const kind: PodcastKind = PODCAST_KINDS.has(kindRaw as PodcastKind)
    ? (kindRaw as PodcastKind)
    : "Podcast";
  return {
    id: baseId(row, "pod"),
    title: str(row, "title"),
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    show: str(row, "show"),
    host: str(row, "host"),
    episode_title: str(row, "title"),
    released_at: dateStr(row, "published_date") || dateStr(row, "released_at"),
    kind,
    summary: str(row, "summary"),
    url: asset(row, "url"),
    image: maybeAsset(row, "image_url"),
  };
}

/** Press tab → Press[] */
export function mapPress(row: SheetRow): Press {
  const kindRaw = str(row, "kind");
  const kind: Press["kind"] = PRESS_KINDS.has(kindRaw as Press["kind"])
    ? (kindRaw as Press["kind"])
    : "Feature";
  return {
    id: baseId(row, "press"),
    title: str(row, "title"),
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    outlet: str(row, "publication") || str(row, "outlet"),
    headline: str(row, "title"),
    published_at: dateStr(row, "published_date") || dateStr(row, "published_at"),
    url: asset(row, "url"),
    summary: str(row, "summary"),
    kind,
    image: maybeAsset(row, "image_url"),
  };
}

/** Recognition tab → Recognition[] */
export function mapRecognition(row: SheetRow): Recognition {
  return {
    id: baseId(row, "rec"),
    title: str(row, "title"),
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    organization: str(row, "organization"),
    award: str(row, "title"),
    year: num(row, "year", 0),
    url: maybeAsset(row, "url"),
    summary: maybeStr(row, "summary"),
    image: maybeAsset(row, "image_url"),
  };
}

/** Photos tab → Photo[] */
export function mapPhoto(row: SheetRow): Photo {
  const categoryRaw = str(row, "category");
  const category: PhotoCategory = PHOTO_CATEGORIES.has(
    categoryRaw as PhotoCategory,
  )
    ? (categoryRaw as PhotoCategory)
    : "Portrait";
  return {
    id: baseId(row, "photo"),
    title: str(row, "title"),
    status: status(row),
    featured: bool(row, "featured"),
    sort_order: num(row, "sort_order", 100),
    created_at: isoTimestamp(row, "created_at"),
    updated_at: isoTimestamp(row, "updated_at"),
    src: asset(row, "image_url") || asset(row, "src"),
    alt: str(row, "alt") || str(row, "title"),
    category,
    orientation: (str(row, "orientation") as Photo["orientation"]) || "portrait",
    credit: maybeStr(row, "credit"),
  };
}

/** Settings tab → flat key/value bag */
export function mapSettings(rows: SheetRow[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const row of rows) {
    const key = str(row, "key");
    if (key === "") continue;
    out[key] = str(row, "value");
  }
  return out;
}
