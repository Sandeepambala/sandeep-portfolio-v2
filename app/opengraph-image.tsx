import { ImageResponse } from "next/og";
import { profile, stats } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

/**
 * Rendered once at build time, so it costs nothing at request time. Kept to
 * system fonts deliberately: fetching a webfont here would add a network hop
 * to every build for a difference nobody sees at thumbnail size.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f7f4",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#2642be",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#16201b" }}>{profile.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#16201b",
            }}
          >
            Your operations,
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#2642be",
            }}
          >
            wired end to end.
          </div>
          {/* Satori needs single text children, or an explicit display on the node. */}
          <div style={{ marginTop: 20, fontSize: 28, color: "#44524b" }}>
            {`${profile.role} · ERPNext · Frappe · AI automation`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 36, fontSize: 22, color: "#44524b" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", gap: 8 }}>
              <span style={{ fontWeight: 700, color: "#16201b" }}>{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
