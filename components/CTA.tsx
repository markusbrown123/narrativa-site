import { LinkButton } from "./Button";
import { Container } from "./Container";

export function CTA({
  eyebrow = "Work with Nicole",
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[color:var(--color-purple-900)] via-[color:var(--color-purple-800)] to-[color:var(--color-purple-700)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-44 -left-32 h-[34rem] w-[34rem] rounded-full bg-[color:var(--color-purple-500)] opacity-40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-44 -right-24 h-[36rem] w-[36rem] rounded-full bg-[color:var(--color-purple-700)] opacity-60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grain opacity-25 mix-blend-overlay"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-end">
          <div className="space-y-5 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
              {eyebrow}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight">
              {title}
            </h2>
            {body ? (
              <p className="text-lg text-[color:var(--color-purple-100)] leading-relaxed">
                {body}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <LinkButton href={primary.href} variant="light" size="lg">
              {primary.label}
            </LinkButton>
            {secondary ? (
              <LinkButton
                href={secondary.href}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                {secondary.label}
              </LinkButton>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
