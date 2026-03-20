import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Progress } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProgressContextType = {
  progress: Progress | null;
  setProgress: React.Dispatch<React.SetStateAction<Progress | null>>;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress | null>(null);

  // 🔁 Recupera usuário salvo ao iniciar
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem("progress");
        if (storedProgress) {
          setProgress(JSON.parse(storedProgress));
        }
      } catch (error) {
        console.error("Erro ao carregar progresso do AsyncStorage:", error);
      }
    };

    loadProgress();
  }, []);

  // 💾 Salva/Remove no AsyncStorage sempre que mudar
  useEffect(() => {
    const persistProgress = async () => {
      try {
        if (progress) {
          await AsyncStorage.setItem("progress", JSON.stringify(progress));
        } else {
          await AsyncStorage.removeItem("progress");
        }
      } catch (error) {
        console.error("Erro ao salvar progresso no AsyncStorage:", error);
      }
    };

    persistProgress();
  }, [progress]);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress deve ser usado dentro de um ProgressProvider");
  return context;
}
