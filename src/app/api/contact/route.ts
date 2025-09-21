// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // ① フォームデータ取得
  const form = await req.formData();

  // ② ハニーポット（ボット防止）
  const honeypot = String(form.get("company") || "");
  if (honeypot.trim()) {
    return NextResponse.json({ ok: false, reason: "bot" }, { status: 400 });
  }

  // ③ 必須項目
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();
  const consent = form.get("consent"); // チェックされていれば "on"

  if (!name || !email || !message || !consent) {
    return NextResponse.json({ ok: false, reason: "missing" }, { status: 400 });
  }

  // ④ ここで本番はメール送信や外部連携を実施（Resend/SES/Slack等）
  // try {
  //   await resend.emails.send({ ... });
  // } catch (e) {
  //   console.error("[CONTACT:send_error]", e);
  //   return NextResponse.json({ ok: false }, { status: 500 });
  // }

  // ひとまずサーバーログに出す（開発用）
  console.log("[CONTACT]", { name, email, message });

  // ⑤ サンクス表示へリダイレクト（303 See Other）
  const url = new URL("/contact?ok=1", req.url);
  return NextResponse.redirect(url, { status: 303 });
}
