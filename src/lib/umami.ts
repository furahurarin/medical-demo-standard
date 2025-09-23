// src/lib/umami.ts

// よく使うイベント名（必要に応じて追加）
export const UmamiEvents = {
  ContactSubmit: "contact_submit",
  TelClick: "tel_click",
  MailClick: "mail_click",
  LineClick: "line_click",
  NewsView: "news_view",
} as const;

export type EventName = (typeof UmamiEvents)[keyof typeof UmamiEvents];
type EventProps = Record<string, unknown>;

function hasTrackMethod(u: unknown): u is { track: (event: string, props?: EventProps) => void } {
  if (typeof u !== "object" || u === null) return false;
  const rec = u as Record<string, unknown>;
  return typeof rec["track"] === "function";
}

/** Umami イベント送信用ヘルパー（関数形 / trackメソッド形の両対応） */
export function trackEvent(event: EventName, props?: EventProps): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    umami?:
      | ((event: string, data?: EventProps) => void)
      | { track: (event: string, props?: EventProps) => void };
  };

  const u = w.umami;
  if (!u) return;

  try {
    if (typeof u === "function") {
      u(event, props);
    } else if (hasTrackMethod(u)) {
      u.track(event, props);
    }
    if (process.env.NODE_ENV === "development") {
      console.debug("[umami]", event, props);
    }
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.error("[umami] trackEvent error");
    }
  }
}
