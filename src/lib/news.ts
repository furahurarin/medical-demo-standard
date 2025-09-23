// src/lib/news.ts
import fs from "fs";
import path from "path";
import "server-only";

export type NewsItem = {
  slug: string;        // 例: 2025-08-01-first-post
  title: string;
  date: string;        // ISO or YYYY-MM-DD
  summary?: string;
  content: string;     // markdown相当のプレーンテキスト
};

const NEWS_DIR = path.join(process.cwd(), "src", "content", "news");

function ensureDir() {
  if (!fs.existsSync(NEWS_DIR)) fs.mkdirSync(NEWS_DIR, { recursive: true });
}

function parseFrontMatter(src: string): { meta: Record<string, string>; body: string } {
  if (!src.startsWith("---")) return { meta: {}, body: src };
  const end = src.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: src };
  const raw = src.slice(3, end).trim();
  const body = src.slice(end + 4).replace(/^\n/, "");
  const meta: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (m) meta[m[1].trim()] = m[2].trim();
  }
  return { meta, body };
}

export function listSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getBySlug(slug: string): NewsItem | null {
  ensureDir();
  const file = path.join(NEWS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const src = fs.readFileSync(file, "utf8");
  const { meta, body } = parseFrontMatter(src);
  const title = meta.title || slug;
  const date = meta.date || slug.slice(0, 10); // ファイル名先頭のYYYY-MM-DDを既定に
  const summary = meta.summary || "";
  return { slug, title, date, summary, content: body };
}

export function getAll(): NewsItem[] {
  return listSlugs()
    .map((s) => getBySlug(s))
    .filter((v): v is NewsItem => !!v)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // 新しい順
}

// 極シンプルな段落化（Markdown完全対応はしない）
export function simpleMarkdownToHtml(md: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // 段落
  const paras = md.trim().split(/\n{2,}/).map((p) => `<p>${esc(p).replace(/\n/g, "<br/>")}</p>`);
  // 太字 **text** → <strong>text</strong>（軽い置換）
  const strong = paras.map((p) => p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"));
  return strong.join("\n");
}
