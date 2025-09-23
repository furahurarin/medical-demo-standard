// src/app/staff/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "医師・スタッフ紹介｜架空クリニック",
  description:
    "医師の経歴・専門分野、スタッフ体制をご紹介します。安心して受診いただけるよう、丁寧な診療とわかりやすい説明を心がけています。",
  alternates: { canonical: "/staff" },
};

export default function StaffPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-12">
      {/* ヘッダー */}
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">医師・スタッフ紹介</h1>
        <p className="text-gray-700">
          地域のかかりつけとして、必要な検査・治療をていねいにご提案します。専門性とチームワークで、安心して受診できる体制を整えています。
        </p>
      </header>

      {/* 医師紹介（院長をフィーチャー） */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">医師紹介</h2>

        {/* 院長 */}
        <article className="rounded-lg border p-6 space-y-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">院長　山田 太郎（やまだ たろう）</h3>
            <p className="text-sm text-gray-700">
              専門：一般内科／慢性疾患の外来フォロー、生活習慣病の管理
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">経歴</h4>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                <li>〇〇大学 医学部 卒業</li>
                <li>〇〇総合病院 内科 勤務</li>
                <li>架空クリニック 院長 就任</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">資格・所属</h4>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                <li>日本内科学会 認定内科医</li>
                <li>日本糖尿病学会 会員</li>
                <li>日本医師会 認定産業医</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            受診に迷われた方にも、症状や生活背景を伺いながら最適な検査・治療を一緒に考えます。まずはお気軽にご相談ください。
          </p>
        </article>

        {/* 複数医師がいる場合のプレースホルダー（必要に応じて複製） */}
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">非常勤医師 A</h3>
            <p className="text-sm text-gray-700">
              専門：〇〇　／ 担当日：毎週〇曜日
            </p>
          </article>
          <article className="rounded-lg border p-4 space-y-2">
            <h3 className="font-semibold">非常勤医師 B</h3>
            <p className="text-sm text-gray-700">
              専門：〇〇　／ 担当日：第〇・〇週〇曜日
            </p>
          </article>
        </div>
      </section>

      {/* スタッフ紹介 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">スタッフ紹介</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-lg border p-4 space-y-1">
            <h3 className="font-semibold">看護師</h3>
            <p className="text-sm text-gray-700">
              診療介助・採血・検査案内を担当。安全でスムーズな受診を支えます。
            </p>
          </article>
          <article className="rounded-lg border p-4 space-y-1">
            <h3 className="font-semibold">医療事務</h3>
            <p className="text-sm text-gray-700">
              受付・会計・レセプト業務を担当。受診前後の不明点はお気軽にご相談ください。
            </p>
          </article>
          <article className="rounded-lg border p-4 space-y-1">
            <h3 className="font-semibold">検査スタッフ</h3>
            <p className="text-sm text-gray-700">
              心電図・採血など基本検査を担当。検査前の注意点をご案内します。
            </p>
          </article>
        </div>
      </section>

      {/* 関連導線（回遊） */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">関連ページ</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <Link href="/services" className="hover:underline">
              診療案内を見る
            </Link>
          </li>
          <li>
            <Link href="/facility" className="hover:underline">
              設備・院内紹介を確認する
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              お問い合わせ（フォーム）
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
