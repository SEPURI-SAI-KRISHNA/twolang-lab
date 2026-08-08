import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f6e64",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", color: "#ffffff", fontSize: 100, fontWeight: 700, letterSpacing: -4 }}>
          {"</>"}
        </div>
      </div>
    ),
    { ...size }
  );
}
