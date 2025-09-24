// src/app/facility/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "設備・院内紹介｜架空クリニック",
  description:
    "清潔で安心して通院できる院内環境と、診療に必要な設備・機器の概要をご紹介します。",
  alternates: { canonical: "/facility" },
};

export default function FacilityPage() {
  const sections = [
    {
      id: "exterior",
      title: "外観",
      src: "/images/clinic/exterior-01.webp",
      alt: "医院の外観（エントランス）",
      body:
        "はじめての方にも見つけやすい立地と分かりやすい案内表示。バリアフリーに配慮し、ベビーカーや車いすでも安心してお越しいただけます。",
    },
    {
      id: "reception",
      title: "受付",
      src: "/images/clinic/reception-01.webp",
      alt: "受付カウンターのようす",
      body:
        "来院時のご案内や会計、次回予約などをスムーズに行えるよう、受付導線を整理しています。初診手続きや各種証明書のご相談も承ります。",
    },
    {
      id: "waiting",
      title: "待合",
      src: "/images/clinic/waiting-01.webp",
      alt: "待合スペース（座席・採光）",
      body:
        "適切な座席間隔と採光を確保し、落ち着いてお待ちいただける空間を整えています。混雑緩和のための掲示やご案内にも配慮しています。",
    },
    {
      id: "corridor",
      title: "院内導線",
      src: "/images/clinic/corridor-01.webp",
      alt: "院内の廊下・導線",
      body:
        "受付から診察室・処置室までの移動がしやすいよう、段差や幅、案内表示を工夫しています。プライバシーにも配慮した動線設計です。",
    },
    {
      id: "consult-room",
      title: "診察室",
      src: "/images/clinic/consult-room-01.webp",
      alt: "診察室（相談スペース）",
      body:
        "症状や生活背景を丁寧に伺い、分かりやすい説明を心がけています。必要に応じて院内検査（採血・心電図など）や連携機関へのご紹介を行います。",
    },
    {
      id: "treatment-room",
      title: "処置室",
      src: "/images/clinic/treatment-room-01.webp",
      alt: "処置室（ベッド・機器）",
      body:
        "採血や点滴などを安全に行えるよう、清潔環境と動線を確保。使用ごとの清拭・消毒を徹底し、安心して処置を受けていただけます。",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* ページヘッダー */}
      <header className="hero-soft-bg rounded-2xl ring-1 ring-gray-100 px-6 py-10 md:px-8 md:py-12 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold motion-fadein">設備・院内紹介</h1>
        <p className="text-gray-700 motion-fadein">
          清潔で安心して通院いただける院内環境づくりに努めています。写真とともに、主要スペースの特徴をご紹介します。
        </p>
      </header>

      {/* 画像 × 説明ブロック（交互レイアウト） */}
      <section aria-labelledby="facility-overview" className="space-y-10">
        <h2 id="facility-overview" className="sr-only">
          院内のようす
        </h2>

        {sections.map((sec, i) => (
          <article
            key={sec.id}
            id={sec.id}
            className="grid gap-6 md:grid-cols-2 items-center motion-fadein"
          >
            {/* 画像（偶数行は右、奇数行は左に配置） */}
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border">
                <Image
                  src={sec.src}
                  alt={sec.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 50vw, 100vw"
                  priority={i === 0}
                />
              </div>
            </div>

            {/* テキスト */}
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <h3 className="text-xl md:text-2xl font-semibold">{sec.title}</h3>
              <p className="text-gray-700 mt-2">{sec.body}</p>

              {/* セクション内回遊リンク（任意） */}
              <div className="mt-4 flex flex-wrap gap-3">
                {sec.id === "consult-room" && (
                  <Link href="/services" className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50">
                    診療案内を見る
                  </Link>
                )}
                {sec.id === "treatment-room" && (
                  <Link href="/access" className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50">
                    アクセス・診療時間
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}

        <p className="text-sm text-gray-600">
          ※ 写真はイメージです。実際のレイアウトや設備は来院時にご確認ください。
        </p>
      </section>

      {/* 衛生管理・院内環境 */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">衛生管理と院内環境</h2>
        <div className="card p-5 space-y-3 motion-fadein">
          <p className="text-gray-700">
            手指消毒・機器ごとの清拭など、標準予防策に基づいた衛生管理を徹底しています。
            換気や清掃の頻度を高め、安心して受診いただける環境を維持しています。
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>診療ごとのベッド・機器の清拭と消毒を実施</li>
            <li>十分な換気・空気清浄機の運用</li>
            <li>ドアノブや手すり等の高頻度接触部位の定期清掃</li>
          </ul>
        </div>
      </section>

      {/* 関連導線（回遊強化） */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold motion-fadein">関連ページ</h2>
        <div className="flex flex-wrap gap-3 motion-fadein">
          <Link
            href="/services"
            className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
          >
            診療案内を見る
          </Link>
          <Link
            href="/access"
            className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-gray-50"
          >
            アクセス・診療時間を確認する
          </Link>
          <Link href="/contact" className="btn-primary">
            お問い合わせ（フォーム）
          </Link>
        </div>
      </section>
    </main>
  );
}
