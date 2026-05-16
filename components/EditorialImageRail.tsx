import Image from "next/image";
import { clsx } from "@/lib/clsx";

export type RailItem = {
  src: string;
  alt: string;
  /** portrait = 3/4, landscape = 4/3, square = 1/1, tall = 9/16 */
  aspect?: "portrait" | "landscape" | "square" | "tall";
  /** overlay caption rendered along the bottom edge on hover */
  caption?: string;
  /** small tag rendered in the top-left corner */
  tag?: string;
  objectPosition?: string;
};

/**
 * A horizontally scrolling editorial image rail. Uses pure CSS keyframes
 * so it runs on the server with no JS. The track is duplicated so the
 * loop is seamless. `prefers-reduced-motion: reduce` pauses the animation
 * and the rail becomes a static horizontally-scrollable strip.
 *
 * Items rotate visual types (portrait, speaking, book, event, media) so
 * no two near-identical images sit next to each other.
 */
export function EditorialImageRail({
  items,
  speed = "slow",
  className,
}: {
  items: RailItem[];
  /** marquee speed — slow ≈ 80s loop, medium ≈ 55s, fast ≈ 35s */
  speed?: "slow" | "medium" | "fast";
  className?: string;
}) {
  if (items.length === 0) return null;
  // Duplicate the items so the looped track is seamless.
  const track = [...items, ...items];
  const durationClass =
    speed === "fast"
      ? "[animation-duration:35s]"
      : speed === "medium"
        ? "[animation-duration:55s]"
        : "[animation-duration:80s]";

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={clsx(
          "group flex w-max gap-5 sm:gap-6",
          "animate-[editorial-rail_var(--rail-duration,80s)_linear_infinite]",
          "motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:snap-x",
          "hover:[animation-play-state:paused]",
          durationClass,
        )}
      >
        {track.map((item, index) => {
          const aspect =
            item.aspect === "portrait"
              ? "aspect-[3/4] w-[15rem] sm:w-[17rem]"
              : item.aspect === "square"
                ? "aspect-square w-[16rem] sm:w-[18rem]"
                : item.aspect === "tall"
                  ? "aspect-[9/16] w-[12rem] sm:w-[14rem]"
                  : "aspect-[4/3] w-[22rem] sm:w-[26rem]";
          return (
            <figure
              key={`${item.src}-${index}`}
              className={clsx(
                "relative shrink-0 overflow-hidden rounded-3xl border border-line bg-surface-tint shadow-[0_20px_50px_-30px_rgba(43,15,68,0.45)] transition-transform duration-500 ease-out motion-safe:hover:-translate-y-1 motion-reduce:snap-start",
                aspect,
              )}
              aria-hidden={index >= items.length ? "true" : undefined}
            >
              <Image
                src={item.src}
                alt={index >= items.length ? "" : item.alt}
                fill
                sizes="(min-width: 640px) 26rem, 88vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.01]"
                style={
                  item.objectPosition
                    ? { objectPosition: item.objectPosition }
                    : undefined
                }
              />
              {item.tag ? (
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur">
                  {item.tag}
                </span>
              ) : null}
              {item.caption ? (
                <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-3 text-sm leading-snug text-white opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
