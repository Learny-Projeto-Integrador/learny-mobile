import { createContext, useContext, ReactNode } from "react";
import { usePhase } from "@/hooks/usePhase";

const PhaseContext = createContext({} as ReturnType<typeof usePhase>);

export function PhaseProvider({ children }: { children: ReactNode }) {
  const phase = usePhase();

  return (
    <PhaseContext.Provider value={phase}>
      {children}
    </PhaseContext.Provider>
  );
}

export function usePhaseContext() {
  return useContext(PhaseContext);
}