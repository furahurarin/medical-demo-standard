// src/app/news/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAll, getBySlug, simpleMarkdownToHtml } from "@/lib/news";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAll().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = getBySlug(slug);
  if (!item) {
    return { title: "お知らせ｜架空クリニック" };
  }
  return {
    title: `${item.title}｜お知らせ｜架空クリニック`,
    description: item.summary || `${item.date} のお知らせです。`,
    alternates: { canonical: `/news/${item.slug}` },
  };
}

export default async function NewsDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const item = getBySlug(slug);

  if (!item) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        <h1 className="text-2xl font-bold">お知らせが見つかりません</h1>
        <Link href="/news" className="underline hover:no-underline">
          お知らせ一覧へ
        </Link>
      </main>
    );
  }

  const html = simpleMarkdownToHtml(item.content);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <nav aria-label="breadcrumb" className="text-sm">
        <ol className="flex gap-2 text-gray-600">
          <li><Link href="/" className="hover:underline">トップ</Link></li>
          <li>/</li>
          <li><Link href="/news" className="hover:underline">お知らせ</Link></li>
          <li>/</li>
          <li className="text-gray-900">{item.title}</li>
        </ol>
      </nav>

      <article className="space-y-3">
        <time className="text-xs text-gray-500">{item.date}</time>
        <h1 className="text-3xl font-bold">{item.title}</h1>
        {item.summary ? <p className="text-gray-700">{item.summary}</p> : null}
        <div
          className="text-gray-800 leading-7"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <div>
        <Link href="/news" className="underline hover:no-underline">
          お知らせ一覧へ
        </Link>
      </div>
    </main>
  );
}
