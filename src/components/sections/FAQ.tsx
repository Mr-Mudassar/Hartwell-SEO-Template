"use client";
import { useState } from "react";

const ITEMS = [
  {
    question: "How long does it take to see results from SEO?",
    answer:
      "Most engagements begin showing measurable movement within 60-90 days. Significant compounding growth typically materializes between months 4-6. We set clear milestones and reporting cadences so progress is always visible.",
  },
  {
    question: "What makes Hartwell different from other SEO agencies?",
    answer:
      "We operate at the intersection of technical engineering and search science. Our team includes former Google engineers, data scientists, and content strategists. We don't just optimize pages — we build search systems that compound.",
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer:
      "We work with mid-market and enterprise organizations doing $5M+ in annual revenue. Our engagements are high-touch and strategic — not cookie-cutter audits. If you need a quick fix, we're not the right fit.",
  },
  {
    question: "What does your reporting look like?",
    answer:
      "Custom dashboards with real-time data, monthly strategy reviews, and quarterly business impact reports. We measure what matters: revenue attribution, market share of search, and compounding growth trajectories.",
  },
  {
    question: "Can you work with our existing marketing team?",
    answer:
      "Absolutely. We integrate seamlessly with internal teams, acting as an extension of your marketing org. We provide training, documentation, and collaborative workflows that upskill your team over time.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      style={{
        padding: "6rem var(--page-pad, 2rem)",
        maxWidth: "900px",
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
          FAQ
        </span>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, margin: 0 }}>
          Common questions.
        </h2>
      </div>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "none",
        }}
      >
        {ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.5rem 2rem",
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "1.05rem",
                  fontFamily: "inherit",
                  textAlign: "left",
                  gap: "2rem",
                }}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    fontSize: "1.25rem",
                    opacity: 0.5,
                    transition: "transform 0.3s ease",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <p
                    style={{
                      padding: "0 2rem 1.5rem 2rem",
                      margin: 0,
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      opacity: 0.6,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
