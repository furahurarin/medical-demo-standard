// src/components/seo/JsonLdLocalBusiness.tsx
type Props = {
  /** クリニック名（必須） */
  name: string;

  /** サイトURL（httpsから） */
  url?: string;

  /** ロゴ画像の絶対URL */
  logo?: string;

  /** 代表画像（1枚 or 複数） */
  image?: string | string[];

  /** 代表電話番号（ハイフン可） */
  telephone?: string;

  /** 住所（都度分割して渡せるよう個別プロパティも用意） */
  streetAddress?: string;
  addressLocality?: string; // 市区町村
  addressRegion?: string;   // 都道府県
  postalCode?: string;
  addressCountry?: string;  // 例: "JP"（デフォルトJP）

  /** 営業時間（"Mo,Tu,We 09:00-12:30" 形式） */
  openingHours?: string[];

  /** 緯度経度（あれば geo を付与） */
  latitude?: number;
  longitude?: number;

  /** Googleマップ等の地図URL */
  hasMap?: string;

  /** SNSや公式アカウントなどのURL群（LINE等もここへ） */
  sameAs?: string[];

  /** 診療の得意領域（任意） */
  medicalSpecialty?: string | string[];

  /** 価格感（任意。例: "¥¥"） */
  priceRange?: string;

  /** 予約/問い合わせページURL（任意。potentialAction 用） */
  contactPageUrl?: string;
};

const DAY_MAP: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

/**
 * "Mo,Tu,We 09:00-12:30" のような文字列配列を OpeningHoursSpecification へ変換
 */
function toOpeningHoursSpecification(lines: string[] = []) {
  const specs: Array<Record<string, unknown>> = [];

  for (const line of lines) {
    const trimmed = (line || "").trim();
    if (!trimmed) continue;

    // 例: "Mo,Tu,We,Fr 09:00-12:30"
    const m = trimmed.match(/^([A-Za-z]{2}(?:,[A-Za-z]{2})*)\s+(\d{2}:\d{2})-(\d{2}:\d{2})$/);
    if (!m) continue;

    const [, daysStr, opens, closes] = m;
    const days = daysStr.split(",").map((d) => DAY_MAP[d as keyof typeof DAY_MAP]).filter(Boolean);
    if (days.length === 0) continue;

    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days.map((d) => `https://schema.org/${d}`),
      opens,
      closes,
    });
  }
  return specs;
}

export default function JsonLdLocalBusiness({
  name,
  url,
  logo,
  image,
  telephone,
  streetAddress,
  addressLocality,
  addressRegion,
  postalCode,
  addressCountry = "JP",
  openingHours = [],
  latitude,
  longitude,
  hasMap,
  sameAs,
  medicalSpecialty,
  priceRange,
  contactPageUrl,
}: Props) {
  // ベース
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name,
  };

  // ID/URL
  if (url) {
    const canon = url.replace(/\/+$/, "");
    data.url = canon;
    data["@id"] = `${canon}#clinic`;
  }

  // ロゴ & 画像
  if (logo) data.logo = logo;
  if (image) data.image = Array.isArray(image) ? image : [image];

  // 連絡先
  if (telephone) data.telephone = telephone;

  // 住所
  if (streetAddress || addressLocality || addressRegion || postalCode || addressCountry) {
    data.address = {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      ...(addressLocality ? { addressLocality } : {}),
      ...(addressRegion ? { addressRegion } : {}),
      ...(postalCode ? { postalCode } : {}),
      ...(addressCountry ? { addressCountry } : {}),
    };
  }

  // 地図/位置
  if (hasMap) data.hasMap = hasMap;
  if (typeof latitude === "number" && typeof longitude === "number") {
    data.geo = { "@type": "GeoCoordinates", latitude, longitude };
  }

  // 営業時間（文字列はそのまま openingHours、同時に構造化も生成）
  if (openingHours.length) {
    data.openingHours = openingHours;
    const specs = toOpeningHoursSpecification(openingHours);
    if (specs.length) data.openingHoursSpecification = specs;
  }

  // sameAs（SNS/LINE 等）
  if (sameAs && sameAs.length) data.sameAs = sameAs;

  // medicalSpecialty
  if (medicalSpecialty) {
    data.medicalSpecialty = Array.isArray(medicalSpecialty) ? medicalSpecialty : [medicalSpecialty];
  }

  // priceRange（任意）
  if (priceRange) data.priceRange = priceRange;

  // 予約/問い合わせ導線（任意）
  if (contactPageUrl) {
    data.potentialAction = [
      {
        "@type": "ContactAction",
        target: contactPageUrl,
        name: "お問い合わせ",
      },
    ];
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify 第二引数/第三引数は不要（最小化）
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
