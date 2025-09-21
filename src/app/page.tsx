// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

/** ▼実案件化の際はここだけ差し替え（最低限のダミー値を同梱） */
const CLINIC_NAME = "架空クリニック";
const DISPLAY_PHONE = "03-1234-5678";
const EMAIL = "info@example.jp";
const ADDRESS = "東京都千代田区丸の内1-1-1";
const ACCESS_NOTE = "JR東京駅 丸の内北口から徒歩5分";
const BUSINESS_DAYS = [
  { day: "月", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "火", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "水", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "木", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "金", hours: "9:00–12:30 / 14:00–18:00" },
  { day: "土", hours: "9:00–12:30（午後休診）" },
  { day: "日・祝", hours: "休診" },
];

/** util */
const telHref = `tel:${DISPLAY_PHONE.replace(/[^\d+]/g, "")}`;

export default function Page() {
  return (
    <>
      {/* ========== Header：常に白背景（ヒーローに重ねない） ========== */}
      <header
        className="sticky top-0 z-40 bg-white text-gray-900 border-b border-gray-200 backdrop-blur-sm"
        aria-label="サイト全体のヘッダー"
      >
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          {/* ブランド */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label={`${CLINIC_NAME} トップへ`} className="font-bold tracking-tight">
              {CLINIC_NAME}
            </Link>
            <span className="hidden sm:inline-block text-xs/none text-gray-500">公式サイト</span>
          </div>

          {/* Leanナビ（アンカー） */}
          <nav aria-label="ページ内ナビ" className="overflow-x-auto">
            <ul className="flex items-center gap-3 text-sm text-gray-700">
              <li><a href="#about" className="px-2 py-1 rounded-lg hover:bg-gray-50">初めての方へ</a></li>
              <li><a href="#services" className="px-2 py-1 rounded-lg hover:bg-gray-50">診療案内</a></li>
              <li><a href="#doctor" className="px-2 py-1 rounded-lg hover:bg-gray-50">医師紹介</a></li>
              <li><a href="#equipments" className="px-2 py-1 rounded-lg hover:bg-gray-50">院内設備</a></li>
              <li><a href="#faq" className="px-2 py-1 rounded-lg hover:bg-gray-50">FAQ</a></li>
              <li><a href="#news" className="px-2 py-1 rounded-lg hover:bg-gray-50">お知らせ</a></li>
              <li><a href="#hours" className="px-2 py-1 rounded-lg hover:bg-gray-50">診療時間</a></li>
              <li><a href="#access" className="px-2 py-1 rounded-lg hover:bg-gray-50">アクセス</a></li>
              <li><a href="#contact" className="px-2 py-1 rounded-lg hover:bg-gray-50">お問い合わせ</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ========== Full-bleed Hero：全面写真＋濃いスクラム＋2CTA（ヘッダーは重ならない） ========== */}
      <section id="hero" aria-label="メインビジュアル" className="relative isolate min-h-[clamp(520px,75vh,760px)]">
        {/* 背景画像（全幅） */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.webp" // 本番は適切な解像度のAVIF/WebP推奨
            alt={`${CLINIC_NAME} の外観写真`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* スクラム（コントラスト担保） */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,40,.78),rgba(8,14,40,.58)_35%,rgba(8,14,40,.30)_70%,rgba(8,14,40,.10))]"
        />
        {/* テキスト＆CTA */}
        <div className="relative z-10 grid place-items-center min-h-[inherit] px-4 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              地域に根ざした、通いやすい医療を。
            </h1>
            <p className="mt-4 text-white/90">
              {CLINIC_NAME}は、初めての方でも安心できる丁寧な説明と、待ち時間短縮の工夫を徹底しています。
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={telHref}
                className="btn btn-primary"
                data-umami-event="lp_phone_click"
                aria-label={`電話する（${DISPLAY_PHONE}）`}
              >
                電話する（{DISPLAY_PHONE}）
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="btn border border-white/70 text-white hover:bg-white hover:text-gray-900"
                data-umami-event="lp_email_click"
              >
                メールで問い合わせ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Main（Lean構成） ========== */}
      <main id="content" className="pb-[var(--cta-h,6rem)] sm:pb-10">
        {/* 初めての方へ */}
        <section
          id="about"
          className="section pt-16 md:pt-20 bg-gradient-to-b from-white via-slate-50/60 to-white"
        >
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">初めての方へ</h2>
            <p className="mt-4 text-gray-700">
              初診の方は保険証・各種医療証をご持参ください。受付で症状やご希望を伺い、当日の流れや費用の目安を事前にご説明します。
              必要な検査を必要なだけ行う方針で、専門用語を避けた分かりやすい説明を心がけています。
              院内の動線はシンプルで、はじめての受診でも迷わずお進みいただけます。
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                ["事前予約不要（一部除く）", "思い立ったらそのままご来院。混雑緩和のためスタッフ配置を最適化しています。"],
                ["わかりやすい説明", "検査・処方の理由や費用目安を事前にご案内。納得感のある受診体験を。"],
                ["駅近・アクセス良好", ACCESS_NOTE],
              ].map(([title, body]) => (
                <div key={title} className="card p-4 rounded-2xl border bg-white">
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-gray-600 mt-1">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* 診療案内 */}
        <section id="services" className="section pt-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">診療案内</h2>
            <p className="mt-4 text-gray-700">
              かぜ・胃腸症状などの急な体調不良から、高血圧・脂質異常症・糖尿病などの慢性疾患まで幅広く対応。
              予防接種や健診も実施し、生活リズムに合わせた無理のない治療計画をご提案します。
              受診可否や費用の目安は、お気軽にお電話・メールでご相談ください。
            </p>
            <ul className="mt-4 list-disc pl-6 text-gray-800 space-y-1">
              <li>一般内科：かぜ・発熱・頭痛・胃腸炎 など</li>
              <li>生活習慣病の管理：高血圧／脂質異常症／糖尿病の継続フォロー</li>
              <li>アレルギー・花粉症：内服・点鼻の調整、舌下免疫療法の相談</li>
              <li>予防接種：インフル・肺炎球菌・海外渡航等（在庫確認のため要事前連絡）</li>
              <li>健康診断：雇用時・定期・各種証明書の発行（内容はお問い合わせください）</li>
            </ul>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* 医師紹介 */}
        <section id="doctor" className="section pt-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">医師紹介</h2>
            <div className="mt-4 grid sm:grid-cols-[160px_1fr] gap-6 items-start card p-4">
              <div className="relative w-40 h-40 rounded-xl overflow-hidden">
                <Image src="/images/doctor.webp" alt="院長写真" fill className="object-cover" />
              </div>
              <div>
                <p className="font-semibold">院長　山田 太郎</p>
                <p className="text-gray-700 mt-2">
                  地域のかかりつけ医として、分かりやすい説明と過不足のない検査・治療を心がけています。
                  生活習慣病の継続管理から急な体調不良まで、まずはお気軽にご相談ください。
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* 院内設備 */}
        <section id="equipments" className="section pt-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">院内設備</h2>
            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              {[
                ["検査室", "基本的な血液・尿検査に対応。結果は当日ご説明可能な項目も。"],
                ["X線装置", "被曝線量に配慮したデジタル撮影。必要時のみ実施します。"],
                ["待合・キッズスペース", "混雑を避けた座席配置。お子さま連れでも安心です。"],
              ].map(([name, desc]) => (
                <div key={name} className="card p-4">
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-gray-600 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* クリニック・外観（単独1枚のみを残す） */}
        <section id="gallery" className="section pt-12">
          <div className="mx-auto max-w-6xl px-4">
            <h3 className="text-xl md:text-2xl font-semibold">クリニック・外観のようす</h3>
            <figure className="mt-4 rounded-xl border bg-white overflow-hidden">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/exterior.webp"
                  alt="外観（初めてでも迷いにくい入口です）"
                  fill
                  sizes="(min-width: 768px) 60vw, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-3 py-2 text-sm text-gray-600">
                外観（初めての方は正面入口からお入りください）
              </figcaption>
            </figure>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* FAQ */}
        <section id="faq" className="section pt-16 md:pt-20 bg-gradient-to-b from-white via-slate-50/60 to-white">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">よくあるご質問</h2>
            <div className="mt-4 space-y-3">
              <details className="faq">
                <summary>初診時に必要なものは？</summary>
                <p className="mt-2 text-gray-700">健康保険証、各種医療証、お薬手帳をご持参ください。</p>
              </details>
              <details className="faq">
                <summary>予約は必要ですか？</summary>
                <p className="mt-2 text-gray-700">原則不要です（一部の健診・予防接種は事前連絡をお願いします）。</p>
              </details>
              <details className="faq">
                <summary>支払い方法は？</summary>
                <p className="mt-2 text-gray-700">現金のほか、主要キャッシュレスに順次対応予定です。</p>
              </details>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* お知らせ（固定テキスト） */}
        <section id="news" className="section pt-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">お知らせ</h2>
            <div className="prose mt-4">
              <ul>
                <li>【お盆】8/13–15は午前のみ診療、午後休診となります。</li>
                <li>インフルエンザ予防接種の予約受付を開始しました（在庫には限りがあります）。</li>
                <li>発熱・かぜ症状の方は、来院前にお電話でご相談ください。</li>
              </ul>
              <p className="text-sm text-gray-600">※固定テキストの掲示であり、投稿CMSは含まれません。</p>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* 診療時間（BUSINESS_DAYSを行レイアウトで） */}
        <section id="hours" className="section pt-16 md:pt-20 bg-gradient-to-b from-white via-slate-50/60 to-white">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">診療時間</h2>
            <div className="mt-4 rounded-xl border divide-y bg-white">
              {BUSINESS_DAYS.map((row) => (
                <div key={row.day} className="flex items-center justify-between px-4 py-3">
                  <span className="font-medium">{row.day}</span>
                  <span className="text-gray-700">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* アクセス（住所＋地図iframe＋アイコン行） */}
        <section id="access" className="section pt-16 md:pt-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">アクセス</h2>
            <div className="mt-4 text-gray-700">
              <p>住所：{ADDRESS}</p>
              <p className="mt-1">{ACCESS_NOTE}</p>

              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  {/* 駅アイコン */}
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2c3.9 0 7 2.5 7 5.5S15.9 13 12 13 5 10.5 5 7.5 8.1 2 12 2Zm-6 14h12l1.5 3H4.5L6 16Z" fill="currentColor"/>
                  </svg>
                  最寄駅：東京駅（徒歩5分）
                </li>
                <li className="flex items-center gap-2">
                  {/* 駐車アイコン */}
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 4h6a5 5 0 0 1 0 10H7V4Zm4 6a2 2 0 0 0 0-4H10v4h1Z" fill="currentColor"/>
                  </svg>
                  駐車台数：5台
                </li>
              </ul>
            </div>

            <div className="mt-4 aspect-[16/9] rounded-xl border bg-white shadow-sm overflow-hidden">
              <iframe
                title="Googleマップ"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?&q=${encodeURIComponent(ADDRESS)}&output=embed`}
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-gray-600 mt-3">
              駅からの道順や駐車位置はお電話でもご案内できます。迷われた際は遠慮なくご連絡ください。
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 mt-12 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

        {/* お問い合わせ（tel・mailtoのみ） */}
        <section id="contact" className="section pt-16 md:pt-20 bg-gradient-to-b from-white via-slate-50/60 to-white">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold">お問い合わせ</h2>
            <p className="mt-4 text-gray-700">
              受診のご相談、検査の可否、健診・予防接種の空き状況など、お気軽にお問い合わせください。
              混雑時は電話がつながりにくい場合があります。折り返しが必要な際はメールをご利用いただくと確実です。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={telHref}
                className="btn btn-primary"
                aria-label={`${DISPLAY_PHONE} に電話する`}
                data-umami-event="lp_phone_click"
              >
                電話する（{DISPLAY_PHONE}）
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="btn btn-outline"
                aria-label={`${EMAIL} にメールする`}
                data-umami-event="lp_email_click"
              >
                メールで問い合わせ
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              掲載の内容は一例です。自由診療の費用は税込表示で、効果や副作用には個人差があります。
            </p>
          </div>
        </section>
      </main>

      {/* ========== Footer（法務リンクを排除） ========== */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} {CLINIC_NAME}. All rights reserved.</p>
        </div>
      </footer>

      {/* ========== SP固定CTA（2分割：電話／メール） ========== */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t bg-white">
        <div className="grid grid-cols-2">
          <a
            href={telHref}
            className="flex items-center justify-center py-3 font-medium text-white bg-brand-700 hover:bg-brand-800"
            aria-label={`${DISPLAY_PHONE} に電話する（固定CTA）`}
            data-umami-event="lp_phone_click_fixed"
          >
            電話（{DISPLAY_PHONE}）
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center justify-center py-3 font-medium hover:bg-gray-50"
            aria-label={`${EMAIL} にメールする（固定CTA）`}
            data-umami-event="lp_email_click_fixed"
          >
            メール
          </a>
        </div>
        {/* iOSセーフエリア対策 */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </>
  );
}
