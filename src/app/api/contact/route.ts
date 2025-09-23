// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name: string;
  email: string;
  tel?: string;
  subject: string;
  message: string;
  agree?: boolean;
  website?: string; // honeypot
  captcha?: string; // （任意）reCAPTCHA/hCaptcha トークンを送る場合
};

/* =========================
   超軽量レートリミット（同一インスタンス内 / 1分5回）
   - IP + UA をキーにして誤検知を軽減
   ========================= */
const WINDOW_MS = 60_000;
const MAX_REQ = 5;

type Bucket = Map<string, number[]>;
const RATE: Bucket =
  ((globalThis as unknown as { __contact_rate__?: Bucket }).__contact_rate__) ?? new Map();

(globalThis as unknown as { __contact_rate__?: Bucket }).__contact_rate__ = RATE;

function keyFromReq(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "0.0.0.0";
  const ua = req.headers.get("user-agent") || "unknown";
  return `${ip}__${ua.slice(0, 80)}`;
}
function isLimited(key: string) {
  const now = Date.now();
  const prev = RATE.get(key) ?? [];
  const arr = prev.filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_REQ) return true;
  arr.push(now);
  RATE.set(key, arr);
  return false;
}

/* =========================
   バリデーション & サニタイズ
   ========================= */
const MAX = {
  name: 100,
  email: 254,
  tel: 32,
  subject: 120,
  message: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeSubject(v: string) {
  // ヘッダインジェクション対策：改行を除去
  return v.replace(/[\r\n]+/g, " ").trim().slice(0, MAX.subject);
}
function sanitizeMultiline(v: string) {
  return v.replace(/\r\n?/g, "\n").slice(0, MAX.message);
}
function sanitizeLine(v: string, max: number) {
  return v.replace(/\r|\n/g, " ").trim().slice(0, max);
}

function validate(payload: Payload) {
  const errors: string[] = [];
  const name = sanitizeLine(payload.name || "", MAX.name);
  const email = sanitizeLine((payload.email || "").toLowerCase(), MAX.email);
  const tel = sanitizeLine(payload.tel || "", MAX.tel);
  const subject = sanitizeSubject(payload.subject || "");
  const message = sanitizeMultiline(payload.message || "");
  const agree = payload.agree;

  if (!name) errors.push("name");
  if (!email || !EMAIL_RE.test(email)) errors.push("email");
  if (!subject) errors.push("subject");
  if (!message) errors.push("message");
  if (agree === false) errors.push("agree");

  return {
    ok: errors.length === 0,
    errors,
    value: { name, email, tel, subject, message },
  };
}

/* =========================
   （任意）Captcha 検証
   - 環境変数が設定され、かつ payload.captcha がある時のみ検証
   - 失敗しても安全側（エラー）に倒すが、未設定ならスキップ
   ========================= */
async function verifyCaptchaIfPresent(token?: string) {
  const secret = process.env.RECAPTCHA_SECRET || process.env.HCAPTCHA_SECRET;
  if (!secret || !token) return true; // 未設定 or トークン無しはスキップ（現状のUIは未対応のため）
  const isHcaptcha = Boolean(process.env.HCAPTCHA_SECRET);
  const url = isHcaptcha
    ? "https://hcaptcha.com/siteverify"
    : "https://www.google.com/recaptcha/api/siteverify";

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);

  try {
    const res = await fetch(url, { method: "POST", body: form });
    const data = (await res.json()) as { success?: boolean; score?: number };
    if (!data.success) return false;
    // reCAPTCHA v3 の場合はスコアが極端に低ければ弾く（0.3 未満など）
    if (typeof data.score === "number" && data.score < 0.3) return false;
    return true;
  } catch {
    // 外部APIエラー時は通さない（安全側）
    return false;
  }
}

/* =========================
   メール送信
   - SMTP 未設定ならログして成功扱い
   ========================= */
async function sendMail(subject: string, text: string) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.log("[contact] Mail disabled (no SMTP_HOST). Payload:\n", { subject, text });
    return;
  }
  const mod = (await import("nodemailer")) as typeof import("nodemailer");
  const transporter = mod.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });
  const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
  const from = process.env.CONTACT_FROM || process.env.SMTP_USER!;
  await transporter.sendMail({ from, to, subject, text });
}

/* =========================
   ハンドラ
   ========================= */
export async function POST(req: Request) {
  // Content-Type をチェック（JSONのみ許可）
  const ctype = req.headers.get("content-type") || "";
  if (!ctype.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported Media Type" }, { status: 415 });
  }

  const key = keyFromReq(req);
  if (isLimited(key)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // honeypot（ボットには成功っぽく返す）
  if ((body.website || "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Validate
  const v = validate(body);
  if (!v.ok) {
    return NextResponse.json({ error: "invalid fields", fields: v.errors }, { status: 400 });
  }

  // （任意）Captcha 検証
  const captchaOk = await verifyCaptchaIfPresent(body.captcha);
  if (!captchaOk) {
    return NextResponse.json({ error: "captcha failed" }, { status: 400 });
  }

  // 送信用テキスト生成（安全な値のみ使用）
  const ua = req.headers.get("user-agent") || "unknown";
  const fwd = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "0.0.0.0";
  const nowIso = new Date().toISOString();

  const text = `【お問い合わせ】${v.value.subject}
────────────────────
お名前: ${v.value.name}
メール: ${v.value.email}
電話  : ${v.value.tel || "-"}
IP    : ${fwd}
UA    : ${ua}
日時  : ${nowIso}
────────────────────
${v.value.message}
`;

  try {
    await sendMail(`【サイト問い合わせ】${v.value.subject}`, text);
    // 成功時はキャッシュ不可 & セキュリティ系ヘッダを軽く
    return NextResponse.json(
      { ok: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Referrer-Policy": "no-referrer",
        },
      }
    );
  } catch (err) {
    console.error("[contact] mail error", err);
    return NextResponse.json({ error: "send failed" }, { status: 500 });
  }
}
