import { createContext, useContext, useCallback, useMemo, useState } from "react";

type TrailData = {
  worldCode: string | null;
  moduleCode: string | null;
  phaseCode: string | null;
};

type TrailContextData = TrailData & {
  setTrailData: (data: Partial<TrailData>) => void;
  resetTrailData: () => void;
};

const TrailContext = createContext({} as TrailContextData);

export function TrailProvider({ children }: any) {
  const [worldCode, setWorldCode] = useState<string | null>(null);
  const [moduleCode, setModuleCode] = useState<string | null>(null);
  const [phaseCode, setPhaseCode] = useState<string | null>(null);

  const setTrailData = useCallback((data: Partial<TrailData>) => {
    if ("worldCode" in data) {
      setWorldCode(data.worldCode ?? null);
    }

    if ("moduleCode" in data) {
      setModuleCode(data.moduleCode ?? null);
    }

    if ("phaseCode" in data) {
      setPhaseCode(data.phaseCode ?? null);
    }
  }, []);

  const resetTrailData = useCallback(() => {
    setWorldCode(null);
    setModuleCode(null);
    setPhaseCode(null);
  }, []);

  const value = useMemo(
    () => ({
      worldCode,
      moduleCode,
      phaseCode,
      setTrailData,
      resetTrailData,
    }),
    [worldCode, moduleCode, phaseCode, setTrailData, resetTrailData],
  );

  return (
    <TrailContext.Provider value={value}>
      {children}
    </TrailContext.Provider>
  );
}

export function useTrailContext() {
  return useContext(TrailContext);
}