// src/app/news/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAll } from "@/lib/news";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "お知らせ一覧｜架空クリニック",
  description:
    "架空クリニックのお知らせ一覧。休診情報やご案内、最新情報を掲載します。",
  alternates: { canonical: "/news" },
};

export default function NewsIndexPage() {
  const items = getAll();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* ヘッダー */}
      <header className="hero-soft-bg rounded-2xl ring-1 ring-gray-100 px-6 py-8 md:px-8 md:py-10 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold motion-fadein">お知らせ</h1>
        <p className="text-gray-700 motion-fadein">
          休診情報・ご案内など、最新のお知らせを掲載しています。
        </p>
      </header>

      {/* 一覧 */}
      {items.length === 0 ? (
        <section className="motion-fadein">
          <div className="card p-6">
            <p className="text-gray-700">現在、お知らせはありません。</p>
          </div>
        </section>
      ) : (
        <section className="motion-fadein">
          <div className="card p-0">
            <ul className="divide-y">
              {items.map((n) => (
                <li key={n.slug} className="group">
                  <Link
                    href={`/news/${n.slug}`}
                    className="block p-4 md:p-5 transition-transform duration-150 group-hover:translate-x-0.5"
                  >
                    <time className="text-xs text-gray-500">{n.date}</time>
                    <h2 className="mt-1 font-semibold">{n.title}</h2>
                    {n.summary ? (
                      <p className="mt-1 text-sm text-gray-700">{n.summary}</p>
                    ) : null}
                    <span className="sr-only">記事を読む</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
