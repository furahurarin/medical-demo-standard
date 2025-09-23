// src/app/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "診療案内｜架空クリニック",
  description:
    "当院の診療科目、主な対応症状、受診の流れ、料金・保険に関する基本情報をご案内します。",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* ページヘッダー */}
      <header className="hero-soft-bg rounded-2xl ring-1 ring-gray-100 px-6 py-10 md:px-8 md:py-12 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold motion-fadein">診療案内</h1>
        <p className="text-gray-700 motion-fadein">
          当院の診療科目と主な対応症状、はじめて受診される方の流れ、料金・保険の基本情報をまとめています。
          受診に迷われた際は、お気軽に{" "}
          <Link href="/contact" className="underline hover:no-underline">
            お問い合わせ
          </Link>
          ください。
        </p>
      </header>

      {/* 診療科目 / 主な対応症状 */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">診療科目・主な対応症状</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <article className="card p-5 motion-fadein">
            <h3 className="font-semibold">一般外来</h3>
            <p className="text-sm text-gray-700 mt-1">
              かぜ症状、胃腸炎、花粉症、生活習慣病の相談など幅広く対応します。
            </p>
          </article>
          <article className="card p-5 motion-fadein">
            <h3 className="font-semibold">慢性疾患フォロー</h3>
            <p className="text-sm text-gray-700 mt-1">
              高血圧、脂質異常症、糖尿病などの継続治療・定期検査に対応します。
            </p>
          </article>
          <article className="card p-5 motion-fadein">
            <h3 className="font-semibold">予防接種・健診</h3>
            <p className="text-sm text-gray-700 mt-1">
              公費・任意の各種ワクチン、一般健診や就業時健診などに対応します。
            </p>
          </article>
          <article className="card p-5 motion-fadein">
            <h3 className="font-semibold">各種検査</h3>
            <p className="text-sm text-gray-700 mt-1">
              採血・心電図などの基本検査を院内で実施。必要時は連携医療機関へ紹介します。
            </p>
          </article>
        </div>
        {/* 関連導線 */}
        <p className="text-sm text-gray-700 motion-fadein">
          院内の設備については{" "}
          <Link href="/facility" className="underline hover:no-underline">
            設備・院内紹介
          </Link>{" "}
          をご覧ください。
        </p>
      </section>

      {/* 初めて受診される方へ（受診の流れ） */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">初めて受診される方へ（受診の流れ）</h2>
        <div className="card p-5 motion-fadein">
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>
              <span className="font-medium">受付：</span> 保険証（マイナ保険証可）とお薬手帳をご提示ください。
            </li>
            <li>
              <span className="font-medium">問診：</span> 症状・既往歴・服薬状況を確認します。
            </li>
            <li>
              <span className="font-medium">診察・検査：</span> 必要に応じて院内検査を実施します。
            </li>
            <li>
              <span className="font-medium">会計・次回予約：</span> 診療内容の説明とお会計、必要に応じて次回予約をご案内します。
            </li>
          </ol>
          <p className="text-sm text-gray-700 mt-4">
            アクセスや診療時間は{" "}
            <Link href="/access" className="underline hover:no-underline">
              アクセス・診療時間
            </Link>{" "}
            をご確認ください。
          </p>
        </div>
      </section>

      {/* 料金・保険について（概要） */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">料金・保険について</h2>
        <div className="card p-5 space-y-3 motion-fadein">
          <p className="text-gray-700">
            各種健康保険に対応しています。自己負担額は保険種別や診療内容により異なります。
            予防接種や健診など保険適用外の費用は受付でご案内します。
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>保険証・各種受給者証をお持ちください（公費負担等に対応）。</li>
            <li>お支払いは現金のほか、対応可能な決済方法がある場合は窓口でご案内します。</li>
          </ul>
        </div>
      </section>

      {/* ミニFAQ（ページ内で完結） */}
      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">よくあるご質問</h2>
        <details className="card p-4 motion-fadein">
          <summary className="font-semibold cursor-pointer">予約は必要ですか？</summary>
          <p className="mt-2 text-gray-700">
            当日受診も可能です。混雑状況によりお待ちいただく場合があります。
            再診や健診は事前予約をおすすめします。
          </p>
        </details>
        <details className="card p-4 motion-fadein">
          <summary className="font-semibold cursor-pointer">初診時に必要なものは？</summary>
          <p className="mt-2 text-gray-700">
            保険証（マイナ保険証可）、お薬手帳、紹介状（お持ちの方）をご持参ください。
          </p>
        </details>
      </section>

      {/* 最後の行動導線 */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">関連ページ</h2>
        <div className="flex flex-wrap gap-3 motion-fadein">
          <Link href="/access" className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50">
            アクセス・診療時間を確認する
          </Link>
          <Link href="/staff" className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50">
            医師・スタッフを見る
          </Link>
          <Link href="/contact" className="btn-primary">
            お問い合わせ（フォーム）
          </Link>
        </div>
      </section>
    </main>
  );
}
