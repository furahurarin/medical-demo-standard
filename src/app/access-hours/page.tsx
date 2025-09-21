// src/app/access-hours/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アクセス / 診療時間｜架空クリニック",
  description: "最寄駅からの徒歩ルート、バス停、駐車場案内と診療時間のご案内。",
  alternates: { canonical: "/access-hours" },
};

const ADDRESS = "東京都千代田区丸の内1-1-1";
const BUSINESS_DAYS = [
  { day: "月", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "火", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "水", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "木", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "金", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "土", hours: "9:00–12:30（午後休診）" },
  { day: "日・祝", hours: "休診" },
];

export default function AccessHoursPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">アクセス / 診療時間</h1>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* 診療時間 */}
        <section aria-label="診療時間">
          <h2 className="text-xl font-semibold">診療時間</h2>
          <div className="mt-4 rounded-2xl border bg-white divide-y">
            {BUSINESS_DAYS.map((row) => (
              <div key={row.day} className="flex items-center justify-between px-4 py-3">
                <span className="font-medium">{row.day}</span>
                <span className="text-gray-700">{row.hours}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-600">※ 受付は診療終了の15分前まで</p>
        </section>

        {/* アクセス（地図） */}
        <section aria-label="アクセス">
          <h2 className="text-xl font-semibold">アクセス</h2>
          <p className="mt-3 text-gray-700">住所：{ADDRESS}</p>

          <div className="mt-4 aspect-[16/9] rounded-2xl border bg-white overflow-hidden shadow-sm">
            <iframe
              title="Googleマップ"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?&q=${encodeURIComponent(ADDRESS)}&output=embed`}
              className="w-full h-full"
            />
          </div>

          {/* 実在感のある案内（都会想定の例） */}
          <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-1">
            <li><strong>最寄り：</strong>JR東京駅 丸の内北口から徒歩5分（地上改札を出て右、丸の内仲通りを直進）</li>
            <li><strong>バス：</strong>都営バス◯系統「丸の内二丁目」下車 徒歩2分</li>
            <li><strong>駐車：</strong>提携コインパーキングあり（割引サービス有／台数に限りあり）</li>
            <li><strong>駐輪：</strong>クリニック前に駐輪スペースあり</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
