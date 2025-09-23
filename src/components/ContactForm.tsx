// src/components/ContactForm.tsx
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { ContactState } from "@/app/contact/actions";
import { submitContact } from "@/app/contact/actions";
import Link from "next/link";
import { trackEvent, UmamiEvents } from "@/lib/umami";

const initialState: ContactState = { ok: false };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [ts, setTs] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  // マウント時にタイムスタンプをセット（超高速送信のBot検出）
  useEffect(() => {
    setTs(Date.now());
  }, []);

  // 送信成功時はフォームをリセット＋計測
  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setTs(Date.now());
      // Umami 計測（成功送信のみ）
      trackEvent(UmamiEvents.ContactSubmit, { source: "contact_page" });
    }
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {/* お名前 */}
      <div>
        <label className="block text-sm font-medium">お名前</label>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="山田 太郎"
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
        )}
      </div>

      {/* メール */}
      <div>
        <label className="block text-sm font-medium">メールアドレス</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="you@example.jp"
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      {/* 本文 */}
      <div>
        <label className="block text-sm font-medium">お問い合わせ内容</label>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-1 w-full rounded-lg border px-3 py-2"
          placeholder="ご相談内容をご記入ください。"
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-red-600">{state.errors.message}</p>
        )}
      </div>

      {/* 同意 */}
      <div className="text-sm text-gray-700">
        送信により
        <Link href="/legal/privacy" className="underline hover:no-underline">
          プライバシーポリシー
        </Link>
        に同意したものとみなします。
      </div>

      {/* 送信ボタン */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary inline-flex items-center"
        >
          {pending ? "送信中…" : "送信する"}
        </button>
      </div>

      {/* 送信結果 */}
      {state.message && (
        <div
          className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
            state.ok
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </div>
      )}

      {/* --- スパム対策：画面には見せないフィールド群 --- */}
      <input type="hidden" name="ts" value={ts} />
      <div aria-hidden="true" className="hidden">
        <label>
          サイト（空欄のまま送信してください）
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </form>
  );
}
