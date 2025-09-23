// src/lib/mailer.ts
import nodemailer from "nodemailer";

/**
 * 必須環境変数の取得（未設定でもビルドは通し、実行時に明確なエラーを投げる）
 */
function env(name: string, optional = false): string | undefined {
  const v = process.env[name];
  if (!v && !optional) {
    // 実行時に分かるよう明示エラー（開発時は .env を確認）
    throw new Error(`Missing environment variable: ${name}`);
  }
  return v;
}

type MailInput = {
  subject: string;
  text?: string;
  html?: string;
  from?: string; // 省略時は CONTACT_FROM
  to?: string | string[]; // 省略時は CONTACT_TO
  replyTo?: string;
};

/**
 * SMTP トランスポーターを生成
 * - 開発時でも本番でも同じコードで使えるようにする
 * - 465 は secure: true, それ以外は false が一般的
 */
function createTransport() {
  const host = env("SMTP_HOST")!;
  const portStr = env("SMTP_PORT")!;
  const user = env("SMTP_USER")!;
  const pass = env("SMTP_PASS")!;

  const port = Number(portStr);
  const secure = port === 465; // SMTPS の慣習

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

/**
 * 連絡フォームなどから使う汎用メール送信
 */
export async function sendMail(input: MailInput) {
  const transporter = createTransport();

  const defaultFrom = env("CONTACT_FROM")!;
  const defaultTo = env("CONTACT_TO")!;

  const mailOptions = {
    from: input.from ?? defaultFrom,
    to: input.to ?? defaultTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
    replyTo: input.replyTo,
  };

  // nodemailer はエラー時に例外を投げる
  const info = await transporter.sendMail(mailOptions);

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  };
}

/**
 * 送信前の最低限バリデーション（必要に応じて拡張）
 */
export function validateContactPayload(payload: {
  name?: string;
  email?: string;
  message?: string;
}) {
  const errors: Record<string, string> = {};

  if (!payload.name?.trim()) errors.name = "お名前を入力してください。";
  if (!payload.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "メールアドレスを正しく入力してください。";
  }
  if (!payload.message?.trim()) errors.message = "お問い合わせ内容を入力してください。";

  return { ok: Object.keys(errors).length === 0, errors };
}
