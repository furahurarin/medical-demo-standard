// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

const CLINIC_NAME = "架空クリニック";
const DISPLAY_PHONE = "03-1234-5678";
const TEL = "0312345678";
const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "#";

export default function Page() {
  return (
    <>
      {/* ===== Hero：主要導線（電話 / フォーム / LINE） ===== */}
      <section id="hero" className="relative isolate min-h-[clamp(520px,75vh,760px)]">
        <Image
          src="/images/hero.webp"
          alt={`${CLINIC_NAME}の外観`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,40,.78),rgba(8,14,40,.58)_35%,rgba(8,14,40,.30)_70%,rgba(8,14,40,.10))]"
        />
        <div className="relative z-10 grid place-items-center min-h-[inherit] px-4 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              地域に根ざした、通いやすい医療を。
            </h1>
            <p className="mt-4 text-white/90">
              初めての方でも安心の丁寧な説明と、過不足のない検査・治療を大切にしています。
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${TEL}`}
                className="inline-flex items-center justify-center rounded-2xl bg-brand-700 px-4 py-2 font-medium text-white hover:bg-brand-800"
                data-umami-event="lp_phone_click"
              >
                電話する（{DISPLAY_PHONE}）
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/50 bg-white/10 px-4 py-2 font-medium text-white backdrop-blur hover:bg-white/20"
                data-umami-event="lp_email_click"
              >
                フォームで問い合わせ
              </Link>
              <a
                href={LINE_URL}
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-4 py-2 font-medium text-white backdrop-blur hover:bg-white/20"
                data-umami-event="lp_line_click"
              >
                LINE予約
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 入口カード（各ページへ） ===== */}
      <main className="pb-10">
        <section className="section pt-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { href: "/services", title: "診療案内", desc: "急な体調不良から慢性疾患まで。" },
                { href: "/doctor", title: "医師紹介", desc: "院長の挨拶や経歴をご紹介。" },
                { href: "/facilities", title: "院内設備", desc: "検査室・X線装置・待合のようす。" },
                { href: "/news", title: "お知らせ", desc: "休診や予防接種の最新情報。" },
                { href: "/access-hours", title: "アクセス/診療時間", desc: "駅からの道順・駐車場案内。" },
                { href: "/contact", title: "お問い合わせ", desc: "予約・各種ご相談はこちら。" },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-2xl border bg-white p-4 hover:shadow-md"
                >
                  <p className="font-semibold">{c.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
