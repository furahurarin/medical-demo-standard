// src/components/layout/Header.tsx
"use client";
import Link from "next/link";
import CTAButton from "@/components/cta/CTAButton";
import { CONTACT, BRAND } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 h-[var(--header-height)] flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          {BRAND.name}
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/services" className="text-gray-700 hover:text-gray-900">
            診療案内
          </Link>
          <Link href="/staff" className="text-gray-700 hover:text-gray-900">
            医師・スタッフ
          </Link>
          <Link href="/facility" className="text-gray-700 hover:text-gray-900">
            設備紹介
          </Link>
          <Link href="/access" className="text-gray-700 hover:text-gray-900">
            アクセス
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <CTAButton href={CONTACT.lineUrl} label="LINEで予約" external />
          <CTAButton href={CONTACT.formPath} label="お問い合わせ" variant="primary" />
        </div>
        {/* SP: 右側にシンプルなTELボタン（ハンバーガーは既存があればそれを使用） */}
        <div className="md:hidden">
          <CTAButton href={CONTACT.telLink} label={CONTACT.telDisplay} external size="md" variant="ghost" />
        </div>
      </div>
    </header>
  );
}
