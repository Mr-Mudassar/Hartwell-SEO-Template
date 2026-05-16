"use client";
import { Marquee } from "@/components/ui/Marquee";

const STATS = [
  { value: "3.2B+", description: "daily search queries optimized for" },
  { value: "412%", description: "average organic traffic increase" },
  { value: "8.4×", description: "return on SEO investment" },
  { value: "97%", description: "client retention rate" },
  { value: "<48h", description: "average response to algorithm updates" },
  { value: "14", description: "industries served globally" },
];

export function MarqueeBand() {
  return (
    <section
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "var(--bg-secondary, rgba(255,255,255,0.02))",
        padding: "1.5rem 0",
      }}
    >
      <Marquee speed={35}>
        {STATS.map((stat, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2rem",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "baseline", gap: "0.5rem" }}>
              <strong style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                {stat.value}
              </strong>
              <em style={{ fontStyle: "italic", opacity: 0.6, fontSize: "0.875rem" }}>
                {stat.description}
              </em>
            </span>
            {i < STATS.length - 1 && (
              <span style={{ opacity: 0.2, fontSize: "0.875rem" }}>/</span>
            )}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
