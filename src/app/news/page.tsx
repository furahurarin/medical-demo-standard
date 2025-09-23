// src/app/news/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAll } from "@/lib/news";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "お知らせ一覧｜架空クリニック",
  description: "架空クリニックのお知らせ一覧。休診情報やご案内、最新情報を掲載します。",
  alternates: { canonical: "/news" },
};

export default function NewsIndexPage() {
  const items = getAll();
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">お知らせ</h1>
        <p className="text-gray-700">休診情報・ご案内など、最新のお知らせを掲載しています。</p>
      </header>

      {items.length === 0 ? (
        <p className="text-gray-700">現在、お知らせはありません。</p>
      ) : (
        <ul className="divide-y rounded-lg border">
          {items.map((n) => (
            <li key={n.slug} className="p-4 flex flex-col gap-1">
              <time className="text-xs text-gray-500">{n.date}</time>
              <Link href={`/news/${n.slug}`} className="font-semibold hover:underline">
                {n.title}
              </Link>
              {n.summary ? <p className="text-sm text-gray-700">{n.summary}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
