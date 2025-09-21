// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const site = raw.replace(/\/+$/, "");
  const isLocal = site.includes("localhost") || site.includes("127.0.0.1");

  return isLocal
    ? {
        // ローカル環境：noindex（クローラ遮断）
        rules: {
          userAgent: "*",
          disallow: "/",
        },
      }
    : {
        // 本番環境：index許可 + sitemap/host 提供
        rules: {
          userAgent: "*",
          allow: "/",
        },
        sitemap: `${site}/sitemap.xml`,
        host: site,
      };
}
