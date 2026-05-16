import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { PartnerLogos } from "@/components/PartnerLogos";
import { publish } from "@/lib/content";
import { partners } from "@/lib/mock/partners";
import type { Partner } from "@/types/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Recent organizations, events, and rooms Narrativa Consulting has been a part of.",
};

export default function PartnersPage() {
  const visible = publish(partners);
  const confirmed: Partner[] = visible.filter((p) => p.relationship);
  const logosOnly: Partner[] = visible.filter((p) => !p.relationship);

  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Rooms Narrativa has been in."
        lead="A selection of recent partner organizations, hosts, and engagement venues. Specific relationships are noted where confirmed."
      />

      {confirmed.length > 0 ? (
        <Section tone="default" containerSize="wide">
          <SectionHeading
            eyebrow="Confirmed engagements"
            title="Where Nicole's role is on the record."
          />
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {confirmed.map((p) => (
              <li
                key={p.id}
                className="flex flex-col h-full overflow-hidden rounded-3xl border border-line bg-white"
              >
                <div className="relative aspect-[16/9] w-full bg-surface-tint">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
                    className="object-contain p-6"
                  />
                </div>
                <div className="flex flex-col gap-1.5 p-6">
                  <p className="font-display text-xl text-ink leading-snug">
                    {p.name}
                  </p>
                  {p.relationship ? (
                    <p className="text-sm text-brand font-medium">
                      {p.relationship}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {logosOnly.length > 0 ? (
        <Section tone="tint" containerSize="wide">
          <SectionHeading
            eyebrow="Recent rooms"
            title="Organizations Nicole has worked with."
            lead="Logos pulled from Nicole's archive. The nature of each engagement is recorded only where confirmed."
          />
          <div className="mt-14">
            <PartnerLogos partners={logosOnly} />
          </div>
        </Section>
      ) : null}

      <CTA
        title="Want to be in the next list?"
        body="Tell us about your team, event, or moment — we'll come back with the right shape of engagement."
        primary={{ label: "Start the conversation", href: "/contact" }}
      />
    </>
  );
}
