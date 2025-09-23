// src/app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import FormClient from "./FormClient";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ｜架空クリニック",
  description: "お問い合わせフォーム。診療のご相談・ご予約・各種お問い合わせはこちらから。",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage(
  {
    searchParams,
  }: {
    // Next.js 15: searchParams は Promise で入ってくる
    searchParams?: Promise<{ error?: string }>;
  }
) {
  // Promise を同期化して取り出し
  const { error } = (await searchParams) ?? {};

  // サーバーアクション：送信処理
  async function submit(formData: FormData) {
    "use server";

    // 1) 値の取得
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();
    const subject = (formData.get("subject") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const website = (formData.get("website") || "").toString().trim(); // honeypot
    const consent = formData.get("consent");

    // 2) ハニーポット：値が入っていたらスパム扱い（成功扱いで破棄）
    if (website.length > 0) {
      console.log("[contact] spam honeypot hit, discarded");
      redirect("/contact/thanks");
    }

    // 3) 簡易バリデーション
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (!name || !emailOk || !message || consent !== "on") {
      redirect("/contact?error=1");
    }

    // 4) 簡易通知：CONTACT_WEBHOOK があれば POST（Slack 等）
    const payload = {
      source: "medical-demo-standard",
      at: new Date().toISOString(),
      name,
      email,
      phone,
      subject,
      message,
    };

    try {
      const url = process.env.CONTACT_WEBHOOK;
      if (url) {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          cache: "no-store",
        });
      } else {
        console.log("[contact] received:", payload);
      }
    } catch (e) {
      console.error("[contact] notify failed:", e);
      // 通知失敗でもユーザー体験を優先してサンクスへ
    }

    // 5) サンクスへ
    redirect("/contact/thanks");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">お問い合わせ</h1>
        <p className="mt-2 text-gray-600">
          診療のご相談・ご予約・各種お問い合わせは、下記フォームまたはお電話・LINEより承ります。
        </p>
        {error && (
          <p className="mt-3 rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">
            入力内容をご確認ください（必須項目・メール形式 など）。
          </p>
        )}
      </header>

      <section className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* フォーム */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <FormClient action={submit} />
        </div>

        {/* 連絡先・予約導線の再掲 */}
        <aside className="rounded-2xl border border-gray-100 bg-white p-6 h-fit">
          <h2 className="text-xl font-semibold">お急ぎの方へ</h2>
          <p className="mt-2 text-sm text-gray-600">
            すぐの連絡が必要な場合は、お電話をご利用ください。
          </p>
          <div className="mt-4 space-y-2">
            <a
              href={CONTACT.telLink}
              className="block rounded-xl border px-4 py-2.5 font-semibold text-brand-700 hover:bg-brand-50 text-center"
            >
              {CONTACT.telDisplay} に電話
            </a>
            <a
              href={CONTACT.lineUrl}
              className="block rounded-xl border px-4 py-2.5 font-semibold text-brand-700 hover:bg-brand-50 text-center"
            >
              LINEで予約
            </a>
            <Link
              href="/access"
              className="block rounded-xl border px-4 py-2.5 font-semibold hover:bg-gray-50 text-center"
            >
              アクセス・診療時間
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            受付時間外は、返信が翌診療日以降となる場合があります。
          </p>
        </aside>
      </section>
    </main>
  );
}
