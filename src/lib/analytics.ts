// src/lib/analytics.ts
"use client";

declare global {
  interface Window {
    umami?: (event: string, data?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

type EventData = Record<string, unknown>;

/**
 * イベント送信（Umami 優先、なければ GA4）
 */
export function track(event: string, data?: EventData): void {
  if (typeof window === "undefined") return;

  if (typeof window.umami === "function") {
    window.umami(event, data);
    return;
  }

  if (typeof window.gtag === "function") {
    // GA4 では 'event' コマンド
    window.gtag("event", event, data ?? {});
  }
}

/**
 * ページ表示の記録（GA4 がある場合のみ）
 */
export function pageview(path: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  // 推奨: page_view イベント
  window.gtag("event", "page_view", { page_path: path });
}
