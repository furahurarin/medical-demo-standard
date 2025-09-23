// src/app/news/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { latestNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "お知らせ一覧｜架空クリニック",
  description: "最新のお知らせの一覧ページです。",
  alternates: { canonical: "/news" },
};

export default function NewsIndexPage() {
  // 日付の新しい順に並べ替え（ISO想定）
  const items = [...latestNews].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">お知らせ</h1>

      {items.length === 0 ? (
        <p className="mt-6 text-gray-600">現在、掲載中のお知らせはありません。</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/news/${n.slug}`}
                className="block rounded-xl border border-gray-200 p-4 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                <div className="text-sm text-gray-500">
                  {new Date(n.date).toLocaleDateString("ja-JP")}
                </div>
                <div className="mt-1 font-medium">{n.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        <Link href="/" className="text-brand-700 hover:underline">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
