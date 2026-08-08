import type { MetadataRoute } from "next";
import { getAllTopicParams } from "@/lib/content";

const SITE_URL = "https://twolang-lab.pages.dev";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/compare`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/map`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const topicRoutes: MetadataRoute.Sitemap = getAllTopicParams().map(({ lang, slug }) => ({
    url: `${SITE_URL}/${lang}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...topicRoutes];
}
