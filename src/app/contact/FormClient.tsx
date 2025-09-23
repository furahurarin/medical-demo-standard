// src/app/contact/FormClient.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  telDisplay: string;
  telLink: string;
};

type FormState = {
  name: string;
  email: string;
  tel: string;
  subject: string;
  message: string;
  agree: boolean;
  website: string; // honeypot
};

export default function FormClient({ telDisplay, telLink }: Props) {
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    tel: "",
    subject: "",
    message: "",
    agree: false,
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value: string | boolean =
        e.currentTarget.type === "checkbox"
          ? (e.currentTarget as HTMLInputElement).checked
          : e.currentTarget.value;

      // 型安全に更新（型アサーションは FormState へのみ）
      setState((prev) => ({ ...prev, [key]: value } as FormState));
    };

  const validate = () => {
    if (!state.name.trim()) return "お名前を入力してください。";
    if (!state.email.trim()) return "メールアドレスを入力してください。";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.email))
      return "メールアドレスの形式が正しくありません。";
    if (!state.subject.trim()) return "件名を入力してください。";
    if (!state.message.trim()) return "お問い合わせ内容を入力してください。";
    if (!state.agree) return "プライバシーポリシーへの同意が必要です。";
    if (state.website.trim() !== "") return "送信に失敗しました。";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    const err = validate();
    if (err) {
      setResult({ ok: false, msg: err });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error || `HTTP ${res.status}`);
      }
      setResult({ ok: true, msg: "送信しました。担当者より折り返しご連絡いたします。" });
      setState({
        name: "",
        email: "",
        tel: "",
        subject: "",
        message: "",
        agree: false,
        website: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "送信に失敗しました。時間をおいて再度お試しください。";
      setResult({ ok: false, msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* honeypot（画面に見せない） */}
      <div aria-hidden className="hidden">
        <label>
          Webサイト
          <input
            type="text"
            name="website"
            value={state.website}
            onChange={onChange("website")}
            autoComplete="off"
            tabIndex={-1}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium">お名前（必須）</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={onChange("name")}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">メールアドレス（必須）</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={onChange("email")}
            inputMode="email"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">電話番号（任意）</label>
        <input
          type="tel"
          name="tel"
          value={state.tel}
          onChange={onChange("tel")}
          inputMode="tel"
          placeholder="0312345678 など"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">件名（必須）</label>
        <input
          type="text"
          name="subject"
          value={state.subject}
          onChange={onChange("subject")}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">お問い合わせ内容（必須）</label>
        <textarea
          name="message"
          value={state.message}
          onChange={onChange("message")}
          rows={8}
          required
        />
      </div>

      <div className="space-x-2">
        <input
          id="agree"
          type="checkbox"
          checked={state.agree}
          onChange={onChange("agree")}
          required
        />
        <label htmlFor="agree" className="text-sm">
          <Link href="/legal/privacy" className="underline hover:no-underline">
            プライバシーポリシー
          </Link>
          に同意します（必須）
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50 disabled:opacity-50"
        >
          {submitting ? "送信中..." : "送信する"}
        </button>
        <a
          href={`tel:${telLink}`}
          className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
        >
          電話する（{telDisplay}）
        </a>
      </div>

      {result && (
        <p className={`text-sm ${result.ok ? "text-green-600" : "text-red-600"}`}>
          {result.msg}
        </p>
      )}
    </form>
  );
}
