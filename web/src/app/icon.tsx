import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
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
          borderRadius: 7,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", color: "#ffffff", fontSize: 19, fontWeight: 700, letterSpacing: -1 }}>
          {"</>"}
        </div>
      </div>
    ),
    { ...size }
  );
}
