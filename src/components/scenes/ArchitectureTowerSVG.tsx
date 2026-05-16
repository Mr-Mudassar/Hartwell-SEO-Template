import React from "react";

const TIERS = [
  { y: 12, width: 16, height: 12 },
  { y: 22, width: 22, height: 12 },
  { y: 32, width: 28, height: 12 },
  { y: 42, width: 34, height: 12 },
  { y: 52, width: 40, height: 12 },
  { y: 62, width: 46, height: 12 },
];

export function ArchitectureTowerSVG() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Architecture tower illustration"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes travelDown {
          0% { cy: 8; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cy: 82; opacity: 0; }
        }
      `}</style>

      {/* tiers - stacked rectangles */}
      {TIERS.map((tier, i) => (
        <rect
          key={i}
          x={50 - tier.width / 2}
          y={tier.y}
          width={tier.width}
          height={tier.height}
          fill="none"
          stroke="#2A2F38"
          strokeWidth="0.6"
          opacity="0.55"
        />
      ))}

      {/* vertical center line */}
      <line x1="50" y1="8" x2="50" y2="78" stroke="#C8A567" strokeWidth="0.8" opacity="0.6" />

      {/* gold cap */}
      <circle cx="50" cy="8" r="2" fill="#C8A567" />

      {/* traveling pulses */}
      {[0, 1.5, 3, 4.5].map((delay, i) => (
        <circle
          key={`pulse-${i}`}
          cx="50"
          r="1.2"
          fill="#C8A567"
          opacity="0.8"
          style={{
            animation: `travelDown 4s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}
