import { clsx } from "@/lib/clsx";
import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "lavender" | "ink" | "tint" | "twilight";

const toneSurface: Record<Tone, string> = {
  lavender:
    "bg-gradient-to-br from-[color:var(--color-purple-50)] via-[color:var(--color-purple-100)] to-[color:var(--color-purple-200)] text-ink",
  tint:
    "bg-gradient-to-b from-[color:var(--color-purple-100)] via-white to-[color:var(--color-purple-50)] text-ink",
  ink:
    "bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-800)] to-[color:var(--color-purple-700)] text-white",
  twilight:
    "bg-gradient-to-br from-[color:var(--color-purple-800)] via-[color:var(--color-purple-600)] to-[color:var(--color-purple-500)] text-white",
};

/**
 * Wide editorial band with layered glow, grain, and an optional
 * gradient hairline. Used to break up white space and give pages a
 * deliberate rhythm of light → mid → dark sections.
 */
export function AnimatedSectionBand({
  children,
  tone = "lavender",
  className,
  containerSize = "default",
  id,
  hairline = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  containerSize?: "narrow" | "default" | "wide";
  id?: string;
  hairline?: boolean;
}) {
  const isDark = tone === "ink" || tone === "twilight";
  return (
    <section
      id={id}
      className={clsx(
        "relative overflow-hidden py-20 sm:py-24 lg:py-28",
        toneSurface[tone],
        className,
      )}
    >
      {hairline ? (
        <div
          aria-hidden="true"
          className={clsx(
            "absolute inset-x-0 top-0 h-px",
            isDark
              ? "bg-gradient-to-r from-transparent via-white/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-[color:var(--color-purple-300)]/60 to-transparent",
          )}
        />
      ) : null}

      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full blur-3xl",
          isDark
            ? "bg-[color:var(--color-purple-500)] opacity-40"
            : "bg-[color:var(--color-purple-200)] opacity-60",
        )}
      />
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -bottom-44 -right-24 h-[36rem] w-[36rem] rounded-full blur-3xl",
          isDark
            ? "bg-[color:var(--color-purple-700)] opacity-50"
            : "bg-[color:var(--color-purple-100)] opacity-70",
        )}
      />
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-grain opacity-25 mix-blend-overlay"
            : "bg-grain opacity-[0.18] mix-blend-multiply",
        )}
      />

      <Container size={containerSize} className="relative">
        {children}
      </Container>
    </section>
  );
}
