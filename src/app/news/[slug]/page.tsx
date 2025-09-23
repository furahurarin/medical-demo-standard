// src/app/news/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { latestNews } from "@/lib/news";

// 動的メタデータ（対象が無い場合は404タイトル）
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = latestNews.find((n) => n.slug === slug);
  if (!item) return { title: "お知らせ | ページが見つかりません" };
  return {
    title: `${item.title}｜お知らせ｜架空クリニック`,
    description: `${new Date(item.date).toLocaleDateString("ja-JP")}のお知らせです。`,
    alternates: { canonical: `/news/${item.slug}` },
  };
}

export default async function NewsDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const item = latestNews.find((n) => n.slug === slug);
  if (!item) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-sm text-gray-500">
        {new Date(item.date).toLocaleDateString("ja-JP")}
      </div>
      <h1 className="mt-1 text-2xl font-bold">{item.title}</h1>

      {item.body ? (
        <p className="mt-4 text-gray-700 leading-7">{item.body}</p>
      ) : (
        <p className="mt-4 text-gray-700 leading-7">
          詳細本文は準備中です。最新情報は一覧ページをご確認ください。
        </p>
      )}

      <div className="mt-10">
        <Link href="/news" className="text-brand-700 hover:underline">
          お知らせ一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
