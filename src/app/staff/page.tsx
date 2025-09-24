// src/app/staff/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "医師紹介｜架空クリニック",
  description:
    "院長のご挨拶、専門分野、資格・所属、診療方針、対応領域、初診の流れをご案内します。写真は院長のみ掲載しています。",
  alternates: { canonical: "/staff" },
};

type Career = { period: string; text: string };

const DIRECTOR = {
  name: "山田 太郎",
  role: "院長",
  dept: "内科",
  intro:
    "当院は院長が初診からフォローまで一貫して担当する小規模クリニックです。過不足のない検査と丁寧な説明を重視し、生活背景に沿った無理のない治療計画をご提案します。都心の通いやすさと、顔の見える診療体験の両立を目指しています。",
  specialties: [
    "総合内科",
    "生活習慣病（高血圧・脂質異常症・糖尿病）",
    "かぜ・胃腸炎などの一般内科",
  ],
  credentials: ["日本内科学会 総合内科専門医", "日本医師会 認定産業医"],
  careers: [
    { period: "2010年", text: "国立◯◯大学 医学部卒業" },
    { period: "2010–2015年", text: "◯◯総合病院 内科 勤務（急性期・総合診療を担当）" },
    { period: "2016–2023年", text: "都内クリニック 副院長" },
    { period: "2024年–現在", text: "架空クリニック 院長" },
  ] as Career[],
  photoSrc: "/images/staff/director.webp",
  photoAlt: "院長 山田のポートレート",
};

export default function StaffPage() {
  return (
    <main className="min-h-screen">
      {/* 見出し（ページ内リンクは一切表示しません） */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="text-2xl font-bold sm:text-3xl">医師紹介</h1>
          <p className="mt-3 text-gray-600">
            小規模体制により、院長が継続してお顔と状態を把握したうえで診療します。
          </p>
        </div>
      </section>

      {/* 院長（唯一の写真） */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-4 sm:grid-cols-12 sm:px-6">
          {/* 写真：4:5 推奨 */}
          <div className="sm:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src={DIRECTOR.photoSrc}
                  alt={DIRECTOR.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 420px, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* テキスト */}
          <div className="sm:col-span-7">
            <p className="text-sm text-gray-500">
              {DIRECTOR.role}・{DIRECTOR.dept}
            </p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{DIRECTOR.name}</h2>
            <p className="mt-4 leading-7 text-gray-700">{DIRECTOR.intro}</p>

            {/* 専門・資格 */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">専門</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  {DIRECTOR.specialties.map((s, i) => (
                    <li key={`sp-${i}`}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">資格・所属</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  {DIRECTOR.credentials.map((c, i) => (
                    <li key={`cr-${i}`}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 経歴 */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">経歴</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {DIRECTOR.careers.map((c, i) => (
                  <li key={`cv-${i}`}>
                    <span className="inline-block w-28 text-gray-500">{c.period}</span>
                    <span>{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 診療方針（画像なし） */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-bold sm:text-2xl">診療方針</h2>
        </div>
        <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
          <ul className="grid gap-3 text-gray-700 sm:grid-cols-2">
            <li className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-medium">一貫診療</p>
              <p className="mt-1 text-sm">初診からフォローまで院長が継続して担当します。</p>
            </li>
            <li className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-medium">必要十分な検査</p>
              <p className="mt-1 text-sm">過不足のない検査選択で、時間と費用の負担を抑えます。</p>
            </li>
            <li className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-medium">わかりやすい説明</p>
              <p className="mt-1 text-sm">検査結果・治療方針を噛み砕いてお伝えします。</p>
            </li>
            <li className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-medium">生活に沿う治療</p>
              <p className="mt-1 text-sm">仕事や家庭の事情に合わせ、無理のない計画をご提案。</p>
            </li>
          </ul>
        </div>
      </section>

      {/* 対応領域（例） */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-bold sm:text-2xl">対応領域</h2>
          <p className="mt-3 text-gray-600">
            下記は一例です。重症感が強い場合は受診前にお電話でご相談ください。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "生活習慣病（高血圧・脂質異常症・糖尿病）",
              "かぜ・インフルエンザ様症状",
              "腹痛・下痢・便秘などの消化器症状",
              "頭痛・めまい・倦怠感",
              "花粉症・蕁麻疹などのアレルギー症状",
            ].map((tag, i) => (
              <span
                key={`tg-${i}`}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            ※専門的治療や入院が必要と判断した場合は、近隣の医療機関へ適切にご紹介します。
          </p>
        </div>
      </section>

      {/* 初診の流れ */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-bold sm:text-2xl">初診の流れ</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { title: "ご来院・受付", text: "健康保険証・各種医療証、お薬手帳をご持参ください。" },
              { title: "問診", text: "症状の経過やご不安を丁寧に伺い、必要に応じて検査をご提案します。" },
              { title: "診察・検査", text: "院長が診察を行い、過不足のない検査を選択します。" },
              { title: "結果説明・お会計", text: "結果と治療方針をご説明し、次回の受診目安をご案内します。" },
            ].map((step, i) => (
              <li key={`st-${i}`} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-1 text-sm text-gray-700">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 採用情報（将来的な体制拡充に備えて） */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-brand-100 to-white p-6 ring-1 ring-inset ring-brand-50 sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">採用情報</h2>
            <p className="mt-2 text-gray-700">
              体制拡充に向け、看護師・医療事務の採用を段階的に行う予定です。募集状況は採用ページでご案内します。
            </p>
            <div className="mt-4">
              <Link href="/recruit" className="btn btn-primary">
                採用ページへ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
