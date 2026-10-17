import type { MetadataRoute } from "next";
import { news, projects } from "@/lib/content";
import { SITE_URL } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/news", "/learn", "/team", "/about", "/join"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...news.map((p) => ({ url: `${SITE_URL}/news/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
