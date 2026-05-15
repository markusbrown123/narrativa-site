import { clsx } from "@/lib/clsx";
import { Container } from "./Container";

export function Section({
  children,
  className,
  tone = "default",
  containerSize = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "tint" | "alt" | "ink" | "brand";
  containerSize?: "narrow" | "default" | "wide";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-20 sm:py-24",
        tone === "default" && "bg-surface text-ink",
        tone === "tint" && "bg-surface-tint text-ink",
        tone === "alt" && "bg-surface-alt text-ink",
        tone === "ink" && "bg-[color:var(--color-purple-900)] text-white",
        tone === "brand" && "bg-brand text-white",
        className,
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "light";
}) {
  return (
    <p
      className={clsx(
        "text-xs font-semibold uppercase tracking-[0.22em]",
        tone === "brand" && "text-brand",
        tone === "light" && "text-[color:var(--color-purple-200)]",
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "ink",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "light";
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5 max-w-3xl",
        align === "center" && "mx-auto text-center items-center",
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone === "light" ? "light" : "brand"}>{eyebrow}</Eyebrow>
      ) : null}
      <h2
        className={clsx(
          "font-display text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight",
          tone === "ink" && "text-ink",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={clsx(
            "text-lg sm:text-xl leading-relaxed",
            tone === "ink" && "text-ink-soft",
            tone === "light" && "text-[color:var(--color-purple-100)]",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
