const FEATURES = [
  { name: "Technical SEO Audit", foundation: "Quarterly", growth: "Monthly", enterprise: "Weekly" },
  { name: "Content Strategy", foundation: "Template-based", growth: "Custom clusters", enterprise: "Full editorial" },
  { name: "Link Acquisition", foundation: "5/month", growth: "15/month", enterprise: "Unlimited" },
  { name: "Reporting Cadence", foundation: "Monthly", growth: "Bi-weekly", enterprise: "Real-time" },
  { name: "Dedicated Strategist", foundation: "Shared", growth: "Dedicated", enterprise: "Senior + team" },
  { name: "Core Web Vitals", foundation: "Audit only", growth: "Optimization", enterprise: "Continuous" },
  { name: "Schema Implementation", foundation: "Basic", growth: "Advanced", enterprise: "Custom + testing" },
  { name: "Competitor Monitoring", foundation: "—", growth: "Top 5", enterprise: "Full landscape" },
];

export function CompareTable() {
  const headerStyle: React.CSSProperties = {
    padding: "1rem 1.5rem",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    opacity: 0.6,
    fontWeight: 600,
    borderBottom: "1px solid rgba(255,255,255,0.12)",
  };

  const cellStyle: React.CSSProperties = {
    padding: "1rem 1.5rem",
    fontSize: "0.875rem",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    opacity: 0.7,
  };

  return (
    <section
      style={{
        padding: "6rem var(--page-pad, 2rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div style={headerStyle}>Feature</div>
          <div style={headerStyle}>Foundation</div>
          <div style={headerStyle}>Growth</div>
          <div style={headerStyle}>Enterprise</div>
        </div>

        {/* Data rows */}
        {FEATURES.map((row) => (
          <div
            key={row.name}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
            }}
          >
            <div style={{ ...cellStyle, fontWeight: 400, opacity: 0.85 }}>
              {row.name}
            </div>
            <div style={cellStyle}>{row.foundation}</div>
            <div style={cellStyle}>{row.growth}</div>
            <div style={cellStyle}>{row.enterprise}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
