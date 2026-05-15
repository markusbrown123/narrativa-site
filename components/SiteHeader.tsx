"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { LinkButton } from "./Button";
import { clsx } from "@/lib/clsx";

const NAV: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Book", href: "/book" },
  { label: "Speaker", href: "/speaker" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Media", href: "/media" },
  { label: "Mentor", href: "/mentor-program" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // Track the path at which the menu was opened, so a navigation that changes
  // `pathname` collapses the menu without needing a state-syncing effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean) =>
    setOpenedAt(next ? pathname : null);

  return (
    <header className="sticky top-0 z-40 bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/70 border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "px-3 py-2 rounded-full text-sm font-medium transition-colors",
                    active
                      ? "text-brand bg-[color:var(--color-purple-50)]"
                      : "text-ink-soft hover:text-brand hover:bg-[color:var(--color-purple-50)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <LinkButton href="/contact" size="md">
              Contact
            </LinkButton>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full text-ink hover:bg-[color:var(--color-purple-50)]"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Toggle menu</span>
            {open ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6h16M3 11h16M3 16h16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
        {open ? (
          <div className="lg:hidden pb-6">
            <nav className="flex flex-col gap-1 pt-2">
              {NAV.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "px-4 py-3 rounded-2xl text-base font-medium",
                      active
                        ? "text-brand bg-[color:var(--color-purple-50)]"
                        : "text-ink hover:bg-[color:var(--color-purple-50)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-white font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
