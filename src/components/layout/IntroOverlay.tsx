"use client";

import { useEffect, useState } from "react";

type Phase = "hidden" | "line" | "name" | "split" | "done";

const letters = "HARTWELL SEO".split("");

export function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem("intro-shown")) {
      setShouldRender(false);
      return;
    }

    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      sessionStorage.setItem("intro-shown", "1");
      setShouldRender(false);
      return;
    }

    // Start the phase sequence
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase: line
    timers.push(setTimeout(() => setPhase("line"), 100));

    // Phase: name
    timers.push(setTimeout(() => setPhase("name"), 800));

    // Phase: split
    timers.push(setTimeout(() => setPhase("split"), 2200));

    // Phase: done
    timers.push(
      setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem("intro-shown", "1");
        setTimeout(() => setShouldRender(false), 600);
      }, 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`intro-overlay phase-${phase}`}>
      {/* Top panel */}
      <div className="intro-panel intro-panel-top" />
      {/* Bottom panel */}
      <div className="intro-panel intro-panel-bottom" />

      {/* Center content */}
      <div className="intro-center">
        <div className="intro-line" />
        <div className="intro-name">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="intro-letter"
              style={{ transitionDelay: `${i * 50 + 200}ms` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
        <div className="intro-tag">EST. 2019 &middot; NEW YORK</div>
      </div>

      <style jsx>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
        }

        .intro-overlay.phase-done {
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .intro-panel {
          position: absolute;
          left: 0;
          right: 0;
          height: 50%;
          background: var(--color-bg, #0a0a0a);
          transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .intro-panel-top {
          top: 0;
          transform-origin: top;
        }

        .intro-panel-bottom {
          bottom: 0;
          transform-origin: bottom;
        }

        .phase-split .intro-panel-top {
          transform: translateY(-100%);
        }

        .phase-split .intro-panel-bottom {
          transform: translateY(100%);
        }

        .phase-done .intro-panel-top {
          transform: translateY(-100%);
        }

        .phase-done .intro-panel-bottom {
          transform: translateY(100%);
        }

        .intro-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .intro-line {
          width: 0;
          height: 1.5px;
          background: var(--color-gold, #c9a84c);
          transition: width 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .phase-line .intro-line,
        .phase-name .intro-line,
        .phase-split .intro-line {
          width: 48px;
        }

        .intro-name {
          display: flex;
          gap: 0.05em;
          overflow: hidden;
        }

        .intro-letter {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.1em;
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .phase-name .intro-letter,
        .phase-split .intro-letter {
          opacity: 1;
          transform: translateY(0);
        }

        .intro-tag {
          font-size: 0.6875rem;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }

        .phase-name .intro-tag,
        .phase-split .intro-tag {
          opacity: 1;
        }

        .phase-split .intro-center {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .phase-done .intro-center {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
