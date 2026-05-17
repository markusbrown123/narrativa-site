"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { clsx } from "@/lib/clsx";

export type ConstellationItem = {
  src: string;
  alt: string;
  /**
   * Anchor position in percent (0-100). `x` and `y` describe the
   * card's centerpoint within the layout box.
   */
  x: number;
  y: number;
  /** Card width in rem (height is derived from aspect). */
  width: number;
  aspect?: "portrait" | "landscape" | "square";
  /** Z-depth — larger values move further on scroll & mouse. */
  depth?: number;
  /** Resting rotation in degrees. */
  rotate?: number;
  caption?: string;
};

/**
 * ParallaxImageConstellation — an editorial floating-image cluster.
 * Inspired by 21.dev's parallax image layers, executed in Nicole's
 * palette and assets. Each card has an independent rest rotation,
 * z-depth, and mouse-parallax weight, so the cluster reads as layered
 * photographs floating above a soft backdrop — not a flat collage.
 *
 * Renders inside its own `relative` container. Sizes default to a 32rem
 * tall stage on desktop; the consumer can grow it via `className`.
 *
 * Respects `prefers-reduced-motion`.
 */
export function ParallaxImageConstellation({
  items,
  className,
}: {
  items: ConstellationItem[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const root = ref.current;
    if (!root) return;

    let raf = 0;
    let targetMx = 0;
    let targetMy = 0;
    let currentMx = 0;
    let currentMy = 0;
    let targetScroll = 0;
    let currentScroll = 0;

    const update = () => {
      raf = 0;
      currentMx += (targetMx - currentMx) * 0.08;
      currentMy += (targetMy - currentMy) * 0.08;
      currentScroll += (targetScroll - currentScroll) * 0.12;
      root.style.setProperty("--cn-mx", currentMx.toFixed(3));
      root.style.setProperty("--cn-my", currentMy.toFixed(3));
      root.style.setProperty("--cn-sy", currentScroll.toFixed(3));
      if (
        Math.abs(targetMx - currentMx) > 0.001 ||
        Math.abs(targetMy - currentMy) > 0.001 ||
        Math.abs(targetScroll - currentScroll) > 0.001
      ) {
        raf = window.requestAnimationFrame(update);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetMx = Math.max(
        -1,
        Math.min(1, (event.clientX - cx) / (rect.width / 1.6)),
      );
      targetMy = Math.max(
        -1,
        Math.min(1, (event.clientY - cy) / (rect.height / 1.6)),
      );
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh - rect.top) / (vh + rect.height);
      const centered = Math.max(0, Math.min(1, raw)) - 0.5;
      targetScroll = centered * 2;
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "relative h-[28rem] w-full sm:h-[32rem] lg:h-[36rem]",
        "[--cn-mx:0] [--cn-my:0] [--cn-sy:0]",
        className,
      )}
    >
      {items.map((item, index) => {
        const aspect =
          item.aspect === "landscape"
            ? "aspect-[4/3]"
            : item.aspect === "square"
              ? "aspect-square"
              : "aspect-[4/5]";
        const depth = item.depth ?? 1;
        const rotate = item.rotate ?? 0;
        const driftClass =
          index % 2 === 0 ? "constellation-drift" : "constellation-drift-alt";
        const style: CSSProperties = {
          left: `${item.x}%`,
          top: `${item.y}%`,
          // Clamp so the card scales down at narrow widths and doesn't
          // overflow the constellation stage on mobile.
          width: `clamp(7rem, ${item.width * 2.6}vw, ${item.width}rem)`,
          // Translate from the card's top-left to its centerpoint.
          transform: enabled
            ? `translate(-50%, -50%) translate3d(calc(var(--cn-mx) * ${
                depth * 22
              }px), calc(var(--cn-my) * ${depth * 18}px + var(--cn-sy) * ${
                depth * 32
              }px), 0) rotate(${rotate}deg)`
            : `translate(-50%, -50%) rotate(${rotate}deg)`,
          zIndex: Math.round(depth * 10),
          // Custom prop consumed by constellation-drift animation.
          ["--card-rot" as string]: `${rotate}deg`,
        };
        return (
          <figure
            key={`${item.src}-${index}`}
            className={clsx(
              "absolute overflow-hidden rounded-3xl border border-white/50 bg-white/60 shadow-[0_30px_70px_-30px_rgba(36,16,47,0.55)] backdrop-blur-[2px]",
              driftClass,
            )}
            style={style}
          >
            <div className={clsx("relative w-full", aspect)}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={`${item.width}rem`}
                className="object-cover"
              />
            </div>
            {item.caption ? (
              <figcaption className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-black/35 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
