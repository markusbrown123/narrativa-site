import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-purple-600)] focus-visible:ring-offset-[color:var(--color-purple-50)]";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-[color:var(--color-purple-700)] focus-visible:ring-offset-white",
  secondary:
    "bg-white text-brand border border-[color:var(--color-purple-200)] hover:bg-[color:var(--color-purple-50)]",
  ghost:
    "bg-transparent text-ink hover:bg-[color:var(--color-purple-50)] hover:text-brand",
  light:
    "bg-white text-[color:var(--color-purple-700)] hover:bg-[color:var(--color-purple-50)]",
};

const sizeClass: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  const classes = clsx(base, variantClass[variant], sizeClass[size], className);
  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  onClick,
}: CommonProps & {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        base,
        variantClass[variant],
        sizeClass[size],
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
}
