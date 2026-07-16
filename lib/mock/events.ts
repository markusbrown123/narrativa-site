import type { Event } from "@/types/content";

/**
 * Narrativa events. Items only publish when the flyer clearly confirms
 * date, location, and Nicole's role. The Henkels & McCoy and ANEU
 * Kitchens flyers do not name a year — they are kept Draft until Nicole
 * confirms which calendar year the event ran in.
 */
export const events: Event[] = [
  {
    id: "evt-lehigh-valley-womens-summit-2026",
    title: "Lehigh Valley Women's Summit 2026",
    // Flyer confirms date, venue, and Breakout Session Speaker role.
    status: "Published",
    featured: true,
    sort_order: 10,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    date: "2026-06-04",
    location: "Wind Creek Bethlehem, PA",
    format: "Keynote",
    audience: "Lehigh Valley Women's Summit attendees",
    summary:
      "Breakout session speaker at the 2026 Lehigh Valley Women's Summit.",
    image: "/events/lehigh-valley-womens-summit.png",
    is_upcoming: true,
  },
  {
    id: "evt-henkels-mccoy-lunch-learn",
    title: "Henkels & McCoy — Unapologetic & Audacious Lunch & Learn",
    // Flyer confirms time (March 25, 11:00 am – 1:00 pm), session format
    // (keynote + fireside with Erika Rothenberger), and host (Henkels &
    // McCoy team). The year is not printed on the flyer, so keep Draft
    // until Nicole confirms.
    status: "Draft",
    featured: false,
    sort_order: 20,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    date: "",
    location: "Henkels & McCoy",
    format: "Workshop",
    audience: "Henkels & McCoy team",
    summary:
      "Unapologetic & Audacious: Women Leading Without Limits — keynote by Nicole Stephenson followed by a fireside chat with author Erika Rothenberger.",
    image: "/events/henkels-mccoy-lunch-learn.png",
    is_upcoming: false,
  },
  {
    id: "evt-aneu-kitchens-book-signing",
    title: "ANEU Kitchens — Meet the Author book signing",
    // Flyer confirms time, venue, and event format. Year not printed on
    // the flyer, so keep Draft until Nicole confirms.
    status: "Draft",
    featured: false,
    sort_order: 30,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    date: "",
    location: "ANEU Kitchens — 1556 Lancaster Ave, Paoli, PA",
    format: "Book Event",
    audience: "Readers and the local community",
    summary:
      "In-store signing and meet-and-greet for Unapologetic — books available for purchase in-store.",
    image: "/events/aneu-book-signing.jpg",
    is_upcoming: false,
  },
  {
    id: "evt-northeast-institute-teaching",
    title: "Northeast Institute — Faculty teaching",
    // Promo graphic confirms Nicole is teaching at Northeast Institute,
    // the U.S. Chamber of Commerce Institute for Organization Management.
    // The graphic does not give a date or session detail, so this stays
    // Draft until Nicole confirms.
    status: "Draft",
    featured: false,
    sort_order: 40,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    date: "",
    location: "Northeast Institute — U.S. Chamber of Commerce IOM",
    format: "Workshop",
    audience: "Institute for Organization Management students",
    summary:
      "Faculty teaching session at the Northeast Institute, the U.S. Chamber of Commerce Foundation's Institute for Organization Management.",
    image: "/events/northeast-institute-teaching.png",
    is_upcoming: false,
  },
];
