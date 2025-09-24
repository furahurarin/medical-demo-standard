// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

import ClientRoot from "@/components/ClientRoot";
import JsonLdLocalBusiness from "@/components/seo/JsonLdLocalBusiness";
import { SITE, NAP, LINKS, MEDIA } from "@/config/site";
import Umami from "@/components/analytics/Umami";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s｜${SITE.name}`,
  },
  description: `${SITE.name}の公式サイト。アクセス・診療案内・お問い合わせはこちら。`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.name,
    description: `${SITE.name}の公式サイト。アクセス・診療案内・お問い合わせはこちら。`,
    images: [MEDIA.ogp],
  },
  twitter: {
    card: "summary_large_image",
    images: [MEDIA.ogp],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Skip link */}
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>

        {/* Header（SPはメニュー、MD+は横並び） */}
        <SiteHeader />

        {/* Main with client-side transition */}
        <main id="main">
          <ClientRoot>{children}</ClientRoot>
        </main>

        {/* Footer（既存配色・書式を踏襲） */}
        <footer className="mt-16 border-t border-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="font-semibold">{SITE.name}</div>
              <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                住所：{NAP.address}
              </div>
              <div className="mt-1 text-sm">
                電話：
                <a
                  href={`tel:${NAP.telLink}`}
                  className="hover:underline"
                  data-umami-event="tel_click"
                  data-umami-event-location="footer"
                >
                  {NAP.telDisplay}
                </a>
              </div>
            </div>
            <div>
              <div className="font-semibold">サイトマップ</div>
              <ul className="mt-2 text-sm space-y-1">
                <li><Link href="/" className="hover:underline">トップ</Link></li>
                <li><Link href="/services" className="hover:underline">診療案内</Link></li>
                <li><Link href="/staff" className="hover:underline">医師・スタッフ</Link></li>
                <li><Link href="/facility" className="hover:underline">設備紹介</Link></li>
                <li><Link href="/access" className="hover:underline">アクセス</Link></li>
                <li><Link href="/contact" className="hover:underline">お問い合わせ</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">ご予約・お問い合わせ</div>
              <div className="mt-2 flex flex-col gap-2 text-sm">
                <a
                  href={LINKS.lineUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex w-fit rounded-lg px-3 py-2 border hover:bg-gray-50"
                  data-umami-event="line_click"
                  data-umami-event-location="footer"
                >
                  LINEで予約
                </a>
                <Link href="/contact" className="btn-primary w-fit">
                  フォームで相談する
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 py-6">
            © {new Date().getFullYear()} {SITE.name}
          </div>
        </footer>

        {/* 構造化データ */}
        <JsonLdLocalBusiness
          name={SITE.name}
          url={SITE.url}
          telephone={NAP.telDisplay}
          streetAddress={NAP.address}
          addressCountry="JP"
          openingHours={[
            "Mo,Tu,We,Fr 09:00-12:30",
            "Mo,Tu,We,Fr 14:30-18:00",
            "Th 09:00-12:30",
            "Sa 09:00-12:30",
          ]}
        />

        {/* Analytics */}
        <Umami />
      </body>
    </html>
  );
}
