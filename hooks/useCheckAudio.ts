import { useCustomAlert } from "@/contexts/AlertContext";
import { useApi } from "./useApi";

export const useCheckAudio = () => {
  const { request } = useApi();
  const { showAlert } = useCustomAlert();

  const checkAudio = async () => {
    const result = await request({
      endpoint: "/criancas",
    });

    if (result && !result.error) {
      return result.audio
    } else {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro ao logar!",
        message: result.message,
      });
    }
  };

  return { checkAudio };
};
