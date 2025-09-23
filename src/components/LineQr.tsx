// src/components/LineQr.tsx
"use client";

import Image from "next/image";
import { LINKS } from "@/config/site";

/**
 * LINE 公式アカウントのQR掲示（/public/line-qr.png を想定）
 * - クリックは Umami で計測（data-umami-event）
 * - alt は汎用文言、必要に応じて編集してください
 */
export default function LineQr({
  title = "LINEで予約・相談",
  subtitle = "公式アカウントを友だち追加",
  src = "/line-qr.png",
}: {
  title?: string;
  subtitle?: string;
  src?: string; // 例: "/images/line-qr.png"
}) {
  return (
    <div className="card p-5 space-y-3">
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-gray-600">{subtitle}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-white">
          <Image
            src={src}
            alt="LINE公式アカウントQRコード"
            fill
            sizes="128px"
            className="object-contain"
            priority={false}
          />
        </div>

        <a
          href={LINKS.lineUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center rounded-lg px-3 py-2 border hover:bg-gray-50 text-sm"
          data-umami-event="line_click"
          data-umami-event-location="line_qr_box"
        >
          LINEを開く
        </a>
      </div>
    </div>
  );
}
