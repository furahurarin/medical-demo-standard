// src/app/legal/tokusho/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記｜架空クリニック",
  description: "当院の役務提供に関する表示です（本サイトはデモです）。",
  alternates: { canonical: "/legal/tokusho" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const CLINIC = {
  name: "架空クリニック",
  address: "東京都千代田区丸の内1-1-1",
  phone: "03-1234-5678",
  email: "info@example.jp",
  rep: "山田 太郎",
};

export default function TokushoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">特定商取引法に基づく表記</h1>
      <p className="mt-2 text-sm text-gray-500">本ページはデモ用の記載です。実在の取引は行っていません。</p>

      <dl className="mt-6 divide-y border rounded-2xl bg-white">
        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">事業者名</dt>
          <dd className="md:col-span-2">{CLINIC.name}</dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">代表者</dt>
          <dd className="md:col-span-2">{CLINIC.rep}</dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">所在地</dt>
          <dd className="md:col-span-2">{CLINIC.address}</dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">電話番号</dt>
          <dd className="md:col-span-2">
            <a href="tel:0312345678" className="underline">{CLINIC.phone}</a>（デモ表示）
          </dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">メールアドレス</dt>
          <dd className="md:col-span-2">
            <a href="mailto:info@example.jp" className="underline">{CLINIC.email}</a>（デモ表示）
          </dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">販売URL</dt>
          <dd className="md:col-span-2">{SITE_URL}</dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">役務の内容</dt>
          <dd className="md:col-span-2">
            医療役務（保険診療・自費診療）。具体的内容は診療案内をご覧ください。
          </dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">役務の対価</dt>
          <dd className="md:col-span-2">
            保険診療は各種保険点数に基づき算出します。自費診療・証明書等は内容により異なります（来院時にご案内）。
          </dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">支払方法</dt>
          <dd className="md:col-span-2">
            現金。クレジットカード・電子マネー等の取扱い有無は院内掲示に準じます。
          </dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">役務の提供時期</dt>
          <dd className="md:col-span-2">受診当日（予約制の検査等は別途ご案内）</dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">追加手数料等</dt>
          <dd className="md:col-span-2">
            診断書等の発行手数料、自由診療に係る費用、院外処方の薬剤費、通信費（お問い合わせ時の通信料等）はお客様負担です。
          </dd>
        </div>

        <div className="px-4 py-3 grid md:grid-cols-3 gap-3">
          <dt className="font-medium">返品・キャンセル</dt>
          <dd className="md:col-span-2">
            医療役務の性質上、提供後の返金は原則不可です。予約の変更・キャンセルは事前にお電話でご連絡ください。
          </dd>
        </div>
      </dl>

      <div className="mt-10">
        <Link href="/" className="underline text-sm">トップへ戻る</Link>
      </div>
    </main>
  );
}
