"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "@/lib/clsx";

type Tone = "lavender" | "dark";

/**
 * HeroDepthScene — a dimensional, Spline-style depth backdrop.
 *
 * Renders behind hero sections to replace flat lavender/dark fills with
 * layered depth: a slow rotating gradient mesh, floating 3D-feeling orbs
 * (purple / lavender / teal), tilted glass planes, and a soft mouse-driven
 * parallax. Decorative only — `pointer-events: none`.
 *
 * If `NEXT_PUBLIC_SPLINE_SCENE_URL` is set at build time we mount the
 * real Spline scene in an iframe (no SDK install needed). Otherwise the
 * CSS/JS fallback below provides the same dimensional feel.
 *
 * Motion respects `prefers-reduced-motion`.
 */
export function HeroDepthScene({
  tone = "lavender",
  className,
  intensity = 1,
}: {
  tone?: Tone;
  className?: string;
  /** Multiplier for mouse-parallax displacement (0 disables parallax). */
  intensity?: number;
}) {
  const splineUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    const root = rootRef.current;
    if (!root || mq.matches || intensity === 0) {
      return () => mq.removeEventListener("change", onChange);
    }

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize to -1..1 with a forgiving radius so motion is subtle.
      targetX = ((event.clientX - cx) / (rect.width / 1.6)) * intensity;
      targetY = ((event.clientY - cy) / (rect.height / 1.6)) * intensity;
      targetX = Math.max(-1, Math.min(1, targetX));
      targetY = Math.max(-1, Math.min(1, targetY));
      if (!raf) raf = window.requestAnimationFrame(animate);
    };

    const animate = () => {
      raf = 0;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      root.style.setProperty("--depth-mx", currentX.toFixed(3));
      root.style.setProperty("--depth-my", currentY.toFixed(3));
      if (
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001
      ) {
        raf = window.requestAnimationFrame(animate);
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("pointermove", handleMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [intensity]);

  if (splineUrl) {
    // Real Spline scene: rendered through Spline's own iframe-embed
    // endpoint so we avoid the @splinetool/react-spline dependency.
    return (
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
      >
        <iframe
          title=""
          src={splineUrl}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0 opacity-90"
        />
      </div>
    );
  }

  const isDark = tone === "dark";
  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        // CSS custom props default to 0 — mouse handler updates them
        // when motion is enabled.
        "[--depth-mx:0] [--depth-my:0]",
        className,
      )}
      data-reduced={reduced ? "true" : undefined}
    >
      {/* Slowly rotating conic gradient mesh — provides the base depth.
          Sits beneath everything else. */}
      <div
        className={clsx(
          "absolute -inset-[20%] depth-mesh-rotate",
          isDark
            ? "opacity-50"
            : "opacity-70",
        )}
        style={{
          background: isDark
            ? "conic-gradient(from 0deg at 50% 50%, rgba(60,160,130,0.18), rgba(90,40,150,0.30), rgba(36,16,47,0), rgba(139,42,166,0.28), rgba(60,160,130,0.18))"
            : "conic-gradient(from 0deg at 50% 50%, rgba(234,219,244,0.85), rgba(200,163,224,0.55), rgba(252,248,255,0.0), rgba(60,160,130,0.20), rgba(234,219,244,0.85))",
          filter: "blur(60px)",
          transform:
            "translate3d(calc(var(--depth-mx) * 14px), calc(var(--depth-my) * 14px), 0)",
        }}
      />

      {/* Layered glass planes — tilted, translucent, with a soft glow
          sweep. Read as if light is passing through stacked panes. */}
      <div
        className={clsx(
          "absolute -left-10 top-[18%] h-[60%] w-[55%] -rotate-6 rounded-[2.5rem] border backdrop-blur-[2px]",
          isDark
            ? "border-white/10 bg-white/[0.04]"
            : "border-white/40 bg-white/30",
        )}
        style={{
          transform:
            "translate3d(calc(var(--depth-mx) * -24px), calc(var(--depth-my) * -16px), 0) rotate(-6deg)",
        }}
      />
      <div
        className={clsx(
          "absolute right-[-6%] top-[10%] h-[70%] w-[48%] rotate-[8deg] rounded-[2.5rem] border backdrop-blur-[2px]",
          isDark
            ? "border-[color:var(--color-teal-500)]/30 bg-[color:var(--color-purple-700)]/15"
            : "border-[color:var(--color-purple-200)]/70 bg-white/35",
        )}
        style={{
          transform:
            "translate3d(calc(var(--depth-mx) * 30px), calc(var(--depth-my) * 18px), 0) rotate(8deg)",
        }}
      />

      {/* Floating 3D-feeling orbs — purple, lavender, teal. Each gets a
          slow drift animation and an opposing mouse-parallax weight, so
          the scene reads as parallax depth rather than a flat plane. */}
      <Orb
        className="depth-orb-rise"
        style={{
          top: "8%",
          left: "12%",
          width: "18rem",
          height: "18rem",
          background: isDark
            ? "radial-gradient(circle at 30% 30%, rgba(160,107,204,0.85), rgba(90,40,150,0.35) 45%, rgba(36,16,47,0) 70%)"
            : "radial-gradient(circle at 30% 30%, rgba(234,219,244,0.95), rgba(200,163,224,0.55) 45%, rgba(252,248,255,0) 72%)",
          parallax: -22,
        }}
      />
      <Orb
        className="depth-orb-rise depth-delay-2"
        style={{
          bottom: "10%",
          right: "8%",
          width: "22rem",
          height: "22rem",
          background: isDark
            ? "radial-gradient(circle at 60% 40%, rgba(139,42,166,0.80), rgba(58,21,84,0.45) 45%, rgba(36,16,47,0) 75%)"
            : "radial-gradient(circle at 60% 40%, rgba(200,163,224,0.85), rgba(246,238,251,0.55) 50%, rgba(252,248,255,0) 78%)",
          parallax: 26,
        }}
      />
      <Orb
        className="depth-orb-rise depth-delay-3"
        style={{
          top: "30%",
          right: "26%",
          width: "12rem",
          height: "12rem",
          background: isDark
            ? "radial-gradient(circle at 40% 30%, rgba(60,160,130,0.60), rgba(47,128,103,0.30) 45%, rgba(36,16,47,0) 75%)"
            : "radial-gradient(circle at 40% 30%, rgba(60,160,130,0.45), rgba(60,160,130,0.10) 50%, rgba(252,248,255,0) 78%)",
          parallax: -16,
        }}
      />
      <Orb
        className="depth-orb-rise depth-delay-4"
        style={{
          bottom: "26%",
          left: "30%",
          width: "10rem",
          height: "10rem",
          background: isDark
            ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), rgba(160,107,204,0.20) 45%, rgba(36,16,47,0) 75%)"
            : "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.85), rgba(246,238,251,0.40) 50%, rgba(252,248,255,0) 78%)",
          parallax: 14,
        }}
      />

      {/* Soft glow sweep across the middle band */}
      <div
        className={clsx(
          "absolute inset-x-0 top-[38%] h-[26%] -skew-y-3",
          isDark
            ? "bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
            : "bg-gradient-to-r from-transparent via-white/40 to-transparent",
        )}
      >
        <div
          className={clsx(
            "absolute inset-0 hero-glow-sweep",
            isDark
              ? "bg-gradient-to-r from-transparent via-[color:var(--color-purple-400)]/15 to-transparent"
              : "bg-gradient-to-r from-transparent via-[color:var(--color-purple-200)]/45 to-transparent",
          )}
        />
      </div>

      {/* Grain wash so the gradients don't read as plastic */}
      <div
        className={clsx(
          "absolute inset-0 bg-grain mix-blend-multiply",
          isDark ? "opacity-[0.22]" : "opacity-[0.14]",
        )}
      />
    </div>
  );
}

type OrbStyle = React.CSSProperties & { parallax?: number };

function Orb({
  className,
  style,
}: {
  className?: string;
  style: OrbStyle;
}) {
  const { parallax = 0, ...rest } = style;
  return (
    <div
      className={clsx("absolute rounded-full blur-2xl", className)}
      style={{
        ...rest,
        transform: `translate3d(calc(var(--depth-mx) * ${parallax}px), calc(var(--depth-my) * ${parallax}px), 0)`,
      }}
    />
  );
}
