// src/app/access/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アクセス・診療時間｜架空クリニック",
  description:
    "架空クリニックへのアクセス（住所・地図）と診療時間のご案内。最寄駅からの徒歩ルート、電話番号のご案内も掲載しています。",
  alternates: { canonical: "/access" },
};

// NAP（layout.tsx と同一にしておく）
const CLINIC_NAME = "架空クリニック";
const ADDRESS = "東京都千代田区丸の内1-1-1";
const TEL_DISPLAY = "03-1234-5678";
const TEL_LINK = "0312345678";

// Googleマップ用（必要に応じて後で差し替え）
const MAP_QUERY = encodeURIComponent(ADDRESS);
const GMAPS_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const GMAPS_LINK = `https://www.google.com/maps?q=${MAP_QUERY}`;

export default function AccessPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* ページヘッダー */}
      <header className="hero-soft-bg rounded-2xl ring-1 ring-gray-100 px-6 py-10 md:px-8 md:py-12 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold motion-fadein">アクセス・診療時間</h1>
        <p className="text-gray-700 motion-fadein">
          {CLINIC_NAME} の所在地と診療時間のご案内です。ご不明点は{" "}
          <Link href="/contact" className="underline hover:no-underline">
            お問い合わせ
          </Link>{" "}
          からお気軽にご連絡ください。
        </p>
      </header>

      {/* 住所・地図 */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">所在地・アクセス</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 住所ブロック */}
          <div className="card p-5 space-y-3 motion-fadein">
            <div className="text-sm text-gray-700">
              住所：{ADDRESS}
              <br />
              電話：{" "}
              <a href={`tel:${TEL_LINK}`} className="underline hover:no-underline">
                {TEL_DISPLAY}
              </a>
            </div>
            <div className="text-sm text-gray-700">
              最寄駅：JR「東京」駅 丸の内北口から徒歩約5分（目安）
            </div>
            <div className="pt-1">
              <a
                href={GMAPS_LINK}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Googleマップで開く
              </a>
            </div>
          </div>

          {/* 地図埋め込み */}
          <div className="photo-wrap overflow-hidden border motion-fadein">
            <iframe
              title={`${CLINIC_NAME} の地図`}
              src={GMAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-72 md:h-80"
            />
          </div>
        </div>
      </section>

      {/* 診療時間 */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">診療時間</h2>
        <div className="card p-0 overflow-x-auto motion-fadein">
          <table className="w-full border-collapse text-sm min-w-[560px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-3 py-2 text-left">曜日</th>
                <th className="border px-3 py-2 text-left">午前</th>
                <th className="border px-3 py-2 text-left">午後</th>
              </tr>
            </thead>
            <tbody>
              {[
                { day: "月", am: "9:00–12:30", pm: "14:30–18:00" },
                { day: "火", am: "9:00–12:30", pm: "14:30–18:00" },
                { day: "水", am: "9:00–12:30", pm: "14:30–18:00" },
                { day: "木", am: "9:00–12:30", pm: "—" },
                { day: "金", am: "9:00–12:30", pm: "14:30–18:00" },
                { day: "土", am: "9:00–12:30", pm: "—" },
                { day: "日・祝", am: "—", pm: "—" },
              ].map((r) => (
                <tr key={r.day}>
                  <td className="border px-3 py-2">{r.day}</td>
                  <td className="border px-3 py-2">{r.am}</td>
                  <td className="border px-3 py-2">{r.pm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-700 motion-fadein">
          受付は診療終了の15分前まで。学会等により変更となる場合があります。
          最新情報は{" "}
          <Link href="/news" className="underline hover:no-underline">
            お知らせ
          </Link>{" "}
          をご確認ください。
        </p>
      </section>

      {/* 最後の行動導線 */}
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
            href="/facility"
            className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
          >
            設備・院内紹介を確認する
          </Link>
          <Link href="/contact" className="btn-primary">
            お問い合わせ（フォーム）
          </Link>
        </div>
      </section>
    </main>
  );
}
