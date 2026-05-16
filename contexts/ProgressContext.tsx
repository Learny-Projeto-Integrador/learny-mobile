import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Progress } from "@/types/progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi } from "@/hooks/useApi";
import { useCustomAlert } from "./AlertContext";

type ProgressContextType = {
  progress: Progress | null;
  setProgress: React.Dispatch<React.SetStateAction<Progress | null>>;
  getProgress: () => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { request } = useApi();
  const { showAlert } = useCustomAlert();
  const [progress, setProgress] = useState<Progress | null>(null);

  const getProgress = async () => {
    const result = await request({
      endpoint: `/child/progress`,
      method: "GET",
    });

    if (result && !result.error) {
      setProgress({
        points: result.points,
        coins: result.coins,
        stellarPoints: result.stellarPoints,
        streak: result.streak,
        selectedCharacter: result.selectedCharacter,
        completedPhases: result.completedPhases,
        worlds: result.worlds,
        dailyMissions: result.dailyMissions,
        characters: result.characters,
      });
    } else {
      if (result.status === 404) return;
      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao buscar filho!",
        message: result.message || "Erro desconhecido ao carregar filho",
      });
    }
  }

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
    <ProgressContext.Provider value={{ progress, setProgress, getProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress deve ser usado dentro de um ProgressProvider");
  return context;
}
