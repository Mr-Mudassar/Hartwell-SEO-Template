"use client";

const PILLARS = [
  {
    tag: "01 / TECHNICAL",
    title: "Technical Architecture",
    body: "Site speed, crawlability, structured data, and Core Web Vitals — the infrastructure layer that search engines reward.",
    icon: "tech",
  },
  {
    tag: "02 / CONTENT",
    title: "Content Engineering",
    body: "Keyword-mapped content systems designed for topical authority, entity coverage, and user intent alignment.",
    icon: "doc",
  },
  {
    tag: "03 / AUTHORITY",
    title: "Authority Building",
    body: "Strategic link acquisition and digital PR that compounds domain authority through high-relevance placements.",
    icon: "graph",
  },
];

function TechIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="6" width="26" height="20" rx="2" />
      <line x1="3" y1="10" x2="29" y2="10" />
      <text x="8" y="22" fontSize="7" fill="currentColor" stroke="none" fontFamily="monospace">&gt;_</text>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 4h12l6 6v18H8V4z" />
      <path d="M20 4v6h6" />
      <line x1="12" y1="16" x2="24" y2="16" />
      <line x1="12" y1="20" x2="20" y2="20" />
      <line x1="12" y1="24" x2="22" y2="24" />
    </svg>
  );
}

function GraphIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="16" cy="8" r="3" />
      <circle cx="8" cy="22" r="3" />
      <circle cx="24" cy="22" r="3" />
      <circle cx="26" cy="12" r="2" />
      <circle cx="6" cy="14" r="2" />
      <line x1="16" y1="11" x2="8" y2="19" />
      <line x1="16" y1="11" x2="24" y2="19" />
      <line x1="10" y1="20" x2="22" y2="20" />
      <line x1="18" y1="9" x2="24" y2="12" />
      <line x1="14" y1="9" x2="8" y2="14" />
    </svg>
  );
}

const ICON_MAP: Record<string, () => React.ReactElement> = {
  tech: TechIcon,
  doc: DocIcon,
  graph: GraphIcon,
};

export function Pillars() {
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
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {PILLARS.map((pillar) => {
          const Icon = ICON_MAP[pillar.icon];
          return (
            <article
              key={pillar.tag}
              className="reveal pillar-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                padding: "2.5rem",
                background: "rgba(255,255,255,0.01)",
                transition: "background 0.3s ease",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                }}
              >
                {pillar.tag}
              </span>

              <div style={{ opacity: 0.7 }}>
                <Icon />
              </div>

              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {pillar.title}
              </h3>

              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  opacity: 0.6,
                  margin: 0,
                  flex: 1,
                }}
              >
                {pillar.body}
              </p>

              <span
                className="pillar-arrow"
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.5,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                Learn more &rarr;
              </span>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .pillar-card:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }
        .pillar-card:hover .pillar-arrow {
          transform: translateX(4px);
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
