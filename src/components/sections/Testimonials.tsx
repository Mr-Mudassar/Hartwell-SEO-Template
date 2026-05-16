"use client";

const TESTIMONIALS = [
  {
    quote:
      "Hartwell doesn't just optimize pages — they re-engineer how search engines understand your entire business. The results speak for themselves.",
    name: "Sarah Chen",
    role: "VP Marketing, NovaTech Solutions",
  },
  {
    quote:
      "In eighteen months, they turned organic search from an afterthought into our primary revenue channel. The ROI has been extraordinary.",
    name: "Marcus Hale",
    role: "CEO, Meridian Health Group",
  },
  {
    quote:
      "Their technical depth is unmatched. They found indexation issues that three previous agencies missed — issues costing us millions in lost traffic.",
    name: "Priya Ramanathan",
    role: "CTO, Arcadia Finance",
  },
  {
    quote:
      "Working with Hartwell feels like having a team of search scientists embedded in your org. Data-driven, precise, and relentlessly focused on outcomes.",
    name: "David Moreau",
    role: "Director of Growth, Vertex Commerce",
  },
];

export function Testimonials() {
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
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            className="reveal"
            style={{
              margin: 0,
              padding: "2.5rem",
              background: "rgba(255,255,255,0.01)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Opening quote mark */}
            <span
              style={{
                fontSize: "3rem",
                lineHeight: 1,
                opacity: 0.15,
                fontFamily: "var(--font-display, Georgia, serif)",
              }}
            >
              &ldquo;
            </span>

            <blockquote
              style={{
                margin: 0,
                fontSize: "1.1rem",
                lineHeight: 1.7,
                fontFamily: "var(--font-display, Georgia, serif)",
                fontStyle: "italic",
                opacity: 0.8,
                flex: 1,
              }}
            >
              {t.quote}
            </blockquote>

            <figcaption
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                {t.name}
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                }}
              >
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
