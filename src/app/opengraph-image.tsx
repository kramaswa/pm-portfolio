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

        {/* Name */}
        <div
          style={{
            fontSize: "96px",
            fontWeight: "800",
            lineHeight: 1.0,
            marginBottom: "24px",
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
            fontSize: "36px",
            color: "#71717a",
            fontWeight: "600",
            marginBottom: "40px",
            letterSpacing: "0.02em",
          }}
        >
          Product Manager · 0→1 Builder
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: "24px",
            color: "#3b82f6",
            fontWeight: "500",
          }}
        >
          kramaswa.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
