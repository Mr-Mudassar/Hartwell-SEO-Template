"use client";
import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { Choice } from "@/components/ui/Choice";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

const TOTAL_STEPS = 5; // 4 form steps + success

interface FormData {
  name: string;
  email: string;
  company: string;
  stage: string;
  goal: string;
  budget: string;
  timeline: string;
}

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    stage: "",
    goal: "",
    budget: "",
    timeline: "",
  });

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return form.name.trim().length > 0 && form.email.includes("@");
      case 1:
        return form.company.trim().length > 0 && form.stage.length > 0;
      case 2:
        return form.goal.trim().length > 0;
      case 3:
        return form.budget.length > 0 && form.timeline.length > 0;
      default:
        return false;
    }
  };

  const next = () => {
    if (step < 4 && canProceed()) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 0 && step < 4) {
      setStep(step - 1);
    }
  };

  return (
    <section
      style={{
        padding: "6rem var(--page-pad, 2rem)",
        maxWidth: "640px",
        margin: "0 auto",
      }}
    >
      {/* Progress dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          marginBottom: "3rem",
        }}
      >
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                i <= step
                  ? "var(--gold, #d4af37)"
                  : "rgba(255,255,255,0.15)",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Step content with animation */}
      <div
        style={{
          position: "relative",
          minHeight: "320px",
        }}
      >
        {/* Step 1: Name + Email */}
        <div
          style={{
            opacity: step === 0 ? 1 : 0,
            transform: step === 0 ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: step === 0 ? "auto" : "none",
            position: step === 0 ? "relative" : "absolute",
            inset: step === 0 ? undefined : 0,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>
            Let&apos;s start with the basics.
          </h3>
          <Field
            label="Your name"
            value={form.name}
            onChange={(v) => update("name", v)}
            placeholder="Jane Smith"
          />
          <Field
            label="Email address"
            value={form.email}
            onChange={(v) => update("email", v)}
            placeholder="jane@company.com"
          />
        </div>

        {/* Step 2: Company + Stage */}
        <div
          style={{
            opacity: step === 1 ? 1 : 0,
            transform: step === 1 ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: step === 1 ? "auto" : "none",
            position: step === 1 ? "relative" : "absolute",
            inset: step === 1 ? undefined : 0,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>
            Tell us about your company.
          </h3>
          <Field
            label="Company name"
            value={form.company}
            onChange={(v) => update("company", v)}
            placeholder="Acme Corp"
          />
          <Choice
            label="Company stage"
            value={form.stage}
            onChange={(v) => update("stage", v)}
            options={["Startup", "Scale-up", "Mid-market", "Enterprise"]}
          />
        </div>

        {/* Step 3: Goal */}
        <div
          style={{
            opacity: step === 2 ? 1 : 0,
            transform: step === 2 ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: step === 2 ? "auto" : "none",
            position: step === 2 ? "relative" : "absolute",
            inset: step === 2 ? undefined : 0,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>
            What&apos;s the primary goal?
          </h3>
          <Field
            label="Describe your objective"
            value={form.goal}
            onChange={(v) => update("goal", v)}
            placeholder="We want to increase organic traffic by 3x within 12 months..."
            area
          />
        </div>

        {/* Step 4: Budget + Timeline */}
        <div
          style={{
            opacity: step === 3 ? 1 : 0,
            transform: step === 3 ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: step === 3 ? "auto" : "none",
            position: step === 3 ? "relative" : "absolute",
            inset: step === 3 ? undefined : 0,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>
            Budget &amp; timeline.
          </h3>
          <Choice
            label="Monthly budget range"
            value={form.budget}
            onChange={(v) => update("budget", v)}
            options={["$5-10K", "$10-20K", "$20-50K", "$50K+"]}
          />
          <Choice
            label="Desired timeline"
            value={form.timeline}
            onChange={(v) => update("timeline", v)}
            options={["ASAP", "1-3 months", "3-6 months", "Flexible"]}
          />
        </div>

        {/* Step 5: Success */}
        <div
          style={{
            opacity: step === 4 ? 1 : 0,
            transform: step === 4 ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: step === 4 ? "auto" : "none",
            position: step === 4 ? "relative" : "absolute",
            inset: step === 4 ? undefined : 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            textAlign: "center",
            paddingTop: "2rem",
          }}
        >
          {/* Checkmark SVG */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            style={{ opacity: 0.9 }}
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="var(--gold, #d4af37)"
              strokeWidth="1.5"
            />
            <path
              d="M20 33L28 41L44 23"
              stroke="var(--gold, #d4af37)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>
            Application received.
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
              opacity: 0.6,
              margin: 0,
              maxWidth: "40ch",
            }}
          >
            Thank you, {form.name.split(" ")[0] || "there"}. We&apos;ll review your
            brief and respond within 48 hours with next steps.
          </p>
        </div>
      </div>

      {/* Navigation buttons */}
      {step < 4 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
          }}
        >
          {step > 0 ? (
            <Button variant="ghost" onClick={back} arrow={false}>
              &larr; Back
            </Button>
          ) : (
            <div />
          )}

          <Magnetic>
            <Button
              variant="solid"
              onClick={next}
              disabled={!canProceed()}
            >
              {step === 3 ? "Submit" : "Continue"}
            </Button>
          </Magnetic>
        </div>
      )}
    </section>
  );
}
