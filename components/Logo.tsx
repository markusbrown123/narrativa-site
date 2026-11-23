import Image from "next/image";
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
        "inline-flex items-center gap-3",
        tone === "ink" ? "text-ink" : "text-white",
        className,
      )}
    >
      <Image
        // On dark surfaces use the reversed file: a white disc with the N cut
        // out, so the mark keeps its shape instead of becoming a white blob.
        src={
          tone === "light"
            ? "/brand/narrativa-logo-reversed.png"
            : "/brand/narrativa-logo.png"
        }
        alt=""
        width={242}
        height={61}
        priority={tone === "ink"}
        className="h-7 w-auto sm:h-8"
      />
      <span
        className={clsx(
          "inline-block border-l pl-2 sm:pl-3 text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.28em] font-semibold",
          tone === "ink"
            ? "border-line text-brand"
            : "border-[color:var(--color-purple-700)] text-[color:var(--color-purple-200)]",
        )}
      >
        Consulting
      </span>
    </Link>
  );
}
