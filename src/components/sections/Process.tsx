"use client";
import { useRef, useEffect, useState } from "react";

const STAGES = [
  {
    number: "01",
    title: "Discovery & Audit",
    description:
      "Full-spectrum technical audit, competitor gap analysis, and keyword universe mapping. We baseline everything before building.",
  },
  {
    number: "02",
    title: "Architecture & Strategy",
    description:
      "Information architecture redesign, content taxonomy, internal linking strategy, and a prioritized 90-day sprint plan.",
  },
  {
    number: "03",
    title: "Technical Foundation",
    description:
      "Core Web Vitals optimization, crawl budget management, schema markup implementation, and rendering fixes.",
  },
  {
    number: "04",
    title: "Content & Authority",
    description:
      "Programmatic content systems, topical cluster deployment, and strategic link acquisition from high-authority domains.",
  },
  {
    number: "05",
    title: "Measurement & Compounding",
    description:
      "Real-time dashboards, attribution modeling, iterative optimization, and compounding growth loops.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress: 0 when top enters viewport, 1 when section scrolls past
      const scrolled = -rect.top;
      const total = sectionHeight - viewportHeight;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trackShift = progress * (STAGES.length - 1) * -400;

  return (
    <section
      ref={sectionRef}
      style={{
        height: "360vh",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 var(--page-pad, 2rem)",
        }}
      >
        {/* Header */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            marginBottom: "3rem",
          }}
        >
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
            The engagement &middot; 05 stages
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              margin: 0,
            }}
          >
            From audit to <em style={{ fontStyle: "italic" }}>compounding.</em>
          </h2>
        </div>

        {/* Progress rail */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            marginBottom: "2.5rem",
            position: "relative",
            height: "3px",
          }}
        >
          {/* Background line */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.08)",
              height: "1px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          {/* Gold fill */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              height: "1px",
              width: `${progress * 100}%`,
              background: "var(--gold, #d4af37)",
              transition: "width 0.05s linear",
            }}
          />
          {/* Marker dot */}
          <div
            style={{
              position: "absolute",
              left: `${progress * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--gold, #d4af37)",
              transition: "left 0.05s linear",
            }}
          />
        </div>

        {/* Card track */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              transform: `translateX(${trackShift}px)`,
              transition: "transform 0.1s linear",
            }}
          >
            {STAGES.map((stage) => (
              <div
                key={stage.number}
                style={{
                  flex: "0 0 370px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    opacity: 0.3,
                  }}
                >
                  {stage.number} / 05
                </span>
                <h3
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  {stage.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    opacity: 0.6,
                    margin: 0,
                  }}
                >
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
