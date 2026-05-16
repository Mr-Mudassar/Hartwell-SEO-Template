"use client";
import { Counter } from "@/components/ui/Counter";
import { Button } from "@/components/ui/Button";

export interface PlanTier {
  name: string;
  subtitle: string;
  price: number;
  blurb: string;
  features: string[];
  featured?: boolean;
}

interface PlanCardProps {
  tier: PlanTier;
  onContact?: () => void;
}

export function PlanCard({ tier, onContact }: PlanCardProps) {
  return (
    <div
      style={{
        position: "relative",
        border: `1px solid ${tier.featured ? "var(--gold, #d4af37)" : "rgba(255,255,255,0.08)"}`,
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        background: tier.featured
          ? "rgba(212,175,55,0.03)"
          : "rgba(255,255,255,0.01)",
        overflow: "hidden",
      }}
    >
      {/* Shimmer border animation for featured */}
      {tier.featured && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: "inherit",
            background:
              "conic-gradient(from var(--shimmer-angle, 0deg), transparent 60%, var(--gold, #d4af37) 80%, transparent 100%)",
            opacity: 0.3,
            animation: "shimmerRotate 4s linear infinite",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Content wrapper */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1 }}>
        {/* Badge */}
        {tier.featured && (
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "var(--gold, #d4af37)",
              color: "#0a0a0a",
              padding: "0.35rem 0.75rem",
              fontWeight: 600,
            }}
          >
            Most selected
          </span>
        )}

        {/* Name + subtitle */}
        <div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 400, margin: "0 0 0.25rem 0" }}>
            {tier.name}
          </h3>
          <p style={{ fontSize: "0.8rem", opacity: 0.5, margin: 0 }}>
            {tier.subtitle}
          </p>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
          <span style={{ fontSize: "0.9rem", opacity: 0.6 }}>$</span>
          <Counter
            to={tier.price}
            className="plan-price"
            duration={1.5}
          />
          <span style={{ fontSize: "0.85rem", opacity: 0.4 }}>/month</span>
        </div>

        {/* Blurb */}
        <p style={{ fontSize: "0.9rem", lineHeight: 1.6, opacity: 0.6, margin: 0 }}>
          {tier.blurb}
        </p>

        {/* Features */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            flex: 1,
          }}
        >
          {tier.features.map((feature) => (
            <li
              key={feature}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "0.875rem",
                opacity: 0.7,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <path
                  d="M3 8.5L6.5 12L13 4"
                  stroke="var(--gold, #d4af37)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={tier.featured ? "solid" : "ghost"}
          onClick={onContact}
        >
          {tier.featured ? "Get started" : "Learn more"}
        </Button>
      </div>

      <style jsx>{`
        @keyframes shimmerRotate {
          from {
            --shimmer-angle: 0deg;
          }
          to {
            --shimmer-angle: 360deg;
          }
        }
        @property --shimmer-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        .plan-price {
          font-size: 2.5rem;
          font-weight: 300;
        }
      `}</style>
    </div>
  );
}
