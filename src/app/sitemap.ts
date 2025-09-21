// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { NEWS } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPaths: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/services`, lastModified: new Date() },
    { url: `${base}/doctor`, lastModified: new Date() },
    { url: `${base}/facilities`, lastModified: new Date() },
    { url: `${base}/news`, lastModified: new Date() },
    { url: `${base}/access-hours`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    { url: `${base}/legal/privacy`, lastModified: new Date() }, // ★追加
    { url: `${base}/legal/tokusho`, lastModified: new Date() }, // ★追加
  ];

  const newsPaths: MetadataRoute.Sitemap = NEWS.map((n) => ({
    url: `${base}/news/${n.slug}`,
    lastModified: new Date(n.date),
  }));

  return [...staticPaths, ...newsPaths];
}
