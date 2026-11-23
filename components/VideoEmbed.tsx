"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clsx } from "@/lib/clsx";
import type { ClientVideo } from "@/lib/videos";

type Phase = "idle" | "loading" | "playing";

/**
 * Click-to-play video with sound. Nothing plays, and the video file is
 * not downloaded, until the visitor presses play: the poster (an
 * optimised, lazy-loaded image) stands in until then and stays over the
 * player until the first frame is ready, so there is no black flash.
 * After that the browser's own controls take over (keyboard and screen
 * reader friendly).
 */
export function VideoEmbed({
  video,
  sizes,
  className,
}: {
  video: ClientVideo;
  sizes: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  // Once the play button is gone, keep keyboard focus on the player.
  useEffect(() => {
    if (phase !== "idle") videoRef.current?.focus();
  }, [phase]);

  const start = () => {
    const el = videoRef.current;
    if (!el) return;
    setPhase("loading");
    // play() inside the click so every browser treats it as the
    // visitor's choice and allows sound.
    void el.play().catch(() => setPhase("idle"));
  };

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden rounded-3xl bg-[color:var(--color-purple-900)] ring-1 ring-[color:var(--color-purple-200)] shadow-[0_30px_70px_-30px_rgba(36,16,47,0.4)]",
        className,
      )}
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      <video
        ref={videoRef}
        src={video.src}
        controls={phase !== "idle"}
        playsInline
        preload="none"
        aria-label={video.label}
        tabIndex={phase === "idle" ? -1 : undefined}
        onPlaying={() => setPhase("playing")}
        className="absolute inset-0 h-full w-full object-contain"
      />

      {phase !== "playing" ? (
        <button
          type="button"
          onClick={start}
          disabled={phase === "loading"}
          aria-label={`Play video: ${video.label}`}
          className="group absolute inset-0 block h-full w-full cursor-pointer disabled:cursor-progress"
        >
          <Image
            src={video.poster}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-purple-900)]/40 via-transparent to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-[0_18px_40px_-14px_rgba(36,16,47,0.6)] ring-1 ring-white/70 backdrop-blur transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
          >
            {phase === "loading" ? (
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1"
              >
                <path d="M8 5.5v13l10.5-6.5z" />
              </svg>
            )}
          </span>
        </button>
      ) : null}
    </div>
  );
}
