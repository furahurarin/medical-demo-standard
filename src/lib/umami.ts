// src/lib/umami.ts
"use client";

/**
 * Umami イベント計測ヘルパー（関数/track両対応）
 * 既存の型定義と衝突しないように Window 拡張は行いません。
 */

type EventProps = Record<string, string | number | boolean | undefined>;

/** Umami イベント送信（SSRや未設定環境でも安全にノップ） */
export function trackEvent(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;

  // 既存の型に依存せず any で取得して安全に分岐
  const u: any = (window as any).umami;
  if (!u) return;

  try {
    if (typeof u === "function") {
      // 公式スクリプトの形（関数）
      u(event, props);
    } else if (typeof u.track === "function") {
      // 一部デプロイで見られる track メソッド形
      u.track(event, props);
    }

    if (process.env.NODE_ENV === "development") {
      console.debug("[umami]", event, props);
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[umami] trackEvent error:", err);
    }
  }
}

/** よく使うイベント名 */
export const UmamiEvents = {
  ContactSubmit: "contact_submit",
  TelClick: "tel_click",
  MailClick: "mail_click",
  LineClick: "line_click",
  NewsView: "news_view",
} as const;
