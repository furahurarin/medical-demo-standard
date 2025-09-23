// src/components/seo/JsonLdFAQ.tsx
type FAQItemV1 = { question: string; answer: string }; // 新形式
type FAQItemV0 = { q: string; a: string };              // 旧形式（互換用）
type FAQItem = FAQItemV1 | FAQItemV0;

function toV1(item: FAQItem): FAQItemV1 {
  if ("question" in item) return item; // すでに新形式
  // 旧形式 { q, a } → 新形式 { question, answer } に正規化
  return { question: item.q, answer: item.a };
}

export default function JsonLdFAQ({ items }: { items: FAQItem[] }) {
  const normalized = items.map(toV1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: normalized.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
