import type { Book } from "@/types/content";

/**
 * Verified details for Unapologetic. The publisher and release date are
 * taken from Nicole's "Announcement.docx" (Tender Fire Books, March
 * 2026). The book cover, back-cover description, ISBN, and price are
 * taken from the printed back cover. The Amazon purchase link is the
 * confirmed Unapologetic listing on Amazon. Praise quotes and other
 * retailer links are intentionally left empty until Nicole shares them
 * — we do not invent testimonials or purchase links.
 */
export const AMAZON_BOOK_URL =
  "https://www.amazon.com/UNAPOLOGETIC-Boldly-Lead-Career-Deserve/dp/B0GP3RZ4SR";

export const book: Book = {
  id: "book-unapologetic",
  title: "Unapologetic",
  status: "Published",
  featured: true,
  sort_order: 1,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-05-16T00:00:00Z",
  subtitle: "Boldly Lead the Life and Career You Deserve",
  tagline:
    "A roadmap to authenticity, courage, and sustainable personal and professional development and growth.",
  description:
    "Drawing on her own transformative journey and decades of experience guiding professionals at pivotal crossroads, Nicole Stephenson delivers a practical, affirming roadmap for building a career and life that feel aligned, intentional, and sustainable. Through relatable stories, reflective insights, and actionable tools, you'll learn how to reclaim your confidence, identify your true strengths, and redefine success on your own terms.",
  publisher: "Tender Fire Books",
  release_date: "2026-03-01",
  cover_image: "/book/unapologetic-front-cover.jpg",
  praise: [],
  purchase_links: [
    { label: "Order on Amazon", url: AMAZON_BOOK_URL },
  ],
  excerpts: [
    {
      heading: "What if the very thing you've been taught to hide…",
      body: "Too many people are taught that success requires fitting in, staying quiet, and becoming someone else. Unapologetic challenges that narrative and reframes authenticity as a career strategy.",
    },
    {
      heading: "Meets you where you are.",
      body: "Whether you're entering the workforce, negotiating your value, pursuing a promotion, or questioning what's next — you'll learn how to navigate self-doubt, people-pleasing, burnout, and the fear of being \"too much\" or \"not enough,\" while developing the clarity and courage to advocate for what you want.",
    },
    {
      heading: "Stop apologizing. Start trusting yourself.",
      body: "Unapologetic is an invitation to stop shrinking, stop apologizing, and start trusting yourself. Because when you lead from who you truly are, success stops feeling like something you chase and starts feeling like something you create.",
    },
  ],
};
