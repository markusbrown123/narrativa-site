"use client";

import Image from "next/image";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { clsx } from "@/lib/clsx";
import type { ClientVideo } from "@/lib/videos";

/*
 * Home hero video in a "shattered frame", after the broken glass on the
 * Unapologetic cover: the clip sits in a 4:5 pane whose top-left corner,
 * bottom-left corner and right edge have broken away, and the broken-off
 * pieces float just outside it as teal-tinted glass. The book chip
 * (top right), the "On stage" inset (bottom left, desktop) and the
 * controls (bottom right) sit on parts of the frame that stay whole.
 *
 * No colour wash on the video: the grade stays light so Nicole looks
 * natural. Visitors who prefer reduced motion get the still image only,
 * and the video file is never requested for them.
 */

// Outline of the pane, clockwise from the top edge. Percentages of the
// frame, so the same shape works at every width.
const PANE: [number, number][] = [
  [27, 0],
  [100, 0],
  [100, 58],
  [97.4, 61],
  [98.6, 64.5],
  [96, 67.2],
  [100, 71],
  [100, 100],
  [19, 100],
  [14, 96.6],
  [9.2, 98.4],
  [4.6, 93.2],
  [0, 91],
  [0, 21],
  [5, 17.2],
  [3, 12.6],
  [10, 9],
  [8.6, 5],
  [17, 4.4],
  [21, 1.4],
];

const CLIP_PATH = `polygon(${PANE.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;

// The SVG overlay uses a 100 x 125 viewBox (the frame is 4:5), so a
// percentage point (x, y) maps to (x, y * 1.25).
const toSvg = (points: [number, number][]) =>
  points.map(([x, y]) => `${x},${+(y * 1.25).toFixed(2)}`).join(" ");

// Broken-off pieces, in frame percentages. Each sits just outside the
// gap it came from.
const SHARDS: { points: [number, number][]; delay: string; className: string }[] = [
  // Top-left: the large piece, drifting up and out.
  {
    points: [
      [-4.5, -2.2],
      [12.5, -4.6],
      [9, 1.2],
      [3.5, 4.6],
      [-2, 9],
    ],
    delay: "0s",
    className: "shard-drift",
  },
  // Top-left: a sliver beside it.
  {
    points: [
      [17.5, -3.8],
      [25, -2.2],
      [19.5, -0.6],
    ],
    delay: "-2.5s",
    className: "shard-drift-alt",
  },
  // Right edge: the chip.
  {
    points: [
      [101.6, 59.5],
      [106.5, 62.2],
      [103.2, 68.4],
    ],
    delay: "-1.2s",
    className: "shard-drift-alt",
  },
  // Bottom-left: a small piece below the gap.
  {
    points: [
      [2.5, 101.5],
      [10.5, 100.6],
      [6.2, 106.2],
    ],
    delay: "-3.8s",
    className: "shard-drift",
  },
];

// Fine cracks running a short way in from the breaks. Kept to the edges
// so none crosses Nicole's face.
const CRACKS: [number, number][][] = [
  [
    [10, 9],
    [15.5, 14.5],
    [18.5, 21],
  ],
  [
    [17, 4.4],
    [23.5, 8.2],
  ],
  [
    [5, 17.2],
    [9.5, 23.5],
  ],
  [
    [96, 67.2],
    [90.5, 69.5],
  ],
  [
    [9.2, 98.4],
    [12, 92.5],
  ],
];

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

  return (
    <figure className={clsx("relative aspect-[4/5]", className)}>
      {/* Soft shadow in the same broken shape, blurred behind the pane. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-y-6 opacity-70 blur-2xl"
      >
        <div
          className="h-full w-full bg-[color:var(--color-purple-900)]/45"
          style={{ clipPath: CLIP_PATH }}
        />
      </div>

      {/* The pane: still underneath, video on top once motion is allowed.
          The still's alt text describes the clip; the moving video itself
          is hidden from screen readers so it is not announced twice. */}
      <div
        className="absolute inset-0 overflow-hidden bg-surface-tint"
        style={{ clipPath: CLIP_PATH }}
      >
        <Image
          src={still ?? video.poster}
          alt={video.label}
          fill
          preload
          sizes={sizes}
          className="object-cover"
          style={
            video.objectPosition
              ? { objectPosition: video.objectPosition }
              : undefined
          }
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
            style={
              video.objectPosition
                ? { objectPosition: video.objectPosition }
                : undefined
            }
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
        viewBox="0 0 100 125"
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
          points={toSvg(PANE)}
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
            points={toSvg(crack)}
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
            points={toSvg(shard.points)}
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
