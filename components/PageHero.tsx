import { Container } from "./Container";
import { Eyebrow } from "./Section";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-purple-50)] via-surface-tint to-surface">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-[color:var(--color-purple-100)] blur-3xl opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-[color:var(--color-purple-200)] blur-3xl opacity-40"
      />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-3xl space-y-6">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight text-ink">
            {title}
          </h1>
          {lead ? (
            <p className="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl">
              {lead}
            </p>
          ) : null}
          {children ? <div className="pt-2">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
