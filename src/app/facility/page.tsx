// src/app/facility/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "設備・院内紹介｜架空クリニック",
  description:
    "清潔で安心して通院できる院内環境と、診療に必要な設備・機器の概要をご紹介します。",
  alternates: { canonical: "/facility" },
};

export default function FacilityPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* ページヘッダー */}
      <header className="hero-soft-bg rounded-2xl ring-1 ring-gray-100 px-6 py-10 md:px-8 md:py-12 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold motion-fadein">設備・院内紹介</h1>
        <p className="text-gray-700 motion-fadein">
          清潔で安心して通院いただける院内環境づくりに努めています。主要な設備と取組みをご紹介します。
        </p>
      </header>

      {/* キービジュアル（差し替え可） */}
      <section className="motion-fadein">
        <div className="photo-wrap aspect-[16/9] bg-gray-50 border grid place-items-center text-gray-500">
          <span className="text-sm">院内イメージ（/public/images/facility-hero.jpg 等に差替え）</span>
        </div>
      </section>

      {/* 設備の一覧 */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">主な設備</h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          <li className="card p-5 motion-fadein">
            <h3 className="font-semibold">診察室</h3>
            <p className="text-sm text-gray-700 mt-1">
              プライバシーに配慮した個室設計で、症状を丁寧に伺います。
            </p>
          </li>
          <li className="card p-5 motion-fadein">
            <h3 className="font-semibold">処置室</h3>
            <p className="text-sm text-gray-700 mt-1">
              ベッドスペースを確保し、迅速な処置が可能な体制です。
            </p>
          </li>
          <li className="card p-5 motion-fadein">
            <h3 className="font-semibold">検査機器</h3>
            <p className="text-sm text-gray-700 mt-1">
              必要に応じて血液・生化学などの基本検査に対応します。
            </p>
          </li>
          <li className="card p-5 motion-fadein">
            <h3 className="font-semibold">待合・受付</h3>
            <p className="text-sm text-gray-700 mt-1">
              段差配慮・座席間隔の確保など、快適にお待ちいただけます。
            </p>
          </li>
        </ul>
      </section>

      {/* 衛生管理・院内環境 */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">衛生管理と院内環境</h2>
        <div className="card p-5 space-y-3 motion-fadein">
          <p className="text-gray-700">
            手指消毒・機器ごとの清拭など、標準予防策に基づいた衛生管理を徹底しています。
            換気や清掃の頻度を高め、安心して受診いただける環境を維持しています。
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>診療ごとのベッド・機器の清拭と消毒を実施</li>
            <li>十分な換気・空気清浄機の運用</li>
            <li>ドアノブや手すり等の高頻度接触部位の定期清掃</li>
          </ul>
        </div>
      </section>

      {/* 関連導線（回遊強化） */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">関連ページ</h2>
        <div className="flex flex-wrap gap-3 motion-fadein">
          <Link
            href="/services"
            className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
          >
            診療案内を見る
          </Link>
          <Link
            href="/access"
            className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
          >
            アクセス・診療時間を確認する
          </Link>
          <Link href="/contact" className="btn-primary">
            お問い合わせ（フォーム）
          </Link>
        </div>
      </section>
    </main>
  );
}
