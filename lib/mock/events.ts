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
    // June 4, 2026 event has passed — archived at Nicole's request.
    status: "Archived",
    featured: false,
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
    title: "Faculty — Institute for Organization Management (IOM)",
    // Nicole is on faculty at the Northeast Institute (U.S. Chamber of
    // Commerce Foundation's IOM), July 26–30 at Villanova University.
    // Private event — no registration link; the URL points to the
    // program's informational "About IOM" page.
    status: "Published",
    featured: true,
    sort_order: 40,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-07-16T00:00:00Z",
    date: "2026-07-26",
    end_date: "2026-07-30",
    location: "Villanova University, Villanova, PA",
    format: "Workshop",
    audience: "Institute for Organization Management students",
    summary:
      "Nicole serves on faculty at the Northeast Institute — the U.S. Chamber of Commerce Foundation's Institute for Organization Management (IOM), July 26–30 at Villanova University. This is a private event.",
    url: "https://www.uschamber.com/program/institute-for-organization-management/about-iom",
    cta_label: "About the Institute",
    image: "/events/northeast-institute-teaching.png",
    is_upcoming: true,
  },
  {
    id: "evt-realm-fine-fashion-jewelry-2026",
    title: "REALM Fine + Fashion Jewelry",
    // By-invitation-only event — no public registration link.
    status: "Published",
    featured: false,
    sort_order: 50,
    created_at: "2026-07-16T00:00:00Z",
    updated_at: "2026-07-16T00:00:00Z",
    date: "2026-09-22",
    location: "By invitation only",
    format: "Book Event",
    audience: "REALM Fine + Fashion Jewelry guests",
    summary:
      "A private REALM Fine + Fashion Jewelry event. By invitation only — email Nicole at nicole@narrativaconsulting.com if you're interested.",
    is_upcoming: true,
  },
  {
    id: "evt-second-time-books-2026",
    title: "Book Signing — Second Time Books",
    status: "Published",
    featured: false,
    sort_order: 60,
    created_at: "2026-07-16T00:00:00Z",
    updated_at: "2026-07-16T00:00:00Z",
    date: "2026-09-26",
    location: "Second Time Books, 114 Creek Rd, Mount Laurel, NJ 08054",
    format: "Book Event",
    audience: "Readers and the local community",
    summary:
      "Meet Nicole and pick up a copy of Unapologetic at Second Time Books, 10:00 am – 3:00 pm.",
    url: "https://secondtimebooksonline.com",
    cta_label: "Visit Second Time Books",
    is_upcoming: true,
  },
];
