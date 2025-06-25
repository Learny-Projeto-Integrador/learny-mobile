import { useGetToken } from "./useGetToken"; // ajuste o caminho se necessário

export const useLoadData = () => {
  const { getToken } = useGetToken();

  const loadData = async (url: string) => {
    try {
      const token = await getToken();

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        return result;
      } else {
        alert(result.error);
      }
    } catch (err: any) {
      alert(err.message);
    } 
  };

  return { loadData };
};
