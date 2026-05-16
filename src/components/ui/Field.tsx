"use client";
import { useRef, useState } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  area?: boolean;
  className?: string;
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  area = false,
  className,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const id = useRef(`field-${label.toLowerCase().replace(/\s+/g, "-")}`);

  const inputStyles: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "var(--gold, #d4af37)" : "rgba(255,255,255,0.15)"}`,
    padding: "0.75rem 0",
    color: "inherit",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    resize: area ? "vertical" : undefined,
    fontFamily: "inherit",
  };

  return (
    <label htmlFor={id.current} className={className} style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          opacity: 0.6,
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </span>
      {area ? (
        <textarea
          id={id.current}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          rows={4}
          style={inputStyles}
        />
      ) : (
        <input
          id={id.current}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={inputStyles}
        />
      )}
    </label>
  );
}
