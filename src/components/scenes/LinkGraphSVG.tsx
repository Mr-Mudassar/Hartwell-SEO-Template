import React from "react";

const RING1 = Array.from({ length: 6 }, (_, i) => {
  const angle = (i / 6) * Math.PI * 2;
  return { cx: 50 + 16 * Math.cos(angle), cy: 50 + 16 * Math.sin(angle), id: `r1-${i}` };
});
const RING2 = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2 + 0.3;
  return { cx: 50 + 28 * Math.cos(angle), cy: 50 + 28 * Math.sin(angle), id: `r2-${i}` };
});
const RING3 = Array.from({ length: 4 }, (_, i) => {
  const angle = (i / 4) * Math.PI * 2 + 0.7;
  return { cx: 50 + 38 * Math.cos(angle), cy: 50 + 38 * Math.sin(angle), id: `r3-${i}` };
});

const ALL_NODES = [...RING1, ...RING2, ...RING3];

export function LinkGraphSVG() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Link network graph illustration"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes nodePulse {
          0%, 100% { opacity: 0.4; r: 1.2; }
          50% { opacity: 1; r: 1.6; }
        }
        @keyframes particleTravel {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes centerPulse {
          0%, 100% { r: 4; }
          50% { r: 4.5; }
        }
      `}</style>

      {/* lines to center */}
      {ALL_NODES.map((node) => (
        <line
          key={`line-${node.id}`}
          x1="50"
          y1="50"
          x2={node.cx}
          y2={node.cy}
          stroke="#2A2F38"
          strokeWidth="0.4"
          opacity="0.4"
        />
      ))}

      {/* center gold circle + glow */}
      <circle cx="50" cy="50" r="6" fill="#C8A567" opacity="0.12" />
      <circle
        cx="50"
        cy="50"
        r="4"
        fill="#C8A567"
        style={{ animation: "centerPulse 3s ease-in-out infinite" }}
      />

      {/* outer nodes */}
      {ALL_NODES.map((node, i) => (
        <circle
          key={node.id}
          cx={node.cx}
          cy={node.cy}
          r="1.2"
          fill="#C8A567"
          style={{
            animation: `nodePulse 2.5s ease-in-out ${(i * 0.3).toFixed(1)}s infinite`,
          }}
        />
      ))}

      {/* animated particles moving inward (approximated with translate) */}
      {ALL_NODES.slice(0, 8).map((node, i) => {
        const dx = 50 - node.cx;
        const dy = 50 - node.cy;
        return (
          <circle
            key={`particle-${i}`}
            r="0.8"
            fill="#C8A567"
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from={`${node.cx} ${node.cy}`}
              to="50 50"
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </svg>
  );
}
