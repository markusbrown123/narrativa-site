import Image from "next/image";
import { Container } from "./Container";
import { clsx } from "@/lib/clsx";

type Tone = "lavender" | "dark";
type Variant = "centered" | "split";

export interface PageHeroImage {
  src: string;
  alt: string;
  objectPosition?: string;
  caption?: { label: string; value: string };
  /** ratio of the image card, defaults to portrait 4/5 */
  aspect?: "portrait" | "square" | "landscape";
}

export interface PageHeroProps {
  eyebrow?: string;
  /** Hero h1. Must be sentence/title case — never all caps. */
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** CTA row (LinkButtons). Rendered below the lead. */
  children?: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  /** Image for split variant. Required when variant === "split". */
  image?: PageHeroImage;
  /** Visual element to render in the right column instead of an image. */
  rightSlot?: React.ReactNode;
  className?: string;
}

/**
 * Site-wide page hero. Two variants, two tones:
 *
 *   - centered, lavender — editorial centered layout on lavender background
 *   - centered, dark     — editorial centered layout on deep purple
 *   - split,    lavender — copy left, image card right, lavender background
 *   - split,    dark     — copy left, image card right, deep purple
 *
 * All variants:
 *   - vertically center their content
 *   - take min-height calc(100vh - nav) on desktop so CTAs land above the fold
 *   - use the `.hero-title-page` clamp() typography from globals.css
 *   - never sit on pure white
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  variant = "centered",
  tone = "lavender",
  image,
  rightSlot,
  className,
}: PageHeroProps) {
  const isDark = tone === "dark";
  const isSplit = variant === "split";

  return (
    <section
      className={clsx(
        "relative overflow-hidden",
        // Minimum height = viewport minus sticky nav (h-16 / sm:h-20)
        "min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)]",
        isDark
          ? "bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-800)] to-[color:var(--color-purple-700)] text-white"
          : "bg-gradient-to-br from-[color:var(--color-purple-100)] via-[color:var(--color-purple-50)] to-[color:var(--color-purple-200)] text-ink",
        className,
      )}
    >
      {/* Decorative glow orbs */}
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -top-40 -right-32 h-[44rem] w-[44rem] rounded-full blur-3xl",
          isDark
            ? "bg-[color:var(--color-purple-500)] opacity-30"
            : "bg-[color:var(--color-purple-200)] opacity-70",
        )}
      />
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -bottom-44 -left-20 h-[36rem] w-[36rem] rounded-full blur-3xl",
          isDark
            ? "bg-[color:var(--color-purple-700)] opacity-40"
            : "bg-[color:var(--color-purple-100)] opacity-80",
        )}
      />
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 mix-blend-multiply bg-grain",
          isDark ? "opacity-[0.25]" : "opacity-[0.18]",
        )}
      />

      <Container
        size={isSplit ? "wide" : "default"}
        className="relative flex min-h-[inherit] flex-col justify-center py-20 sm:py-24 lg:py-28"
      >
        {isSplit ? (
          <SplitLayout
            tone={tone}
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            image={image}
            rightSlot={rightSlot}
          >
            {children}
          </SplitLayout>
        ) : (
          <CenteredLayout
            tone={tone}
            eyebrow={eyebrow}
            title={title}
            lead={lead}
          >
            {children}
          </CenteredLayout>
        )}
      </Container>
    </section>
  );
}

function HeroEyebrow({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: Tone;
}) {
  return (
    <p
      className={clsx(
        "hero-eyebrow",
        tone === "dark"
          ? "text-[color:var(--color-purple-200)]"
          : "text-brand",
      )}
    >
      {children}
    </p>
  );
}

function HeroTitle({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: Tone;
}) {
  return (
    <h1
      className={clsx(
        "font-display font-medium tracking-tight hero-title-page",
        tone === "dark" ? "text-white" : "text-ink",
      )}
    >
      {children}
    </h1>
  );
}

function HeroLead({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: Tone;
}) {
  return (
    <p
      className={clsx(
        "text-lg leading-relaxed sm:text-xl",
        tone === "dark"
          ? "text-[color:var(--color-purple-100)]"
          : "text-ink-soft",
      )}
    >
      {children}
    </p>
  );
}

function CenteredLayout({
  eyebrow,
  title,
  lead,
  tone,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone: Tone;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-col items-center gap-7 text-center">
      {eyebrow ? <HeroEyebrow tone={tone}>{eyebrow}</HeroEyebrow> : null}
      <HeroTitle tone={tone}>{title}</HeroTitle>
      {lead ? (
        <div className="max-w-2xl">
          <HeroLead tone={tone}>{lead}</HeroLead>
        </div>
      ) : null}
      {children ? (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function SplitLayout({
  eyebrow,
  title,
  lead,
  tone,
  image,
  rightSlot,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone: Tone;
  image?: PageHeroImage;
  rightSlot?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="order-2 flex flex-col gap-6 lg:order-1">
        {eyebrow ? <HeroEyebrow tone={tone}>{eyebrow}</HeroEyebrow> : null}
        <HeroTitle tone={tone}>{title}</HeroTitle>
        {lead ? (
          <div className="max-w-xl">
            <HeroLead tone={tone}>{lead}</HeroLead>
          </div>
        ) : null}
        {children ? (
          <div className="flex flex-wrap gap-3 pt-2">{children}</div>
        ) : null}
      </div>
      <div className="order-1 lg:order-2">
        {image ? <SplitImage image={image} tone={tone} /> : rightSlot}
      </div>
    </div>
  );
}

function SplitImage({ image, tone }: { image: PageHeroImage; tone: Tone }) {
  const aspect =
    image.aspect === "square"
      ? "aspect-square"
      : image.aspect === "landscape"
        ? "aspect-[4/3]"
        : "aspect-[4/5]";
  return (
    <div className="relative mx-auto w-full max-w-[32rem] lg:ml-auto lg:mr-0">
      {/* Soft halo */}
      <div
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] blur-2xl",
          tone === "dark"
            ? "bg-gradient-to-br from-[color:var(--color-purple-500)] via-[color:var(--color-purple-700)] to-[color:var(--color-purple-900)] opacity-60"
            : "bg-gradient-to-br from-[color:var(--color-purple-200)] via-white to-[color:var(--color-purple-100)] opacity-80",
        )}
      />
      {/* Outline frame accents */}
      <div
        aria-hidden="true"
        className={clsx(
          "absolute -top-4 -left-4 hidden h-24 w-24 rounded-3xl sm:block",
          tone === "dark"
            ? "border border-[color:var(--color-purple-300)]/40"
            : "border border-[color:var(--color-purple-300)]",
        )}
      />
      <div
        aria-hidden="true"
        className={clsx(
          "absolute -bottom-6 -right-6 hidden h-28 w-28 rounded-3xl sm:block",
          tone === "dark"
            ? "border border-[color:var(--color-teal-500)]/60"
            : "border border-[color:var(--color-purple-300)]",
        )}
      />
      <div
        className={clsx(
          "relative w-full overflow-hidden rounded-[2.25rem] shadow-[0_40px_100px_-40px_rgba(36,16,47,0.55)] ring-1",
          aspect,
          tone === "dark"
            ? "ring-white/15"
            : "ring-[color:var(--color-purple-200)]",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, 88vw"
          priority
          className="object-cover"
          style={
            image.objectPosition
              ? { objectPosition: image.objectPosition }
              : undefined
          }
        />
        {image.caption ? (
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white backdrop-blur-md">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/80">
              {image.caption.label}
            </p>
            <p className="font-display text-base leading-tight text-white">
              {image.caption.value}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
