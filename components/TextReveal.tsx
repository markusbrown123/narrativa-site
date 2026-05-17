"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { clsx } from "@/lib/clsx";

type Mode = "words" | "lines" | "block";

/**
 * Editorial text-reveal — animates content into view on scroll. Three
 * modes:
 *
 *   - "words"  splits a string into words, each rising on a stagger
 *   - "lines"  splits a string on newlines / commas / periods
 *   - "block"  reveals the whole child as one unit (closest to
 *               ScrollReveal — kept here so the same primitive can do
 *               both copy-reveal and component-reveal)
 *
 * Server renders the content fully visible (no opacity:0) so search
 * engines and JS-disabled readers see the full text. The client takes
 * over on mount, hides until intersection, then plays the reveal. That
 * order is hydration-safe by design.
 *
 * Respects `prefers-reduced-motion`.
 */
export function TextReveal({
  text,
  children,
  mode = "block",
  as: Tag = "div",
  className,
  delay = 0,
  duration = 700,
  stagger = 35,
  once = true,
}: {
  /** String content for "words" / "lines" modes. */
  text?: string;
  /** Rendered child for "block" mode (and the SSR fallback). */
  children?: ReactNode;
  mode?: Mode;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4";
  className?: string;
  delay?: number;
  duration?: number;
  /** Per-piece delay in ms for "words" / "lines" modes. */
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const pieces = useMemo(() => {
    if (mode === "block" || !text) return null;
    if (mode === "words") return text.split(/(\s+)/);
    // "lines" — split on commas/periods, then trim trailing punctuation
    return text
      .split(/(?<=[,.;:])\s+/)
      .map((piece) => piece.trim())
      .filter(Boolean);
  }, [mode, text]);

  const Component = Tag as ElementType;

  if (mode === "block" || !pieces) {
    const blockStyle: CSSProperties = mounted
      ? {
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translate3d(0, 0, 0)"
            : "translate3d(0, 22px, 0)",
          transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
          willChange: "opacity, transform",
        }
      : {};
    return (
      <Component
        ref={ref as React.RefObject<HTMLDivElement>}
        style={blockStyle}
        className={className}
      >
        {children ?? text}
      </Component>
    );
  }

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={clsx(className)}
      aria-label={text}
    >
      {pieces.map((piece, index) => {
        const isSpace = mode === "words" && /^\s+$/.test(piece);
        if (isSpace) return <span key={`s-${index}`}>{piece}</span>;
        const pieceDelay = delay + index * stagger;
        const style: CSSProperties = mounted
          ? {
              display: "inline-block",
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, 0.5em, 0)",
              transition: `opacity ${duration}ms ease-out ${pieceDelay}ms, transform ${duration}ms cubic-bezier(0.2, 0.7, 0.2, 1) ${pieceDelay}ms`,
              willChange: "opacity, transform",
            }
          : { display: "inline-block" };
        return (
          <span key={`p-${index}`} style={style} aria-hidden="true">
            {piece}
            {mode === "lines" && index < pieces.length - 1 ? " " : null}
          </span>
        );
      })}
    </Component>
  );
}
