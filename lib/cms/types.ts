/**
 * CMS source contracts. Everything the contentSource exposes flows
 * through these shapes so callers can stay agnostic about whether the
 * data came from Google Sheets or the bundled mock fallback.
 */

import type {
  Book,
  Event,
  Partner,
  Photo,
  Podcast,
  Press,
  Recognition,
  Service,
} from "@/types/content";

export type CmsSourceName = "google_sheets" | "mock";

export type SheetTab =
  | "Events"
  | "Partners"
  | "Services"
  | "Books"
  | "Media"
  | "Podcasts"
  | "Press"
  | "Recognition"
  | "Photos"
  | "Settings";

/** A row from the Sheets values endpoint after we map header → cell. */
export type SheetRow = Record<string, string>;

/** Free-form media item — kept loose because Nicole groups multiple kinds here. */
export interface MediaItem {
  id: string;
  title: string;
  status: "Draft" | "Ready to Publish" | "Published" | "Archived";
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  kind: string;
  source: string;
  summary: string;
  url: string;
  image?: string;
  published_date: string;
}

/** Outcome shape for one tab's load attempt. */
export interface TabLoadResult<T> {
  records: T[];
  source: CmsSourceName;
  error?: string;
}

/** Everything the site needs in one bundle. */
export interface ContentBundle {
  events: Event[];
  partners: Partner[];
  services: Service[];
  books: Book[];
  media: MediaItem[];
  podcasts: Podcast[];
  press: Press[];
  recognition: Recognition[];
  photos: Photo[];
  settings: Record<string, string>;
}

/** What /api/content-health reports — never includes secrets. */
export interface ContentHealth {
  cmsSource: CmsSourceName;
  sheetConfigured: boolean;
  fallbackUsed: boolean;
  revalidateSeconds: number;
  counts: Record<keyof ContentBundle, number>;
  errors: Partial<Record<keyof ContentBundle, string>>;
}
