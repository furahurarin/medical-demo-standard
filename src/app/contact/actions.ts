// src/app/contact/actions.ts
"use server";

import { headers } from "next/headers";
import { sendMail, validateContactPayload } from "@/lib/mailer";
import { SITE } from "@/config/site";

export type ContactState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // --- 1) 取得
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  // スパム軽減：ハニーポット/送信までの経過時間
  const website = String(formData.get("website") || ""); // 画面に出さないダミー
  const ts = Number(formData.get("ts") || 0);
  const now = Date.now();

  // --- 2) 早期拒否（スパム条件）
  if (website) {
    return { ok: false, message: "不正な送信の可能性があるため拒否しました。" };
  }
  if (ts && now - ts < 2000) {
    // 2秒未満での即送信はBotの可能性が高い
    return { ok: false, message: "送信が早すぎます。もう一度お試しください。" };
  }

  // --- 3) 入力バリデーション
  const { ok, errors } = validateContactPayload({ name, email, message });
  if (!ok) {
    return { ok: false, errors, message: "入力内容をご確認ください。" };
  }

  // --- 4) メール本文
  const hdrs = await headers(); // ★ ここを await に
  const ua = hdrs.get("user-agent") || "";
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    hdrs.get("cf-connecting-ip") || // Cloudflare等
    "unknown";

  const subject = `【お問い合わせ】${SITE.name} (${name} 様)`;
  const text = [
    `サイト名: ${SITE.name}`,
    `お名前: ${name}`,
    `メール: ${email}`,
    `---`,
    `${message}`,
    `---`,
    `IP: ${ip}`,
    `UA: ${ua}`,
    `日時: ${new Date().toLocaleString("ja-JP")}`,
  ].join("\n");

  const html = `
    <h2>お問い合わせ</h2>
    <p><strong>サイト名:</strong> ${SITE.name}</p>
    <p><strong>お名前:</strong> ${escapeHtml(name)}</p>
    <p><strong>メール:</strong> ${escapeHtml(email)}</p>
    <hr />
    <pre style="white-space:pre-wrap;font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">${escapeHtml(
      message
    )}</pre>
    <hr />
    <p style="color:#666;font-size:12px">
      IP: ${escapeHtml(ip)}<br/>
      UA: ${escapeHtml(ua)}<br/>
      Datetime: ${escapeHtml(new Date().toISOString())}
    </p>
  `;

  // --- 5) 送信
  try {
    await sendMail({
      subject,
      text,
      html,
      replyTo: email,
    });
    return { ok: true, message: "送信しました。担当者より折り返しご連絡します。" };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      message:
        "送信に失敗しました。しばらく経ってからもう一度お試しください。設定に問題がある場合は管理者へご連絡ください。",
    };
  }
}

// 小さなHTMLエスケープ（最低限）
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
