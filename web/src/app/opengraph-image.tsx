import { ImageResponse } from "next/og";

export const alt = "twolang-lab — Python & Java, in depth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fffdfb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#0f6e64",
            marginBottom: 28,
          }}
        >
          Python &amp; Java, in depth
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#1c1a17",
            lineHeight: 1.15,
            marginBottom: 32,
          }}
        >
          Every feature. Real code.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#1c1a17",
            lineHeight: 1.15,
            marginBottom: 44,
          }}
        >
          Real output.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#0f6e64",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#6b6459" }}>twolang-lab.pages.dev</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
