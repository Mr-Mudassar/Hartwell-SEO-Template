"use client";

interface CaseCardProps {
  c: string;
  v: string;
  m: string;
  k: string;
  h: number;
  index: number;
}

export function CaseCard({ c, v, m, k, h, index }: CaseCardProps) {
  return (
    <article
      className="reveal"
      data-active
      style={{
        breakInside: "avoid",
        marginBottom: 18,
        padding: "28px",
        background: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border-soft)",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        height: h,
        transition: "transform .25s ease, border-color .25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-soft)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="label">{v}</span>
        <span className="label" style={{ fontFamily: "var(--font-mono)" }}>
          0{(index % 9) + 1} / 09
        </span>
      </div>
      <h3
        style={{
          margin: "22px 0 8px",
          fontSize: 28,
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        {c}
      </h3>
      <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>{k}</p>
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 44,
            color: "var(--color-accent)",
            letterSpacing: "-0.02em",
          }}
        >
          {m}
        </div>
        <div className="label">Organic traffic, 9 months</div>
      </div>
      {/* Background sparkline */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          opacity: 0.4,
        }}
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
      >
        <polyline
          points="0,38 20,35 40,30 60,28 80,22 100,18 120,15 140,10 160,8 180,5 200,2"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
        />
      </svg>
    </article>
  );
}
