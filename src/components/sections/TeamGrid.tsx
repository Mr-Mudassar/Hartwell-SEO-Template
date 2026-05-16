const TEAM = [
  { name: "James Hartwell", role: "Founder & Lead Strategist" },
  { name: "Elena Vasquez", role: "Technical SEO Director" },
  { name: "David Kim", role: "Head of Content Engineering" },
  { name: "Anya Petrov", role: "Data Science Lead" },
  { name: "Marcus Chen", role: "Authority & PR Director" },
  { name: "Sophie Laurent", role: "Client Success Manager" },
];

export function TeamGrid() {
  return (
    <section
      style={{
        padding: "6rem var(--page-pad, 2rem)",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
        }}
      >
        {TEAM.map((member) => (
          <div
            key={member.name}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Placeholder photo: striped, grayscale */}
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 4",
                background: `repeating-linear-gradient(
                  45deg,
                  rgba(255,255,255,0.03),
                  rgba(255,255,255,0.03) 2px,
                  transparent 2px,
                  transparent 8px
                )`,
                border: "1px solid rgba(255,255,255,0.06)",
                filter: "grayscale(1)",
              }}
            />

            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  margin: "0 0 0.25rem 0",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                  margin: 0,
                }}
              >
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
