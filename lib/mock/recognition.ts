import type { Recognition } from "@/types/content";

/**
 * Only verified Nicole Stephenson recognition. No fabricated awards
 * or list placements.
 */
export const recognition: Recognition[] = [
  {
    id: "rec-main-line-today-power-women-2024",
    title: "Main Line Today — Power Women, 2024",
    status: "Published",
    featured: true,
    sort_order: 10,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    organization: "Main Line Today Magazine",
    award: "Power Women, 2024",
    year: 2024,
  },
  {
    id: "rec-delco-womens-commission",
    title: "Delaware County Women's Commission — Woman's Achievement Award",
    status: "Published",
    featured: true,
    sort_order: 20,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    organization: "Delaware County Women's Commission",
    award: "Woman's Achievement Award",
    year: 2024,
  },
  {
    id: "rec-lock-haven-rebecca-gross",
    title: "Lock Haven University — Rebecca Gross Alumni Award",
    status: "Published",
    featured: true,
    sort_order: 30,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    organization: "Lock Haven University",
    award: "Rebecca Gross Alumni Award",
    year: 2024,
  },
  {
    id: "rec-sigma-kappa-35-under-35",
    title: "Sigma Kappa Sorority — 35 Under 35",
    status: "Published",
    featured: true,
    sort_order: 40,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    organization: "Sigma Kappa Sorority",
    award: "35 Under 35 Award",
    year: 2024,
  },
  {
    id: "rec-influential-women",
    title: "Influential Women recognition",
    // Kept as Draft until the awarding organization and year are confirmed —
    // we have the graphic but not the citation.
    status: "Draft",
    featured: false,
    sort_order: 50,
    created_at: "2026-05-15T00:00:00Z",
    updated_at: "2026-05-15T00:00:00Z",
    organization: "Influential Women",
    award: "Influential Women recognition",
    year: 0,
    image: "/recognition/influential-women-headshot.png",
  },
];
