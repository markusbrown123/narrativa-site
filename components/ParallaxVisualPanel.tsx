"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { clsx } from "@/lib/clsx";

/**
 * Renders children with subtle scroll-driven parallax. The wrapper
 * stays a normal block so layout doesn't shift; only the inner content
 * is translated. Server renders the inner at translate(0); the client
 * starts updating after mount, so there's no hydration mismatch.
 */
export function ParallaxVisualPanel({
  children,
  className,
  innerClassName,
  intensity = 24,
  scale = 0,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Maximum pixels of vertical shift across the viewport. */
  intensity?: number;
  /** Maximum additional scale across the viewport (e.g. 0.04 = +4%). */
  scale?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    // One-shot enable on mount; intentional setState in an effect so
    // server output matches client (no transform applied until after
    // hydration). See React's "synchronize on mount" pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: 0 when wrapper enters bottom of viewport, 1 when it exits top.
      const raw = (vh - rect.top) / (vh + rect.height);
      const progress = Math.max(0, Math.min(1, raw));
      const centered = progress - 0.5;
      const ty = -centered * intensity * 2;
      const sc = 1 + Math.abs(centered) * scale;
      inner.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${sc.toFixed(4)})`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [intensity, scale]);

  return (
    <div ref={wrapRef} className={clsx("relative", className)}>
      <div
        ref={innerRef}
        className={clsx(innerClassName)}
        style={enabled ? { willChange: "transform" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
