import type { Partner } from "@/types/content";

/**
 * Partner / client / engagement logos pulled from Nicole's Drive
 * `Partners/` folder. Names are inferred from the logo files; we don't
 * invent the nature of the relationship. Entries publish only where the
 * logo and partner identity are unambiguous from the source asset.
 */
export const partners: Partner[] = [
  {
    id: "ptr-lehigh-valley-womens-summit",
    title: "Lehigh Valley Women's Summit",
    status: "Published",
    featured: true,
    sort_order: 10,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    name: "Lehigh Valley Women's Summit",
    logo: "/partners/lehigh-valley-womens-summit-logo.png",
    relationship: "2026 Breakout Session Speaker",
  },
  {
    id: "ptr-west-chester-university",
    title: "West Chester University",
    status: "Published",
    featured: false,
    sort_order: 20,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    name: "West Chester University",
    logo: "/partners/west-chester-university-logo.png",
  },
  {
    id: "ptr-realm-jewelry",
    title: "REALM Fine + Fashion Jewelry",
    status: "Published",
    featured: false,
    sort_order: 30,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    name: "REALM Fine + Fashion Jewelry",
    logo: "/partners/realm-logo.png",
  },
  {
    id: "ptr-challenger-gray-christmas",
    title: "Challenger, Gray & Christmas",
    status: "Published",
    featured: false,
    sort_order: 40,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    name: "Challenger, Gray & Christmas",
    logo: "/partners/challenger-gray-christmas-logo.png",
  },
  {
    id: "ptr-mastec-power-delivery-east",
    title: "MasTec Power Delivery — East Region",
    status: "Published",
    featured: false,
    sort_order: 50,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    name: "MasTec Power Delivery — East Region",
    logo: "/partners/mastec-power-delivery-east-region-logo.jpg",
  },
  {
    id: "ptr-northeast-institute",
    title: "Northeast Institute (U.S. Chamber of Commerce IOM)",
    status: "Published",
    featured: false,
    sort_order: 60,
    created_at: "2026-05-16T00:00:00Z",
    updated_at: "2026-05-16T00:00:00Z",
    name: "Northeast Institute — Institute for Organization Management",
    logo: "/partners/northeast-institute-logo.png",
    relationship: "Faculty",
  },
];
