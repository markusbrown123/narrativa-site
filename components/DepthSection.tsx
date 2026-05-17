import type { ReactNode } from "react";
import { clsx } from "@/lib/clsx";
import { Container } from "./Container";
import { FloatingVisualLayer } from "./FloatingVisualLayer";
import { HeroDepthScene } from "./HeroDepthScene";

type Tone = "lavender" | "pale" | "dark" | "tint";

/**
 * DepthSection — a Section wrapper that comes pre-layered with depth.
 * Stacks HeroDepthScene (the Spline-style fallback backdrop), optional
 * floating glass shapes, and a relative content layer. Use this on
 * pages that otherwise read as a flat lavender block.
 */
export function DepthSection({
  children,
  tone = "lavender",
  className,
  containerSize = "default",
  withShapes = true,
  withDepthScene = true,
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  containerSize?: "narrow" | "default" | "wide";
  withShapes?: boolean;
  withDepthScene?: boolean;
  id?: string;
}) {
  const isDark = tone === "dark";
  const sceneTone = isDark ? "dark" : "lavender";
  const shapeTone: "lavender" | "pale" | "dark" =
    tone === "dark" ? "dark" : tone === "pale" || tone === "tint" ? "pale" : "lavender";

  return (
    <section
      id={id}
      className={clsx(
        "relative overflow-hidden py-16 sm:py-20 lg:py-24",
        tone === "lavender" &&
          "bg-gradient-to-br from-[color:var(--color-purple-100)] via-[color:var(--color-purple-50)] to-[color:var(--color-purple-200)] text-ink",
        tone === "pale" &&
          "bg-gradient-to-b from-[color:var(--color-purple-50)] via-white to-[color:var(--color-purple-50)] text-ink",
        tone === "tint" && "bg-surface-tint text-ink",
        tone === "dark" &&
          "bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-800)] to-[color:var(--color-purple-700)] text-white",
        className,
      )}
    >
      {withDepthScene ? (
        <HeroDepthScene tone={sceneTone} intensity={0.7} />
      ) : null}
      {withShapes ? <FloatingVisualLayer tone={shapeTone} /> : null}
      <Container size={containerSize} className="relative">
        {children}
      </Container>
    </section>
  );
}
