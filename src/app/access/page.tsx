// src/app/access/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/cta/CTAButton";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "アクセス・診療時間｜架空クリニック",
  description:
    "アクセス方法と診療時間のご案内。最寄駅からの徒歩ルートや駐車場情報、地図の確認はこちらから。",
  alternates: { canonical: "/access" },
};

const hours: Array<[string, string]> = [
  ["月", "9:00–12:30 / 14:00–18:00"],
  ["火", "9:00–12:30 / 14:00–18:00"],
  ["水", "9:00–12:30 / 14:00–18:00"],
  ["木", "休診"],
  ["金", "9:00–12:30 / 14:00–18:00"],
  ["土", "9:00–12:30"],
  ["日・祝", "休診"],
];

export default function AccessPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* ヘッダー */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">アクセス・診療時間</h1>
        <p className="mt-2 text-gray-600">
          診療時間と来院方法のご案内です。はじめての方も迷わずお越しいただけるよう、最寄駅からの目印も記載しています。
        </p>
        <p className="mt-1 text-gray-600">
          臨時休診・時短診療などは{" "}
          <Link href="/news" className="underline">
            お知らせ
          </Link>{" "}
          にて随時更新しています。
        </p>
      </header>

      {/* 診療時間 */}
      <section aria-labelledby="hours" className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 id="hours" className="text-xl font-semibold">
            診療時間
          </h2>
          <table className="mt-4 w-full text-sm border border-gray-200">
            <tbody>
              {hours.map(([d, t]) => (
                <tr key={d} className="border-t">
                  <th
                    scope="row"
                    className="px-3 py-2 font-medium bg-gray-50 w-28 text-left"
                  >
                    {d}
                  </th>
                  <td className="px-3 py-2">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
            <li>最終受付は診療終了の15分前です。</li>
            <li>混雑状況によりお待ちいただく場合があります。</li>
          </ul>
        </div>

        {/* 連絡先・予約導線（集約） */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 h-fit">
          <h3 className="font-semibold">ご予約・お問い合わせ</h3>
          <p className="mt-2 text-sm text-gray-600">
            ご不明点はお気軽にお問い合わせください。予約はLINEまたはフォームが便利です。
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
        </div>
      </section>

      {/* アクセス（住所・最寄駅・駐車場） */}
      <section aria-labelledby="access">
        <h2 id="access" className="text-xl font-semibold">
          アクセス
        </h2>
        <div className="mt-4 grid md:grid-cols-2 gap-8">
          <div>
            <dl className="text-sm text-gray-700">
              <div className="grid grid-cols-4 gap-2 py-1">
                <dt className="col-span-1 text-gray-500">住所</dt>
                <dd className="col-span-3">東京都千代田区丸の内1-1-1（例）</dd>
              </div>
              <div className="grid grid-cols-4 gap-2 py-1">
                <dt className="col-span-1 text-gray-500">最寄駅</dt>
                <dd className="col-span-3">JR東京駅 丸の内北口 徒歩5分（例）</dd>
              </div>
              <div className="grid grid-cols-4 gap-2 py-1">
                <dt className="col-span-1 text-gray-500">目印</dt>
                <dd className="col-span-3">○○薬局となり、△△ビル2F（例）</dd>
              </div>
              <div className="grid grid-cols-4 gap-2 py-1">
                <dt className="col-span-1 text-gray-500">駐車場</dt>
                <dd className="col-span-3">近隣コインPをご利用ください（提携なし・例）</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=%E6%9E%B6%E7%A9%BA%E3%82%AF%E3%83%AA%E3%83%8B%E3%83%83%E3%82%AF"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                Googleマップで開く
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=%E6%9E%B6%E7%A9%BA%E3%82%AF%E3%83%AA%E3%83%8B%E3%83%83%E3%82%AF"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                経路を検索
              </a>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              ※住所・ルートはダミーです。実案件では正確な住所・ビル名で差し替えてください。
            </p>
          </div>

          {/* Googleマップ埋め込み（プレースホルダーでもビルド可） */}
          <div className="aspect-video rounded-2xl overflow-hidden border bg-white shadow-sm">
            <iframe
              title="Google Map"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              // 実住所が決まり次第、embedのpbパラメータを設定してください
              src="https://www.google.com/maps/embed?pb="
            />
          </div>
        </div>
      </section>

      {/* 来院ルートの目印（徒歩） */}
      <section aria-labelledby="walk" className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 id="walk" className="text-xl font-semibold">最寄駅からの徒歩ルートの目印</h2>
        <ol className="mt-3 list-decimal pl-6 text-sm text-gray-700 space-y-1">
          <li>丸の内北口を出て左へ（駅前広場沿い）。</li>
          <li>○○通りを直進し、信号2つ目を右折。</li>
          <li>左手に○○薬局が見えたら隣の△△ビル2F（エレベーターで2階）。</li>
        </ol>
        <p className="mt-2 text-xs text-gray-500">
          ※目印はダミーです。実案件では写真を交えて3ステップ程度でご案内すると親切です。
        </p>
      </section>

      {/* 関連ページ（回遊） */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-semibold">関連ページ</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link href="/services" className="rounded-full border px-3 py-1 hover:bg-gray-50">
            診療案内を見る
          </Link>
          <Link href="/facility" className="rounded-full border px-3 py-1 hover:bg-gray-50">
            設備・院内紹介
          </Link>
          <Link href="/staff" className="rounded-full border px-3 py-1 hover:bg-gray-50">
            医師・スタッフ紹介
          </Link>
        </div>
      </section>

      {/* 最終CTA（窓口の再掲） */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-semibold">ご相談・ご予約</h2>
        <p className="mt-1 text-gray-600">
          予約・お問い合わせはLINEまたはフォーム、急ぎのご連絡はお電話をご利用ください。
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
