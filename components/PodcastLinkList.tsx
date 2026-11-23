import Image from "next/image";
import { clsx } from "@/lib/clsx";
import type { Podcast } from "@/types/content";

function platform(url: string): string {
  if (/podcasts\.apple\.com/i.test(url)) return "Apple Podcasts";
  if (/spotify\.com/i.test(url)) return "Spotify";
  if (/youtube\.com|youtu\.be/i.test(url)) return "YouTube";
  if (/vimeo\.com/i.test(url)) return "Vimeo";
  return "Listen";
}

/**
 * A short, numbered list of interviews, each linking straight to the
 * episode. Cover art shows only where a file exists, so there are never
 * empty image boxes.
 */
export function PodcastLinkList({
  podcasts,
  className,
}: {
  podcasts: Podcast[];
  className?: string;
}) {
  if (podcasts.length === 0) return null;
  return (
    <ol className={clsx("divide-y divide-line border-y border-line", className)}>
      {podcasts.map((p, i) => (
        <li key={p.id}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 py-5 sm:gap-6 sm:py-6"
          >
            <span
              aria-hidden="true"
              className="w-10 shrink-0 font-display text-2xl text-[color:var(--color-purple-300)] sm:w-12 sm:text-3xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-2xl leading-tight text-ink transition-colors group-hover:text-brand sm:text-3xl">
                {p.show}
              </span>
              {p.episode_title ? (
                <span className="mt-1 block text-sm text-ink-soft">
                  {p.episode_title}
                </span>
              ) : null}
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {platform(p.url)}
              </span>
            </span>
            {p.image ? (
              <Image
                src={p.image}
                alt=""
                width={72}
                height={72}
                className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-1 ring-line sm:h-[4.5rem] sm:w-[4.5rem]"
              />
            ) : null}
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-purple-200)] text-brand transition-colors group-hover:bg-brand group-hover:text-white"
            >
              ↗
            </span>
            <span className="sr-only">(opens {platform(p.url)} in a new tab)</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
