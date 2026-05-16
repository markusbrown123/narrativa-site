import type { Recognition } from "@/types/content";

/**
 * Verified Nicole Stephenson recognition. Only awards confirmed in
 * Nicole's bio docs (and supported by the Drive assets) are Published.
 * The Influential Women badge is kept Draft until the awarding
 * organization and year are confirmed.
 */
export const recognition: Recognition[] = [
  {
    id: "rec-main-line-today-power-women-2024",
    title: "Main Line Today — 2024 Power Women",
    status: "Published",
    featured: true,
    sort_order: 10,
    created_at: "2024-10-23T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    organization: "Main Line Today Magazine",
    award: "Power Women, 2024",
    year: 2024,
    summary:
      "Named one of Main Line Today Magazine's 2024 Power Women — celebrated at the Power Women Summit on October 23, 2024.",
    image: "/recognition/main-line-today-power-women-social.jpg",
  },
  {
    id: "rec-delaware-county-womens-commission-2022",
    title:
      "Delaware County Women's Commission — Woman's Achievement Award",
    status: "Published",
    featured: true,
    sort_order: 20,
    created_at: "2022-02-11T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    organization: "Delaware County Women's Commission",
    award: "Woman's Achievement Award",
    year: 2022,
    summary:
      "Honored as a 2022 Woman's Achievement Award recipient — recognized for advancing healing and hope across Delaware County.",
    image: "/recognition/delaware-county-womens-achievement-letter.jpg",
  },
  {
    id: "rec-lock-haven-rebecca-gross-2019",
    title: "Lock Haven University — Rebecca Gross Young Alumni Award",
    status: "Published",
    featured: true,
    sort_order: 30,
    created_at: "2019-05-20T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    organization: "Lock Haven University",
    award: "Rebecca Gross Young Alumni Award",
    year: 2019,
    url: "https://www.lockhaven.edu/News/Rebecca_Gross_05.20.2019.html",
    summary:
      "Awarded the Rebecca Gross Young Alumni Award by Lock Haven University for distinguished early-career achievement.",
  },
  {
    id: "rec-sigma-kappa-35-under-35",
    title: "Sigma Kappa Sorority — 35 Under 35 Award",
    // The award is confirmed in Nicole's bio; the calendar year is not
    // recorded in the source material, so we publish without a year and
    // let the recognition card omit it.
    status: "Published",
    featured: true,
    sort_order: 40,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    organization: "Sigma Kappa Sorority",
    award: "35 Under 35 Award",
    year: 0,
    summary:
      "Recognized with Sigma Kappa Sorority's 35 Under 35 Award for early-career impact and leadership.",
  },
  {
    id: "rec-iom-graduation",
    title:
      "U.S. Chamber of Commerce — Institute for Organization Management (IOM)",
    // Completion of the IOM program is a credential, not an award.
    // We keep this Draft so it does not display next to the four
    // confirmed honors, but the record and photo are preserved.
    status: "Draft",
    featured: false,
    sort_order: 50,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    organization: "U.S. Chamber of Commerce Foundation",
    award: "Institute for Organization Management (IOM) graduate",
    year: 0,
    summary:
      "Completed the Institute for Organization Management — the U.S. Chamber of Commerce Foundation's four-year nonprofit leadership program.",
    image: "/recognition/iom-graduation.jpg",
  },
  {
    id: "rec-influential-women",
    title: "Influential Women recognition",
    // Kept Draft until the awarding organization and year are confirmed.
    status: "Draft",
    featured: false,
    sort_order: 60,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    organization: "Influential Women",
    award: "Influential Women recognition",
    year: 0,
    image: "/recognition/influential-women-headshot.png",
  },
];
