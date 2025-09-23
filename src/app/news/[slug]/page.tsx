// src/app/news/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAll, getBySlug, simpleMarkdownToHtml } from "@/lib/news";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAll().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = params;
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
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const item = getBySlug(slug);

  if (!item) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
        <header className="hero-soft-bg rounded-2xl ring-1 ring-gray-100 px-6 py-8 md:px-8 md:py-10 space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold motion-fadein">お知らせが見つかりません</h1>
          <p className="text-gray-700 motion-fadein">
            指定された記事は存在しないか、公開期間が終了しています。
          </p>
        </header>
        <div className="motion-fadein">
          <Link href="/news" className="btn-primary">お知らせ一覧へ戻る</Link>
        </div>
      </main>
    );
  }

  const html = simpleMarkdownToHtml(item.content);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* パンくず */}
      <nav aria-label="breadcrumb" className="text-sm motion-fadein">
        <ol className="flex gap-2 text-gray-600">
          <li><Link href="/" className="hover:underline">トップ</Link></li>
          <li>/</li>
          <li><Link href="/news" className="hover:underline">お知らせ</Link></li>
          <li>/</li>
          <li className="text-gray-900">{item.title}</li>
        </ol>
      </nav>

      {/* 記事本体 */}
      <article className="card p-6 md:p-8 space-y-4 motion-fadein">
        <time className="text-xs text-gray-500">{item.date}</time>
        <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
        {item.summary ? <p className="text-gray-700">{item.summary}</p> : null}
        <div
          className="text-gray-800 leading-7
                     [&>h2]:mt-8 [&>h2]:text-xl [&>h2]:font-semibold
                     [&>h3]:mt-6 [&>h3]:text-lg [&>h3]:font-semibold
                     [&>p]:mt-4
                     [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:pl-6
                     [&>ol]:mt-4 [&>ol]:list-decimal [&>ol]:pl-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {/* 戻る導線 */}
      <div className="motion-fadein">
        <Link href="/news" className="btn-primary">お知らせ一覧へ</Link>
      </div>
    </main>
  );
}
