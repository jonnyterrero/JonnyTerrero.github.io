import type { MetadataRoute } from "next";

import { BRAND } from "@/lib/brand";
import { getAllSlugs } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "heartwire", "engineering", "research", "systems", "work", "about", "resume", "writing"];
  return [
    ...pages.map((p) => ({ url: `${BRAND.siteUrl}/${p ? `${p}/` : ""}` })),
    ...getAllSlugs().map((slug) => ({ url: `${BRAND.siteUrl}/projects/${slug}/` })),
  ];
}
