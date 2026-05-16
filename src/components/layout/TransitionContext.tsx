"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { ROUTE_LABELS } from "@/lib/constants";

interface TransitionState {
  isTransitioning: boolean;
  targetLabel: string;
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionState>({
  isTransitioning: false,
  targetLabel: "",
  navigate: () => {},
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLabel, setTargetLabel] = useState("");

  const navigate = useCallback(
    (href: string) => {
      const label = ROUTE_LABELS[href] ?? href.replace(/^\//, "").replace(/-/g, " ");

      setTargetLabel(label);
      setIsTransitioning(true);

      setTimeout(() => {
        router.push(href);

        setTimeout(() => {
          setIsTransitioning(false);
          setTargetLabel("");
        }, 580);
      }, 520);
    },
    [router]
  );

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, targetLabel, navigate }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  return useContext(TransitionContext);
}
