import Link from "next/link";
import { clsx } from "@/lib/clsx";

export function Logo({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Narrativa Consulting — home"
      className={clsx(
        "inline-flex items-baseline gap-2",
        tone === "ink" ? "text-ink" : "text-white",
        className,
      )}
    >
      <span className="font-display text-2xl font-medium tracking-tight">
        Narrativa
      </span>
      <span
        className={clsx(
          "text-xs uppercase tracking-[0.28em] font-semibold",
          tone === "ink" ? "text-brand" : "text-[color:var(--color-purple-200)]",
        )}
      >
        Consulting
      </span>
    </Link>
  );
}
