// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import FormClient from "./FormClient";

export const metadata: Metadata = {
  title: "お問い合わせ｜架空クリニック",
  description:
    "受診・予約・各種ご相談はこちらのフォームからお問い合わせください。お急ぎの方はお電話をご利用ください。",
  alternates: { canonical: "/contact" },
};

// NAP（layout.tsxと合わせる）
const TEL_DISPLAY = "03-1234-5678";
const TEL_LINK = "0312345678";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      {/* ヘッダー */}
      <header className="hero-soft-bg rounded-2xl ring-1 ring-gray-100 px-6 py-8 md:px-8 md:py-10 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold motion-fadein">お問い合わせ</h1>
        <p className="text-gray-700 motion-fadein">
          受診・予約・各種ご相談は、下記フォームからお送りください。お急ぎの場合は{" "}
          <a href={`tel:${TEL_LINK}`} className="underline hover:no-underline">
            お電話（{TEL_DISPLAY}）
          </a>{" "}
          が確実です。
        </p>
      </header>

      {/* フォーム（カード＋モーション） */}
      <section className="motion-fadein">
        <div className="card p-6 md:p-8">
          <FormClient telDisplay={TEL_DISPLAY} telLink={TEL_LINK} />
        </div>
      </section>

      {/* 関連導線 */}
      <section className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold motion-fadein">関連ページ</h2>
        <div className="flex flex-wrap gap-3 motion-fadein">
          <Link href="/access" className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50">
            アクセス・診療時間
          </Link>
          <Link href="/news" className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50">
            お知らせ
          </Link>
          <a href={`tel:${TEL_LINK}`} className="btn-primary">
            電話する（{TEL_DISPLAY}）
          </a>
        </div>
      </section>
    </main>
  );
}
