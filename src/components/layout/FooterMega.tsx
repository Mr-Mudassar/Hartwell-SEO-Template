"use client";

import { useEffect, useRef, useState } from "react";

const letters = ["H", "A", "R", "T", "W", "E", "L", "L"];

export function FooterMega() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="footer-mega" ref={containerRef}>
      <div className={`footer-mega-inner${isVisible ? " revealed" : ""}`}>
        {letters.map((letter, i) => (
          <span
            key={i}
            className="footer-mega-letter"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>

      <style jsx>{`
        .footer-mega {
          overflow: hidden;
          padding: 2rem 0;
          display: flex;
          justify-content: center;
        }

        .footer-mega-inner {
          display: flex;
          gap: 0.25em;
          justify-content: center;
        }

        .footer-mega-letter {
          font-family: var(--font-display);
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.04);
          letter-spacing: -0.02em;
          line-height: 1;
          clip-path: inset(100% 0 0 0);
          transition: clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1),
            color 0.6s ease;
        }

        .footer-mega-inner.revealed .footer-mega-letter {
          clip-path: inset(0 0 0 0);
        }
      `}</style>
    </div>
  );
}
