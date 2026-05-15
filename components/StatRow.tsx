export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6">
      {stats.map((s) => (
        <div key={s.label} className="border-l-2 border-[color:var(--color-purple-300)] pl-4">
          <dt className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink">
            {s.value}
          </dt>
          <dd className="mt-1 text-sm text-ink-soft">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
