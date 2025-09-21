// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const isDev = /localhost|127\.0\.0\.1/i.test(base);

  return isDev
    ? {
        rules: [{ userAgent: "*", disallow: "/" }],
        sitemap: `${base}/sitemap.xml`,
        host: base,
      }
    : {
        rules: [{ userAgent: "*", allow: "/" }],
        sitemap: `${base}/sitemap.xml`,
        host: base,
      };
}
