/**
 * Shared content types for Narrativa Consulting.
 *
 * Every public record has identity, lifecycle, and ordering fields so it can
 * be sourced from a CMS (or Google Sheet) later without changing consumers.
 */

export type ContentStatus =
  | "Draft"
  | "Ready to Publish"
  | "Published"
  | "Archived";

export const VISIBLE_STATUSES: ReadonlyArray<ContentStatus> = [
  "Ready to Publish",
  "Published",
];

export interface BaseRecord {
  id: string;
  title: string;
  status: ContentStatus;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Event extends BaseRecord {
  date: string;
  end_date?: string;
  location: string;
  format: "Keynote" | "Workshop" | "Panel" | "Fireside" | "Book Event";
  audience: string;
  summary: string;
  url?: string;
  cta_label?: string;
  image?: string;
  is_upcoming: boolean;
}

export type PodcastKind =
  | "Podcast"
  | "Interview"
  | "Spotify"
  | "Apple"
  | "YouTube"
  | "Vimeo";

export interface Podcast extends BaseRecord {
  show: string;
  host: string;
  episode_title: string;
  released_at: string;
  kind: PodcastKind;
  summary: string;
  url: string;
  duration?: string;
  image?: string;
}

export interface Press extends BaseRecord {
  outlet: string;
  headline: string;
  published_at: string;
  url: string;
  summary: string;
  kind: "Feature" | "Quote" | "Op-Ed" | "Profile" | "Mention";
  image?: string;
}

export interface Service extends BaseRecord {
  slug: string;
  tagline: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  ideal_for: string;
  icon:
    | "spark"
    | "compass"
    | "pen"
    | "stage"
    | "camera"
    | "calendar"
    | "globe";
}

export interface Book extends BaseRecord {
  subtitle: string;
  tagline: string;
  description: string;
  publisher: string;
  release_date: string;
  cover_image: string;
  praise: { quote: string; attribution: string }[];
  purchase_links: { label: string; url: string }[];
  excerpts: { heading: string; body: string }[];
}

export interface Recognition extends BaseRecord {
  organization: string;
  award: string;
  year: number;
  url?: string;
  summary?: string;
  image?: string;
}

export interface Partner extends BaseRecord {
  name: string;
  logo: string;
  relationship?: string;
  url?: string;
}

export type PhotoCategory =
  | "Headshot"
  | "Speaking"
  | "Portrait"
  | "Book Launch"
  | "Editorial";

export interface Photo extends BaseRecord {
  src: string;
  alt: string;
  category: PhotoCategory;
  orientation: "portrait" | "landscape" | "square";
  credit?: string;
}

export interface SpeakerTopic {
  number: number;
  title: string;
  bullets: string[];
}
