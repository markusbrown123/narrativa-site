import type { MetadataRoute } from "next";

const SITE_URL = "https://narrativaconsulting.com";

const ROUTES = [
  "", // home
  "/about",
  "/book",
  "/speaker",
  "/services",
  "/events",
  "/media",
  "/partners",
  "/mentor-program",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" || path === "/events" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
