import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { LogoGrid } from "@/components/LogoMarquee";
import { getPartners } from "@/lib/cms/contentSource";
import { publish } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Recent organizations, events, and rooms Narrativa Consulting has been a part of.",
};

const REALM_URL = "https://www.explorerealm.com/pages/real-women-of-realm";

export default async function PartnersPage() {
  const partners = await getPartners();
  const visible = publish(partners);

  return (
    <>
      <PageHero
        eyebrow="Partners"
        variant="centered"
        tone="lavender"
        title="Partners and Organizations."
        lead="A selection of recent partner organizations, hosts, and engagement venues. Specific relationships are noted where confirmed."
      >
        <LinkButton href="/contact" size="lg">
          Become a partner
        </LinkButton>
        <LinkButton href="/speaker" size="lg" variant="secondary">
          Book Nicole to speak
        </LinkButton>
      </PageHero>

      {/* Sections in .section-stack alternate white / lavender by position. */}
      <div className="section-stack">
        {/* Realm feature. The click-to-play REALM_PartnersPageVideo goes in
            beside the text once it is in the project (see README). */}
        <Section containerSize="wide">
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--color-purple-200)] bg-gradient-to-br from-white via-[color:var(--color-purple-50)] to-[color:var(--color-purple-100)] px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                Brand ambassador
              </p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Realm Fine Jewelry.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">
                Nicole is Realm Fine Jewelry&apos;s brand ambassador for 2026.
              </p>
              <div className="mt-8">
                <LinkButton href={REALM_URL} external size="lg">
                  Real Women of Realm
                </LinkButton>
              </div>
            </div>
          </div>
        </Section>

        {visible.length > 0 ? (
          <Section containerSize="wide">
            <SectionHeading
              eyebrow="Recent rooms"
              title="Organizations Nicole has worked with."
              lead="Logos pulled from Nicole's archive. The nature of each engagement is recorded only where confirmed."
            />
            <LogoGrid partners={visible} className="mt-12" />
          </Section>
        ) : null}
      </div>

      <CTA
        title="Want to be in the next list?"
        body="Tell us about your team, event, or moment — we'll come back with the right shape of engagement."
        primary={{ label: "Start the conversation", href: "/contact" }}
      />
    </>
  );
}
