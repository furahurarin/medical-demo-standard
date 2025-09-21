// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import Link from "next/link";

const font = Noto_Sans_JP({
  subsets: ["latin"], // Noto Sans JP はこれでOK（重量抑制）
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const OGP_URL = "/ogp.png"; // ← PNGに変更（SNSでの表示安定のため）
const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "#";

// JSON-LD 用 クリニック定数
const CLINIC = {
  name: "架空クリニック",
  url: SITE_URL,
  tel: "03-1234-5678",
  email: "info@example.jp",
  address: {
    addressCountry: "JP",
    addressRegion: "東京都",
    addressLocality: "千代田区",
    streetAddress: "丸の内1-1-1",
  },
  logo: "/icon.svg",
  image: OGP_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "架空クリニック｜医療サイトデモ（Standard）",
  description:
    "“病院/クリニックらしい”標準構成：〜5ページ土台＋お問い合わせフォーム＋お知らせ（簡易CMS）＋LINE予約導線を備えた多ページサイト。",
  // 検証URLでは noindex、本番では index
  robots:
    SITE_URL.includes("localhost") || SITE_URL.includes("127.0.0.1")
      ? { index: false, follow: false }
      : { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "架空クリニック｜医療サイトデモ（Standard）",
    description:
      "〜5ページ土台＋お問い合わせフォーム＋お知らせ（簡易CMS）＋LINE予約導線の標準構成。",
    url: "/",
    images: [{ url: OGP_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OGP_URL],
    title: "架空クリニック｜医療サイトデモ（Standard）",
    description:
      "〜5ページ土台＋お問い合わせフォーム＋お知らせ（簡易CMS）＋LINE予約導線の標準構成。",
  },
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  // 自動リンク抑止＆テーマカラー
  formatDetection: { telephone: false, address: false, email: false },
  themeColor: "#1d4ed8",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL; // 例: https://analytics.umami.is/script.js
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ja">
      <body className={`${font.className} min-h-screen bg-white text-gray-900 antialiased`}>
        {/* ===== Header（全ページ共通ナビ） ===== */}
        <header
          className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200"
          aria-label="サイト全体のヘッダー"
        >
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <Link href="/" aria-label="トップへ" className="font-bold tracking-tight">
              架空クリニック
            </Link>
            <nav aria-label="グローバルナビ" className="overflow-x-auto">
              <ul className="flex items-center gap-3 text-sm text-gray-700">
                <li><Link href="/services" className="px-2 py-1 rounded-lg hover:bg-gray-50">診療案内</Link></li>
                <li><Link href="/doctor" className="px-2 py-1 rounded-lg hover:bg-gray-50">医師紹介</Link></li>
                <li><Link href="/facilities" className="px-2 py-1 rounded-lg hover:bg-gray-50">院内設備</Link></li>
                <li><Link href="/news" className="px-2 py-1 rounded-lg hover:bg-gray-50">お知らせ</Link></li>
                <li><Link href="/access-hours" className="px-2 py-1 rounded-lg hover:bg-gray-50">アクセス/時間</Link></li>
                <li><Link href="/contact" className="px-2 py-1 rounded-lg hover:bg-gray-50">お問い合わせ</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ===== メインコンテンツ ===== */}
        {children}

       {/* ===== Footer ===== */}
<footer className="border-t border-gray-200">
  <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3 text-sm">
    {/* 1) クリニック情報 */}
    <div>
      <p className="font-semibold">架空クリニック</p>
      <p className="mt-2 text-gray-700">〒100-0005 東京都千代田区丸の内1-1-1</p>
      <p className="mt-1">
        電話：<a href="tel:0312345678" className="underline" data-umami-event="lp_phone_click">03-1234-5678</a>
      </p>
      <p className="mt-1">
        診療時間：<Link href="/access-hours" className="underline">こちら</Link>
      </p>
    </div>

    {/* 2) お問い合わせ・予約 */}
    <div>
      <p className="font-semibold">お問い合わせ・ご予約</p>
      <ul className="mt-2 space-y-1 text-gray-700">
        <li>
          <Link href="/contact" className="underline" data-umami-event="lp_email_click">お問い合わせフォーム</Link>
        </li>
        <li>
          <a href={process.env.NEXT_PUBLIC_LINE_URL || "#"} className="underline" data-umami-event="lp_line_click">LINE予約</a>
        </li>
        <li>
          <Link href="/news" className="underline">お知らせ</Link>
        </li>
      </ul>
    </div>

    {/* 3) 法務・各種情報 */}
    <div>
      <p className="font-semibold">サイト情報</p>
      <ul className="mt-2 space-y-1 text-gray-700">
        <li><Link href="/services" className="underline">診療案内</Link></li>
        <li><Link href="/access-hours" className="underline">アクセス / 診療時間</Link></li>
        <li><Link href="/legal/privacy" className="underline">プライバシーポリシー</Link></li>
        <li><Link href="/legal/tokusho" className="underline">特定商取引法に基づく表記</Link></li>
      </ul>
    </div>
  </div>

  <div className="border-t border-gray-200">
    <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-600 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
      <p>&copy; {new Date().getFullYear()} 架空クリニック</p>
      <p className="text-gray-500">本サイトはデモです。記載の住所・連絡先は架空のものです。</p>
    </div>
  </div>
</footer>



        {/* ===== SP固定CTA：電話 / LINE ===== */}
        <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t bg-white">
          <div className="grid grid-cols-2">
            <a
              href="tel:0312345678"
              className="flex items-center justify-center py-3 font-medium text-white bg-brand-700 hover:bg-brand-800"
              data-umami-event="lp_phone_click_fixed"
            >
              電話（03-1234-5678）
            </a>
            <a
              href={LINE_URL}
              className="flex items-center justify-center py-3 font-medium hover:bg-gray-50"
              data-umami-event="lp_line_click_fixed"
            >
              LINE予約
            </a>
          </div>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>

        {/* ====== 計測（スクロール + クリックブリッジ） ====== */}

        {/* 90%スクロールで一度だけ発火（umami/gtag 両対応） */}
        <Script id="scroll-90" strategy="afterInteractive">
          {`
            (function () {
              var fired = false;
              function at90() {
                var scrolled = (window.scrollY || window.pageYOffset || 0) + window.innerHeight;
                var height = document.documentElement.scrollHeight;
                return height > 0 && (scrolled / height) >= 0.9;
              }
              function fire() {
                if (fired) return;
                fired = true;
                if (window.umami) window.umami.track("lp_scroll_90");
                if (window.gtag) window.gtag("event", "lp_scroll_90");
              }
              function onScroll() {
                if (at90()) {
                  fire();
                  window.removeEventListener("scroll", onScroll);
                }
              }
              window.addEventListener("scroll", onScroll, { passive: true });
            })();
          `}
        </Script>

        {/* クリック計測ブリッジ：data-umami-event を GA4 にも送る（Umami側の自動計測は維持） */}
        <Script id="click-bridge" strategy="afterInteractive">
          {`
            (function () {
              document.addEventListener('click', function (e) {
                var a = e.target && e.target.closest && e.target.closest('a[data-umami-event]');
                if (!a || !window.gtag) return;
                var ev = a.getAttribute('data-umami-event') || '';
                // phone / email / line を prefix マッチで転送（*_fixed も含む）
                if (ev.indexOf('lp_phone_click') === 0) window.gtag('event', 'lp_phone_click');
                if (ev.indexOf('lp_email_click') === 0) window.gtag('event', 'lp_email_click');
                if (ev.indexOf('lp_line_click') === 0) window.gtag('event', 'lp_line_click');
              }, { capture: true, passive: true });
            })();
          `}
        </Script>

        {/* 任意: Umami（環境変数があるときのみ読み込み） */}
        {umamiId && umamiSrc ? (
          <Script src={umamiSrc} data-website-id={umamiId} strategy="afterInteractive" />
        ) : null}

        {/* 任意: GA4（環境変数があるときのみ読み込み） */}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}

        {/* ▼ 構造化データ：MedicalClinic のみ（Organization/WebSiteはOFF） */}
        <Script id="ld-json-medical-clinic" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            name: CLINIC.name,
            url: CLINIC.url,
            telephone: CLINIC.tel,
            email: CLINIC.email,
            image: CLINIC.image,
            logo: CLINIC.logo,
            address: {
              "@type": "PostalAddress",
              addressCountry: CLINIC.address.addressCountry,
              addressRegion: CLINIC.address.addressRegion,
              addressLocality: CLINIC.address.addressLocality,
              streetAddress: CLINIC.address.streetAddress,
            },
            sameAs: [],
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "12:30" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "14:00", closes: "18:00" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "12:30" }
            ],
            areaServed: "Japan",
          })}
        </Script>

        {/* Lean方針：余計なUX演出や追加のJSON-LDは不採用 */}
      </body>
    </html>
  );
}
