// src/components/analytics/Umami.tsx
"use client";

import Script from "next/script";

/**
 * Umami 計測スクリプト挿入用コンポーネント
 *
 * 必要な環境変数:
 * - NEXT_PUBLIC_UMAMI_WEBSITE_ID: Umami の website-id（UUID）
 * - NEXT_PUBLIC_UMAMI_SCRIPT_URL: スクリプトの完全URL（例: https://analytics.example.com/script.js）
 *
 * どちらか未設定なら何も描画しません（本番のみ有効化したい場合に便利）。
 */
export default function Umami() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

  if (!websiteId || !scriptUrl) return null;

  return (
    <Script
      async
      defer
      src={scriptUrl}
      data-website-id={websiteId}
      // 任意: 自動外部リンク計測・キャッシュ最適化
      data-auto-track="true"
      data-cache="true"
    />
  );
}
