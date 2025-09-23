import { createContext, useContext, ReactNode, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useCustomAlert } from "@/contexts/AlertContext";

type AudioContextType = {
  audioEnabled: boolean;
  checkAudio: () => Promise<void>;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const { request } = useApi();
  const { showAlert } = useCustomAlert();
  const [audioEnabled, setAudioEnabled] = useState(false);

  const checkAudio = async () => {
    const result = await request({ endpoint: "/criancas" });

    if (result && !result.error) {
      setAudioEnabled(result.audio);
    } else {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro ao checar áudio!",
        message: result?.message,
      });
    }
  };

  return (
    <AudioContext.Provider value={{ audioEnabled, checkAudio }}>
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
