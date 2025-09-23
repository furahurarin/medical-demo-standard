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
};

// ---- 超シンプルRate Limit（同一インスタンス内/1分あたり5回）----
const WINDOW_MS = 60_000;
const MAX_REQ = 5;

// Map<string, number[]> を global に保持
const RATE: Map<string, number[]> =
  ((globalThis as unknown as { __contact_rate__?: Map<string, number[]> }).__contact_rate__) ??
  new Map<string, number[]>();

(globalThis as unknown as { __contact_rate__?: Map<string, number[]> }).__contact_rate__ = RATE;

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "0.0.0.0";
}
function isLimited(ip: string) {
  const now = Date.now();
  const prev = RATE.get(ip) ?? [];
  const arr: number[] = prev.filter((t: number) => now - t < WINDOW_MS);
  if (arr.length >= MAX_REQ) return true;
  arr.push(now);
  RATE.set(ip, arr);
  return false;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// ---- メール送信（SMTPが未設定ならログ出力のみで成功扱い）----
async function sendMail(subject: string, text: string) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.log("[contact] Mail disabled (no SMTP_HOST). Payload:\n", { subject, text });
    return;
  }

  // dynamic import に厳密な型を付ける
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

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, tel = "", subject, message, agree, website = "" } = body;

  // honeypot（ボットは成功扱いで弾く）
  if (website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim()) return NextResponse.json({ error: "name is required" }, { status: 400 });
  if (!email?.trim() || !isEmail(email))
    return NextResponse.json({ error: "valid email is required" }, { status: 400 });
  if (!subject?.trim()) return NextResponse.json({ error: "subject is required" }, { status: 400 });
  if (!message?.trim()) return NextResponse.json({ error: "message is required" }, { status: 400 });
  if (agree === false) return NextResponse.json({ error: "privacy agreement required" }, { status: 400 });

  const text = `【お問い合わせ】${subject}
────────────────────
お名前: ${name}
メール: ${email}
電話  : ${tel}
IP    : ${ip}
日時  : ${new Date().toISOString()}
────────────────────
${message}
`;

  try {
    await sendMail(`【サイト問い合わせ】${subject}`, text);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[contact] mail error", err);
    return NextResponse.json({ error: "send failed" }, { status: 500 });
  }
}
