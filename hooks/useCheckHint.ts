import { useState } from "react";
import { useCheckMedalha } from "./useCheckMedalha";
import { useCustomAlert } from "@/contexts/AlertContext";

export const useCheckHint = () => {
  const { checkMedalha } = useCheckMedalha();
  const { showAlert } = useCustomAlert();
  const [hintUsed, setHintUsed] = useState(false);

  const checkHint = async (): Promise<boolean> => {
    if (hintUsed) {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message: "Você já utilizou a dica!",
      });
      return false;
    }

    const medalha = await checkMedalha();
    if (medalha !== "Desvendando") {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message: 'Você precisa estar com a medalha "Desvendando"',
      });
      return false;
    }

    return true; // passou na checagem
  };

  return { hintUsed, setHintUsed, checkHint };
};
