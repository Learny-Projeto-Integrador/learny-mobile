import { createContext, useContext, ReactNode } from "react";
import { useApi } from "@/hooks/useApi";
import { useCustomAlert } from "@/contexts/AlertContext";

type AudioContextType = {
  checkAudio: () => Promise<void>;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const { request } = useApi();
  const { showAlert } = useCustomAlert();

  const checkAudio = async () => {
    console.log("checkAudio chamado");
    const result = await request({ endpoint: "/criancas" });

    if (result && !result.error) {
      return result.audio;
    } else {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro ao logar!",
        message: result?.message,
      });
    }
  };

  return (
    <AudioContext.Provider value={{ checkAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio deve ser usado dentro de um AudioProvider");
  }
  return context;
}
