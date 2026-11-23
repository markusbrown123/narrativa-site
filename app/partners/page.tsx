import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { LogoGrid } from "@/components/LogoMarquee";
import { ScrollReveal } from "@/components/ScrollReveal";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getPartners } from "@/lib/cms/contentSource";
import { publish } from "@/lib/content";
import { clsx } from "@/lib/clsx";
import { REALM_PARTNERS_VIDEO } from "@/lib/videos";

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
        {/* Realm feature. Text alone, centred, until the click-to-play
            REALM_PartnersPageVideo is in (lib/videos.ts); then the video
            sits beside the text (below it on phones). */}
        <Section containerSize="wide">
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--color-purple-200)] bg-gradient-to-br from-white via-[color:var(--color-purple-50)] to-[color:var(--color-purple-100)] px-7 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div
              className={clsx(
                REALM_PARTNERS_VIDEO
                  ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
                  : "mx-auto max-w-2xl",
              )}
            >
              <div
                className={clsx(
                  "text-center",
                  REALM_PARTNERS_VIDEO && "mx-auto max-w-xl lg:mx-0 lg:text-left",
                )}
              >
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
              {REALM_PARTNERS_VIDEO ? (
                <ScrollReveal
                  direction="up"
                  duration={800}
                  className={
                    REALM_PARTNERS_VIDEO.height > REALM_PARTNERS_VIDEO.width
                      ? "mx-auto w-full max-w-sm"
                      : "w-full"
                  }
                >
                  <VideoEmbed
                    video={REALM_PARTNERS_VIDEO}
                    sizes="(min-width: 1024px) 34rem, 88vw"
                  />
                </ScrollReveal>
              ) : null}
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
