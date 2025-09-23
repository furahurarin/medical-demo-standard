// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

// 画像メタ
export const alt = "架空クリニック";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// デフォルトエクスポートで画像を返す（GETは書かない）
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          background: "white",
        }}
      >
        架空クリニック
      </div>
    ),
    size
  );
}
