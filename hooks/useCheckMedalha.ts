import { useApi } from "./useApi";

export const useCheckMedalha = () => {
  const { request } = useApi();

  const checkMedalha = async () => {
    const result = await request({
      endpoint: "/criancas",
    });

    if (result) {
      return result.medalhaSelecionada.nome
    }
  };

  return { checkMedalha };
};
