import type { MetadataRoute } from "next";

const SITE = "https://narrativaconsulting.com";

/** Every public page. Retired pages (/services, /mentor-program) redirect. */
const PAGES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/book", priority: 0.9 },
  { path: "/speaker", priority: 0.9 },
  { path: "/about", priority: 0.8 },
  { path: "/events", priority: 0.8 },
  { path: "/media", priority: 0.7 },
  { path: "/partners", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: path === "/events" ? "weekly" : "monthly",
    priority,
  }));
}
