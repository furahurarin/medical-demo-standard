// src/app/staff/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/cta/CTAButton";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "医師・スタッフ紹介｜架空クリニック",
  description:
    "院長のご挨拶、医師の経歴・資格、スタッフの紹介。はじめての方にも安心していただけるよう、顔が見える情報をお届けします。",
  alternates: { canonical: "/staff" },
};

const doctor = {
  name: "山田 太郎",
  title: "院長・医師",
  message:
    "地域に根ざした“かかりつけ医”として、丁寧な対話と分かりやすい説明を大切にしています。小さなお悩みでも遠慮なくご相談ください。",
  profile: [
    "○○大学 医学部 卒業",
    "○○病院 内科 勤務",
    "△△クリニック 副院長を経て、架空クリニック開院",
  ],
  qualifications: [
    "日本内科学会 認定医",
    "日本○○学会 専門医",
    "医師免許 第123456号",
  ],
  societies: ["日本内科学会", "日本○○学会", "日本△△学会"],
};

const staff = [
  {
    role: "看護師",
    name: "佐藤 花子",
    msg: "安心して受診いただけるよう、やさしく丁寧なケアを心がけています。",
  },
  {
    role: "医療事務",
    name: "鈴木 一郎",
    msg: "受付・会計・各種ご案内はお任せください。お気軽にお声がけください。",
  },
  {
    role: "看護師",
    name: "高橋 美咲",
    msg: "不安や疑問はその場で解消できるよう努めています。",
  },
];

export default function StaffPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* ヘッダー */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">医師・スタッフ紹介</h1>
        <p className="mt-2 text-gray-600">
          顔が見える安心を。院長のご挨拶と、医師・スタッフのプロフィールをご紹介します。
        </p>
      </header>

      {/* 院長あいさつ */}
      <section aria-labelledby="greeting" className="grid md:grid-cols-2 gap-8 items-start">
        <div
          aria-hidden="true"
          className="relative aspect-[4/3] rounded-2xl overflow-hidden border bg-white shadow-sm grid place-items-center"
        >
          {/* 画像プレースホルダー（後で差し替え可） */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,.12),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(29,78,216,.16),transparent_55%)]" />
          <div className="relative text-sm text-gray-500">院長イメージ（画像差し替え可）</div>
        </div>
        <div>
          <h2 id="greeting" className="text-xl font-semibold">
            {doctor.title} あいさつ
          </h2>
          <p className="mt-3 text-gray-700 leading-7">{doctor.message}</p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold">経歴</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700">
                {doctor.profile.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">資格・認定</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700">
                {doctor.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold">所属学会</h3>
            <ul className="mt-2 flex flex-wrap gap-2 text-sm text-gray-700">
              {doctor.societies.map((s) => (
                <li key={s} className="rounded-full border px-3 py-1 bg-white">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 医師の方針・診療連携（関連リンクで回遊性UP） */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-semibold">診療における基本方針</h2>
        <ul className="mt-3 grid md:grid-cols-3 gap-4 text-sm">
          {[
            "丁寧な説明と納得のいく治療提案",
            "必要十分な検査・過剰な医療の回避",
            "専門医連携と適切な医療機関へのご紹介",
          ].map((i) => (
            <li key={i} className="rounded-xl border border-gray-100 bg-white p-4">
              {i}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-sm text-gray-600">
          診療内容の詳しい情報は{" "}
          <Link href="/services" className="underline">
            診療案内
          </Link>{" "}
          を、検査機器など院内環境は{" "}
          <Link href="/facility" className="underline">
            設備紹介
          </Link>{" "}
          をご覧ください。
        </div>
      </section>

      {/* スタッフ紹介（写真なしカード：後で追加してもOK） */}
      <section aria-labelledby="team">
        <h2 id="team" className="text-xl font-semibold">
          スタッフ紹介
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {staff.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="text-sm text-gray-500">{m.role}</div>
              <div className="mt-1 font-semibold">{m.name}</div>
              <p className="mt-2 text-sm text-gray-700">{m.msg}</p>
            </div>
          ))}
        </div>
      </section>

      {/* よくある質問（受診前に知りたいこと） */}
      <section aria-labelledby="faq">
        <h2 id="faq" className="text-xl font-semibold">よくある質問</h2>
        <div className="mt-4 divide-y border border-gray-100 rounded-xl bg-white">
          {[
            {
              q: "初診の所要時間は？",
              a: "混雑状況により異なりますが、30〜60分を目安としてください。検査内容により前後します。",
            },
            {
              q: "担当医の希望はできますか？",
              a: "可能な範囲で調整いたします。受付時にお申し付けください。",
            },
            {
              q: "小さな相談でも受け付けてもらえますか？",
              a: "もちろんです。症状が軽い・受診すべきか迷う、といった段階でもお気軽にご相談ください。",
            },
          ].map((f) => (
            <div key={f.q} className="p-4">
              <div className="font-medium">{f.q}</div>
              <p className="mt-1 text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA（問い合わせ窓口の集約） */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-semibold">ご相談・ご予約</h2>
        <p className="mt-1 text-gray-600">
          医師・スタッフ一同、皆さまの健康をサポートします。まずはお気軽にお問い合わせください。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <CTAButton href={CONTACT.formPath} label="フォームで相談する" />
          <a
            href={CONTACT.telLink}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {CONTACT.telDisplay} に電話
          </a>
          <a
            href={CONTACT.lineUrl}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            LINEで予約
          </a>
        </div>
      </section>
    </main>
  );
}
