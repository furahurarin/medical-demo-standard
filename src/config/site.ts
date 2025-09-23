// src/config/site.ts
export const SITE = {
  name: "架空クリニック",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const NAP = {
  address: "東京都千代田区丸の内1-1-1",
  telDisplay: "03-1234-5678",
  telLink: "0312345678",
  mapUrl: "https://maps.google.com/?q=東京都千代田区丸の内1-1-1", // 実運用URLに差し替え推奨
};

export const LINKS = {
  lineUrl: process.env.NEXT_PUBLIC_LINE_URL ?? "https://line.me/",
  sameAs: [] as string[], // 公式SNSやGBPがあれば追加
};

export const MEDIA = {
  ogp: "/ogp.jpg",
  logo: "/icon-512x512.png", // ある場合
};
