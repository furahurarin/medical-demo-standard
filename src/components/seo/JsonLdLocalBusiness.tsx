// src/components/seo/JsonLdLocalBusiness.tsx
"use client";

type Props = {
  name: string;
  url: string;
  telephone: string;
  address: {
    postalCode?: string;
    addressRegion?: string; // 都道府県
    addressLocality?: string; // 市区町村
    streetAddress?: string; // 丁目番地
  };
};

export default function JsonLdLocalBusiness({ name, url, telephone, address }: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      postalCode: address.postalCode ?? "",
      addressRegion: address.addressRegion ?? "",
      addressLocality: address.addressLocality ?? "",
      streetAddress: address.streetAddress ?? "",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
