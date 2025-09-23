// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE, NAP, MEDIA } from "@/config/site";

export const metadata: Metadata = {
  title: `${SITE.name}｜地域のかかりつけ医`,
  description:
    `${SITE.name}は、地域の皆さまに寄り添う診療を提供します。診療案内、医師紹介、設備、アクセス情報やお問い合わせはこちら。`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="hero-soft-bg rounded-2xl ring-1 ring-gray-100 px-6 py-10 md:px-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-5 motion-fadein">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              地域のかかりつけとして、<br className="hidden sm:block" />
              安心の医療を。
            </h1>
            <p className="text-gray-700 md:text-lg">
              {SITE.name} は、一般外来から慢性疾患のフォロー、予防接種・健診まで、
              日常の不調から継続的なケアまで対応します。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${NAP.telLink}`}
                className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
                data-umami-event="tel_click"
                data-umami-event-location="hero"
              >
                電話する（{NAP.telDisplay}）
              </a>
              <Link href="/contact" className="btn-primary">
                フォームで相談
              </Link>
            </div>
          </div>

          {/* LCP最適化：next/image + priority */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border motion-fadein">
            <Image
              src={MEDIA.ogp ?? "/ogp.jpg"}
              alt={`${SITE.name} の院内イメージ`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 当院が選ばれる理由 */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">当院が選ばれる理由</h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          <li className="card p-5 motion-fadein">
            <h3 className="font-semibold">ていねいな診療</h3>
            <p className="text-sm text-gray-700 mt-1">
              症状や生活背景を伺い、納得のいく説明を心がけます。
            </p>
          </li>
          <li className="card p-5 motion-fadein">
            <h3 className="font-semibold">通いやすい体制</h3>
            <p className="text-sm text-gray-700 mt-1">
              駅徒歩圏・バリアフリー配慮で、はじめての来院も安心です。
            </p>
          </li>
          <li className="card p-5 motion-fadein">
            <h3 className="font-semibold">基本検査に対応</h3>
            <p className="text-sm text-gray-700 mt-1">
              採血・心電図など院内で完結。必要時は連携機関へ紹介します。
            </p>
          </li>
        </ul>
      </section>

      {/* 主要ページ導線（カード） */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">知りたい情報へ</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/services" className="card p-5 motion-fadein">
            <h3 className="font-semibold">診療案内</h3>
            <p className="text-sm text-gray-700 mt-1">
              対応症状・受診の流れ・料金の概要
            </p>
          </Link>
          <Link href="/staff" className="card p-5 motion-fadein">
            <h3 className="font-semibold">医師・スタッフ</h3>
            <p className="text-sm text-gray-700 mt-1">
              医師の経歴やスタッフ体制をご紹介
            </p>
          </Link>
          <Link href="/facility" className="card p-5 motion-fadein">
            <h3 className="font-semibold">設備・院内紹介</h3>
            <p className="text-sm text-gray-700 mt-1">
              院内環境と主要設備について
            </p>
          </Link>
          <Link href="/access" className="card p-5 motion-fadein">
            <h3 className="font-semibold">アクセス・診療時間</h3>
            <p className="text-sm text-gray-700 mt-1">
              住所・地図・曜日別の診療時間
            </p>
          </Link>
        </div>
      </section>

      {/* 最新のお知らせ（まずは最小） */}
      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">最新のお知らせ</h2>
        <p className="text-sm text-gray-700 motion-fadein">
          現在、お知らせは未掲載です。更新は{" "}
          <Link href="/news" className="underline hover:no-underline">
            お知らせ一覧
          </Link>{" "}
          からご確認ください。
        </p>
      </section>

      {/* 最後の行動導線 */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">受診・ご相談はこちら</h2>
        <div className="flex flex-wrap gap-3 motion-fadein">
          <a
            href={`tel:${NAP.telLink}`}
            className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
            data-umami-event="tel_click"
            data-umami-event-location="cta_bottom"
          >
            電話する（{NAP.telDisplay}）
          </a>
          <Link href="/contact" className="btn-primary">
            フォームで相談
          </Link>
        </div>
      </section>
    </main>
  );
}
