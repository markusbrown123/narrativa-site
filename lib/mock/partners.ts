import type { Partner } from "@/types/content";

/**
 * Partner / client / engagement logos from Nicole's Drive `Partners/`
 * folder. Nicole asked for every logo to be shown as supplied: the files
 * in public/partners are her originals, trimmed and exported at web size
 * by scripts/prepare-logos.mjs (no recolouring). `logo_width` and
 * `logo_height` are the real pixel sizes; `logo_on_dark` marks logos
 * drawn in white for dark backgrounds, which get a dark tile.
 *
 * No partner links out: the strip and grid are logos only.
 */
export const partners: Partner[] = [
  {
    id: "ptr-lehigh-valley-womens-summit",
    title: "Lehigh Valley Women's Summit",
    status: "Published",
    featured: true,
    sort_order: 10,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-11-23T00:00:00Z",
    name: "Lehigh Valley Women's Summit",
    logo: "/partners/lehigh-valley-womens-summit-logo.webp",
    logo_width: 359,
    logo_height: 160,
    logo_on_dark: true,
    relationship: "2026 Breakout Session Speaker",
  },
  {
    id: "ptr-realm-jewelry",
    title: "REALM Fine + Fashion Jewelry",
    status: "Published",
    featured: true,
    sort_order: 20,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-11-23T00:00:00Z",
    name: "REALM Fine + Fashion Jewelry",
    logo: "/partners/realm-logo.webp",
    logo_width: 285,
    logo_height: 160,
  },
  {
    id: "ptr-west-chester-university",
    title: "West Chester University",
    status: "Published",
    featured: true,
    sort_order: 30,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-11-23T00:00:00Z",
    name: "West Chester University",
    logo: "/partners/west-chester-university-logo.webp",
    logo_width: 233,
    logo_height: 160,
  },
  {
    id: "ptr-challenger-gray-christmas",
    title: "Challenger, Gray & Christmas",
    status: "Published",
    featured: true,
    sort_order: 40,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-11-23T00:00:00Z",
    name: "Challenger, Gray & Christmas",
    logo: "/partners/challenger-gray-christmas-logo.webp",
    logo_width: 416,
    logo_height: 72,
  },
  {
    id: "ptr-mastec-power-delivery-east",
    title: "MasTec Power Delivery — East Region",
    status: "Published",
    featured: true,
    sort_order: 50,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-11-23T00:00:00Z",
    name: "MasTec Power Delivery — East Region",
    logo: "/partners/mastec-power-delivery-east-region-logo.webp",
    logo_width: 480,
    logo_height: 123,
  },
  {
    id: "ptr-northeast-institute",
    title: "Northeast Institute — Institute for Organization Management",
    // Supplied as a social graphic ("I'm teaching at Northeast Institute")
    // rather than a logo; shown as supplied, per "use all of them".
    status: "Published",
    featured: true,
    sort_order: 60,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-11-23T00:00:00Z",
    name: "Northeast Institute — Institute for Organization Management",
    logo: "/partners/northeast-institute-logo.webp",
    logo_width: 128,
    logo_height: 160,
    relationship: "Faculty",
  },
];
