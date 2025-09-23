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

      // 電話番号は入力時に半角数字とハイフン以外を除去（視認性を損ねない軽い整形）
      if (key === "tel" && typeof value === "string") {
        const digits = value.replace(/[^\d-]/g, "");
        setState((prev) => ({ ...prev, [key]: digits } as FormState));
      } else {
        setState((prev) => ({ ...prev, [key]: value } as FormState));
      }
    };

  // 日本の一般的な電話番号の簡易フォーマッタ（03/06は2-4-4、携帯や11桁は3-4-4、その他は3-3-4 に近づける）
  const formatPhoneJP = (raw: string) => {
    const d = raw.replace(/\D/g, "");
    if (d.length === 0) return "";
    if (/^(03|06)\d{8}$/.test(d)) return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6)}`;
    if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
    return raw; // 桁数が揃わない途中入力はそのまま
  };

  const onBlurTel = () => {
    setState((prev) => ({ ...prev, tel: formatPhoneJP(prev.tel) }));
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
      const msg =
        err instanceof Error ? err.message : "送信に失敗しました。時間をおいて再度お試しください。";
      setResult({ ok: false, msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 motion-fadein" noValidate>
      {/* honeypot（画面に見せない） */}
      <div aria-hidden className="sr-only">
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
          <label htmlFor="name" className="block text-sm font-medium">お名前（必須）</label>
          <input
            id="name"
            type="text"
            name="name"
            value={state.name}
            onChange={onChange("name")}
            autoComplete="name"
            aria-required="true"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium">メールアドレス（必須）</label>
          <input
            id="email"
            type="email"
            name="email"
            value={state.email}
            onChange={onChange("email")}
            inputMode="email"
            autoComplete="email"
            aria-required="true"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="tel" className="block text-sm font-medium">電話番号（任意）</label>
        <input
          id="tel"
          type="tel"
          name="tel"
          value={state.tel}
          onChange={onChange("tel")}
          onBlur={onBlurTel}
          inputMode="tel"
          autoComplete="tel"
          placeholder="03-1234-5678 / 090-1234-5678 など"
          pattern="[\d\-]*"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="subject" className="block text-sm font-medium">件名（必須）</label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={state.subject}
          onChange={onChange("subject")}
          autoComplete="off"
          aria-required="true"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium">お問い合わせ内容（必須）</label>
        <textarea
          id="message"
          name="message"
          value={state.message}
          onChange={onChange("message")}
          rows={8}
          aria-required="true"
          required
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="agree"
          type="checkbox"
          checked={state.agree}
          onChange={onChange("agree")}
          required
          aria-required="true"
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
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${result.ok ? "text-green-600" : "text-red-600"}`}
        >
          {result.msg}
        </p>
      )}
    </form>
  );
}
