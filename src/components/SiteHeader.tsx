// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

type NavItem = { label: string; href: string; prefetch?: boolean };

const NAV: NavItem[] = [
  { label: "診療案内", href: "/services" },
  { label: "医師紹介", href: "/staff" },
  { label: "設備紹介", href: "/facility" },
  { label: "お知らせ", href: "/news" },
  { label: "アクセス", href: "/access" },
  { label: "お問い合わせ", href: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey as (ev: globalThis.KeyboardEvent) => void);
    return () => window.removeEventListener("keydown", onKey as (ev: globalThis.KeyboardEvent) => void);
  }, [open]);

  // Focus the first element when opening
  useEffect(() => {
    if (open) {
      firstFocusableRef.current?.focus();
    }
  }, [open]);

  // Click on overlay to close
  const onOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    // クリック対象がパネル自身の外側（overlay）なら閉じる
    if (e.target === e.currentTarget) close();
  };

  // Trap focus in panel (very lightweight)
  const onKeyDownWithin = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const container = panelRef.current;
    if (!container) return;

    const focusables = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            {/* simple logo placeholder */}
            <span aria-hidden className="inline-block h-6 w-6 rounded bg-blue-600"></span>
            <span className="font-semibold tracking-tight">架空クリニック</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={item.prefetch}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-100"
          >
            フォームで相談
          </Link>
          <a
            href="tel:03-1234-5678"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            03-1234-5678 に電話
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            type="button"
            aria-label="メニューを開く"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={toggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            {/* icon */}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay + panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="モバイルメニュー"
          className="md:hidden fixed inset-0 z-50 bg-black/40"
          onClick={onOverlayClick}
        >
          <div
            ref={panelRef}
            className="ml-auto h-full w-80 max-w-[85%] bg-white shadow-xl animate-in slide-in-from-right duration-200"
            onKeyDown={onKeyDownWithin}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-semibold">メニュー</span>
              <button
                ref={firstFocusableRef}
                type="button"
                aria-label="メニューを閉じる"
                onClick={close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-50"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      prefetch={item.prefetch}
                      className="block rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-2 border-t border-gray-100 p-4 space-y-2">
              <Link
                href="/contact"
                className="block rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800 text-center hover:bg-blue-100"
                onClick={close}
              >
                フォームで相談
              </Link>
              <a
                href="tel:03-1234-5678"
                className="block rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white text-center hover:bg-blue-700"
                onClick={close}
              >
                03-1234-5678 に電話
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
