"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

type Props = {
  action: (formData: FormData) => Promise<void>;
};

export default function FormClient({ action }: Props) {
  const [pending, setPending] = useState(false);

  return (
    <form
      action={async (fd) => {
        setPending(true);
        try {
          track("form_submit", { form: "contact" });
        } catch {}
        await action(fd);
      }}
      className="grid md:grid-cols-2 gap-6"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">お名前 <span className="text-red-600">*</span></label>
          <input
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            placeholder="山田 太郎"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">メールアドレス <span className="text-red-600">*</span></label>
          <input
            name="email"
            type="email"
            required
            inputMode="email"
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            placeholder="you@example.jp"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">電話番号</label>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            pattern="[0-9\\-+ ]*"
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            placeholder="0312345678"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">件名</label>
          <input
            name="subject"
            type="text"
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            placeholder="受診のご相談 など"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">お問い合わせ内容 <span className="text-red-600">*</span></label>
          <textarea
            name="message"
            required
            rows={8}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
            placeholder="ご相談内容・症状・ご希望日時などがあればご記入ください。"
          />
        </div>

        {/* ハニーポット（ボット用の隠しフィールド） */}
        <div className="hidden">
          <label>あなたのWebサイト</label>
          <input name="website" type="text" autoComplete="off" />
        </div>

        <div className="flex items-start gap-2 text-sm">
          <input required id="consent" name="consent" type="checkbox" className="mt-1" />
          <label htmlFor="consent" className="text-gray-700">
            送信にあたり、入力内容に虚偽がないことに同意します。
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-xl bg-brand-700 text-white px-5 py-3 font-semibold hover:bg-brand-800 disabled:opacity-60"
          >
            {pending ? "送信中..." : "送信する"}
          </button>
          <button
            type="reset"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
          >
            リセット
          </button>
        </div>

        <p className="text-xs text-gray-500">
          送信後は確認画面に移動します。お急ぎの方はお電話でもどうぞ。
        </p>
      </div>
    </form>
  );
}
