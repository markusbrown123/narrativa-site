import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Nicole Stephenson and Narrativa Consulting — for speaking, advisory, press, and book inquiries.",
};

const CHANNELS = [
  {
    label: "Speaking",
    description: "Keynotes, workshops, fireside, and panel inquiries.",
    contact: "speaking@narrativaconsulting.com",
  },
  {
    label: "Press & media",
    description: "Interviews, features, podcast bookings, review copies.",
    contact: "press@narrativaconsulting.com",
  },
  {
    label: "Consulting",
    description: "Advisory, ghostwriting, speaker brand, and event strategy.",
    contact: "hello@narrativaconsulting.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about the room
            <br className="hidden lg:block" /> you&apos;re trying to win.
          </>
        }
        lead="Speaking, consulting, press, or a question about the mentor program — start with a note. We respond within three business days."
      />

      <Section tone="default">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div className="rounded-3xl bg-white border border-line p-8 sm:p-10">
            <ContactForm />
          </div>
          <aside className="space-y-8">
            <div className="rounded-3xl bg-[color:var(--color-purple-50)] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Where to send what
              </p>
              <ul className="mt-5 space-y-5">
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <p className="font-display text-lg text-ink">{c.label}</p>
                    <p className="text-sm text-ink-soft mt-0.5 leading-relaxed">
                      {c.description}
                    </p>
                    <a
                      href={`mailto:${c.contact}`}
                      className="mt-1 inline-block text-sm font-semibold text-brand hover:underline"
                    >
                      {c.contact}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-line p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Studio
              </p>
              <p className="mt-3 text-ink-soft leading-relaxed">
                Philadelphia, PA — we work with clients globally and travel
                often. Calls run on Eastern time, weekdays.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
