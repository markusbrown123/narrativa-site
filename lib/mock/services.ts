import type { Service } from "@/types/content";

/**
 * Narrativa's service menu — built from "Services from ChatGPT.docx",
 * "NicoleStephensonSpeakerServices.docx", and "IntakeForm.pdf". The
 * source docs intentionally do not promise pricing, timelines, response
 * times, or guarantees, so this file does not either.
 */
export const services: Service[] = [
  {
    id: "svc-speaker-brand-development",
    title: "Speaker Brand Development",
    status: "Published",
    featured: true,
    sort_order: 10,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    slug: "speaker-brand-development",
    tagline: "Establish a strong, professional foundation for your speaking career.",
    description:
      "We help speakers define who they are on stage, who they serve, and how that adds up to a brand audiences and bookers recognize.",
    outcomes: [
      "Brand positioning and messaging",
      "Speaking niche and audience definition",
      "Personal brand strategy",
    ],
    deliverables: [
      "Brand positioning",
      "Messaging architecture",
      "Niche and audience definition",
      "Business setup guidance",
    ],
    ideal_for:
      "Experts ready to move from one-off speaking to a recognized speaker brand.",
    icon: "spark",
  },
  {
    id: "svc-marketing-visibility-strategy",
    title: "Marketing & Visibility Strategy",
    status: "Published",
    featured: true,
    sort_order: 20,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    slug: "marketing-visibility-strategy",
    tagline: "Get seen, get recognized, and get booked.",
    description:
      "A focused plan to turn your expertise into visibility — across website, social, newsletter, and outreach.",
    outcomes: [
      "Website audit and optimization",
      "Social media strategy and content planning",
      "Audience growth and engagement",
    ],
    deliverables: [
      "Website audit",
      "Social media strategy",
      "Editorial calendar",
      "Prospect list development",
      "Newsletter and blog plan",
    ],
    ideal_for:
      "Authors, founders, and executives with a launch, book, or moment to support.",
    icon: "compass",
  },
  {
    id: "svc-content-writing",
    title: "Content & Writing Services",
    status: "Published",
    featured: true,
    sort_order: 30,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    slug: "content-writing",
    tagline: "Communicate your value with clarity and confidence.",
    description:
      "Writing partnership for the words that travel with you — bios, intros, talk descriptions, and the thought leadership you don't have time to draft.",
    outcomes: [
      "Short and long-form professional bios",
      "On-stage introductions",
      "Speaker topic descriptions",
    ],
    deliverables: [
      "Bio system (short, medium, long)",
      "Stage introductions",
      "Speaker topic descriptions",
      "Website and marketing copy",
      "Thought leadership content",
    ],
    ideal_for:
      "Leaders whose ideas are sharper than the time they have to write them.",
    icon: "pen",
  },
  {
    id: "svc-speaker-assets-design",
    title: "Speaker Assets & Design",
    status: "Published",
    featured: false,
    sort_order: 40,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    slug: "speaker-assets-design",
    tagline: "Create the materials that position you as a high-level professional.",
    description:
      "Design and development of the speaker assets that turn interest into booked engagements.",
    outcomes: [
      "Logo and brand identity",
      "One-sheet and media kit",
      "Presentation decks and handouts",
    ],
    deliverables: [
      "Logo and brand identity",
      "Business cards",
      "Speaker one-sheet",
      "Media kit",
      "Presentation decks (PowerPoint)",
      "Worksheets and handouts",
    ],
    ideal_for:
      "Speakers ready to look as serious in pixels as they sound on stage.",
    icon: "camera",
  },
  {
    id: "svc-media-production-referrals",
    title: "Media & Production Service Referrals",
    status: "Published",
    featured: false,
    sort_order: 50,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    slug: "media-production-referrals",
    tagline: "Show up with confidence and credibility across every platform.",
    description:
      "Trusted referrals to vetted photographers, videographers, and producers for the moments where the right partner makes the difference.",
    outcomes: [
      "Professional photography and headshots",
      "Speaker sizzle reels (1–3 minutes)",
      "Video, podcast, and media content support",
    ],
    deliverables: [
      "Professional headshots and action photography",
      "Speaker sizzle reels",
      "Video production for demos and promotions",
      "Podcast and media content support",
    ],
    ideal_for:
      "Clients who want one introduction instead of a five-vendor search.",
    icon: "globe",
  },
  {
    id: "svc-speaking-engagement-development",
    title: "Speaking Engagement Development",
    status: "Published",
    featured: false,
    sort_order: 60,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    slug: "speaking-engagement-development",
    tagline: "Deliver impactful, memorable experiences for your audience.",
    description:
      "Shape the structure, storytelling, and audience experience of your keynote, workshop, or panel.",
    outcomes: [
      "Keynote, workshop, and panel development",
      "Presentation structure and storytelling",
      "Audience engagement and Q&A preparation",
    ],
    deliverables: [
      "Keynote, workshop, and panel development",
      "Presentation structure and storytelling",
      "Q&A preparation",
      "Moderation and emcee training",
    ],
    ideal_for:
      "Speakers ready to take a strong message and make it land in the room.",
    icon: "stage",
  },
  {
    id: "svc-event-strategy",
    title: "Event Strategy & Execution",
    status: "Published",
    featured: false,
    sort_order: 70,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    slug: "event-strategy",
    tagline: "Expand your influence by creating and leading your own events.",
    description:
      "End-to-end strategy for your owned events — from premise and program to run-of-show and host.",
    outcomes: [
      "Event planning and production",
      "Speaker booking strategy",
      "Audience experience design",
    ],
    deliverables: [
      "Event planning and production",
      "Speaker booking strategy",
      "Run-of-show development",
      "Audience experience design",
      "Hosting and emceeing support",
    ],
    ideal_for:
      "Leaders and organizations investing in a flagship moment.",
    icon: "calendar",
  },
];
