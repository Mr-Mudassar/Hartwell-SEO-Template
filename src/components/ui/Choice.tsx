"use client";

interface ChoiceProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}

export function Choice({ label, value, onChange, options, className }: ChoiceProps) {
  return (
    <fieldset className={className} style={{ border: "none", padding: 0, margin: 0 }}>
      <legend
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          opacity: 0.6,
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </legend>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "999px",
                border: `1px solid ${active ? "var(--gold, #d4af37)" : "rgba(255,255,255,0.15)"}`,
                background: active ? "var(--gold, #d4af37)" : "transparent",
                color: active ? "#0a0a0a" : "inherit",
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
