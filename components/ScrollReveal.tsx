"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { clsx } from "@/lib/clsx";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor: Record<Direction, string> = {
  up: "translate3d(0, 22px, 0)",
  down: "translate3d(0, -22px, 0)",
  left: "translate3d(22px, 0, 0)",
  right: "translate3d(-22px, 0, 0)",
  none: "translate3d(0, 0, 0)",
};

/**
 * Fades and slides content in when it scrolls into view. Server renders
 * the content already-visible (no opacity:0) so search engines and
 * no-JS readers always see it; the client downgrades to hidden on mount
 * and reveals on intersection. That order is intentional — it prevents
 * hydration mismatch and keeps content available if JS fails.
 */
export function ScrollReveal({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  duration = 700,
  className,
  once = true,
}: {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li" | "ul" | "header" | "figure";
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Flip from server-rendered (always visible) to client-controlled
    // (hidden until intersected) exactly once on mount. This is the
    // canonical hydration-safe reveal pattern; the eslint rule's
    // suggestion to "synchronize via external system" doesn't apply
    // because the only external system here is the document layout.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const node = ref.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const style: CSSProperties = mounted
    ? {
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : offsetFor[direction],
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }
    : {};

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={clsx(className)}
    >
      {children}
    </Component>
  );
}
