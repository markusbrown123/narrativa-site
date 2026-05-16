import type { SpeakerTopic } from "@/types/content";

/**
 * Signature speaking topics from Nicole's speaker one-sheet
 * (Nicole_Stephenson_OneSheet.pdf). These are her four published
 * keynote/workshop themes — bullet content is reproduced verbatim from
 * the source.
 */
export const SPEAKER_TOPICS: SpeakerTopic[] = [
  {
    number: 1,
    title: "All The Wins, No Glory — Invisible Effort: Staying Motivated When No One Notices",
    bullets: [
      "The emotional toll of unrecognized work",
      "How to measure and celebrate hidden progress",
      "Building resilience and confidence from within",
      "Why teams and individuals stay \"busy\" but stagnant",
      "How to create traction, direction, and intentional effort",
      "Frameworks for real productivity",
    ],
  },
  {
    number: 2,
    title: "The Journey to Authenticity — You Are The Asset: Permission To Prioritize Your Growth",
    bullets: [
      "The layers we wear and how to shed them",
      "Authenticity as a leadership advantage",
      "Navigating environments where authenticity feels risky",
      "Identifying strengths that set you apart",
      "Using your superpower strategically",
      "Avoiding burnout and overextension",
      "How to invest in yourself in meaningful ways",
      "The ROI of personal and career development",
    ],
  },
  {
    number: 3,
    title: "The Net Worth Of Your Network — Relationship Capital: The Most Undervalued Career Currency",
    bullets: [
      "Types of mentors and how to find them",
      "Becoming a high-impact mentor",
      "Creating mentoring cultures inside organizations",
      "Why mentoring accelerates both careers",
      "Networking for real people, not just salespeople",
      "How networks create opportunities",
      "Strategies for relationship-building vs. transactional networking that last",
    ],
  },
  {
    number: 4,
    title: "Self-Advocacy — Scripts, Tools, and Strategies",
    bullets: [
      "Scripts, tools and strategies for self-advocacy",
      "Dealing with bias and barriers",
      "How to claim your seat at the table",
      "Confidently asking for recognition, opportunity, and compensation",
      "Saying no without guilt",
      "Building laser focus in a distracted world",
      "Managing emotional energy",
      "Work–life choice vs. balance",
      "Making space for joy and fulfillment",
      "Sustainable success habits",
    ],
  },
];

/**
 * Engagement formats Nicole offers. Taken verbatim from the speaker
 * one-sheet.
 */
export const SPEAKER_FORMATS: { format: string; description: string }[] = [
  {
    format: "Keynote (30 / 60 / 90 minutes)",
    description: "A powerful learning experience to motivate and inspire.",
  },
  {
    format: "Breakout Session (30 / 60 minutes)",
    description: "Engaging dialogue to connect and spark creativity.",
  },
  {
    format: "Fireside Chat or Panelist (30 / 60 minutes)",
    description:
      "A guided conversation that brings nuance, story, and audience interaction.",
  },
  {
    format: "Executive Retreat (4 / 8 hours)",
    description:
      "High-level development to engage and transform results for senior leaders.",
  },
  {
    format: "Multi-Session Workshop Series",
    description:
      "A program with accountability to reach success — monthly or quarterly.",
  },
  {
    format: "Custom Books With Company Branding",
    description:
      "Customized editions of Unapologetic with your organization's branding available.",
  },
];

/**
 * The audiences Nicole's one-sheet calls out as the best fit for her
 * material.
 */
export const SPEAKER_AUDIENCES: string[] = [
  "Corporate leadership teams",
  "Employee Resource / Network Groups and Women's groups",
  "Early- and mid-career professionals",
  "High-potential employee programs",
  "Sales teams and entrepreneurial groups",
  "Universities and emerging leader cohorts",
];
