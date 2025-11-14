import { useCustomAlert } from "@/contexts/AlertContext";
import { useApi } from "./useApi";
import { useUser } from "@/contexts/UserContext";

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
  pontosAtualizados?: number;
  result?: any;
  error?: string;
};

export const useSubmitMission = () => {
  const { showAlert } = useCustomAlert();
  const { user } = useUser();
  const { request } = useApi();

  const submitMission = async ({
    pontos,
    tipoFase,
  }: Params): Promise<SubmitMissionResponse> => {
    try {

      const medalha = user?.medalhaSelecionada ? user?.medalhaSelecionada.nome : null;

      if (medalha == "Iniciando!") {
        pontos != 0 ? pontos += 50 : null
      } else if (medalha == "A todo o vapor!") {
        pontos = pontos * 2;
      }

      const result = await request({
        endpoint: "/criancas/faseconcluida",
        method: "PUT",
        body: {
          pontos: pontos,
          tipoFase: tipoFase
        },
      });

      if (result && !result.error) {

        if (result.missaoConcluida) {
          showAlert({
            icon: require("@/assets/icons/icon-check-gradiente.png"),
            title: "Missão diária concluída!",
            message: result.missaoConcluida.descricao,
          });
        }

        if (result.medalhasGanhas) {
          for (const medalha of result.medalhasGanhas) {
            showAlert({
              icon: imgsMedalhas[medalha.nome],
              title: "Medalha conquistada!",
              message: medalha.descricao,
            });
          }
        }

        return { success: true, pontosAtualizados: pontos };

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
