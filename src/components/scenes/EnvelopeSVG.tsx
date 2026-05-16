import React from "react";

export function EnvelopeSVG() {
  return (
    <svg
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Envelope illustration"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes flapBreath {
          0%, 100% { transform: rotateX(20deg); }
          50% { transform: rotateX(50deg); }
        }
        @keyframes beamDash {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes sealPulse {
          0%, 100% { r: 3; opacity: 0.8; }
          50% { r: 3.5; opacity: 1; }
        }
      `}</style>

      {/* envelope body */}
      <rect
        x="25"
        y="30"
        width="70"
        height="40"
        fill="#0E1014"
        stroke="#2A2F38"
        strokeWidth="1"
        rx="1"
      />

      {/* V-fold path */}
      <path
        d="M25 30 L60 55 L95 30"
        fill="none"
        stroke="#2A2F38"
        strokeWidth="0.6"
        opacity="0.4"
      />

      {/* flap triangle (animated rotation) */}
      <g
        style={{
          transformOrigin: "60px 30px",
          animation: "flapBreath 4s ease-in-out infinite",
        }}
      >
        <path
          d="M25 30 L60 10 L95 30 Z"
          fill="#0E1014"
          stroke="#2A2F38"
          strokeWidth="0.8"
          opacity="0.7"
        />
      </g>

      {/* wax seal center dot */}
      <circle
        cx="60"
        cy="52"
        r="3"
        fill="#C8A567"
        style={{ animation: "sealPulse 3s ease-in-out infinite" }}
      />

      {/* beam line (dashed, animated) */}
      <line
        x1="60"
        y1="50"
        x2="60"
        y2="5"
        stroke="#C8A567"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        opacity="0.4"
        style={{ animation: "beamDash 2s linear infinite" }}
      />
    </svg>
  );
}
