"use client";
import { useRef } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

export function Marquee({ children, speed = 30 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="marquee"
      style={{
        overflow: "hidden",
        position: "relative",
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="marquee-track"
        style={{
          display: "flex",
          width: "max-content",
          animation: `mScroll ${speed}s linear infinite`,
        }}
      >
        <div className="marquee-content" style={{ display: "flex", gap: "2rem" }}>
          {children}
        </div>
        <div className="marquee-content" aria-hidden="true" style={{ display: "flex", gap: "2rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
