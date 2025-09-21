// src/app/contact/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ｜架空クリニック",
  description: "受診のご相談、検査の可否、予防接種の空き状況などお気軽にご連絡ください。",
  alternates: { canonical: "/contact" },
};

// Next.js 15 では searchParams が Promise になったため async にする
type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({ searchParams }: { searchParams?: SP }) {
  const sp = (await searchParams) ?? {};
  const okParam = sp.ok;
  const ok = Array.isArray(okParam) ? okParam.includes("1") : okParam === "1";
  const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "#";

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">お問い合わせ</h1>

      {ok ? (
        <p
          className="mt-4 rounded-2xl border bg-green-50 p-4 text-green-800"
          role="status"
          aria-live="polite"
        >
          送信ありがとうございました。担当者より折り返しご連絡いたします。
        </p>
      ) : (
        <p className="mt-4 text-gray-700">
          受診のご相談、検査の可否、予防接種の空き状況など、お気軽にご連絡ください。
        </p>
      )}

      {/* 送信フォーム */}
      <form className="mt-6 space-y-4" method="POST" action="/api/contact">
        {/* honeypot（スパム対策） */}
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

        <div>
          <label className="block text-sm font-medium">
            お名前 <span className="text-red-600">*</span>
          </label>
          <input name="name" required className="mt-1 w-full rounded-2xl border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            メールアドレス <span className="text-red-600">*</span>
          </label>
          <input type="email" name="email" required className="mt-1 w-full rounded-2xl border px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">
            お問い合わせ内容 <span className="text-red-600">*</span>
          </label>
          <textarea name="message" rows={6} required className="mt-1 w-full rounded-2xl border px-3 py-2" />
        </div>

        {/* 同意チェック */}
        <div className="text-sm text-gray-600">
          <label className="inline-flex items-start gap-2">
            <input type="checkbox" name="consent" required className="mt-1" />
            <span>
              <a href="/legal/privacy" className="underline">プライバシーポリシー</a> に同意します
            </span>
          </label>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-2xl bg-brand-700 px-4 py-2 font-medium text-white hover:bg-brand-800"
          data-umami-event="lp_form_submit"
        >
          送信する
        </button>
      </form>

      <div className="mt-8 text-sm text-gray-600">
        <p>
          電話：<a href="tel:0312345678" className="underline" data-umami-event="lp_phone_click">03-1234-5678</a>
        </p>
        <p className="mt-1">
          LINE予約：<a href={lineUrl} className="underline" data-umami-event="lp_line_click">こちら</a>
        </p>
      </div>
    </main>
  );
}
