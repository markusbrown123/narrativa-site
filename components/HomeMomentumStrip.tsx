"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { clsx } from "@/lib/clsx";

type MomentumItem = {
  kicker: string;
  title: string;
  body: string;
  href: string;
  icon?: ReactNode;
};

/**
 * Below-hero momentum strip: 3–4 high-trust signals that fade and
 * stagger in as the strip scrolls into view. Each card links into a
 * deeper page. Used to fill the visual silence between the hero and
 * the next editorial section without inventing claims.
 */
export function HomeMomentumStrip({
  items,
  className,
}: {
  items: MomentumItem[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hydration-safe reveal: server renders the strip already visible,
    // client downgrades to hidden on mount and reveals on intersection.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item, i) => {
        const style = mounted
          ? {
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translate3d(0,0,0)"
                : "translate3d(0,18px,0)",
              transition: `opacity 700ms ease-out ${i * 80}ms, transform 800ms cubic-bezier(0.2,0.7,0.2,1) ${i * 80}ms`,
              willChange: "opacity, transform",
            }
          : undefined;
        return (
          <Link
            key={item.title}
            href={item.href}
            style={style}
            className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-[color:var(--color-purple-200)] bg-white/85 p-5 backdrop-blur transition-colors hover:border-[color:var(--color-purple-400)] hover:bg-white"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[color:var(--color-purple-100)] opacity-0 blur-2xl transition-opacity group-hover:opacity-80"
            />
            <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand">
              {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
              {item.kicker}
            </div>
            <p className="font-display text-xl leading-snug text-ink">
              {item.title}
            </p>
            <p className="text-sm leading-snug text-ink-soft">{item.body}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-brand transition-transform group-hover:translate-x-0.5">
              Explore <span aria-hidden="true">→</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
