import type { MetadataRoute } from "next";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/works",
  "/location",
  "/contact",
  "/privacy",
];

/** TODO(M6): append `/works/[id]` entries from D1 (published works only). */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
