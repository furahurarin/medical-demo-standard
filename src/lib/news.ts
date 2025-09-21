// src/lib/news.ts
export type News = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  body: string;
  tag: "休診" | "予防接種" | "お知らせ";
};

export const NEWS: News[] = [
  {
    slug: "flu-vaccine",
    title: "インフルエンザ予防接種の予約開始",
    date: "2025-09-01",
    body: "在庫に限りがあります。事前にお電話でご確認ください。",
    tag: "予防接種",
  },
  {
    slug: "fever-call",
    title: "発熱・かぜ症状の方へ",
    date: "2025-09-10",
    body: "来院前にお電話でご相談ください。",
    tag: "お知らせ",
  },
  {
    slug: "2025-obon",
    title: "【お盆】8/13–15の診療について",
    date: "2025-07-25",
    body: "8/13–15は午前のみ診療、午後休診となります。",
    tag: "休診",
  },
];

export function getNews(): News[] {
  // 日付降順
  return [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(slug: string): News | null {
  return NEWS.find((n) => n.slug === slug) ?? null;
}
