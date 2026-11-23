"use client";

import Image from "next/image";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { clsx } from "@/lib/clsx";
import type { ClientVideo } from "@/lib/videos";

/*
 * Home hero video in a "shattered frame", after the broken glass on the
 * Unapologetic cover: the clip's top-left corner, bottom-left corner and
 * right edge have broken away, and the broken-off pieces float just
 * outside as teal-tinted glass. The book chip (top right), the "On stage"
 * inset (bottom left, desktop) and the controls (bottom right) sit on
 * parts of the frame that stay whole.
 *
 * The frame takes the clip's own proportions, so the video is never
 * cropped, stretched or zoomed: Nicole appears exactly as filmed. No
 * colour wash either, so the grade stays light and natural. Visitors who
 * prefer reduced motion get the still image only, and the video file is
 * never requested for them.
 */

// Frame geometry is in units of 1% of the frame's width, so a break is
// the same size whatever the clip's proportions. Each point is measured
// from the top, from the bottom (positive = up), or from a point 64.5% of
// the way down the right edge, where the edge chip sits.
type Anchor = "top" | "bottom" | "chip";
type Pt = readonly [x: number, y: number, from: Anchor];

const top = (x: number, y: number): Pt => [x, y, "top"];
const bottom = (x: number, up: number): Pt => [x, up, "bottom"];
const chip = (x: number, dy: number): Pt => [x, dy, "chip"];

/** y position in width units, for a frame `height` units tall. */
function resolveY([, y, from]: Pt, height: number) {
  if (from === "top") return y;
  if (from === "bottom") return height - y;
  return height * 0.645 + y;
}

// Outline of the pane, clockwise from the top edge.
const PANE: Pt[] = [
  top(27, 0),
  top(100, 0),
  chip(100, -8.1),
  chip(97.4, -4.4),
  chip(98.6, 0),
  chip(96, 3.4),
  chip(100, 8.1),
  bottom(100, 0),
  bottom(19, 0),
  bottom(14, 4.25),
  bottom(9.2, 2),
  bottom(4.6, 8.5),
  bottom(0, 11.25),
  top(0, 26.25),
  top(5, 21.5),
  top(3, 15.75),
  top(10, 11.25),
  top(8.6, 6.25),
  top(17, 5.5),
  top(21, 1.75),
];

// Broken-off pieces. Each sits just outside the gap it came from.
const SHARDS: { points: Pt[]; delay: string; className: string }[] = [
  // Top-left: the large piece, drifting up and out.
  {
    points: [top(-4.5, -2.75), top(12.5, -5.75), top(9, 1.5), top(3.5, 5.75), top(-2, 11.25)],
    delay: "0s",
    className: "shard-drift",
  },
  // Top-left: a sliver beside it.
  {
    points: [top(17.5, -4.75), top(25, -2.75), top(19.5, -0.75)],
    delay: "-2.5s",
    className: "shard-drift-alt",
  },
  // Right edge: the chip.
  {
    points: [chip(101.6, -6.25), chip(106.5, -2.9), chip(103.2, 4.9)],
    delay: "-1.2s",
    className: "shard-drift-alt",
  },
  // Bottom-left: a small piece below the gap.
  {
    points: [bottom(2.5, -1.9), bottom(10.5, -0.75), bottom(6.2, -7.75)],
    delay: "-3.8s",
    className: "shard-drift",
  },
];

// Fine cracks running a short way in from the breaks. Kept to the edges
// so none crosses Nicole's face.
const CRACKS: Pt[][] = [
  [top(10, 11.25), top(15.5, 18.1), top(18.5, 26.25)],
  [top(17, 5.5), top(23.5, 10.25)],
  [top(5, 21.5), top(9.5, 29.4)],
  [chip(96, 3.4), chip(90.5, 6.25)],
  [bottom(9.2, 2), bottom(12, 9.4)],
];

/** Points for an SVG drawn in a `0 0 100 height` viewBox. */
const toSvg = (points: Pt[], height: number) =>
  points.map((p) => `${p[0]},${+resolveY(p, height).toFixed(2)}`).join(" ");

/** The pane outline as a CSS clip-path (percentages of the box). */
const toClipPath = (points: Pt[], height: number) =>
  `polygon(${points
    .map((p) => `${p[0]}% ${+((resolveY(p, height) / height) * 100).toFixed(3)}%`)
    .join(", ")})`;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** True when the visitor prefers reduced motion. The server (and the
 *  first client render) assume it is, so the still always renders first
 *  and the video only mounts once the browser says motion is fine. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
}

export function HeroVideo({
  video,
  still,
  sizes,
  className,
}: {
  video: ClientVideo;
  /** Still for reduced motion and while the clip loads. Defaults to the poster. */
  still?: string;
  sizes: string;
  className?: string;
}) {
  const gradientId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const showVideo = !reduceMotion;

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted && el.paused) void el.play().catch(() => {});
  };

  // The frame is 100 units wide and as tall as the clip's own proportions.
  const frameHeight = (100 * video.height) / video.width;
  const clipPath = toClipPath(PANE, frameHeight);

  return (
    <figure
      className={clsx("relative", className)}
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      {/* Soft shadow in the same broken shape, blurred behind the pane. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-y-6 opacity-70 blur-2xl"
      >
        <div
          className="h-full w-full bg-[color:var(--color-purple-900)]/45"
          style={{ clipPath }}
        />
      </div>

      {/* The pane: still underneath, video on top once motion is allowed.
          The still's alt text describes the clip; the moving video itself
          is hidden from screen readers so it is not announced twice. */}
      <div
        className="absolute inset-0 overflow-hidden bg-surface-tint"
        style={{ clipPath }}
      >
        <Image
          src={still ?? video.poster}
          alt={video.label}
          fill
          preload
          sizes={sizes}
          className="object-cover"
        />
        {showVideo ? (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        {/* A faint glass sheen across the top-left corner only. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_22%)]"
        />
      </div>

      {/* Glass edge, cracks and the broken-off shards. */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 100 ${+frameHeight.toFixed(2)}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="45%" stopColor="var(--color-teal-500)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-purple-200)" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <polygon
          points={toSvg(PANE, frameHeight)}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.85"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
        {CRACKS.map((crack, i) => (
          <polyline
            key={i}
            points={toSvg(crack, frameHeight)}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.6"
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        ))}
        {SHARDS.map((shard, i) => (
          <polygon
            key={i}
            points={toSvg(shard.points, frameHeight)}
            fill={`url(#${gradientId})`}
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            className={shard.className}
            style={{ animationDelay: shard.delay }}
          />
        ))}
      </svg>

      {showVideo ? (
        <div className="absolute bottom-3 right-3 z-10 flex gap-2 sm:bottom-4 sm:right-4">
          <ControlButton
            label={playing ? "Pause video" : "Play video"}
            onClick={togglePlay}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </ControlButton>
          {video.hasAudio ? (
            <ControlButton
              label={muted ? "Turn sound on" : "Turn sound off"}
              onClick={toggleSound}
            >
              {muted ? <SoundOffIcon /> : <SoundOnIcon />}
            </ControlButton>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-[color:var(--color-purple-800)] shadow-[0_12px_30px_-12px_rgba(43,15,68,0.55)] ring-1 ring-white/70 backdrop-blur transition-colors hover:bg-white hover:text-brand"
    >
      {children}
    </button>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function PauseIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 5v14M15 5v14" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg {...iconProps}>
      <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" />
      <path d="m17 9 5 6M22 9l-5 6" />
    </svg>
  );
}

function SoundOnIcon() {
  return (
    <svg {...iconProps}>
      <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
