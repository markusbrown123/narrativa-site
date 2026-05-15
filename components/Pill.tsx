import { clsx } from "@/lib/clsx";

export function Pill({
  children,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  tone?: "brand" | "green" | "ink";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "brand" && "bg-[color:var(--color-purple-50)] text-brand",
        tone === "green" && "bg-[color:var(--color-purple-50)] text-[color:var(--color-green-700)]",
        tone === "ink" && "bg-ink text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
