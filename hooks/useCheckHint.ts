import { useState } from "react";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";

export const useCheckHint = () => {
  const { user } = useUser();
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

    const medalha = user?.medalhaSelecionada ? user?.medalhaSelecionada.nome : null;

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
