// src/app/contact/thanks/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "送信完了｜お問い合わせ｜架空クリニック",
  description: "お問い合わせの送信が完了しました。内容を確認し、折り返しご連絡いたします。",
  alternates: { canonical: "/contact/thanks" },
};

export default function ContactThanksPage() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-6 text-center">
      <div className="max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold">送信が完了しました</h1>
        <p className="mt-3 text-gray-700 leading-7">
          お問い合わせありがとうございます。内容を確認のうえ、折り返しご連絡いたします。<br />
          受付時間外にいただいた場合は、翌診療日以降の対応となることがあります。
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/" className="rounded-xl bg-brand-700 text-white px-5 py-3 font-semibold hover:bg-brand-800">
            トップへ戻る
          </Link>
          <Link href="/access" className="rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50">
            アクセスを見る
          </Link>
        </div>
      </div>
    </main>
  );
}
