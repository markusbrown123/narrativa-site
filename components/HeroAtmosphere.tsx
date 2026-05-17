import { clsx } from "@/lib/clsx";

type Tone = "lavender" | "dark";

/**
 * Reusable layered background depth for hero sections — gradient orbs,
 * a soft radial glow, grain texture, and an animated glass panel.
 * Decorative only; renders inside the consumer's `relative overflow-hidden`
 * wrapper. Server component — all motion is CSS-only and gated by
 * `prefers-reduced-motion`.
 */
export function HeroAtmosphere({
  tone = "lavender",
  className,
  withPanel = true,
  withShapes = true,
}: {
  tone?: Tone;
  className?: string;
  /** Render the layered glass panel band. */
  withPanel?: boolean;
  /** Render the floating abstract shapes (ring + squiggle). */
  withShapes?: boolean;
}) {
  const isDark = tone === "dark";
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none absolute inset-0", className)}
    >
      {/* Primary glow orb — top right */}
      <div
        className={clsx(
          "absolute -top-40 -right-32 h-[44rem] w-[44rem] rounded-full blur-3xl hero-orb-drift",
          isDark
            ? "bg-[color:var(--color-purple-500)] opacity-30"
            : "bg-[color:var(--color-purple-200)] opacity-70",
        )}
      />
      {/* Secondary glow orb — bottom left */}
      <div
        className={clsx(
          "absolute -bottom-44 -left-20 h-[36rem] w-[36rem] rounded-full blur-3xl hero-orb-drift-alt",
          isDark
            ? "bg-[color:var(--color-purple-700)] opacity-45"
            : "bg-[color:var(--color-purple-100)] opacity-90",
        )}
      />
      {/* Soft radial glow centered */}
      <div
        className={clsx(
          "absolute left-1/2 top-1/3 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl hero-orb-drift",
          isDark
            ? "bg-[color:var(--color-purple-400)] opacity-25"
            : "bg-white opacity-60",
        )}
      />
      {/* Soft grain texture */}
      <div
        className={clsx(
          "absolute inset-0 mix-blend-multiply bg-grain",
          isDark ? "opacity-[0.25]" : "opacity-[0.18]",
        )}
      />
      {/* Layered glass panel — angled translucent band that adds depth
          to the background without dominating it. */}
      {withPanel ? (
        <div
          className={clsx(
            "absolute inset-x-0 top-1/4 h-1/2 -skew-y-6 backdrop-blur-[1px]",
            isDark
              ? "bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
              : "bg-gradient-to-r from-transparent via-white/40 to-transparent",
          )}
        >
          <div
            className={clsx(
              "absolute inset-0 hero-glow-sweep",
              isDark
                ? "bg-gradient-to-r from-transparent via-[color:var(--color-purple-400)]/15 to-transparent"
                : "bg-gradient-to-r from-transparent via-[color:var(--color-purple-200)]/40 to-transparent",
            )}
          />
        </div>
      ) : null}
      {/* Floating abstract shapes */}
      {withShapes ? (
        <>
          <div
            className={clsx(
              "absolute right-[12%] top-[14%] hidden h-24 w-24 rounded-full border hero-shape-float sm:block",
              isDark
                ? "border-white/15"
                : "border-[color:var(--color-purple-300)]/60",
            )}
          />
          <div
            className={clsx(
              "absolute left-[8%] top-[22%] hidden h-16 w-16 rounded-2xl border hero-shape-float-alt sm:block",
              isDark
                ? "border-[color:var(--color-teal-500)]/40"
                : "border-[color:var(--color-purple-300)]/50",
            )}
          />
          <svg
            className={clsx(
              "absolute bottom-[18%] right-[18%] hidden hero-shape-float-alt sm:block",
              isDark
                ? "text-[color:var(--color-purple-300)]/30"
                : "text-[color:var(--color-purple-400)]/35",
            )}
            width="120"
            height="40"
            viewBox="0 0 120 40"
            fill="none"
          >
            <path
              d="M2 20 C 20 4, 40 36, 60 20 S 100 4, 118 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </>
      ) : null}
    </div>
  );
}
