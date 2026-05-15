import type { Book } from "@/types/content";

export const book: Book = {
  id: "book-unapologetic",
  title: "Unapologetic",
  status: "Published",
  featured: true,
  sort_order: 1,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-05-01T00:00:00Z",
  subtitle: "Boldly Lead the Life and Career You Deserve",
  tagline:
    "A field guide for the leader who is done shrinking, hedging, or asking for permission.",
  description:
    "Unapologetic is a roadmap for the moment when polite ambition stops working. Drawing on a decade of work with executives, founders, and rising leaders, Nicole Stephenson shows how to trade approval-seeking for authority — without losing the warmth that got you here. It's part manifesto, part workbook, and part dare.",
  publisher: "Forthcoming, Fall 2026",
  release_date: "2026-09-10T00:00:00Z",
  cover_image: "/images/unapologetic-cover.svg",
  praise: [
    {
      quote:
        "A rare book that tells the truth about ambition without flattening the human underneath it.",
      attribution: "Adam Grant, Wharton, author of Think Again",
    },
    {
      quote:
        "Nicole doesn't teach you to be louder. She teaches you to be unmistakable.",
      attribution: "Lisa Bilyeu, co-founder, Impact Theory",
    },
    {
      quote:
        "I have handed this manuscript to every executive I coach. It changes the room.",
      attribution: "Dr. Rasmus Hougaard, founder, Potential Project",
    },
  ],
  purchase_links: [
    { label: "Bookshop", url: "https://example.com/bookshop" },
    { label: "Amazon", url: "https://example.com/amazon" },
    { label: "Barnes & Noble", url: "https://example.com/bn" },
    { label: "Indie bookstores", url: "https://example.com/indies" },
  ],
  excerpts: [
    {
      heading: "On the apology habit",
      body: "Most of us were trained that softening was safety. We learned to say sorry before the sentence, to caveat before the ask, to apologize for the room we were standing in. This book is what happens when you stop.",
    },
    {
      heading: "On narrative authority",
      body: "Authority is not a louder voice. It is a story you can be trusted to tell the same way twice — in front of the board, in front of the team, in front of yourself at 6 a.m.",
    },
  ],
};
