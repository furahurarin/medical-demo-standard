// src/app/legal/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { SITE, NAP } from "@/config/site";

export const metadata: Metadata = {
  title: `プライバシーポリシー｜${SITE.name}`,
  description: "当院の個人情報の取り扱いに関する方針をご案内します。",
  alternates: { canonical: "/legal/privacy" },
};

const CLINIC = {
  name: SITE.name,
  address: NAP.address,
  phone: NAP.telDisplay,
  phoneLink: NAP.telLink,
  email: "info@example.jp", // 実運用時に差し替え
  rep: "山田 太郎",        // 実運用時に差し替え
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">プライバシーポリシー</h1>
      <p className="mt-2 text-sm text-gray-500">
        最終改定日：2025-09-22（本サイトはデモです）
      </p>

      <section className="mt-6 space-y-4 text-gray-800 leading-relaxed">
        <p>
          {CLINIC.name}
          （以下「当院」）は、患者さま・お問い合わせの皆さまの個人情報を適切に保護・管理するため、以下の方針に基づき取り扱います。
        </p>

        <h2 className="text-xl font-semibold mt-8">1. 取得する情報</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>お問い合わせフォームにご入力いただく情報（お名前、メールアドレス、内容 など）</li>
          <li>アクセス解析により収集される技術情報（Cookie、ブラウザ情報、閲覧ページ など）</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">2. 利用目的</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>お問い合わせへの回答、連絡、記録のため</li>
          <li>安全で快適なウェブサイト運営、品質改善、利用状況の把握のため</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">3. アクセス解析・Cookie</h2>
        <p>
          当サイトでは、アクセス解析ツール（例：Umami、Google Analytics 4）を用いる場合があります。これらはCookie等を利用して匿名のトラフィックデータを収集します。Cookieはブラウザ設定により無効化できます。
        </p>

        <h2 className="text-xl font-semibold mt-8">4. 第三者提供</h2>
        <p>
          法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供しません。業務委託先（ホスティング・メール配信等）へは、目的達成に必要な範囲で適切に委託します。
        </p>

        <h2 className="text-xl font-semibold mt-8">5. 安全管理</h2>
        <p>不正アクセス、紛失、改ざん、漏えい等を防止するため、必要かつ適切な安全管理措置を講じます。</p>

        <h2 className="text-xl font-semibold mt-8">6. 開示・訂正・削除等の請求</h2>
        <p>
          ご本人からの保有個人データの開示・訂正・利用停止等のご請求に対し、法令に基づき適切に対応します。下記の連絡先までメールにてご連絡ください。
        </p>

        <h2 className="text-xl font-semibold mt-8">7. 方針の改定</h2>
        <p>
          本方針は、法令の改正や運用の見直しに応じて改定されることがあります。重要な変更がある場合には、当ページに掲示します。
        </p>

        <h2 className="text-xl font-semibold mt-8">8. 事業者情報・お問い合わせ窓口</h2>
        <address className="not-italic">
          <div>事業者名：{CLINIC.name}</div>
          <div>所在地：{CLINIC.address}</div>
          <div>代表者：{CLINIC.rep}</div>
          <div>
            電話：
            <a href={`tel:${CLINIC.phoneLink}`} className="underline">
              {CLINIC.phone}
            </a>
            （デモ表示）
          </div>
          <div>
            メール：
            <a href={`mailto:${CLINIC.email}`} className="underline">
              {CLINIC.email}
            </a>
            （デモ表示）
          </div>
        </address>

        <div className="mt-10">
          <Link href="/" className="underline text-sm">
            トップへ戻る
          </Link>
        </div>
      </section>
    </main>
  );
}
