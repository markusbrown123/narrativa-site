import type { Event } from "@/types/content";

/**
 * Only verified Nicole/Narrativa events. Items without confirmed dates,
 * locations, or links are marked Draft so they do not render publicly.
 */
export const events: Event[] = [
  {
    id: "evt-henkels-mccoy-lunch-learn",
    title: "Henkels & McCoy Lunch & Learn",
    status: "Draft",
    featured: false,
    sort_order: 10,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    date: "",
    location: "",
    format: "Workshop",
    audience: "Henkels & McCoy team",
    summary: "Lunch & Learn session with the Henkels & McCoy team.",
    image: "/events/henkels-mccoy-lunch-learn.png",
    is_upcoming: false,
  },
  {
    id: "evt-northeast-institute-teaching",
    title: "Northeast Institute teaching announcement",
    status: "Draft",
    featured: false,
    sort_order: 20,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    date: "",
    location: "",
    format: "Workshop",
    audience: "Northeast Institute",
    summary: "Teaching engagement with the Northeast Institute.",
    image: "/events/northeast-institute-teaching.png",
    is_upcoming: false,
  },
  {
    id: "evt-aneu-kitchens-book-signing",
    title: "ANEU Kitchens book signing",
    status: "Draft",
    featured: false,
    sort_order: 30,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    date: "",
    location: "ANEU Kitchens",
    format: "Book Event",
    audience: "Readers and community",
    summary: "Book signing for Unapologetic at ANEU Kitchens.",
    image: "/events/aneu-book-signing.jpg",
    is_upcoming: true,
  },
  {
    id: "evt-lehigh-valley-womens-summit-2026",
    title: "Lehigh Valley Women's Summit 2026",
    // Date, location, and the speaker role are confirmed on the published
    // summit flyer (Breakout Session Speaker, June 4 at Wind Creek
    // Bethlehem). No public registration link is required from Nicole's
    // side, so this can publish.
    status: "Published",
    featured: true,
    sort_order: 40,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    date: "2026-06-04",
    location: "Wind Creek Bethlehem",
    format: "Keynote",
    audience: "Lehigh Valley Women's Summit attendees",
    summary:
      "Breakout session speaker at the 2026 Lehigh Valley Women's Summit.",
    image: "/events/lehigh-valley-womens-summit.png",
    is_upcoming: true,
  },
];
