// src/app/news/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getNewsBySlug } from "@/lib/news";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const item = getNewsBySlug(params.slug);
  if (!item) return { title: "お知らせ｜架空クリニック" };
  return {
    title: `${item.title}｜お知らせ｜架空クリニック`,
    description: item.body.slice(0, 80),
    alternates: { canonical: `/news/${item.slug}` },
  };
}

export default function NewsDetail({ params }: Props) {
  const item = getNewsBySlug(params.slug);
  if (!item) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <span className="mr-2 inline-block rounded-full border px-2 py-0.5 text-xs text-gray-700 bg-gray-50">
          {item.tag}
        </span>
        <p className="text-sm text-gray-500">{item.date}</p>
      </div>
      <h1 className="mt-1 text-3xl font-bold">{item.title}</h1>
      <div className="mt-6 text-gray-800 leading-relaxed">{item.body}</div>

      <div className="mt-8">
        <Link href="/news" className="inline-block text-sm underline hover:no-underline">
          お知らせ一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
