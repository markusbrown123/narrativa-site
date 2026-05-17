/**
 * Single content entry point for the rest of the app.
 *
 * Pages call `getEvents()`, `getServices()`, etc. — they don't know
 * (or care) whether the data came from Google Sheets or the bundled
 * mock files. The selection happens here based on env vars:
 *
 *   CMS_SOURCE=google_sheets
 *   GOOGLE_SHEET_ID=...
 *   GOOGLE_SHEETS_API_KEY=...
 *   CONTENT_REVALIDATE_SECONDS=300
 *
 * If any required var is missing OR a tab errors out, the mock data
 * is used for that tab. The fallback is per-tab, not all-or-nothing,
 * so a single typo in the sheet doesn't black out the whole site.
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
import { book as mockBook, AMAZON_BOOK_URL } from "@/lib/mock/book";
import { events as mockEvents } from "@/lib/mock/events";
import { partners as mockPartners } from "@/lib/mock/partners";
import { photos as mockPhotos } from "@/lib/mock/photos";
import { podcasts as mockPodcasts } from "@/lib/mock/podcasts";
import { press as mockPress } from "@/lib/mock/press";
import { recognition as mockRecognition } from "@/lib/mock/recognition";
import { services as mockServices } from "@/lib/mock/services";
import {
  defaultRevalidateSeconds,
  fetchSheetTab,
  readSheetsConfig,
  type SheetsConfig,
} from "./googleSheets";
import {
  mapBook,
  mapEvent,
  mapMedia,
  mapPartner,
  mapPhoto,
  mapPodcast,
  mapPress,
  mapRecognition,
  mapService,
  mapSettings,
} from "./mappers";
import type {
  CmsSourceName,
  ContentBundle,
  ContentHealth,
  MediaItem,
  SheetTab,
} from "./types";

/**
 * Mock fallback bundle. The book tab is wrapped to a single-element
 * array so the Sheets shape (Books table) mirrors the bundle shape.
 */
function mockBundle(): ContentBundle {
  return {
    events: mockEvents,
    partners: mockPartners,
    services: mockServices,
    books: [mockBook],
    media: [],
    podcasts: mockPodcasts,
    press: mockPress,
    recognition: mockRecognition,
    photos: mockPhotos,
    settings: { amazon_book_url: AMAZON_BOOK_URL },
  };
}

let cachedBundle: ContentBundle | null = null;
let cachedHealth: ContentHealth | null = null;
let inflight: Promise<{ bundle: ContentBundle; health: ContentHealth }> | null =
  null;

/**
 * Internal: load every tab. We memoize per-process so a single page
 * render only fetches each tab once. Next.js's fetch cache handles
 * cross-render reuse and the CONTENT_REVALIDATE_SECONDS window.
 */
async function loadBundle(): Promise<{
  bundle: ContentBundle;
  health: ContentHealth;
}> {
  if (cachedBundle && cachedHealth) {
    return { bundle: cachedBundle, health: cachedHealth };
  }
  if (inflight) return inflight;

  inflight = (async () => {
    const config = readSheetsConfig();
    const revalidateSeconds = config
      ? config.revalidateSeconds
      : defaultRevalidateSeconds();
    if (!config) {
      const bundle = mockBundle();
      const health: ContentHealth = {
        cmsSource: "mock",
        sheetConfigured: false,
        fallbackUsed: true,
        revalidateSeconds,
        counts: countsFor(bundle),
        errors: {},
      };
      cachedBundle = bundle;
      cachedHealth = health;
      return { bundle, health };
    }

    const mock = mockBundle();
    const errors: ContentHealth["errors"] = {};
    let anyFallback = false;

    const events = await loadTabOrMock(config, "Events", mock.events, (rows) =>
      rows.map(mapEvent),
    );
    if (events.usedFallback) anyFallback = true;
    if (events.error) errors.events = events.error;

    const partners = await loadTabOrMock(
      config,
      "Partners",
      mock.partners,
      (rows) => rows.map(mapPartner),
    );
    if (partners.usedFallback) anyFallback = true;
    if (partners.error) errors.partners = partners.error;

    const services = await loadTabOrMock(
      config,
      "Services",
      mock.services,
      (rows) => rows.map(mapService),
    );
    if (services.usedFallback) anyFallback = true;
    if (services.error) errors.services = services.error;

    const books = await loadTabOrMock(config, "Books", mock.books, (rows) =>
      rows.map(mapBook),
    );
    if (books.usedFallback) anyFallback = true;
    if (books.error) errors.books = books.error;

    const media = await loadTabOrMock(config, "Media", mock.media, (rows) =>
      rows.map(mapMedia),
    );
    if (media.usedFallback && mock.media.length > 0) anyFallback = true;
    if (media.error) errors.media = media.error;

    const podcasts = await loadTabOrMock(
      config,
      "Podcasts",
      mock.podcasts,
      (rows) => rows.map(mapPodcast),
    );
    if (podcasts.usedFallback) anyFallback = true;
    if (podcasts.error) errors.podcasts = podcasts.error;

    const press = await loadTabOrMock(config, "Press", mock.press, (rows) =>
      rows.map(mapPress),
    );
    if (press.usedFallback) anyFallback = true;
    if (press.error) errors.press = press.error;

    const recognition = await loadTabOrMock(
      config,
      "Recognition",
      mock.recognition,
      (rows) => rows.map(mapRecognition),
    );
    if (recognition.usedFallback) anyFallback = true;
    if (recognition.error) errors.recognition = recognition.error;

    const photos = await loadTabOrMock(config, "Photos", mock.photos, (rows) =>
      rows.map(mapPhoto),
    );
    if (photos.usedFallback) anyFallback = true;
    if (photos.error) errors.photos = photos.error;

    const settings = await loadTabOrMock(
      config,
      "Settings",
      mock.settings,
      (rows) => mapSettings(rows),
      (value) => Object.keys(value).length > 0,
    );
    if (settings.error) errors.settings = settings.error;

    const bundle: ContentBundle = {
      events: events.value,
      partners: partners.value,
      services: services.value,
      books: books.value,
      media: media.value,
      podcasts: podcasts.value,
      press: press.value,
      recognition: recognition.value,
      photos: photos.value,
      settings: settings.value,
    };

    const health: ContentHealth = {
      cmsSource: "google_sheets",
      sheetConfigured: true,
      fallbackUsed: anyFallback,
      revalidateSeconds,
      counts: countsFor(bundle),
      errors,
    };

    cachedBundle = bundle;
    cachedHealth = health;
    return { bundle, health };
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

interface LoadOutcome<T> {
  value: T;
  usedFallback: boolean;
  error?: string;
  source: CmsSourceName;
}

/**
 * Fetch one tab, parse it, and fall back to mock if the fetch fails
 * or returns nothing. `acceptsResult` lets the caller treat a parsed
 * value as "empty enough to fall back" (used for settings).
 */
async function loadTabOrMock<T>(
  config: SheetsConfig,
  tab: SheetTab,
  fallback: T,
  parse: (rows: import("./parseRows").SheetRow[]) => T,
  acceptsResult: (parsed: T) => boolean = defaultAcceptResult,
): Promise<LoadOutcome<T>> {
  const result = await fetchSheetTab(config, tab);
  if (!result) {
    return { value: fallback, usedFallback: true, source: "mock" };
  }
  if (result.error) {
    return {
      value: fallback,
      usedFallback: true,
      error: result.error,
      source: "mock",
    };
  }
  if (result.rows.length === 0) {
    return { value: fallback, usedFallback: true, source: "mock" };
  }
  const parsed = parse(result.rows);
  if (!acceptsResult(parsed)) {
    return { value: fallback, usedFallback: true, source: "mock" };
  }
  return { value: parsed, usedFallback: false, source: "google_sheets" };
}

function defaultAcceptResult<T>(parsed: T): boolean {
  if (Array.isArray(parsed)) return parsed.length > 0;
  return true;
}

function countsFor(bundle: ContentBundle): ContentHealth["counts"] {
  return {
    events: bundle.events.length,
    partners: bundle.partners.length,
    services: bundle.services.length,
    books: bundle.books.length,
    media: bundle.media.length,
    podcasts: bundle.podcasts.length,
    press: bundle.press.length,
    recognition: bundle.recognition.length,
    photos: bundle.photos.length,
    settings: Object.keys(bundle.settings).length,
  };
}

// ---------- Public async getters ----------

export async function getEvents(): Promise<Event[]> {
  const { bundle } = await loadBundle();
  return bundle.events;
}

export async function getPartners(): Promise<Partner[]> {
  const { bundle } = await loadBundle();
  return bundle.partners;
}

export async function getServices(): Promise<Service[]> {
  const { bundle } = await loadBundle();
  return bundle.services;
}

export async function getBooks(): Promise<Book[]> {
  const { bundle } = await loadBundle();
  return bundle.books;
}

/** The "primary" book (Unapologetic). Falls back to the mock book. */
export async function getPrimaryBook(): Promise<Book> {
  const books = await getBooks();
  if (books.length === 0) return mockBook;
  // Prefer Published + featured if more than one row is present.
  return (
    books.find((b) => b.featured && b.status === "Published") ??
    books[0]
  );
}

export async function getMedia(): Promise<MediaItem[]> {
  const { bundle } = await loadBundle();
  return bundle.media;
}

export async function getPodcasts(): Promise<Podcast[]> {
  const { bundle } = await loadBundle();
  return bundle.podcasts;
}

export async function getPress(): Promise<Press[]> {
  const { bundle } = await loadBundle();
  return bundle.press;
}

export async function getRecognition(): Promise<Recognition[]> {
  const { bundle } = await loadBundle();
  return bundle.recognition;
}

export async function getPhotos(): Promise<Photo[]> {
  const { bundle } = await loadBundle();
  return bundle.photos;
}

export async function getSettings(): Promise<Record<string, string>> {
  const { bundle } = await loadBundle();
  return bundle.settings;
}

/**
 * Resolve the Amazon URL: sheet-provided value wins over the bundled
 * constant. Lets Nicole update the link in the Sheet without a deploy.
 */
export async function getAmazonBookUrl(): Promise<string> {
  const settings = await getSettings();
  const fromSettings = settings.amazon_book_url?.trim();
  if (fromSettings) return fromSettings;
  const primary = await getPrimaryBook();
  const amazon = primary.purchase_links.find((p) =>
    /amazon\.com/i.test(p.url),
  );
  if (amazon?.url) return amazon.url;
  return AMAZON_BOOK_URL;
}

export async function getContentHealth(): Promise<ContentHealth> {
  const { health } = await loadBundle();
  return health;
}
