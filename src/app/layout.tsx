// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/layout/Header";
import MobileDock from "@/components/layout/MobileDock";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // 例: G-XXXXXXX
const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_ID; // 例: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "架空クリニック",
    template: "%s｜架空クリニック",
  },
  description: "地域に根ざした安心の医療を、もっと身近に。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "架空クリニック",
    title: "架空クリニック",
    description: "地域に根ざした安心の医療を、もっと身近に。",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "架空クリニック",
    description: "地域に根ざした安心の医療を、もっと身近に。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-900 pb-[var(--cta-h)] md:pb-0">
        <a href="#main" className="skip-link">本文へスキップ</a>
        <Header />
        <main id="main">{children}</main>
        <MobileDock />

        {/* --- Analytics (オプショナル): 環境変数があれば読み込み --- */}
        {UMAMI_ID ? (
          <Script
            src="https://us.umami.is/script.js"
            data-website-id={UMAMI_ID}
            strategy="afterInteractive"
          />
        ) : null}

        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
