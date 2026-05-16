"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={barRef} />
      <style jsx>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--color-gold, #c9a84c);
          transform-origin: left;
          transform: scaleX(0);
          z-index: 9999;
          pointer-events: none;
          will-change: transform;
        }
      `}</style>
    </>
  );
}
