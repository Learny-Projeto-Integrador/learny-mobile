import { useGetToken } from "./useGetToken"; // ajuste o caminho se necessário


export const useCheckMedalha = () => {
  const { getToken } = useGetToken();

  const checkMedalha = async () => {
    try {
      const token = await getToken();

      const res = await fetch("http://10.0.2.2:5000/criancas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        return result.medalhaSelecionada.nome
      } else {
        alert(result.error);
      }
    } catch (err: any) {
      alert(err.message);
    } 
  };

  return { checkMedalha };
};
