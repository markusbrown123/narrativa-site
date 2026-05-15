import type { Service } from "@/types/content";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <article className="flex flex-col h-full rounded-3xl border border-line bg-white p-7 hover:border-[color:var(--color-purple-300)] hover:shadow-[0_20px_60px_-30px_rgba(107,44,145,0.25)] transition-all">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--color-purple-50)] text-brand">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink leading-snug">
        {service.title}
      </h3>
      <p className="mt-3 text-[color:var(--color-purple-700)] font-medium leading-snug">
        {service.tagline}
      </p>
      <p className="mt-4 text-ink-soft leading-relaxed">{service.description}</p>
      {detailed ? (
        <div className="mt-6 space-y-5 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Outcomes
            </p>
            <ul className="mt-2 space-y-1.5 text-ink-soft">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="text-brand">—</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Deliverables
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-full bg-[color:var(--color-purple-50)] px-3 py-1 text-xs text-[color:var(--color-purple-700)]"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Ideal for
            </p>
            <p className="mt-2 text-ink-soft">{service.ideal_for}</p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
