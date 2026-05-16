interface WordmarkProps {
  size?: number;
}

export function Wordmark({ size = 22 }: WordmarkProps) {
  return (
    <span className="wordmark" style={{ fontSize: size }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        Hartwell
      </span>
      <span className="divider" />
      <span className="sub">SEO</span>
    </span>
  );
}
