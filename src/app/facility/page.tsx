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
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">設備・院内紹介</h1>
        <p className="text-gray-700">
          清潔で安心して通院いただける院内環境づくりに努めています。主要な設備と取組みをご紹介します。
        </p>
      </header>

      {/* 設備の一覧（必要十分の情報量） */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">主な設備</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-lg border p-4">
            <h3 className="font-semibold">診察室</h3>
            <p className="text-sm text-gray-700 mt-1">
              プライバシーに配慮した個室設計で、症状を丁寧に伺います。
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <h3 className="font-semibold">処置室</h3>
            <p className="text-sm text-gray-700 mt-1">
              ベッドスペースを確保し、迅速な処置が可能な体制です。
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <h3 className="font-semibold">検査機器</h3>
            <p className="text-sm text-gray-700 mt-1">
              必要に応じて血液・生化学などの基本検査に対応します。
            </p>
          </li>
          <li className="rounded-lg border p-4">
            <h3 className="font-semibold">待合・受付</h3>
            <p className="text-sm text-gray-700 mt-1">
              段差配慮・座席間隔の確保など、快適にお待ちいただけます。
            </p>
          </li>
        </ul>
      </section>

      {/* 衛生管理・院内環境 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">衛生管理と院内環境</h2>
        <p className="text-gray-700">
          手指消毒・機器ごとの清拭など、標準予防策に基づいた衛生管理を徹底しています。
          換気や清掃の頻度を高め、安心して受診いただける環境を維持しています。
        </p>
      </section>

      {/* 関連導線（回遊を強化） */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">関連ページ</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <Link href="/services" className="hover:underline">
              診療案内を見る
            </Link>
          </li>
          <li>
            <Link href="/access" className="hover:underline">
              アクセス・診療時間を確認する
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
