// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_NAME = "架空クリニック";
const TAGLINE = "地域に根ざした安心の医療を、もっと身近に。";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background:
            "radial-gradient(1200px 630px at 0% 0%, rgba(59,130,246,.18), transparent), radial-gradient(800px 420px at 100% 100%, rgba(29,78,216,.22), transparent), #ffffff",
          color: "#0f172a",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans JP, sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, color: "#1d4ed8" }}>{SITE_NAME}</div>
        <div style={{ marginTop: 12, fontSize: 28 }}>{TAGLINE}</div>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            gap: 16,
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: 360,
              height: 220,
              borderRadius: 24,
              background:
                "radial-gradient(320px 220px at 30% 30%, rgba(37,99,235,.16), transparent), #fff",
              border: "1px solid #e5e7eb",
            }}
          />
          <div
            style={{
              width: 360,
              height: 220,
              borderRadius: 24,
              background:
                "radial-gradient(320px 220px at 70% 70%, rgba(29,78,216,.18), transparent), #fff",
              border: "1px solid #e5e7eb",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
