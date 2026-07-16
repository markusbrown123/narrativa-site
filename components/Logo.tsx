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
        src="/brand/narrativa-logo.png"
        alt=""
        width={242}
        height={61}
        priority
        className={clsx(
          "h-7 w-auto sm:h-8",
          // The asset is a purple wordmark on transparent — invert it for
          // light-tone surfaces (e.g. the dark-purple footer) so it reads white.
          tone === "light" && "brightness-0 invert",
        )}
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
