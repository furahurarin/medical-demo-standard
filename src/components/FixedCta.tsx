// src/components/FixedCta.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LINKS } from "@/config/site";

/**
 * 画面右下の固定CTA（LINE予約 / お問い合わせ）
 * - LPには非適用の想定だが、ここでは /contact など一部ページで非表示にする
 * - クリック計測は data-umami-event を付与
 */
export default function FixedCta() {
  const pathname = usePathname();

  // 非表示にしたいパスを必要に応じて追加
  const hideOn = ["/contact", "/legal/privacy"];
  if (hideOn.includes(pathname)) return null;

  return (
    <div
      className="fixed right-4 bottom-4 z-[60] flex flex-col gap-3
                 md:right-6 md:bottom-6"
      aria-label="固定コンバージョン導線"
    >
      {/* LINE予約 */}
      <a
        href={LINKS.lineUrl}
        target="_blank"
        rel="noopener"
        className="shadow-lg rounded-full px-4 py-3 text-sm font-medium
                   bg-white/95 backdrop-blur ring-1 ring-gray-200 hover:bg-white
                   transition inline-flex items-center gap-2"
        data-umami-event="line_click"
        data-umami-event-location="fixed_cta"
      >
        {/* アイコン（簡易） */}
        <span aria-hidden className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
        LINEで予約
      </a>

      {/* お問い合わせ */}
      <Link
        href="/contact"
        className="shadow-lg rounded-full px-4 py-3 text-sm font-medium
                   bg-brand-700 text-white hover:bg-brand-800 transition
                   inline-flex items-center gap-2"
      >
        <span aria-hidden className="inline-block w-2.5 h-2.5 rounded-full bg-white/80" />
        お問い合わせ
      </Link>
    </div>
  );
}
