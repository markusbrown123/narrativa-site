import { clsx } from "@/lib/clsx";

/**
 * SVG book cover placeholder for "Unapologetic". Renders inline so it ships
 * without external assets and stays crisp at any size.
 */
export function BookCover({
  className,
  size = "lg",
}: {
  className?: string;
  size?: "md" | "lg" | "xl";
}) {
  const dims = {
    md: "w-48 sm:w-56",
    lg: "w-64 sm:w-72",
    xl: "w-72 sm:w-96",
  }[size];

  return (
    <div
      className={clsx(
        "relative aspect-[2/3] shrink-0 drop-shadow-[0_30px_60px_rgba(43,15,68,0.35)]",
        dims,
        className,
      )}
    >
      <svg
        viewBox="0 0 400 600"
        className="absolute inset-0 h-full w-full rounded-md"
        role="img"
        aria-label="Unapologetic — book cover"
      >
        <defs>
          <linearGradient id="cover-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#401758" />
            <stop offset="55%" stopColor="#6b2c91" />
            <stop offset="100%" stopColor="#9560c0" />
          </linearGradient>
          <linearGradient id="cover-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="400" height="600" fill="url(#cover-bg)" />
        <rect width="14" height="600" fill="rgba(0,0,0,0.25)" />
        <rect x="14" width="386" height="600" fill="url(#cover-shine)" />
        <g
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.4"
        >
          <circle cx="320" cy="120" r="60" />
          <circle cx="320" cy="120" r="44" />
          <circle cx="320" cy="120" r="28" />
        </g>
        <text
          x="38"
          y="200"
          fill="rgba(235,221,244,0.8)"
          fontSize="14"
          letterSpacing="6"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="600"
        >
          NICOLE STEPHENSON
        </text>
        <text
          x="38"
          y="318"
          fill="#ffffff"
          fontSize="68"
          fontFamily="Fraunces, Georgia, serif"
          fontWeight="500"
          letterSpacing="-2"
        >
          Un-
        </text>
        <text
          x="38"
          y="380"
          fill="#ffffff"
          fontSize="68"
          fontFamily="Fraunces, Georgia, serif"
          fontWeight="500"
          letterSpacing="-2"
        >
          apologetic
        </text>
        <line
          x1="38"
          y1="412"
          x2="120"
          y2="412"
          stroke="#ebddf4"
          strokeWidth="2"
        />
        <text
          x="38"
          y="448"
          fill="rgba(235,221,244,0.92)"
          fontSize="17"
          fontFamily="Fraunces, Georgia, serif"
          fontStyle="italic"
        >
          Boldly Lead the Life
        </text>
        <text
          x="38"
          y="472"
          fill="rgba(235,221,244,0.92)"
          fontSize="17"
          fontFamily="Fraunces, Georgia, serif"
          fontStyle="italic"
        >
          and Career You Deserve
        </text>
        <text
          x="38"
          y="558"
          fill="rgba(235,221,244,0.7)"
          fontSize="11"
          letterSpacing="4"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="600"
        >
          NARRATIVA · 2026
        </text>
      </svg>
    </div>
  );
}
