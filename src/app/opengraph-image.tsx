import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kishore Ramaswamy — Product Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            width: "700px",
            height: "500px",
            background: "rgba(59,130,246,0.15)",
            borderRadius: "50%",
            filter: "blur(80px)",
            transform: "translateX(-50%)",
          }}
        />

        {/* KR badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "12px",
              padding: "8px 16px",
              color: "#93c5fd",
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "0.05em",
            }}
          >
            KR.
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "800",
            lineHeight: 1.05,
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: "#60a5fa" }}>Kishore</span>
          <span style={{ color: "#ffffff" }}>Ramaswamy</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "28px",
            color: "#71717a",
            fontWeight: "500",
            marginBottom: "32px",
            letterSpacing: "0.02em",
          }}
        >
          Product Manager · 0→1 Builder
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "20px",
            color: "#52525b",
            maxWidth: "600px",
            lineHeight: 1.5,
          }}
        >
          kramaswa.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
