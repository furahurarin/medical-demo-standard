// src/app/facilities/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "院内設備｜架空クリニック",
  description: "検査室、X線装置、超音波、待合・キッズスペースなど、院内設備のご紹介。",
  alternates: { canonical: "/facilities" },
};

export default function FacilitiesPage() {
  const items: { name: string; desc: string }[] = [
    { name: "検査室", desc: "基本的な血液・尿検査に対応。結果は当日ご説明可能な項目もあります。" },
    { name: "X線装置", desc: "被曝線量に配慮したデジタル撮影。必要時のみ実施します。" },
    { name: "超音波（エコー）", desc: "腹部・頸動脈・甲状腺などの観察に対応。痛みはほとんどありません。" },
    { name: "待合・キッズスペース", desc: "混雑を避けた座席配置。お子さま連れでも安心です。" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">院内設備</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.name} className="rounded-2xl border bg-white p-4">
            <p className="font-semibold">{it.name}</p>
            <p className="mt-1 text-sm text-gray-700">{it.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
