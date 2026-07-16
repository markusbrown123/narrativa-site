import type { Press } from "@/types/content";

/**
 * Verified Nicole/Narrativa press. URLs are taken directly from the
 * Press Clips source Nicole provided. Headlines reflect the article
 * subjects — when an outlet doesn't expose a confirmable headline, the
 * record summarizes the coverage instead.
 */
export const press: Press[] = [
  {
    id: "press-main-line-media-news-2019",
    title:
      "Society of Professional Women offers opportunities to grow professionally and personally",
    status: "Published",
    featured: true,
    sort_order: 10,
    created_at: "2019-01-07T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    outlet: "Main Line Media News",
    headline:
      "Society of Professional Women offers opportunities to grow professionally, personally",
    published_at: "2019-01-07",
    url: "https://www.mainlinemedianews.com/2019/01/07/society-of-professional-women-offers-opportunities-to-grow-professionally-personally/",
    summary:
      "Feature on the Society of Professional Women and the programming Nicole built as its Executive Director at the Main Line Chamber of Commerce.",
    kind: "Feature",
  },
  {
    id: "press-montco-today-2019",
    title:
      "City Ave District presents free Lunch & Learn event",
    status: "Published",
    featured: false,
    sort_order: 20,
    created_at: "2019-03-01T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    outlet: "MONTCO.Today",
    headline: "City Ave District presents free Lunch & Learn event",
    published_at: "2019-03-01",
    url: "https://montco.today/2019/03/city-ave-district-presents-free-lunch-learn-event/",
    summary:
      "MONTCO.Today coverage of a City Ave District Lunch & Learn featuring Nicole and the Society of Professional Women.",
    kind: "Mention",
  },
  {
    id: "press-lock-haven-rebecca-gross-2019",
    title:
      "Lock Haven University — Rebecca Gross Young Alumni Award",
    // Source URL returns 404 — archived until a working link is confirmed.
    status: "Archived",
    featured: true,
    sort_order: 30,
    created_at: "2019-05-20T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    outlet: "Lock Haven University",
    headline:
      "Nicole Stephenson receives Lock Haven's Rebecca Gross Young Alumni Award",
    published_at: "2019-05-20",
    url: "https://www.lockhaven.edu/News/Rebecca_Gross_05.20.2019.html",
    summary:
      "Lock Haven University announces Nicole as the recipient of the Rebecca Gross Young Alumni Award.",
    kind: "Profile",
  },
  {
    id: "press-drexel-vision-forward-2018",
    title: "Drexel VisionForward profile — Nicole Stephenson",
    // Source URL returns 404 — archived until a working link is confirmed.
    status: "Archived",
    featured: false,
    sort_order: 40,
    created_at: "2018-03-01T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    outlet: "Drexel University — VisionForward",
    headline: "Nicole Stephenson",
    published_at: "2018-03-01",
    url: "https://drexel.edu/visionforward/news/blog/2018/March/nicole%20stephenson/",
    summary:
      "A Drexel VisionForward profile spotlighting Nicole's leadership work in Greater Philadelphia.",
    kind: "Profile",
  },
  {
    id: "press-forge-wealth-women-and-wealth",
    title: "Forge Wealth — Women & Wealth featuring Nicole Stephenson",
    // Source URL returns 404 — archived; the Women & Wealth conversation
    // now lives on the Media page as the working YouTube video.
    status: "Archived",
    featured: false,
    sort_order: 50,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    outlet: "Forge Wealth",
    headline:
      "Women & Wealth: Nicole Stephenson, Director of the Society of Professional Women",
    published_at: "",
    url: "https://www.forgewealth.com/women-wealth-nicole-stephenson-director-of-the-society-of-professional-women-mlcc",
    summary:
      "Forge Wealth's Women & Wealth feature with Nicole — published alongside the podcast episode.",
    kind: "Feature",
  },
  {
    id: "press-mainline-tonight-summer-job",
    title: "Main Line Tonight — My Summer Job: Nicole Stephenson",
    status: "Published",
    featured: true,
    sort_order: 5,
    created_at: "2024-08-01T00:00:00Z",
    updated_at: "2026-07-16T00:00:00Z",
    outlet: "Main Line Tonight",
    headline: "My Summer Job: Nicole Stephenson",
    published_at: "2024-08-01",
    url: "https://mainlinetonight.com/my-summer-job-nicole-stephenson/",
    summary:
      "Main Line Tonight profiles Nicole Stephenson in its My Summer Job feature.",
    kind: "Profile",
  },
  {
    id: "press-mainline-today-power-women",
    title: "Main Line Today — Power Women of the Western Suburbs",
    status: "Published",
    featured: true,
    sort_order: 6,
    created_at: "2024-11-01T00:00:00Z",
    updated_at: "2026-07-16T00:00:00Z",
    outlet: "Main Line Today",
    headline: "Power Women of the Western Suburbs",
    published_at: "2024-11-01",
    url: "https://mainlinetoday.com/life-style/power-women-western-suburbs/",
    summary:
      "Nicole Stephenson is featured among Main Line Today's Power Women of the Western Suburbs.",
    kind: "Feature",
  },
  {
    id: "press-mainline-media-news-iom-2024",
    title:
      "Main Line Media News — Nicole Stephenson graduates from Institute for Organization Management",
    status: "Published",
    featured: false,
    sort_order: 7,
    created_at: "2024-08-15T00:00:00Z",
    updated_at: "2026-07-16T00:00:00Z",
    outlet: "Main Line Media News",
    headline:
      "Nicole Stephenson of the Main Line Chamber of Commerce graduates from Institute for Organization Management",
    published_at: "2024-08-15",
    url: "https://www.mainlinemedianews.com/2024/08/15/nicole-stephenson-of-the-main-line-chamber-of-commerce-graduates-from-institute-for-organization-management/",
    summary:
      "Main Line Media News reports on Nicole's graduation from the U.S. Chamber of Commerce Foundation's Institute for Organization Management (IOM).",
    kind: "Feature",
  },
];
