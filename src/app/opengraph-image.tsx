import { ImageResponse } from "next/og";

import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";
export const alt = `${BRAND.founder} — ${BRAND.company}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "#0d1117",
          color: "#e6edf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#58a6ff",
            }}
          >
            {BRAND.company} · {BRAND.companyDescriptor}
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            {BRAND.founder}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              lineHeight: 1.25,
              color: "#e6edf3",
              maxWidth: "960px",
            }}
          >
            Engineering at the intersection of biology, computation, and hardware.
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8b949e" }}>
            {BRAND.siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
