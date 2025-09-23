// src/app/services/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import CTAButton from "@/components/cta/CTAButton";
import { CONTACT } from "@/lib/site";
import JsonLdFAQ from "@/components/seo/JsonLdFAQ";

export const metadata: Metadata = {
  title: "診療案内｜架空クリニック",
  description: "症状から探せる診療案内。初めての方も安心してご相談ください。",
  alternates: { canonical: "/services" },
};

const symptoms = [
  { id: "fever",    title: "発熱・咳・のどの痛み",      desc: "風邪症状 / インフルエンザ など" },
  { id: "bp",       title: "高血圧・脂質異常・糖尿病",  desc: "生活習慣病の管理・定期検査" },
  { id: "stomach",  title: "胃の痛み・胸やけ",          desc: "胃炎 / 逆流性食道炎 等の診療" },
  { id: "allergy",  title: "花粉症・アレルギー",        desc: "内服・点眼・点鼻の処方" },
  { id: "checkup",  title: "健康診断・各種検査",        desc: "結果の説明・再検査のご相談" },
  { id: "others",   title: "その他の症状",              desc: "迷ったらまずはご相談ください" },
];

const faqs = [
  {
    q: "初診時に必要なものは？",
    a: "健康保険証（マイナ保険証可）、お薬手帳、紹介状（あれば）をお持ちください。",
  },
  {
    q: "所要時間はどのくらい？",
    a: "混雑状況により異なりますが、初診は30〜60分を目安としてください。",
  },
  {
    q: "費用の目安は？",
    a: "保険診療が中心です。検査内容により前後しますが、一般的な初診で1,000〜3,000円程度です。",
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* ヘッダー */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">診療案内</h1>
        <p className="mt-2 text-gray-600">
          「症状から探せる」構成でご案内します。ご自身の状態に近い項目をお選びください。
        </p>
      </header>

      {/* 症状カード（回遊の起点） */}
      <section aria-labelledby="symptoms">
        <h2 id="symptoms" className="text-xl font-semibold">症状から探す</h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {symptoms.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block rounded-2xl border border-gray-100 p-5 bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <div className="font-semibold">{s.title}</div>
              <div className="mt-1 text-sm text-gray-600">{s.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* 各症状セクション */}
      <section className="space-y-12">
        <article id="fever" className="scroll-mt-[var(--header-height)]">
          <h2 className="text-xl font-semibold">発熱・咳・のどの痛み</h2>
          <p className="mt-2 text-gray-700 leading-7">
            かぜ症状やインフルエンザ等を迅速に評価します。必要に応じて迅速検査・血液検査を行い、
            解熱鎮痛薬や抗ウイルス薬等を処方します。
          </p>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>対象例：発熱、咳、のどの痛み、だるさ など</li>
            <li>検査目安：迅速抗原検査 / 必要に応じて採血</li>
            <li>所要時間：30〜60分（混雑状況による）</li>
          </ul>
          <div className="mt-4 text-sm text-gray-500">
            他の診療内容：<Link href="#allergy" className="underline">花粉症・アレルギー</Link>
          </div>
        </article>

        <article id="bp" className="scroll-mt-[var(--header-height)]">
          <h2 className="text-xl font-semibold">高血圧・脂質異常・糖尿病</h2>
          <p className="mt-2 text-gray-700 leading-7">
            継続的な通院でコントロールを目指します。生活指導と内服調整、定期採血で推移を確認します。
          </p>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>初回：問診・血圧測定・採血の有無を判断</li>
            <li>再診：薬の効果と副作用の確認、目標設定</li>
            <li>検査頻度：1〜3か月ごと（個別に調整）</li>
          </ul>
          <div className="mt-4 text-sm text-gray-500">
            関連：<Link href="/facility" className="underline">検査機器のご紹介</Link>
          </div>
        </article>

        <article id="stomach" className="scroll-mt-[var(--header-height)]">
          <h2 className="text-xl font-semibold">胃の痛み・胸やけ</h2>
          <p className="mt-2 text-gray-700 leading-7">
            胃炎や逆流性食道炎などを疑う症状を診断します。内服治療を中心に、必要時は専門機関へ
            内視鏡検査を依頼します。
          </p>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>症状例：みぞおちの痛み、胃もたれ、胸やけ、のどの違和感</li>
            <li>治療：PPI/H2ブロッカー等の内服、生活指導</li>
            <li>所要時間：30分前後</li>
          </ul>
        </article>

        <article id="allergy" className="scroll-mt-[var(--header-height)]">
          <h2 className="text-xl font-semibold">花粉症・アレルギー</h2>
          <p className="mt-2 text-gray-700 leading-7">
            季節性アレルギー症状に対して点眼・点鼻・内服を組み合わせて処方します。
            眠気などの副作用にも配慮します。
          </p>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>処方例：抗ヒスタミン薬、点鼻ステロイド、点眼薬</li>
            <li>説明：使用タイミング・併用方法を分かりやすくご案内</li>
          </ul>
        </article>

        <article id="checkup" className="scroll-mt-[var(--header-height)]">
          <h2 className="text-xl font-semibold">健康診断・各種検査</h2>
          <p className="mt-2 text-gray-700 leading-7">
            企業・学校提出用の健診、定期検診、採血・心電図などの検査に対応します。結果説明まで丁寧に行います。
          </p>
          <ul className="mt-3 list-disc pl-5 text-gray-700">
            <li>検査項目：血液・尿・心電図（必要に応じて）</li>
            <li>結果：来院での説明または書面でお渡し</li>
          </ul>
        </article>

        <article id="others" className="scroll-mt-[var(--header-height)]">
          <h2 className="text-xl font-semibold">その他の症状</h2>
          <p className="mt-2 text-gray-700 leading-7">
            「どの科にかかったら良いか分からない」など、まずはお気軽にご相談ください。
            必要時は適切な医療機関をご案内します。
          </p>
        </article>
      </section>

      {/* 診療の流れ */}
      <section aria-labelledby="flow">
        <h2 id="flow" className="text-xl font-semibold">診療の流れ</h2>
        <ol className="mt-4 grid md:grid-cols-4 gap-4 text-sm">
          {[
            "受付・問診票の記入",
            "診察・必要な検査",
            "会計・次回のご案内",
            "お薬の受け取り（院外処方）",
          ].map((step, i) => (
            <li key={step} className="rounded-xl border border-gray-100 bg-white p-4">
              <div className="text-gray-500">STEP {i + 1}</div>
              <div className="mt-1 font-medium">{step}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* よくある質問（ミニFAQ） */}
      <section aria-labelledby="faq">
        <h2 id="faq" className="text-xl font-semibold">よくある質問</h2>
        <div className="mt-4 divide-y border border-gray-100 rounded-xl bg-white">
          {faqs.map((f) => (
            <div key={f.q} className="p-4">
              <div className="font-medium">{f.q}</div>
              <p className="mt-1 text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA（問い合わせ窓口を集約） */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-xl font-semibold">ご相談・ご予約</h2>
        <p className="mt-1 text-gray-600">症状に心当たりがあれば、まずはお気軽にお問い合わせください。</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <CTAButton href={CONTACT.formPath} label="フォームで相談する" />
          <a href={CONTACT.telLink} className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            {CONTACT.telDisplay} に電話
          </a>
          <a href={CONTACT.lineUrl} className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            LINEで予約
          </a>
        </div>
      </section>

      {/* SEO: FAQ 構造化データ */}
      <JsonLdFAQ items={faqs} />
    </main>
  );
}
