// src/lib/news.ts
import fs from "fs";
import path from "path";
import "server-only";

export type NewsItem = {
  slug: string;        // 例: 2025-08-01-first-post
  title: string;
  date: string;        // 正規化した ISO (YYYY-MM-DD) を返す
  summary?: string;
  content: string;     // markdown相当のプレーンテキスト
};

const NEWS_DIR = path.join(process.cwd(), "src", "content", "news");

/** ディレクトリの存在を保証（なければ作成） */
function ensureDir() {
  if (!fs.existsSync(NEWS_DIR)) fs.mkdirSync(NEWS_DIR, { recursive: true });
}

/** ざっくりフロントマターを解析（YAML完全互換ではない簡易版） */
function parseFrontMatter(src: string): { meta: Record<string, string>; body: string } {
  if (!src.startsWith("---")) return { meta: {}, body: src };
  const end = src.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: src };
  const raw = src.slice(3, end).trim();
  const body = src.slice(end + 4).replace(/^\n/, "");
  const meta: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_.-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    // 値の前後のクォート/空白を除去（"..." や '...'）
    const val = m[2].trim().replace(/^['"]|['"]$/g, "");
    meta[key] = val;
  }
  return { meta, body };
}

/** YYYY-MM-DD or ISO を YYYY-MM-DD に正規化。失敗時は空文字を返す */
function normalizeDate(input?: string): string {
  if (!input) return "";
  const t = input.trim();
  // すでに YYYY-MM-DD 形式
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t;
  // ISO等をDateで解釈
  const d = new Date(t);
  if (isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export function listSlugs(): string[] {
  ensureDir();
  try {
    return fs
      .readdirSync(NEWS_DIR, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.endsWith(".md"))
      .map((e) => e.name.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export function getBySlug(slug: string): NewsItem | null {
  ensureDir();
  const file = path.join(NEWS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  try {
    const src = fs.readFileSync(file, "utf8");
    const { meta, body } = parseFrontMatter(src);
    const title = (meta.title || slug).trim();
    // ファイル名先頭のYYYY-MM-DDを既定に
    const fallbackDate = slug.slice(0, 10);
    const date = normalizeDate(meta.date) || (/\d{4}-\d{2}-\d{2}/.test(fallbackDate) ? fallbackDate : "");
    const summary = meta.summary?.trim() || undefined;

    return { slug, title, date, summary, content: body };
  } catch {
    return null;
  }
}

export function getAll(): NewsItem[] {
  return listSlugs()
    .map((s) => getBySlug(s))
    .filter((v): v is NewsItem => !!v && !!v.date) // 日付欠落は除外
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // 新しい順
}

/**
 * 極シンプルな段落化（Markdown完全対応はしない）
 * - 段落: 空行で <p> に分割
 * - 改行: <br/> へ
 * - 太字: **text** → <strong>text</strong>
 * - 先に最低限のHTMLエスケープを実施
 */
export function simpleMarkdownToHtml(md: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const paras = md
    .trim()
    .split(/\n{2,}/)
    .map((p) => `<p>${esc(p).replace(/\n/g, "<br/>")}</p>`);
  const strong = paras.map((p) => p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"));
  return strong.join("\n");
}
