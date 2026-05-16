"use client";
import { clsx } from "clsx";

interface ButtonProps {
  variant?: "solid" | "ghost";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  arrow?: boolean;
}

export function Button({
  variant = "solid",
  children,
  onClick,
  disabled,
  className,
  type = "button",
  arrow = true,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx("cta", variant === "ghost" && "ghost", className)}
      onClick={onClick}
      disabled={disabled}
      data-active
    >
      {children}
      {arrow && <span className="cta-arrow">&rarr;</span>}
    </button>
  );
}
