import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";

const FOOTER_NAV: { heading: string; items: { label: string; href: string }[] }[] = [
  {
    heading: "Explore",
    items: [
      { label: "About", href: "/about" },
      { label: "Book", href: "/book" },
      { label: "Speaker", href: "/speaker" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    heading: "Programs",
    items: [
      { label: "Events", href: "/events" },
      { label: "Media", href: "/media" },
      { label: "Mentor Program", href: "/mentor-program" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--color-purple-900)] text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-4">
            <Logo tone="light" />
            <p className="text-[color:var(--color-purple-100)] max-w-sm leading-relaxed">
              Narrativa Consulting helps individuals and organizations unlock
              human potential through storytelling, communication, authenticity,
              and leadership.
            </p>
          </div>
          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-purple-200)]">
              Work with Nicole
            </p>
            <p className="mt-4 text-white/90 leading-relaxed">
              For speaking, advisory, and media inquiries — start with a note.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-white border-b border-[color:var(--color-purple-300)] pb-1 hover:border-white"
            >
              hello@narrativaconsulting.com →
            </Link>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[color:var(--color-purple-800)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-[color:var(--color-purple-200)]">
          <p>© {new Date().getFullYear()} Narrativa Consulting LLC. All rights reserved.</p>
          <p>Designed for the unapologetic.</p>
        </div>
      </Container>
    </footer>
  );
}
