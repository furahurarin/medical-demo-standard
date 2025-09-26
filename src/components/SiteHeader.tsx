// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE, NAP } from "@/config/site";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/", label: "トップ" },
  { href: "/services", label: "診療案内" },
  { href: "/staff", label: "医師・スタッフ" },
  { href: "/facility", label: "院内設備" },
  { href: "/access", label: "アクセス" },
  { href: "/contact", label: "お問い合わせ" },
];

// NAPのtel系を安全に文字列化
function normalizeTelHref(raw: unknown): string {
  if (typeof raw !== "string") return "";
  const digits = raw.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const panelRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<Element | null>(null);

  // tel: を作成（any禁止対応）
  const telHref = useMemo(() => {
    const nap = NAP as { telLink?: string; telDisplay?: string } | undefined;
    return normalizeTelHref(nap?.telLink ?? nap?.telDisplay);
  }, []);

  // ルート遷移で閉じる
  useEffect(() => setOpen(false), [pathname]);

  // スクロール影
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 開閉時のDOM更新（LPのScript相当、式ではなく通常の文で）
  useEffect(() => {
    const html = document.documentElement;
    const overlay = document.getElementById("menu-overlay");
    const panel = document.getElementById("menu-panel");

    html.setAttribute("data-menu-open", open ? "true" : "false");
    if (!overlay || !panel) return;

    if (open) {
      overlay.classList.remove("pointer-events-none");
      overlay.classList.add("opacity-100");
      panel.classList.remove("translate-x-full");
      panel.classList.add("translate-x-0");
      document.body.style.overflow = "hidden";
      lastActiveRef.current = document.activeElement || null;
      closeBtnRef.current?.focus();
    } else {
      overlay.classList.remove("opacity-100");
      overlay.classList.add("pointer-events-none");
      panel.classList.add("translate-x-full");
      panel.classList.remove("translate-x-0");
      document.body.style.overflow = "";
      (lastActiveRef.current as HTMLElement | null)?.focus?.();
    }
  }, [open]);

  // Escで閉じる
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // フォーカストラップ（addEventListenerのany回避：onkeydownに代入）
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && active === last) {
        first.focus();
        e.preventDefault();
      }
    };

    const prevHandler = panel.onkeydown;
    panel.onkeydown = onKeyDown;
    return () => {
      panel.onkeydown = prevHandler;
    };
  }, [open]);

  // reduced motion
  useEffect(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const overlay = document.getElementById("menu-overlay");
        const panel = document.getElementById("menu-panel");
        if (overlay) overlay.style.transition = "none";
        if (panel) panel.style.transition = "none";
      }
    } catch {
      // no-op
    }
  }, []);

  return (
    <>
      {/* ===== ヘッダー（LPと同クラス） ===== */}
      <header
        id="site-header"
        className="sticky top-0 z-50 border-b bg-white transition-shadow"
        aria-label="サイト全体のヘッダー"
        style={{ boxShadow: scrolled ? "0 6px 20px -12px rgba(0,0,0,0.22)" : "none" }}
      >
        {/* アクセントライン */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-100 via-blue-400/40 to-blue-100"
        />
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="inline-flex items-center" aria-label="トップへ">
              <span className="text-[15px] font-semibold tracking-tight">{SITE.name}</span>
            </Link>

            {/* ハンバーガー（PC/モバイル共通） */}
            <button
              id="menu-button"
              type="button"
              aria-label="メニューを開閉"
              aria-haspopup="dialog"
              aria-controls="menu-panel"
              aria-expanded={open}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[15px] font-medium">メニュー</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== オーバーレイ（LPと同じ） ===== */}
      <div
        id="menu-overlay"
        aria-hidden="true"
        className={`fixed inset-0 z-[90] bg-black/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* ===== 右スライドパネル（LPと同DOM/クラス） ===== */}
      <aside
        id="menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
        className={`fixed inset-y-0 right-0 z-[100] w-80 max-w-[88%] translate-x-full bg-white shadow-xl transition-transform will-change-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <span id="menu-title" className="font-semibold tracking-tight">
            メニュー
          </span>
          <button
            ref={closeBtnRef}
            id="menu-close"
            type="button"
            className="rounded-md border p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            aria-label="メニューを閉じる"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="p-2">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-[15px] text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA：色合いはプロジェクト既定に統一（outline / btn-primary） */}
          <div className="p-4">
            {telHref && (
              <a
                href={telHref}
                data-umami-event="lp_phone_click_header_mobile"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                電話する
              </a>
            )}
            <Link
              href="/contact"
              data-umami-event="lp_email_click_header_mobile"
              className="btn-primary w-full text-sm mt-3"
              onClick={() => setOpen(false)}
            >
              フォームで相談
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
