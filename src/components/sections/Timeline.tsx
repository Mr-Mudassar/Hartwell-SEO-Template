const MILESTONES = [
  {
    year: "2019",
    description:
      "Founded Hartwell with a singular focus: making organic search a measurable, engineered discipline.",
  },
  {
    year: "2020",
    description:
      "Launched our proprietary audit framework and secured our first enterprise client — a $200M SaaS platform.",
  },
  {
    year: "2021",
    description:
      "Expanded to a team of 12. Developed our content systems methodology that now powers all engagements.",
  },
  {
    year: "2023",
    description:
      "Crossed $10M in attributable client revenue from organic search. Opened advisory practice for PE-backed portfolios.",
  },
  {
    year: "2025",
    description:
      "Serving 30+ mid-market and enterprise clients. Pioneering AI-augmented SEO engineering workflows.",
  },
];

export function Timeline() {
  return (
    <section
      style={{
        padding: "6rem var(--page-pad, 2rem)",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div style={{ position: "relative", paddingLeft: "3rem" }}>
        {/* Vertical line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "6px",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "rgba(255,255,255,0.1)",
          }}
        />

        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            className="reveal"
            style={{
              position: "relative",
              paddingBottom: i < MILESTONES.length - 1 ? "3rem" : 0,
            }}
          >
            {/* Gold dot */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-3rem",
                top: "0.35rem",
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                background: "var(--gold, #d4af37)",
                transform: "translateX(-0.5px)",
              }}
            />

            <span
              style={{
                display: "block",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                color: "var(--gold, #d4af37)",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              {m.year}
            </span>

            <p
              style={{
                margin: 0,
                fontSize: "1.1rem",
                lineHeight: 1.6,
                fontFamily: "var(--font-display, Georgia, serif)",
                opacity: 0.75,
              }}
            >
              {m.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
