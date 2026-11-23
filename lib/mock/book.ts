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
export const AMAZON_BOOK_URL = "https://www.amazon.com/dp/B0GP3RZ4SR";

export const BARNES_AND_NOBLE_BOOK_URL =
  "https://www.barnesandnoble.com/w/unapologetic-nicole-stephenson/1150349544?ean=9798987476093";

export const book: Book = {
  id: "book-unapologetic",
  title: "Unapologetic",
  status: "Published",
  featured: true,
  sort_order: 1,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-11-23T00:00:00Z",
  subtitle: "Boldly Lead the Life and Career You Deserve",
  tagline:
    "A roadmap to authenticity, courage, and sustainable personal and professional development and growth.",
  // Nicole's approved description, word for word. Blank lines separate
  // paragraphs; lines starting "- " are list items (components/RichText.tsx).
  description: "What if fitting in has been the thing holding you back all along?\n\nIf you're a woman who works hard, cares deeply, and still can't seem to get the recognition or advancement you deserve - this book was written for you.\n\nUNAPOLOGETIC: Boldly Lead the Life and Career You Deserve is for the woman who is done shrinking.\n\nDrawing on decades of experience guiding professionals at pivotal crossroads, Nicole Stephenson delivers a practical, affirming roadmap for building a career that feels aligned, intentional, and authentically yours. Through relatable stories, honest reflection, and actionable tools, you'll discover that the very thing you've been taught to hide - who you really are - is your greatest career asset.\n\nIn this book, you'll learn how to:\n\n- Reclaim your confidence and stop second-guessing yourself\n- Break free from people-pleasing without burning bridges\n- Identify your true strengths and advocate for what you deserve\n- Navigate self-doubt, burnout, and the fear of being \"too much\"\n- Redefine success on your own terms — and actually go get it\n\nWhether you're entering the workforce, chasing a promotion, or questioning everything about what's next, this book meets you exactly where you are.\n\nUnapologetic isn't just a career guide. It's an invitation to stop apologizing for who you are and start leading from it.\n\nStop shrinking. Stop apologizing. Start leading.",
  publisher: "Tender Fire Books",
  release_date: "2026-03-01",
  cover_image: "/book/unapologetic-front-cover.jpg",
  praise: [],
  purchase_links: [
    { label: "Order on Amazon", url: AMAZON_BOOK_URL },
    { label: "Barnes & Noble", url: BARNES_AND_NOBLE_BOOK_URL },
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
