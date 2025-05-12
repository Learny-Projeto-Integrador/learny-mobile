import { useGetToken } from "./useGetToken"; // ajuste o caminho se necessário

type MissionData = {
  pontos: number;
  fasesConcluidas: number;
  tipoFase: string;
};

type SubmitMissionResponse = {
  success: boolean;
  result?: any;
  error?: string;
};

export const useSubmitMission = () => {
  const { getToken } = useGetToken();

  const submitMission = async (
    body: MissionData
  ): Promise<SubmitMissionResponse> => {
    try {
      const token = await getToken();

      const res = await fetch(`http://10.0.2.2:5000/criancas/faseconcluida`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.ok) {
        return { success: true, result };
      } else {
        return { success: false, error: result.error };
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
