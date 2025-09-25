// src/app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE, NAP } from "@/config/site";

export const metadata: Metadata = {
  title: `${SITE.name}｜地域のかかりつけ医`,
  description: `${SITE.name}は、地域の皆さまに寄り添う診療を提供します。診療案内、医師紹介、設備、アクセス情報やお問い合わせはこちら。`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const CLINIC_NAME = SITE.name;
  const DISPLAY_PHONE = NAP.telDisplay;
  const telHref = `tel:${NAP.telLink}`;

  // ヒーロー写真（ご指定の雰囲気）
  const HERO_IMAGE = "/images/hero/hero-01.webp";

  return (
    <>
      {/* ========== Full-bleed Hero：全面写真＋濃いスクラム＋2CTA（Headerはlayout.tsxで描画） ========== */}
      <section
        id="hero"
        aria-label="メインビジュアル"
        className="relative isolate min-h-[clamp(520px,75vh,760px)]"
      >
        {/* 背景画像（全幅） */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt={`${CLINIC_NAME} の外観写真`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* スクラム（コントラスト担保） */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,40,.78),rgba(8,14,40,.58)_35%,rgba(8,14,40,.30)_70%,rgba(8,14,40,.10))]"
        />

        {/* テキスト＆CTA */}
        <div className="relative z-10 grid place-items-center min-h-[inherit] px-4 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              地域のかかりつけとして、<br className="hidden sm:block" />
              安心の医療を。
            </h1>
            <p className="mt-4 text-white/90 md:text-lg">
              {SITE.name} は、一般外来から慢性疾患のフォロー、予防接種・健診まで、
              日常の不調から継続的なケアまで対応します。
            </p>

            {/* CTA：主（電話）＋ 副（フォーム=白塗り＋黒文字／B案：.btnを強制上書き） */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {/* 主CTA：電話 */}
              <a
                href={telHref}
                className="btn btn-primary h-11 px-5 min-w-[12ch] inline-flex items-center justify-center"
                data-umami-event="lp_phone_click"
                aria-label={`電話する（${DISPLAY_PHONE}）`}
              >
                電話する（{DISPLAY_PHONE}）
              </a>

              {/* 副CTA：フォーム（.btn の既定色を ! で上書き） */}
              <Link
                href="/contact"
                className="btn h-11 px-5 min-w-[12ch] inline-flex items-center justify-center !bg-white !text-gray-900 shadow-sm ring-1 ring-white/80 hover:!bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                data-umami-event="lp_contact_click"
                aria-label="フォームで相談"
              >
                フォームで相談
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 以下は通常幅のコンテンツ（6xl コンテナ） ====== */}
      <main className="mx-auto max-w-6xl px-4 py-12 space-y-16">
        {/* 当院が選ばれる理由 */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">当院が選ばれる理由</h2>
          <ul className="grid gap-6 sm:grid-cols-3">
            <li className="card p-5 motion-fadein">
              <h3 className="font-semibold">ていねいな診療</h3>
              <p className="mt-1 text-sm text-gray-700">
                症状や生活背景を伺い、納得のいく説明を心がけます。
              </p>
            </li>
            <li className="card p-5 motion-fadein">
              <h3 className="font-semibold">通いやすい体制</h3>
              <p className="mt-1 text-sm text-gray-700">
                駅徒歩圏・バリアフリー配慮で、はじめての来院も安心です。
              </p>
            </li>
            <li className="card p-5 motion-fadein">
              <h3 className="font-semibold">基本検査に対応</h3>
              <p className="mt-1 text-sm text-gray-700">
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
              <p className="mt-1 text-sm text-gray-700">対応症状・受診の流れ・料金の概要</p>
            </Link>
            <Link href="/staff" className="card p-5 motion-fadein">
              <h3 className="font-semibold">医師・スタッフ</h3>
              <p className="mt-1 text-sm text-gray-700">医師の経歴やスタッフ体制をご紹介</p>
            </Link>
            <Link href="/facility" className="card p-5 motion-fadein">
              <h3 className="font-semibold">設備・院内紹介</h3>
              <p className="mt-1 text-sm text-gray-700">院内環境と主要設備について</p>
            </Link>
            <Link href="/access" className="card p-5 motion-fadein">
              <h3 className="font-semibold">アクセス・診療時間</h3>
              <p className="mt-1 text-sm text-gray-700">住所・地図・曜日別の診療時間</p>
            </Link>
          </div>
        </section>

        {/* 最新のお知らせ（最小構成） */}
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
              href={telHref}
              className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
              data-umami-event="tel_click"
              data-umami-event-location="cta_bottom"
            >
              電話する（{DISPLAY_PHONE}）
            </a>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center justify-center rounded-lg px-4 py-2"
              data-umami-event="contact_click"
              data-umami-event-location="cta_bottom"
            >
              フォームで相談
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
