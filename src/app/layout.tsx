// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";
import JsonLdLocalBusiness from "@/components/seo/JsonLdLocalBusiness";

// ★ 実案件化で差し替えやすいよう最低限のNAPをここに集約
const CLINIC_NAME = "架空クリニック";
const ADDRESS = "東京都千代田区丸の内1-1-1";
const TEL_DISPLAY = "03-1234-5678";
const TEL_LINK = "0312345678";
const LINE_URL = "https://line.me/"; // ※運用時に公式アカウントURLへ差し替え

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Skip link */}
        <a href="#main" className="skip-link">本文へスキップ</a>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="font-semibold text-lg hover:opacity-80">
                {CLINIC_NAME}
              </Link>
            </div>

            <nav aria-label="グローバル" className="ml-auto">
              <ul className="flex items-center gap-5 text-sm">
                <li><Link href="/services" className="hover:underline">診療案内</Link></li>
                <li><Link href="/staff" className="hover:underline">医師・スタッフ</Link></li>
                <li><Link href="/facility" className="hover:underline">設備紹介</Link></li>
                <li><Link href="/access" className="hover:underline">アクセス</Link></li>
                <li>
                  <a href={LINE_URL} target="_blank" rel="noopener" className="hover:underline">
                    LINEで予約
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border hover:bg-gray-50">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </nav>

            {/* TEL（控えめ表示。SPではfooterでも案内するため冗長にならない程度に） */}
            <div className="hidden sm:block text-sm text-gray-700">
              <a href={`tel:${TEL_LINK}`} className="hover:underline">
                {TEL_DISPLAY}
              </a>
            </div>
          </div>
        </header>

        {/* Main */}
        <main id="main">{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="font-semibold">{CLINIC_NAME}</div>
              <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                住所：{ADDRESS}
              </div>
              <div className="mt-1 text-sm">
                電話：
                <a href={`tel:${TEL_LINK}`} className="hover:underline">
                  {TEL_DISPLAY}
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
                <a href={LINE_URL} target="_blank" rel="noopener" className="inline-flex w-fit rounded-lg px-3 py-2 border hover:bg-gray-50">
                  LINEで予約
                </a>
                <Link href="/contact" className="inline-flex w-fit rounded-lg px-3 py-2 border hover:bg-gray-50">
                  フォームで相談する
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 py-6">
            © {new Date().getFullYear()} {CLINIC_NAME}
          </div>
        </footer>

        {/* ▼ 構造化データ（ローカルビジネス/クリニック） */}
        <JsonLdLocalBusiness
          name={CLINIC_NAME}
          url={process.env.NEXT_PUBLIC_SITE_URL}
          telephone={TEL_DISPLAY}
          streetAddress={ADDRESS}
          addressCountry="JP"
          openingHours={[
            "Mo,Tu,We,Fr 09:00-12:30",
            "Mo,Tu,We,Fr 14:30-18:00",
            "Th 09:00-12:30",
            "Sa 09:00-12:30",
          ]}
        />
      </body>
    </html>
  );
}
