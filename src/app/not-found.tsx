// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">ページが見つかりません</h1>
        <p className="text-gray-600">
          URLをご確認のうえ、トップページへお戻りください。
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-4 py-2 rounded-lg bg-brand-700 text-white hover:bg-brand-800 transition"
        >
          トップに戻る
        </Link>
      </div>
    </main>
  );
}
