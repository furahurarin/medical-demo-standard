// src/app/page.tsx
import Link from "next/link";
import CTAButton from "@/components/cta/CTAButton";
import { BRAND, CONTACT } from "@/lib/site";
import { latestNews } from "@/lib/news";
import JsonLdLocalBusiness from "@/components/seo/JsonLdLocalBusiness";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function Home() {
  return (
    <div>
      {/* LocalBusiness JSON-LD（SEO用） */}
      <JsonLdLocalBusiness
        name={BRAND.name}
        url={SITE_URL}
        telephone={CONTACT.telDisplay}
        address={{
          addressRegion: "東京都",
          addressLocality: "千代田区",
          streetAddress: "丸の内1-1-1", // ダミー。実案件で差し替え
          postalCode: "100-0005",
        }}
      />

      {/* ===== Hero / UVP ===== */}
      <section className="bg-gradient-to-b from-white to-brand-50">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {BRAND.tagline}
            </h1>
            <p className="mt-3 text-gray-600">
              〇〇科を中心に、生活に寄り添う診療を提供しています。初めての方も安心してご相談ください。
            </p>
            <div className="mt-6 flex items-center gap-3">
              <CTAButton href={CONTACT.formPath} label="今すぐ問い合わせる" />
              <Link href="/services" className="text-brand-700 hover:underline font-semibold">
                診療案内を見る
              </Link>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              お急ぎの方は{" "}
              <a href={CONTACT.telLink} className="underline">
                {CONTACT.telDisplay}
              </a>{" "}
              まで
            </div>
          </div>

          {/* 画像の代わりに軽量プレースホルダー（後で差し替え可） */}
          <div
            aria-hidden="true"
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm grid place-items-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(29,78,216,.18),transparent_55%)]" />
            <div className="relative text-sm text-gray-500">院内イメージ（画像差し替え可）</div>
          </div>
        </div>
      </section>

      {/* ===== 当院が選ばれる理由 ===== */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">当院が選ばれる理由</h2>
          <p className="mt-2 text-gray-600">
            患者さんにとっての“メリット”が一目で分かるように整理しました。
          </p>
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "専門医による診療", desc: "経験豊富な医師が丁寧に診察します。" },
              { title: "最新設備を導入", desc: "正確で負担の少ない検査・治療を提供。" },
              { title: "駅から徒歩5分", desc: "アクセス良好で通院しやすい立地。" },
              { title: "土曜も診療", desc: "平日忙しい方も通いやすい体制。" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 p-5 bg-white shadow-sm"
              >
                <div className="font-semibold">{item.title}</div>
                <div className="mt-1 text-sm text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 最新のお知らせ（ダミー3件） ===== */}
      <section className="py-10 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">最新のお知らせ</h2>
            <Link href="/news" className="text-sm text-brand-700 hover:underline">
              すべて見る
            </Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {latestNews.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="block rounded-xl bg-white border border-gray-100 p-4 hover:shadow-sm"
              >
                <div className="text-sm text-gray-500">
                  {new Date(n.date).toLocaleDateString("ja-JP")}
                </div>
                <div className="mt-1 font-medium">{n.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 下層への導線カード ===== */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: "/services", title: "診療案内", desc: "症状から探せます" },
            { href: "/staff", title: "医師・スタッフ", desc: "顔が見える安心を" },
            { href: "/facility", title: "設備紹介", desc: "院内の清潔と安全" },
            { href: "/access", title: "アクセス・診療時間", desc: "来院前に確認" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="rounded-2xl border border-gray-100 p-5 bg-white hover:shadow-sm">
              <div className="font-semibold">{c.title}</div>
              <div className="mt-1 text-sm text-gray-600">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
