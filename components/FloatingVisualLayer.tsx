import { clsx } from "@/lib/clsx";

type Tone = "lavender" | "pale" | "dark";

/**
 * Decorative floating shapes layer — glass squares, hairline rings, and
 * a hand-drawn squiggle that drift slowly behind hero or section content.
 * Inspired by the 21.dev "floating accents" pattern but built from the
 * Narrativa palette only. Consumer must be `relative overflow-hidden`.
 *
 * Server component — motion is CSS only and respects
 * `prefers-reduced-motion`.
 */
export function FloatingVisualLayer({
  tone = "lavender",
  className,
  density = "default",
}: {
  tone?: Tone;
  className?: string;
  density?: "default" | "dense" | "sparse";
}) {
  const isDark = tone === "dark";
  const count = density === "dense" ? 6 : density === "sparse" ? 3 : 4;
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none absolute inset-0", className)}
    >
      {/* Glass square — top right */}
      <div
        className={clsx(
          "absolute right-[8%] top-[12%] hidden h-28 w-28 rounded-3xl border backdrop-blur-[2px] hero-shape-float sm:block",
          isDark
            ? "border-white/15 bg-white/[0.04]"
            : "border-[color:var(--color-purple-200)] bg-white/40",
        )}
      />
      {/* Glass square — bottom left */}
      <div
        className={clsx(
          "absolute bottom-[14%] left-[6%] hidden h-20 w-20 -rotate-6 rounded-2xl border backdrop-blur-[2px] hero-shape-float-alt sm:block",
          isDark
            ? "border-[color:var(--color-teal-500)]/40 bg-[color:var(--color-purple-700)]/15"
            : "border-[color:var(--color-purple-300)]/70 bg-white/55",
        )}
      />
      {/* Hairline ring — left */}
      <div
        className={clsx(
          "absolute left-[14%] top-[28%] hidden h-32 w-32 rounded-full border hero-shape-float sm:block",
          isDark
            ? "border-white/12"
            : "border-[color:var(--color-purple-300)]/60",
        )}
      />
      {/* Smaller solid orb */}
      {count >= 4 ? (
        <div
          className={clsx(
            "absolute bottom-[26%] right-[18%] hidden h-12 w-12 rounded-full blur-md hero-shape-float-alt sm:block",
            isDark
              ? "bg-[color:var(--color-purple-400)]/30"
              : "bg-[color:var(--color-purple-300)]/50",
          )}
        />
      ) : null}
      {/* Hand-drawn squiggle */}
      {count >= 5 ? (
        <svg
          className={clsx(
            "absolute right-[20%] top-[58%] hidden hero-shape-float-alt sm:block",
            isDark
              ? "text-[color:var(--color-purple-300)]/35"
              : "text-[color:var(--color-purple-400)]/35",
          )}
          width="140"
          height="44"
          viewBox="0 0 140 44"
          fill="none"
        >
          <path
            d="M2 22 C 22 4, 42 40, 62 22 S 102 4, 138 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ) : null}
      {/* Extra glass strip for dense layouts */}
      {count >= 6 ? (
        <div
          className={clsx(
            "absolute left-[36%] bottom-[10%] hidden h-14 w-40 rotate-[8deg] rounded-2xl border backdrop-blur-[2px] hero-shape-float sm:block",
            isDark
              ? "border-white/10 bg-white/[0.03]"
              : "border-[color:var(--color-purple-200)] bg-white/45",
          )}
        />
      ) : null}
    </div>
  );
}
