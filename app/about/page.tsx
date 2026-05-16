import type { Metadata } from "next";
import Image from "next/image";
import { BookCover } from "@/components/BookCover";
import { LinkButton } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { publish } from "@/lib/content";
import { recognition } from "@/lib/mock/recognition";

export const metadata: Metadata = {
  title: "About Nicole Stephenson",
  description:
    "Nicole Stephenson, IOM is a dynamic communicator, author, transformational speaker, Founder of Narrativa Consulting, and Lecturer at The Wharton School / University of Pennsylvania.",
};

export default function AboutPage() {
  const visibleRecognition = publish(recognition);
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A communicator, author, and the founder
            <br className="hidden lg:block" /> of Narrativa Consulting.
          </>
        }
        lead="Nicole Stephenson, IOM is a dynamic communicator, author, transformational speaker, Founder of Narrativa Consulting, and Lecturer at The Wharton School / University of Pennsylvania."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/speaker">Book Nicole to speak</LinkButton>
          <LinkButton href="/contact" variant="secondary">
            Get in touch
          </LinkButton>
        </div>
      </PageHero>

      <Section tone="default">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_70px_-30px_rgba(43,15,68,0.4)]">
            <Image
              src="/photos/nicole-stephenson-headshot-plaid.jpg"
              alt="Nicole Stephenson, IOM — studio portrait in a navy and red plaid blazer."
              fill
              sizes="(min-width: 1024px) 24rem, 22rem"
              priority
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <SectionHeading eyebrow="Bio" title={<>The full picture.</>} />
            <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
              <p>
                Nicole Stephenson, IOM is a dynamic communicator, author, and
                transformational speaker dedicated to helping individuals and
                organizations redefine success and step confidently into their
                full potential.
              </p>
              <p>
                Her career began at KYW Newsradio in Philadelphia, where she
                entered the workforce during the 2008 financial crisis and
                quickly distinguished herself across the newsroom and marketing
                departments. She helped shape the station&apos;s first digital
                marketing role — launching its Facebook presence when social
                media was still emerging — and rose to become Marketing
                Director at 22, the youngest woman and only female director
                among senior leaders.
              </p>
              <p>
                Her path then led her to The Main Line Chamber of Commerce,
                where she initially joined as an assistant through a mentorship
                connection and quickly advanced to become Executive Director of
                the Society of Professional Women. Over a decade in that role,
                she led transformative programming, hosted high-profile
                speakers, and built a thriving community focused on advancing
                women in leadership.
              </p>
              <p>
                She spent three years writing her debut book,{" "}
                <em>Unapologetic: Boldly Lead the Life and Career You Deserve</em>,
                a powerful exploration of how women can overcome self-doubt
                through mentorship, sponsorship, and skill-building.
              </p>
              <p>
                Today, as Founder of{" "}
                <strong className="text-ink">Narrativa Consulting</strong> and a
                Lecturer in the Wharton Communication Program at the University
                of Pennsylvania, she empowers leaders, teams, and emerging
                professionals to communicate with clarity and lead with
                authenticity. She also serves on the board of Girls Spark.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-line">
            <Image
              src="/photos/nicole-stephenson-speaking-1.jpg"
              alt="Nicole Stephenson on stage with a handheld microphone, mid-keynote."
              fill
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-line">
            <Image
              src="/photos/nicole-stephenson-portrait-outdoor.jpg"
              alt="Nicole Stephenson in an outdoor portrait — striped dress, arms folded, smiling."
              fill
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-line">
            <Image
              src="/photos/nicole-stephenson-wharton.jpg"
              alt="Nicole Stephenson on the University of Pennsylvania campus in front of the Wharton building."
              fill
              sizes="(min-width: 1024px) 22rem, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Section>

      <Section tone="default">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div className="relative aspect-[3/2.2] w-full overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_30px_90px_-40px_rgba(43,15,68,0.45)]">
            <Image
              src="/book/unapologetic-book-stack.jpg"
              alt="Printed copies of Unapologetic by Nicole Stephenson, IOM."
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <Eyebrow>The book</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-medium leading-[1.1] tracking-tight text-ink">
              Unapologetic, in print.
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed">
              Nicole&apos;s debut book is the long-form expression of the work
              behind every keynote and engagement.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <BookCover size="md" />
              <LinkButton href="/book" variant="secondary">
                Read more about the book
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      {visibleRecognition.length > 0 ? (
        <Section tone="alt">
          <SectionHeading
            eyebrow="Recognition"
            title="Where the work shows up."
            align="center"
          />
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {visibleRecognition.map((r) => (
              <li
                key={r.id}
                className="overflow-hidden rounded-3xl bg-white border border-line"
              >
                {r.image ? (
                  <div className="relative aspect-[4/3] w-full bg-surface-tint">
                    <Image
                      src={r.image}
                      alt={`${r.organization} — ${r.award}`}
                      fill
                      sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6 space-y-1.5">
                  {r.year ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                      {r.year}
                    </p>
                  ) : null}
                  <p className="font-display text-lg text-ink leading-snug">
                    {r.organization}
                  </p>
                  <p className="text-sm text-ink-soft">{r.award}</p>
                  {r.summary ? (
                    <p className="text-sm text-ink-soft pt-1 leading-relaxed">
                      {r.summary}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CTA
        title="Talk to Nicole about your moment."
        body="Whether it's a keynote, a book, a launch, or a season of work — start with a note."
        primary={{ label: "Send a note", href: "/contact" }}
        secondary={{ label: "Apply to the mentor program", href: "/mentor-program" }}
      />
    </>
  );
}
