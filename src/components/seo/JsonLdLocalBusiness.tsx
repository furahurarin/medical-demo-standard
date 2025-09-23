// src/components/seo/JsonLdLocalBusiness.tsx
type Props = {
  name: string;
  url?: string;
  telephone?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string; // 例: "JP"
  openingHours?: string[]; // 例: ["Mo,Tu,We,Fr 09:00-12:30", ...]
  latitude?: number;
  longitude?: number;
};

export default function JsonLdLocalBusiness({
  name,
  url,
  telephone,
  streetAddress,
  addressLocality,
  addressRegion,
  postalCode,
  addressCountry = "JP",
  openingHours = [],
  latitude,
  longitude,
}: Props) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name,
  };

  if (url) data.url = url;
  if (telephone) data.telephone = telephone;

  if (
    streetAddress ||
    addressLocality ||
    addressRegion ||
    postalCode ||
    addressCountry
  ) {
    data.address = {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      ...(addressLocality ? { addressLocality } : {}),
      ...(addressRegion ? { addressRegion } : {}),
      ...(postalCode ? { postalCode } : {}),
      ...(addressCountry ? { addressCountry } : {}),
    };
  }

  if (openingHours.length) data.openingHours = openingHours;
  if (latitude && longitude) {
    data.geo = { "@type": "GeoCoordinates", latitude, longitude };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
