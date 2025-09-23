// src/components/cta/CTAButton.tsx
"use client";
import Link from "next/link";
import { track } from "@/lib/analytics";

type Props = {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
  external?: boolean; // tel/mailto/LINEなど
  size?: "md" | "lg";
};

export default function CTAButton({
  href,
  label,
  variant = "primary",
  external,
  size = "md",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition shadow-sm";
  const sizing =
    size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2.5 text-sm";
  const styles =
    variant === "primary"
      ? "bg-brand-700 text-white hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      : "text-brand-700 hover:bg-brand-50";

  const onClick = () => {
    const kind =
      href.startsWith("tel:")
        ? "phone"
        : href.startsWith("mailto:")
        ? "email"
        : href.includes("line.me")
        ? "line"
        : "nav";
    track(`cta_click_${kind}`, { href, label });
  };

  if (external) {
    return (
      <a href={href} onClick={onClick} className={`${base} ${sizing} ${styles}`}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={`${base} ${sizing} ${styles}`}>
      {label}
    </Link>
  );
}
