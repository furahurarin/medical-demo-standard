// src/lib/news.ts
export type NewsItem = {
  slug: string;     // 日付や任意のスラッグ
  title: string;
  date: string;     // ISO (YYYY-MM-DD)
  body?: string;    // 詳細（ダミー可）
};

export const latestNews: NewsItem[] = [
  {
    slug: "2025-09-15",
    title: "インフルエンザ予防接種のご案内",
    date: "2025-09-15",
    body: "今季のインフルエンザ予防接種を開始しました。詳細・ご予約はお問い合わせください。"
  },
  {
    slug: "2025-08-30",
    title: "9/21(土) 臨時休診のお知らせ",
    date: "2025-08-30",
    body: "院内研修のため、9/21(土)は臨時休診とさせていただきます。ご不便をおかけします。"
  },
  {
    slug: "2025-08-10",
    title: "お盆期間の診療時間について",
    date: "2025-08-10",
    body: "お盆期間中は一部診療時間が変更となります。来院前にあらかじめご確認ください。"
  },
];
