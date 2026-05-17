import { clsx } from "@/lib/clsx";

/**
 * Lightweight floating accent layer for content sections. Drops a pair
 * of slow-drifting orbs + a soft grain wash behind a section so the
 * page never reads as a flat lavender block. Decorative only; consumer
 * must be `relative overflow-hidden`. All motion is CSS-only and
 * respects `prefers-reduced-motion`.
 */
export function FloatingAccentLayer({
  variant = "lavender",
  className,
}: {
  variant?: "lavender" | "pale" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none absolute inset-0", className)}
    >
      <div
        className={clsx(
          "absolute -top-32 left-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl hero-orb-drift",
          variant === "lavender" && "bg-[color:var(--color-purple-200)] opacity-45",
          variant === "pale" && "bg-[color:var(--color-purple-100)] opacity-55",
          isDark && "bg-[color:var(--color-purple-500)] opacity-25",
        )}
      />
      <div
        className={clsx(
          "absolute -bottom-32 right-[-12%] h-[24rem] w-[24rem] rounded-full blur-3xl hero-orb-drift-alt",
          variant === "lavender" && "bg-[color:var(--color-purple-100)] opacity-60",
          variant === "pale" && "bg-white opacity-70",
          isDark && "bg-[color:var(--color-purple-700)] opacity-35",
        )}
      />
      <div
        className={clsx(
          "absolute inset-0 bg-grain mix-blend-multiply",
          isDark ? "opacity-[0.18]" : "opacity-[0.10]",
        )}
      />
    </div>
  );
}
