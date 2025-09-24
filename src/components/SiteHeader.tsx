'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE, LINKS, NAP } from "@/config/site";

/**
 * 配色は既存スタイルに合わせて最小限：
 * - 背景: 白
 * - 境界線: border-gray-100
 * - テキスト: text-gray-900
 * - リンク: hover:underline
 * - CTA: .btn-primary（既存globals.cssのブランド色を使用）
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // ESCで閉じ、開いている間は背面スクロール固定
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const NAV = [
    { href: "/services", label: "診療案内" },
    { href: "/staff", label: "医師・スタッフ" },
    { href: "/facility", label: "設備紹介" },
    { href: "/access", label: "アクセス" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
        {/* 左：サイト名 */}
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold text-lg hover:underline">
            {SITE.name}
          </Link>
        </div>

        {/* 右：MD+ ナビ */}
        <nav aria-label="グローバル" className="hidden md:block ml-auto">
          <ul className="flex items-center gap-5 text-sm text-gray-900">
            {NAV.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="hover:underline">
                  {it.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={LINKS.lineUrl}
                target="_blank"
                rel="noopener"
                className="hover:underline"
                data-umami-event="line_click"
                data-umami-event-location="header"
              >
                LINEで予約
              </a>
            </li>
            <li>
              <Link href="/contact" className="btn-primary">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>

        {/* TEL（MD+で控えめに表示） */}
        <div className="hidden md:block text-sm text-gray-900">
          <a
            href={`tel:${NAP.telLink}`}
            className="hover:underline"
            data-umami-event="tel_click"
            data-umami-event-location="header"
          >
            {NAP.telDisplay}
          </a>
        </div>

        {/* SP：メニューボタン（配色はテキストのみで最小限） */}
        <div className="md:hidden ml-auto">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 text-sm text-gray-900"
          >
            <span className="sr-only">メニューを開く</span>
            {/* アイコン（素の線3本・色はcurrentColor） */}
            <span aria-hidden className="block w-5 h-[2px] bg-current relative">
              <span className="absolute -top-1.5 block w-5 h-[2px] bg-current" />
              <span className="absolute top-1.5 block w-5 h-[2px] bg-current" />
            </span>
            メニュー
          </button>
        </div>
      </div>

      {/* SP：オーバーレイ & ドロワー（配色は白 + 最小限のグレー） */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          id="mobile-menu"
        >
          {/* 背景 */}
          <button
            aria-label="メニューを閉じる（背景）"
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          {/* パネル */}
          <div className="ml-auto h-full w-80 max-w-[85%] bg-white shadow-xl flex flex-col">
            <div className="h-14 px-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">メニュー</span>
              <button
                onClick={() => setOpen(false)}
                className="text-sm hover:underline"
              >
                閉じる
              </button>
            </div>
            <nav className="p-3 grow overflow-y-auto text-gray-900">
              <ul className="space-y-0.5">
                {NAV.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-[15px] hover:underline"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
                <a
                  href={LINKS.lineUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-[15px] hover:underline"
                  data-umami-event="line_click"
                  data-umami-event-location="header_drawer"
                >
                  LINEで予約
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary inline-block"
                >
                  お問い合わせ
                </Link>
                <div className="text-sm pt-1">
                  <a
                    href={`tel:${NAP.telLink}`}
                    onClick={() => setOpen(false)}
                    className="hover:underline"
                    data-umami-event="tel_click"
                    data-umami-event-location="header_drawer"
                  >
                    {NAP.telDisplay}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
