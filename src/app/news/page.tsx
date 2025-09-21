// src/app/news/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "お知らせ｜架空クリニック",
  description: "休診情報、予防接種、各種ご案内など最新のお知らせ。",
  alternates: { canonical: "/news" },
};

export default function NewsIndex() {
  const list = getNews();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">お知らせ</h1>

      <ul className="mt-6 space-y-3">
        {list.map((n) => (
          <li key={n.slug} className="rounded-2xl border bg-white p-4">
            <div className="flex items-center gap-2">
              <span className="mr-2 inline-block rounded-full border px-2 py-0.5 text-xs text-gray-700 bg-gray-50">
                {n.tag}
              </span>
              <p className="text-sm text-gray-500">{n.date}</p>
            </div>
            <Link href={`/news/${n.slug}`} className="font-semibold hover:underline">
              {n.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
