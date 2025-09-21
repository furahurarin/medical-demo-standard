// src/app/services/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "診療案内｜架空クリニック",
  description: "内科全般、生活習慣病、アレルギー、予防接種、健診のご案内。",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">診療案内</h1>

      <p className="mt-4 text-gray-700">
        かぜ・胃腸症状などの急な体調不良から、高血圧・脂質異常症・糖尿病といった慢性疾患まで幅広く対応。
        予防接種や健診も実施し、生活リズムに合わせた無理のない治療計画をご提案します。
      </p>

      <ul className="mt-6 list-disc pl-6 text-gray-800 space-y-2">
        <li>一般内科：かぜ・発熱・頭痛・胃腸炎 など</li>
        <li>生活習慣病の管理：高血圧／脂質異常症／糖尿病の継続フォロー</li>
        <li>アレルギー・花粉症：内服・点鼻の調整、舌下免疫療法の相談</li>
        <li>予防接種：インフル・肺炎球菌・海外渡航等（在庫確認のため要事前連絡）</li>
        <li>健康診断：雇用時・定期・各種証明書の発行（内容はお問い合わせください）</li>
      </ul>

      {/* ここから追加セクション */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">初めての方へ</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-1">
          <li>保険証／各種受給者証をお持ちください。</li>
          <li>お薬手帳・服用中のお薬があればご持参ください。</li>
          <li>発熱・かぜ症状の方は、来院前にお電話でご相談ください。</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">保険・費用の目安</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-1">
          <li>初診：1,000〜2,000円前後（検査内容により増減）</li>
          <li>再診：数百円〜（処方・検査の有無で変動）</li>
          <li className="text-sm text-gray-600">※ 自費検査・証明書は内容により別途お見積り。</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">予防接種</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-1">
          <li>在庫確保のため <strong>事前予約</strong> をお願いします。</li>
          <li>インフルエンザ／肺炎球菌／海外渡航ワクチンのご相談に対応。</li>
        </ul>
      </section>
    </main>
  );
}
