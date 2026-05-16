import React from "react";

const DOTS = Array.from({ length: 28 }, (_, i) => {
  const angle = Math.random() * Math.PI * 2;
  const r = 18 + Math.random() * 24;
  return {
    cx: 50 + r * Math.cos(angle),
    cy: 50 + r * Math.sin(angle),
    delay: (Math.random() * 3).toFixed(2),
    id: i,
  };
});

export function GlobeSVG() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Wireframe globe illustration"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes globeSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .globe-rotate {
          transform-origin: 50px 50px;
          animation: globeSpin 60s linear infinite;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes arcDash {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <defs>
        <radialGradient id="globeRim" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="transparent" />
          <stop offset="100%" stopColor="#C8A567" stopOpacity="0.18" />
        </radialGradient>
      </defs>

      {/* rim glow */}
      <circle cx="50" cy="50" r="44" fill="url(#globeRim)" />

      {/* outer circle */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#2A2F38" strokeWidth="0.5" opacity="0.6" />

      <g className="globe-rotate">
        {/* latitude ellipses */}
        {[-30, -20, -10, 0, 10, 20, 30].map((lat) => {
          const ry = Math.abs(42 * Math.cos((lat * Math.PI) / 45));
          const cy = 50 - (lat / 30) * 28;
          return (
            <ellipse
              key={`lat-${lat}`}
              cx="50"
              cy={cy}
              rx={Math.sqrt(42 * 42 - (cy - 50) ** 2) || 10}
              ry={ry * 0.12}
              fill="none"
              stroke="#2A2F38"
              strokeWidth="0.4"
              opacity="0.45"
            />
          );
        })}

        {/* longitude ellipses */}
        {Array.from({ length: 10 }, (_, i) => {
          const angle = (i / 10) * 180;
          return (
            <ellipse
              key={`lon-${i}`}
              cx="50"
              cy="50"
              rx={42 * Math.cos((angle * Math.PI) / 180)}
              ry="42"
              fill="none"
              stroke="#2A2F38"
              strokeWidth="0.4"
              opacity="0.45"
              transform={`rotate(${angle % 180}, 50, 50)`}
            />
          );
        })}

        {/* dots */}
        {DOTS.map((dot) => (
          <circle
            key={dot.id}
            cx={dot.cx}
            cy={dot.cy}
            r="0.9"
            fill="#C8A567"
            style={{
              animation: `dotPulse 2.5s ease-in-out ${dot.delay}s infinite`,
            }}
          />
        ))}

        {/* arc paths */}
        <path
          d="M30 35 Q50 15 70 40"
          fill="none"
          stroke="#C8A567"
          strokeWidth="0.6"
          strokeDasharray="4 3"
          opacity="0.6"
          style={{ animation: "arcDash 4s linear infinite" }}
        />
        <path
          d="M25 60 Q50 85 75 55"
          fill="none"
          stroke="#C8A567"
          strokeWidth="0.6"
          strokeDasharray="4 3"
          opacity="0.6"
          style={{ animation: "arcDash 5s linear infinite" }}
        />
      </g>
    </svg>
  );
}
