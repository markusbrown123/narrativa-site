import Image from "next/image";
import Link from "next/link";
import { clsx } from "@/lib/clsx";
import { formatDate } from "@/lib/content";
import type { Podcast, Press } from "@/types/content";

type Tile =
  | { kind: "podcast"; item: Podcast }
  | { kind: "press"; item: Press };

/**
 * Editorial media mosaic. Lays out a featured media tile on the left
 * (image background when available) and a varied grid of supporting
 * podcast and press tiles on the right. All entries link to verified
 * external URLs only — no empty placeholders are rendered.
 */
export function SmartMediaGallery({
  featured,
  tiles,
  className,
}: {
  featured?: Tile;
  tiles: Tile[];
  className?: string;
}) {
  if (!featured && tiles.length === 0) return null;

  return (
    <div
      className={clsx(
        "grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_1fr]",
        className,
      )}
    >
      {featured ? <FeaturedTile tile={featured} /> : null}
      <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        {tiles.map((tile) => (
          <CompactTile key={tile.item.id} tile={tile} />
        ))}
      </div>
    </div>
  );
}

function FeaturedTile({ tile }: { tile: Tile }) {
  const image = tile.kind === "podcast" ? tile.item.image : tile.item.image;
  const label =
    tile.kind === "podcast"
      ? podcastKindLabel(tile.item.kind)
      : tile.item.kind;
  const heading =
    tile.kind === "podcast" ? tile.item.episode_title : tile.item.headline;
  const sub = tile.kind === "podcast" ? tile.item.show : tile.item.outlet;
  const meta =
    tile.kind === "podcast"
      ? tile.item.host
        ? `with ${tile.item.host}`
        : null
      : tile.item.published_at
        ? formatDate(tile.item.published_at)
        : null;
  const cta =
    tile.kind === "podcast"
      ? podcastCta(tile.item.kind)
      : `Read at ${tile.item.outlet}`;

  return (
    <a
      href={tile.item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-[color:var(--color-purple-900)] text-white shadow-[0_30px_80px_-40px_rgba(43,15,68,0.55)] transition-transform duration-500 motion-safe:hover:-translate-y-1 sm:min-h-[24rem]",
        // Only stretch to match the tile grid when there's an image to fill
        // the space — otherwise it becomes a large empty gradient block.
        image ? "lg:min-h-full" : "lg:min-h-[24rem]",
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="object-cover opacity-80 transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-purple-900)] via-[color:var(--color-purple-900)]/55 to-[color:var(--color-purple-900)]/10"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-700)] to-[color:var(--color-purple-500)]"
        />
      )}
      <div className="relative space-y-4 p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            {label}
          </span>
          {meta ? (
            <span className="text-xs text-[color:var(--color-purple-100)]">
              {meta}
            </span>
          ) : null}
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-purple-100)]">
          {sub}
        </p>
        <h3 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          {heading}
        </h3>
        <p className="max-w-xl text-[color:var(--color-purple-100)] leading-relaxed">
          {tile.item.summary}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          {cta} <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}

function CompactTile({ tile }: { tile: Tile }) {
  const label =
    tile.kind === "podcast"
      ? podcastKindLabel(tile.item.kind)
      : tile.item.kind;
  const heading =
    tile.kind === "podcast" ? tile.item.episode_title : tile.item.headline;
  const sub = tile.kind === "podcast" ? tile.item.show : tile.item.outlet;
  const cta =
    tile.kind === "podcast"
      ? podcastCta(tile.item.kind)
      : `Read at ${tile.item.outlet}`;

  return (
    <a
      href={tile.item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-purple-300)] hover:shadow-[0_20px_60px_-30px_rgba(107,44,145,0.35)] sm:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center rounded-full bg-[color:var(--color-purple-50)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand">
          {label}
        </span>
        {tile.kind === "press" && tile.item.published_at ? (
          <span className="text-xs text-muted">
            {formatDate(tile.item.published_at)}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {sub}
      </p>
      <h3 className="mt-1 font-display text-xl leading-snug text-ink sm:text-2xl">
        {heading}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {tile.item.summary}
      </p>
      <span className="mt-auto pt-4 text-sm font-semibold text-brand">
        {cta} <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}

function podcastKindLabel(kind: Podcast["kind"]): string {
  if (kind === "Apple") return "Apple Podcasts";
  if (kind === "Spotify") return "Spotify";
  if (kind === "YouTube") return "YouTube";
  if (kind === "Vimeo") return "Video";
  if (kind === "Interview") return "Interview";
  return "Podcast";
}

function podcastCta(kind: Podcast["kind"]): string {
  if (kind === "YouTube") return "Watch on YouTube";
  if (kind === "Vimeo") return "Watch the interview";
  if (kind === "Apple") return "Listen on Apple Podcasts";
  if (kind === "Spotify") return "Listen on Spotify";
  return "Listen";
}

/** Convenience helper — present an "All media" link for the gallery. */
export function MediaGalleryFooter({ href = "/media" }: { href?: string }) {
  return (
    <div className="flex justify-center pt-2">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-purple-200)] bg-white px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-[color:var(--color-purple-50)]"
      >
        See all media <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
