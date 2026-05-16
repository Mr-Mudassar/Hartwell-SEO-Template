"use client";

export function GradientMesh() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          maxWidth: "800px",
          maxHeight: "800px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
          top: "-20%",
          left: "-10%",
          animation: "meshDrift1 20s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
          top: "30%",
          right: "-15%",
          animation: "meshDrift2 25s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          bottom: "-10%",
          left: "30%",
          animation: "meshDrift3 22s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}
