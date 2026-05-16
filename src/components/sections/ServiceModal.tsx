"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

export interface ServiceDetail {
  tag: string;
  title: string;
  description: string;
  inputs: string[];
  deliverables: string[];
  cadence: string[];
}

interface ServiceModalProps {
  service: ServiceDetail;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const columnHeadingStyle: React.CSSProperties = {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    opacity: 0.5,
    marginBottom: "1rem",
    fontWeight: 600,
  };

  const listStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontSize: "0.875rem",
    opacity: 0.7,
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "var(--background, #0a0a0a)",
          border: "1px solid rgba(255,255,255,0.1)",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "85vh",
          overflow: "auto",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          animation: "modalIn 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.4,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              {service.tag} / 08
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 400, margin: 0 }}>
              {service.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              fontSize: "1.5rem",
              opacity: 0.5,
              padding: "0.5rem",
              lineHeight: 1,
            }}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Description */}
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, opacity: 0.7, margin: 0 }}>
          {service.description}
        </p>

        {/* 3-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "2rem",
          }}
        >
          <div>
            <h4 style={columnHeadingStyle}>Inputs</h4>
            <ul style={listStyle}>
              {service.inputs.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={columnHeadingStyle}>Deliverables</h4>
            <ul style={listStyle}>
              {service.deliverables.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={columnHeadingStyle}>Cadence</h4>
            <ul style={listStyle}>
              {service.cadence.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}>
          <Button variant="solid" onClick={onClose}>
            Scope this service
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
