"use client";

import { useState, useMemo } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useTransitionContext } from "@/components/layout/TransitionContext";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { ARTICLES } from "@/lib/constants";

/* ---------- category chips ---------- */
const CATEGORIES = ["All", "TECHNICAL", "CONTENT", "AUTHORITY", "MEASUREMENT", "INDUSTRY"] as const;

export default function InsightsPage() {
  useReveal();
  const { navigate } = useTransitionContext();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [email, setEmail] = useState("");

  const featured = ARTICLES[0];

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? ARTICLES.slice(1)
        : ARTICLES.filter((a) => a.tag === activeCategory),
    [activeCategory]
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // newsletter integration placeholder
    setEmail("");
  };

  return (
    <main>
      {/* ---- Hero ---- */}
      <section
        className="reveal"
        style={{
          padding: "8rem var(--page-pad, 2rem) 4rem",
          maxWidth: "1400px",
          margin: "0 auto",
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
          Insights
        </span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            margin: "1rem 0",
          }}
        >
          Field notes from the practice.
        </h1>
        <p
          style={{
            maxWidth: "52ch",
            opacity: 0.6,
            lineHeight: 1.7,
            fontSize: "1.05rem",
          }}
        >
          Frameworks, analyses, and lessons from the front lines of organic
          search. No fluff, no gated PDFs — just substance.
        </p>
      </section>

      {/* ---- Featured Article ---- */}
      <section
        className="reveal"
        style={{
          padding: "0 var(--page-pad, 2rem) 4rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))",
              minHeight: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.3,
            }}
          >
            Featured
          </div>

          {/* Body */}
          <div
            style={{
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.4,
              }}
            >
              <span>{featured.tag}</span>
              <span>&middot;</span>
              <span>{featured.r}</span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 400, margin: 0 }}>
              {featured.t}
            </h2>
            <p style={{ opacity: 0.6, lineHeight: 1.7, fontSize: "0.95rem" }}>
              {featured.e}
            </p>
            <div>
              <Button variant="ghost" onClick={() => navigate(`/insights/${featured.tag}`)}>
                Read article
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Category Filter Chips ---- */}
      <section
        style={{
          padding: "0 var(--page-pad, 2rem) 2rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.25rem",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                border: "1px solid",
                borderColor:
                  activeCategory === cat
                    ? "var(--color-gold, #c9a84c)"
                    : "rgba(255,255,255,0.12)",
                background:
                  activeCategory === cat
                    ? "rgba(201,168,76,0.1)"
                    : "transparent",
                color:
                  activeCategory === cat
                    ? "var(--color-gold, #c9a84c)"
                    : "rgba(255,255,255,0.6)",
                borderRadius: "2rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ---- Article Grid (3-col) ---- */}
      <section
        style={{
          padding: "2rem var(--page-pad, 2rem) 4rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {filtered.map((article) => (
            <article
              key={article.t}
              className="reveal"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                cursor: "pointer",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
              onClick={() => navigate(`/insights/${article.t}`)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                }}
              >
                <span>{article.tag}</span>
                <span>{article.r}</span>
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 400, margin: 0 }}>
                {article.t}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  opacity: 0.55,
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {article.e}
              </p>
              <span
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.5,
                  marginTop: "0.5rem",
                }}
              >
                Read &rarr;
              </span>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            style={{
              textAlign: "center",
              opacity: 0.4,
              padding: "4rem 0",
              fontSize: "0.9rem",
            }}
          >
            No articles in this category yet.
          </p>
        )}
      </section>

      {/* ---- Newsletter ---- */}
      <section
        className="reveal"
        style={{
          padding: "6rem var(--page-pad, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 400,
                margin: 0,
              }}
            >
              The Hartwell Brief
            </h2>
            <p
              style={{
                maxWidth: "40ch",
                opacity: 0.6,
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              A monthly digest of actionable SEO insights, algorithm analysis,
              and strategic frameworks. No spam, unsubscribe anytime.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "inherit",
                fontSize: "0.9rem",
                borderRadius: "0",
                outline: "none",
              }}
            />
            <Button variant="solid" type="submit" arrow={false}>
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
