import Image from "next/image";
import { CopyButton } from "./CopyButton";
import type { MediaKitItem } from "@/lib/mock/mediaKit";

function DownloadCard({ item }: { item: MediaKitItem }) {
  return (
    <figure className="break-inside-avoid mb-5 sm:mb-6 overflow-hidden rounded-3xl border border-line bg-white">
      {/* True proportions: the card takes the photo's own shape, no crop. */}
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
        className="h-auto w-full"
      />
      <figcaption className="flex items-center justify-between gap-3 px-5 py-4">
        <span className="font-display text-lg text-ink">{item.label}</span>
        <a
          href={item.download}
          download
          className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-purple-200)] px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-[color:var(--color-purple-50)]"
        >
          Download <span aria-hidden="true">↓</span>
        </a>
      </figcaption>
    </figure>
  );
}

/**
 * A simple press folder: approved portraits at their true proportions,
 * each with its own download link, plus one bio to copy and the book
 * cover to download. The cover is a download row, not a second picture,
 * because the book box already shows it on the same page.
 */
export function MediaKit({
  portraits,
  bookCover,
  bio,
}: {
  portraits: MediaKitItem[];
  bookCover: MediaKitItem;
  bio: string;
}) {
  const folder = (
    <aside className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:sticky lg:top-28">
      <div className="rounded-3xl border border-[color:var(--color-purple-200)] bg-white p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          Bio
        </p>
        <p className="mt-3 font-display text-2xl leading-snug text-ink">
          Nicole Stephenson, IOM
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          The full bio on this page, as plain text for programs, introductions,
          and show notes.
        </p>
        <div className="mt-6">
          <CopyButton text={bio} label="Copy bio" copiedLabel="Bio copied" />
        </div>
      </div>
      <div className="rounded-3xl border border-[color:var(--color-purple-200)] bg-white p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          {bookCover.label}
        </p>
        <p className="mt-3 font-display text-2xl leading-snug text-ink">
          <em>Unapologetic</em>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Front cover, high resolution ({bookCover.width} × {bookCover.height}{" "}
          px).
        </p>
        <a
          href={bookCover.download}
          download
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-purple-200)] px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-[color:var(--color-purple-50)]"
        >
          Download cover <span aria-hidden="true">↓</span>
        </a>
      </div>
    </aside>
  );

  // Until the approved portraits are added, the folder is just the bio and
  // the cover, side by side.
  if (portraits.length === 0) {
    return <div className="max-w-4xl [&>aside]:lg:grid-cols-2">{folder}</div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10 items-start">
      <div className="columns-1 sm:columns-2 xl:columns-3 gap-5 sm:gap-6">
        {portraits.map((item) => (
          <DownloadCard key={item.src} item={item} />
        ))}
      </div>
      {folder}
    </div>
  );
}
