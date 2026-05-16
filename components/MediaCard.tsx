import type { Podcast, Press } from "@/types/content";
import { formatDate } from "@/lib/content";

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  const cta =
    podcast.kind === "YouTube"
      ? "Watch on YouTube"
      : podcast.kind === "Vimeo"
        ? "Watch on Vimeo"
        : podcast.kind === "Apple"
          ? "Listen on Apple Podcasts"
          : podcast.kind === "Spotify"
            ? "Listen on Spotify"
            : "Listen";

  return (
    <article className="group flex flex-col h-full rounded-3xl border border-line bg-white p-7 hover:border-[color:var(--color-purple-300)] hover:shadow-[0_20px_60px_-30px_rgba(107,44,145,0.3)] transition-all">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-[color:var(--color-purple-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {podcast.kind}
        </span>
        {podcast.duration ? (
          <span className="text-xs text-muted">{podcast.duration}</span>
        ) : null}
      </div>
      <p className="mt-5 text-sm font-semibold text-ink-soft uppercase tracking-wide">
        {podcast.show}
      </p>
      <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-ink">
        {podcast.episode_title}
      </h3>
      {podcast.host || podcast.released_at ? (
        <p className="mt-1 text-sm text-muted">
          {podcast.host ? `with ${podcast.host}` : null}
          {podcast.host && podcast.released_at ? " · " : null}
          {podcast.released_at ? formatDate(podcast.released_at) : null}
        </p>
      ) : null}
      <p className="mt-4 text-ink-soft leading-relaxed">{podcast.summary}</p>
      <div className="mt-6 pt-6 border-t border-line">
        <a
          href={podcast.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-[color:var(--color-purple-700)]"
        >
          {cta} <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export function PressCard({ item }: { item: Press }) {
  return (
    <article className="group flex flex-col h-full rounded-3xl border border-line bg-white p-7 hover:border-[color:var(--color-purple-300)] hover:shadow-[0_20px_60px_-30px_rgba(107,44,145,0.3)] transition-all">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-[color:var(--color-purple-50)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {item.kind}
        </span>
        {item.published_at ? (
          <span className="text-xs text-muted">
            {formatDate(item.published_at)}
          </span>
        ) : null}
      </div>
      <p className="mt-5 text-sm font-semibold text-ink-soft uppercase tracking-wide">
        {item.outlet}
      </p>
      <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-ink">
        {item.headline}
      </h3>
      <p className="mt-4 text-ink-soft leading-relaxed">{item.summary}</p>
      <div className="mt-6 pt-6 border-t border-line">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-[color:var(--color-purple-700)]"
        >
          Read at {item.outlet} <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
