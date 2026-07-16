import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { CONTACT } from "@/lib/contact";

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
      { label: "Partners", href: "/partners" },
      { label: "Mentor Program", href: "/mentor-program" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 4.97 8.5a2.5 2.5 0 0 1 .01-5zM3 9.75h4V21H3V9.75zM9.5 9.75h3.84v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.06 0 4.81 2.67 4.81 6.14V21h-4v-4.95c0-1.18-.02-2.7-1.64-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M16.5 3c.32 1.86 1.4 3.32 3.2 3.66v2.55c-1.16.11-2.24-.2-3.2-.79v5.9c0 3.44-2.6 5.68-5.6 5.68-2.86 0-5.15-2.13-5.15-4.9 0-2.9 2.36-4.98 5.4-4.72v2.62c-.34-.1-.72-.16-1.13-.13-1.2.1-2.06.96-2 2.2.05 1.16.9 1.98 2 1.98 1.24 0 2.13-.96 2.13-2.4V3h2.35z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--color-purple-900)] text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-5">
            <Logo tone="light" />
            <p className="text-[color:var(--color-purple-100)] max-w-sm leading-relaxed">
              Narrativa Consulting helps individuals and organizations unlock
              human potential through storytelling, communication, authenticity,
              and leadership.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nicole Stephenson on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-purple-700)] text-[color:var(--color-purple-100)] hover:text-white hover:border-white transition-colors"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nicole Stephenson on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-purple-700)] text-[color:var(--color-purple-100)] hover:text-white hover:border-white transition-colors"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={CONTACT.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nicole Stephenson on TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-purple-700)] text-[color:var(--color-purple-100)] hover:text-white hover:border-white transition-colors"
              >
                <TikTokIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
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
              Get in touch
            </p>
            <ul className="mt-4 space-y-3 text-white/90 leading-relaxed">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.websiteHref}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.website}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 sm:mt-16 pt-8 border-t border-[color:var(--color-purple-800)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-[color:var(--color-purple-200)]">
          <p>© {new Date().getFullYear()} Narrativa Consulting LLC. All rights reserved.</p>
          <p>Designed for the unapologetic.</p>
        </div>
      </Container>
    </footer>
  );
}
