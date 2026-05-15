export function Quote({
  quote,
  attribution,
  tone = "tint",
}: {
  quote: string;
  attribution: string;
  tone?: "tint" | "ink";
}) {
  const tintStyles =
    tone === "tint"
      ? "bg-[color:var(--color-purple-50)] text-ink border-[color:var(--color-purple-100)]"
      : "bg-[color:var(--color-purple-900)] text-white border-[color:var(--color-purple-800)]";
  return (
    <figure
      className={`rounded-3xl border p-8 sm:p-10 ${tintStyles}`}
    >
      <svg
        aria-hidden="true"
        width="42"
        height="32"
        viewBox="0 0 42 32"
        fill="none"
        className={
          tone === "tint"
            ? "text-[color:var(--color-purple-300)]"
            : "text-[color:var(--color-purple-300)]"
        }
      >
        <path
          d="M0 32V18.6C0 8.32 7.04 0 17.6 0v6.72c-5.6 0-9.92 4.16-9.92 11.04H17.6V32H0zm22.4 0V18.6C22.4 8.32 29.44 0 40 0v6.72c-5.6 0-9.92 4.16-9.92 11.04H40V32H22.4z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
      <blockquote className="mt-5 font-display text-2xl sm:text-3xl leading-snug">
        “{quote}”
      </blockquote>
      <figcaption
        className={`mt-6 text-sm font-medium tracking-wide ${
          tone === "tint" ? "text-ink-soft" : "text-[color:var(--color-purple-200)]"
        }`}
      >
        — {attribution}
      </figcaption>
    </figure>
  );
}
