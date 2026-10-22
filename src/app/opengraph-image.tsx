import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { COMPANY } from "@/lib/site";

export const alt = `${COMPANY.displayName}, freight trucking from Mason, Ohio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "src/assets/hero-truck-dusk.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const logo = await readFile(join(process.cwd(), "src/assets/brand/stg-lockup-light.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", color: "#ffffff" }}>
      <img
        src={photoSrc}
        alt=""
        width={1200}
        height={800}
        style={{ position: "absolute", top: -60, left: 0, width: 1200, height: 800, objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(11,15,21,0.94) 0%, rgba(11,15,21,0.6) 50%, rgba(11,15,21,0.1) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          width: "100%",
        }}
      >
        <img src={logoSrc} alt="" width={240} height={109} style={{ width: 240, height: 109 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 900, lineHeight: 0.92, letterSpacing: -3 }}>
            FREIGHT THAT
          </div>
          <div
            style={{ display: "flex", fontSize: 104, fontWeight: 900, lineHeight: 0.92, letterSpacing: -3 }}
          >
            ARRIVES<span style={{ color: "#14b3f5" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 24, color: "rgba(255,255,255,0.8)" }}>
          <span>
            {COMPANY.address.city}, {COMPANY.address.region}
          </span>
          <span>USDOT {COMPANY.usdot}</span>
          <span style={{ color: "#14b3f5" }}>{COMPANY.phone.display}</span>
        </div>
      </div>
    </div>,
    size,
  );
}
