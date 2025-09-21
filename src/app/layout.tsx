// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";

const font = Noto_Sans_JP({
  subsets: ["latin"], // Noto Sans JP はこれでOK（重量抑制）
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const OGP_URL = "/ogp.png"; // ← PNGに変更（SNSでの表示安定のため）

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
  title: "架空クリニック｜医療LPデモ",
  description:
    "“病院/クリニックらしい”1ページLPのショーケース。電話・メール導線のみ、短納期で導入可能。",
  // 検証URLでは noindex、本番では index
  robots:
    SITE_URL.includes("localhost") || SITE_URL.includes("127.0.0.1")
      ? { index: false, follow: false }
      : { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "架空クリニック｜医療LPデモ",
    description:
      "“病院/クリニックらしい”1ページLPのショーケース。電話・メール導線のみ、短納期で導入可能。",
    url: "/",
    images: [{ url: OGP_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OGP_URL],
    title: "架空クリニック｜医療LPデモ",
    description:
      "“病院/クリニックらしい”1ページLPのショーケース。電話・メール導線のみ、短納期で導入可能。",
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
        {/* メインコンテンツ */}
        {children}

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
                // phone / email の両方を prefix マッチで転送（*_fixed も含む）
                if (ev.indexOf('lp_phone_click') === 0) window.gtag('event', 'lp_phone_click');
                if (ev.indexOf('lp_email_click') === 0) window.gtag('event', 'lp_email_click');
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
