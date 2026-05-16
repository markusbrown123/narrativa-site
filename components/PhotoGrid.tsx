import Image from "next/image";
import type { Photo } from "@/types/content";
import { clsx } from "@/lib/clsx";

/**
 * A responsive photo strip. Each photo's `orientation` decides its
 * aspect ratio so faces aren't cropped to thin slivers.
 */
export function PhotoGrid({
  photos,
  className,
  columns = 3,
}: {
  photos: Photo[];
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  if (photos.length === 0) return null;
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={clsx("grid gap-5 sm:gap-6", cols, className)}>
      {photos.map((photo) => {
        const aspect =
          photo.orientation === "portrait"
            ? "aspect-[3/4]"
            : photo.orientation === "square"
              ? "aspect-square"
              : "aspect-[4/3]";
        return (
          <li
            key={photo.id}
            className={clsx(
              "relative overflow-hidden rounded-3xl border border-line bg-surface-tint",
              aspect,
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          </li>
        );
      })}
    </ul>
  );
}
