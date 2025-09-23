// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "架空クリニック｜地域のかかりつけ医",
  description:
    "架空クリニックは、地域の皆さまに寄り添う診療を提供します。診療案内、医師紹介、設備、アクセス情報やお問い合わせはこちら。",
  alternates: { canonical: "/" },
};

// NAP（layout.tsxと合わせる）
const CLINIC_NAME = "架空クリニック";
const TEL_DISPLAY = "03-1234-5678";
const TEL_LINK = "0312345678";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="grid gap-6 lg:grid-cols-2 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            地域のかかりつけとして、<br className="hidden sm:block" />
            安心の医療を。
          </h1>
          <p className="text-gray-700">
            {CLINIC_NAME} は、一般外来から慢性疾患のフォロー、予防接種・健診まで、
            日常の不調から継続的なケアまで対応します。
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${TEL_LINK}`}
              className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
            >
              電話する（{TEL_DISPLAY}）
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
            >
              フォームで相談
            </Link>
          </div>
        </div>
        <div className="rounded-lg border aspect-video bg-gray-50 grid place-items-center text-gray-500">
          {/* 画像差替え想定：/public/hero.jpg 等 */}
          <span className="text-sm">院内イメージ（差替え可）</span>
        </div>
      </section>

      {/* 当院が選ばれる理由 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">当院が選ばれる理由</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="rounded-lg border p-4">
            <h3 className="font-semibold">ていねいな診療</h3>
            <p className="text-sm text-gray-700 mt-1">
              症状や生活背景を伺い、納得のいく説明を心がけます。
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <h3 className="font-semibold">通いやすい体制</h3>
            <p className="text-sm text-gray-700 mt-1">
              駅徒歩圏・バリアフリー配慮で、はじめての来院も安心です。
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <h3 className="font-semibold">基本検査に対応</h3>
            <p className="text-sm text-gray-700 mt-1">
              採血・心電図など院内で完結。必要時は連携機関へ紹介します。
            </p>
          </li>
        </ul>
      </section>

      {/* 主要ページ導線（カード） */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">知りたい情報へ</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/services" className="rounded-lg border p-4 hover:bg-gray-50">
            <h3 className="font-semibold">診療案内</h3>
            <p className="text-sm text-gray-700 mt-1">
              対応症状・受診の流れ・料金の概要
            </p>
          </Link>
          <Link href="/staff" className="rounded-lg border p-4 hover:bg-gray-50">
            <h3 className="font-semibold">医師・スタッフ</h3>
            <p className="text-sm text-gray-700 mt-1">
              医師の経歴やスタッフ体制をご紹介
            </p>
          </Link>
          <Link href="/facility" className="rounded-lg border p-4 hover:bg-gray-50">
            <h3 className="font-semibold">設備・院内紹介</h3>
            <p className="text-sm text-gray-700 mt-1">
              院内環境と主要設備について
            </p>
          </Link>
          <Link href="/access" className="rounded-lg border p-4 hover:bg-gray-50">
            <h3 className="font-semibold">アクセス・診療時間</h3>
            <p className="text-sm text-gray-700 mt-1">
              住所・地図・曜日別の診療時間
            </p>
          </Link>
        </div>
      </section>

      {/* 最新のお知らせ（まずは最小。次手順でCMS化） */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">最新のお知らせ</h2>
        <p className="text-sm text-gray-700">
          現在、お知らせは未掲載です。更新は{" "}
          <Link href="/news" className="underline hover:no-underline">
            お知らせ一覧
          </Link>{" "}
          からご確認ください。
        </p>
      </section>

      {/* 最後の行動導線 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">受診・ご相談はこちら</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${TEL_LINK}`}
            className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
          >
            電話する（{TEL_DISPLAY}）
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
          >
            フォームで相談
          </Link>
        </div>
      </section>
    </main>
  );
}
