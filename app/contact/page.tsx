import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Nicole Stephenson and Narrativa Consulting — for speaking, advisory, press, and book inquiries.",
};

const INQUIRY_KINDS = [
  {
    label: "Speaking",
    description: "Keynotes, workshops, fireside, and panel inquiries.",
  },
  {
    label: "Press & media",
    description: "Interviews, features, podcast bookings, review copies.",
  },
  {
    label: "Consulting",
    description: "Advisory, speaker brand, and event strategy.",
  },
  {
    label: "Mentor Program",
    description: "Questions about the next cohort or how to apply.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        variant="centered"
        tone="lavender"
        title="Let's Talk About the Room You're Trying to Win."
        lead="Speaking, consulting, press, or a question about the mentor program — start with a note. Nicole reads every message."
      />

      <Section tone="tint">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
          <div className="rounded-3xl bg-white border border-line p-6 sm:p-10">
            <ContactForm />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-3xl bg-[color:var(--color-purple-50)] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Direct
              </p>
              <ul className="mt-5 space-y-4">
                <li>
                  <p className="text-sm text-ink-soft">Email</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-0.5 inline-block font-display text-lg text-ink hover:text-brand break-all"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <p className="text-sm text-ink-soft">Online</p>
                  <a
                    href={CONTACT.websiteHref}
                    className="mt-0.5 inline-block font-display text-lg text-ink hover:text-brand"
                  >
                    {CONTACT.website}
                  </a>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-[color:var(--color-purple-200)] flex flex-wrap gap-3">
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand border border-[color:var(--color-purple-200)] hover:bg-[color:var(--color-purple-100)]"
                >
                  LinkedIn
                </a>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand border border-[color:var(--color-purple-200)] hover:bg-[color:var(--color-purple-100)]"
                >
                  Instagram
                </a>
                <a
                  href={CONTACT.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand border border-[color:var(--color-purple-200)] hover:bg-[color:var(--color-purple-100)]"
                >
                  TikTok
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-line p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                What to send
              </p>
              <ul className="mt-5 space-y-4">
                {INQUIRY_KINDS.map((kind) => (
                  <li key={kind.label}>
                    <p className="font-display text-lg text-ink">{kind.label}</p>
                    <p className="text-sm text-ink-soft mt-0.5 leading-relaxed">
                      {kind.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
