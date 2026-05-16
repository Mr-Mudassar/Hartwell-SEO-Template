import React from "react";

const LABELS = [
  { text: "+312% organic revenue", x: 88, y: 28 },
  { text: "$47M attributed pipeline", x: 12, y: 35 },
  { text: "1.2M monthly visits", x: 82, y: 72 },
  { text: "94% engagement renewal", x: 15, y: 68 },
];

export function MetricSphereSVG() {
  return (
    <svg
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Metric sphere with key performance indicators"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes centerPulse {
          0%, 100% { r: 6; opacity: 0.8; }
          50% { r: 7.5; opacity: 1; }
        }
        @keyframes ringFade {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.45; }
        }
      `}</style>

      {/* concentric latitude ellipses */}
      {[-30, -20, -10, 10, 20, 30].map((lat, i) => {
        const cy = 60 - lat * 0.8;
        const rx = Math.sqrt(Math.max(1, 40 * 40 - (cy - 60) ** 2));
        return (
          <ellipse
            key={i}
            cx="100"
            cy={cy}
            rx={rx}
            ry={3}
            fill="none"
            stroke="#2A2F38"
            strokeWidth="0.5"
            style={{ animation: `ringFade 4s ease-in-out ${i * 0.5}s infinite` }}
          />
        );
      })}

      {/* gold equator */}
      <ellipse
        cx="100"
        cy="60"
        rx="40"
        ry="4"
        fill="none"
        stroke="#C8A567"
        strokeWidth="0.8"
        opacity="0.8"
      />

      {/* outer circle */}
      <circle cx="100" cy="60" r="40" fill="none" stroke="#2A2F38" strokeWidth="0.4" opacity="0.3" />

      {/* pulsing center */}
      <circle
        cx="100"
        cy="60"
        r="6"
        fill="#C8A567"
        style={{ animation: "centerPulse 2.5s ease-in-out infinite" }}
      />

      {/* glow */}
      <circle cx="100" cy="60" r="10" fill="#C8A567" opacity="0.1" />

      {/* text labels */}
      {LABELS.map((label, i) => (
        <g key={i}>
          <line
            x1="100"
            y1="60"
            x2={label.x * 2}
            y2={label.y}
            stroke="#2A2F38"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            opacity="0.3"
          />
          <text
            x={label.x * 2}
            y={label.y}
            fill="#C8A567"
            fontSize="5"
            fontFamily="monospace"
            textAnchor={label.x > 50 ? "start" : "end"}
            dominantBaseline="middle"
            opacity="0.85"
          >
            {label.text}
          </text>
        </g>
      ))}
    </svg>
  );
}
