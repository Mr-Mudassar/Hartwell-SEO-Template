import React from "react";

const PAGES = [
  { x: 30, delay: 0, width: 14, height: 18 },
  { x: 60, delay: 1.2, width: 12, height: 16 },
  { x: 90, delay: 2.5, width: 15, height: 20 },
  { x: 120, delay: 3.8, width: 11, height: 15 },
];

export function ContentFlowSVG() {
  return (
    <svg
      viewBox="0 0 160 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Content flow illustration with rising page elements"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes riseUp {
          0% { transform: translateY(40px); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
      `}</style>

      {/* grid pattern plane (skewed perspective) */}
      <g transform="skewX(-8) skewY(4)" style={{ animation: "gridPulse 5s ease-in-out infinite" }}>
        {/* horizontal lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1="10"
            y1={55 + i * 5}
            x2="150"
            y2={55 + i * 5}
            stroke="#2A2F38"
            strokeWidth="0.4"
            opacity="0.3"
          />
        ))}
        {/* vertical lines */}
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={15 + i * 12}
            y1="55"
            x2={15 + i * 12}
            y2="90"
            stroke="#2A2F38"
            strokeWidth="0.4"
            opacity="0.3"
          />
        ))}
      </g>

      {/* animated rising rectangles */}
      {PAGES.map((page, i) => (
        <rect
          key={i}
          x={page.x}
          y="70"
          width={page.width}
          height={page.height}
          fill="none"
          stroke="#C8A567"
          strokeWidth="0.6"
          opacity="0"
          rx="1"
          style={{
            animation: `riseUp 5s ease-in-out ${page.delay}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}
