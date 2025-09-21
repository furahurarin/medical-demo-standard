// src/app/doctor/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: "医師紹介｜架空クリニック",
  description: "院長あいさつ・経歴・所属学会などのご案内。",
  alternates: { canonical: "/doctor" },
};

export default function DoctorPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">医師紹介</h1>

      <section className="mt-6 grid sm:grid-cols-[160px_1fr] gap-6 items-start rounded-2xl border bg-white p-4">
        <div className="relative w-40 h-40 rounded-xl overflow-hidden">
          <Image src="/images/doctor.webp" alt="院長写真" fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold">院長　山田 太郎</p>
          <p className="text-gray-700 mt-2">
            地域のかかりつけ医として、分かりやすい説明と過不足のない検査・治療を心がけています。
            症状や不安を丁寧に伺い、一人ひとりに合った治療計画をご提案します。
          </p>

          <div className="mt-4 text-sm text-gray-700">
            <p className="font-medium">経歴・所属</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>○○大学医学部 卒業</li>
              <li>△△病院 内科 勤務（総合診療）</li>
              <li>日本内科学会 認定内科医 / 日本糖尿病学会 会員</li>
              <li>2023年 架空クリニック 開院</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 構造化データ（Physician） */}
      <Script id="ld-json-physician" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          name: "山田 太郎",
          worksFor: { "@type": "MedicalClinic", name: "架空クリニック", url: siteUrl },
        })}
      </Script>
    </main>
  );
}
