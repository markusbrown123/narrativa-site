import { clsx } from "@/lib/clsx";

const baseInput =
  "block w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-[color:var(--color-purple-400)] focus:ring-2 focus:ring-[color:var(--color-purple-200)] transition";

export function FieldShell({
  label,
  hint,
  htmlFor,
  required,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-ink">
          {label}
          {required ? <span className="ml-1 text-brand">*</span> : null}
        </span>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}

export function TextField({
  id,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={baseInput}
    />
  );
}

export function TextArea({
  id,
  name,
  required,
  placeholder,
  rows = 5,
}: {
  id: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className={clsx(baseInput, "resize-y leading-relaxed")}
    />
  );
}

export function SelectField({
  id,
  name,
  required,
  options,
  defaultValue,
}: {
  id: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <select
      id={id}
      name={name}
      required={required}
      defaultValue={defaultValue ?? ""}
      className={clsx(baseInput, "appearance-none pr-10 bg-no-repeat")}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b2c91' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        backgroundPosition: "right 1rem center",
      }}
    >
      <option value="" disabled>
        Select one…
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
