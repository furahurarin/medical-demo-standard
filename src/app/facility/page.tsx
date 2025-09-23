// src/app/facility/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/cta/CTAButton";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "設備紹介｜架空クリニック",
  description:
    "院内の環境と主要設備をご紹介します。清潔・安心・通いやすさに配慮した設計です。",
  alternates: { canonical: "/facility" },
};

const features = [
  {
    title: "清潔な院内環境",
    desc: "毎日の清掃・消毒と定期点検を実施。待合の換気にも配慮しています。",
  },
  {
    title: "バリアフリー対応",
    desc: "段差の少ない動線／車いす対応トイレを備え、どなたでも通院しやすく。",
  },
  {
    title: "キッズスペース",
    desc: "お子さまと一緒でも安心。待ち時間を快適に過ごせるスペースを確保。",
  },
  {
    title: "プライバシーに配慮",
    desc: "問診・診察スペースは声漏れを抑えるレイアウト。個室対応も可能です。",
  },
];

const equipments = [
  {
    name: "デジタルX線装置",
    points: [
      "短時間で高精細な撮影",
      "被ばく線量を低減するプロトコルを採用",
    ],
    benefit: "胸部・腹部などの評価を迅速に実施できます。",
  },
  {
    name: "超音波診断装置",
    points: ["腹部・頸動脈・甲状腺などに対応", "痛みが少なくリアルタイムに評価"],
    benefit: "内科領域の幅広いスクリーニングに有用です。",
  },
  {
    name: "心電計",
    points: ["不整脈・虚血の初期評価", "検査は数分で完了"],
    benefit: "胸部症状の原因検索や健診での確認に用います。",
  },
  {
    name: "スパイロメータ",
    points: ["肺機能の測定", "喘息やCOPDの評価に"],
    benefit: "呼吸器症状がある方の重症度や治療効果を把握します。",
  },
  {
    name: "AED・救急カート",
    points: ["緊急時に即応可能", "スタッフで定期訓練を実施"],
    benefit: "万一の場面でも安全対策を整えています。",
  },
];

const gallery = [
  { title: "受付・待合", caption: "明るく清潔な待合スペース。" },
  { title: "診察室", caption: "プライバシーに配慮した設計。" },
  { title: "処置室", caption: "清潔導線で安心して処置を受けられます。" },
  { title: "検査室", caption: "超音波など各種検査に対応。" },
  { title: "キッズスペース", caption: "お子さま連れも安心。" },
  { title: "バリアフリー設備", caption: "車いす対応トイレ・スロープ。" },
];

export default function FacilityPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* ヘッダー */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">設備・院内紹介</h1>
        <p className="mt-2 text-gray-600">
          清潔・安心・通いやすさにこだわった院内環境と、主要な医療設備をご紹介します。
        </p>
        <p className="mt-1 text-gray-600">
          診療内容の詳細は{" "}
          <Link href="/services" className="underline">
            診療案内
          </Link>{" "}
          、来院方法は{" "}
          <Link href="/access" className="underline">
            アクセス・診療時間
          </Link>{" "}
          をご覧ください。
        </p>
      </header>

      {/* 特長（環境面） */}
      <section aria-labelledby="features">
        <h2 id="features" className="text-xl font-semibold">
          院内環境の特長
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-gray-700">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 主要設備（カード） */}
      <section aria-labelledby="devices">
        <h2 id="devices" className="text-xl font-semibold">
          主要設備
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {equipments.map((e) => (
            <div
              key={e.name}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="font-semibold">{e.name}</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-gray-600">{e.benefit}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-500">
          ※設備の導入状況は時期により変わる場合があります。詳細はお問い合わせください。
        </p>
      </section>

      {/* フォトギャラリー（プレースホルダー） */}
      <section aria-labelledby="photos">
        <h2 id="photos" className="text-xl font-semibold">
          院内フォト
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((g) => (
            <figure
              key={g.title}
              className="rounded-2xl overflow-hidden border bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] grid place-items-center">
                {/* 画像プレースホルダー（後で /public 配下の画像に差し替え可） */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,.12),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(29,78,216,.16),transparent_55%)]" />
                <div className="relative text-xs text-gray-500">
                  {g.title}（画像差し替え可）
                </div>
              </div>
              <figcaption className="px-4 py-3 text-sm text-gray-700">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 感染対策・衛生管理（箇条書き） */}
      <section aria-labelledby="infection">
        <h2 id="infection" className="text-xl font-semibold">
          感染対策・衛生管理
        </h2>
        <ul className="mt-3 list-disc pl-5 text-gray-700">
          <li>院内各所の定期的な清掃・消毒を実施</li>
          <li>手指消毒用アルコールの常設と換気の徹底</li>
          <li>器具の滅菌・ディスポ製品の適正使用</li>
          <li>発熱症状の方は動線を分けてご案内</li>
        </ul>
      </section>

      {/* 関連リンク（回遊促進） */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-semibold">関連ページ</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link
            href="/services"
            className="rounded-full border px-3 py-1 hover:bg-gray-50"
          >
            診療案内を見る
          </Link>
          <Link
            href="/staff"
            className="rounded-full border px-3 py-1 hover:bg-gray-50"
          >
            医師・スタッフ紹介
          </Link>
          <Link
            href="/access"
            className="rounded-full border px-3 py-1 hover:bg-gray-50"
          >
            アクセス・診療時間
          </Link>
        </div>
      </section>

      {/* CTA（問い合わせ窓口の集約） */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-semibold">ご相談・ご予約</h2>
        <p className="mt-1 text-gray-600">
          設備の詳細や検査についてのご質問は、下記の方法でお気軽にお問い合わせください。
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
