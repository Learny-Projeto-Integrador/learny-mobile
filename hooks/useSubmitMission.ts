import { useCustomAlert } from "@/contexts/AlertContext";
import { useApi } from "./useApi";
import { useCheckMedalha } from "./useCheckMedalha";

const imgsMedalhas: any = {
  "Iniciando!": require("@/assets/icons/icon-medalha-verde.png"),
  "A todo o vapor!": require("@/assets/icons/icon-medalha-vermelha.png"),
  "Desvendando": require("@/assets/icons/icon-medalha-azul.png"),
};

type Params = {
  pontos: number,
  tipoFase: string,
}

type SubmitMissionResponse = {
  success: boolean;
  result?: any;
  error?: string;
};

export const useSubmitMission = () => {
  const { showAlert } = useCustomAlert();
  const { checkMedalha } = useCheckMedalha();
  const { request } = useApi();

  const submitMission = async ({
    pontos,
    tipoFase,
  }: Params): Promise<SubmitMissionResponse> => {
    try {
      const result = await request({
        endpoint: "/criancas/faseconcluida",
        method: "PUT",
        body: JSON.stringify({
          pontos: pontos,
          tipoFase: tipoFase
        }),
      });

      console.log(pontos, tipoFase)
      console.log(result)

      if (result && !result.error) {
        const medalha = await checkMedalha();

        if (medalha == "Iniciando!") {
          pontos != 0 ? pontos += 50 : null
        } else if (medalha == "A todo o vapor!") {
          pontos = pontos * 2;
        }

        if (result.missaoConcluida) {
          showAlert({
            icon: require("@/assets/icons/icon-check-gradiente.png"),
            title: "Missão diária concluída!",
            message: result.missaoConcluida.descricao,
          });
        }

        if (result.medalhaGanha) {
          for (const medalha of result.medalhasGanhas) {
            showAlert({
              icon: imgsMedalhas[medalha.nome],
              title: "Medalha conquistada!",
              message: medalha.descricao,
            });
          }
        }

        return { success: true };

      } else {
        showAlert({
          icon: require("@/assets/icons/icon-check-gradiente.png"),
          title: "Erro ao adicionar pontução!",
          message: result.message,
        });

        return { success: false };
      }

    } catch (err) {
      return {
        success: false,
        error: "Não foi possível conectar ao servidor. Verifique sua conexão.",
      };
    }
  };

  return { submitMission };
};
