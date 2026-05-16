import React from "react";

const DOTS = Array.from({ length: 80 }, (_, i) => ({
  cx: 5 + Math.random() * 190,
  cy: 15 + Math.random() * 70,
  delay: (Math.random() * 4).toFixed(2),
  id: i,
}));

export function ParticleFieldSVG() {
  return (
    <svg
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Particle field forming ENGAGE text"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes particleDrift {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(-2px); }
        }
        @keyframes textGlow {
          0%, 100% { stroke-opacity: 0.3; }
          50% { stroke-opacity: 0.8; }
        }
      `}</style>

      {/* "ENGAGE" stroked text outline */}
      <text
        x="100"
        y="55"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="none"
        stroke="#C8A567"
        strokeWidth="0.6"
        fontSize="28"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        style={{ animation: "textGlow 4s ease-in-out infinite" }}
      >
        ENGAGE
      </text>

      {/* scattered animated dots */}
      {DOTS.map((dot) => (
        <circle
          key={dot.id}
          cx={dot.cx}
          cy={dot.cy}
          r="0.6"
          fill="#C8A567"
          style={{
            animation: `particleDrift 3s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}
