"use client";

const ARTICLES = [
  {
    tag: "Technical SEO",
    title: "Core Web Vitals in 2025: What Actually Moves the Needle",
    date: "Mar 2025",
    readTime: "8 min read",
  },
  {
    tag: "Content Strategy",
    title: "Topical Authority Mapping: A Systems Approach to Content",
    date: "Feb 2025",
    readTime: "12 min read",
  },
  {
    tag: "Case Study",
    title: "From 40K to 400K Monthly Visits: An E-Commerce Rebuild",
    date: "Jan 2025",
    readTime: "10 min read",
  },
];

export function InsightsPreview() {
  return (
    <section
      style={{
        padding: "6rem var(--page-pad, 2rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "3rem" }}>
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.4,
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Insights
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            margin: 0,
          }}
        >
          From the desk.
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {ARTICLES.map((article, i) => (
          <a
            key={i}
            href="/insights"
            className="reveal"
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transition: "border-color 0.3s ease",
            }}
          >
            {/* Placeholder image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            />

            <div
              style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                flex: 1,
              }}
            >
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                  color: "var(--gold, #d4af37)",
                }}
              >
                {article.tag}
              </span>

              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: 1.4,
                  flex: 1,
                }}
              >
                {article.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  fontSize: "0.75rem",
                  opacity: 0.35,
                  letterSpacing: "0.05em",
                }}
              >
                <span>{article.date}</span>
                <span>&middot;</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
