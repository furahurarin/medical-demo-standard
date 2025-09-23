// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { getAll } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  // 静的ページ
  const staticPaths = [
    "/",
    "/services",
    "/staff",
    "/facility",
    "/access",
    "/contact",
    "/news",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p, i) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: i === 0 ? 1 : 0.7, // トップを優先度高めに
  }));

  // お知らせ詳細（ファイルベースCMSを想定）
  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    newsEntries = getAll().map((n) => ({
      url: `${base}/news/${n.slug}`,
      lastModified: n.date ? new Date(n.date) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // CMS未準備でもビルドを通す
    newsEntries = [];
  }

  return [...staticEntries, ...newsEntries];
}
