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
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">お問い合わせ</h1>
        <p className="text-gray-700">
          受診・予約・各種ご相談は、下記フォームからお送りください。お急ぎの場合は{" "}
          <a href={`tel:${TEL_LINK}`} className="underline hover:no-underline">
            お電話（{TEL_DISPLAY}）
          </a>{" "}
          が確実です。
        </p>
      </header>

      {/* フォーム（クライアントコンポーネント） */}
      <FormClient telDisplay={TEL_DISPLAY} telLink={TEL_LINK} />

      {/* 関連導線 */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">関連ページ</h2>
        <ul className="list-disc pl-6">
          <li>
            <Link href="/access" className="hover:underline">
              アクセス・診療時間
            </Link>
          </li>
          <li>
            <Link href="/news" className="hover:underline">
              お知らせ
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
