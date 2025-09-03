import { useState } from "react";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import { useGetToken } from "./useGetToken";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestParams = {
  endpoint: string;
  method?: HttpMethod;
  body?: any;
};

type UseApiReturn<T> = {
  loading: boolean;
  request: (params: RequestParams) => Promise<T | null>;
  AlertComponent: () => JSX.Element | null;
  showAlert: ReturnType<typeof useCustomAlert>["showAlert"];
};

export function useApi<T = any>(
  baseUrl = "http://10.0.2.2:5000"
): UseApiReturn<T> {
  const [loading, setLoading] = useState(false);
  const { getToken } = useGetToken();
  const { showAlert, AlertComponent } = useCustomAlert();

  const request = async ({
    endpoint,
    method = "GET",
    body,
  }: RequestParams): Promise<T | null> => {
    setLoading(true);

    try {
      const token = await getToken();
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: method !== "GET" && body ? JSON.stringify(body) : undefined,
      });

      // se a resposta for 204 (No Content), não tenta parsear JSON
      if (res.status === 204) {
        return {} as T; // retorna um objeto vazio tipado para não quebrar o fluxo
      }

      const result = await res.json();

      if (!res.ok) {
        showAlert({
          icon: require("@/assets/icons/icon-alerta.png"),
          title: "Erro!",
          message: result.error || "Erro inesperado.",
        });
        return null;
      }

      return result;
    } catch (err) {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message:
          "Não foi possível conectar ao servidor. Verifique sua conexão.",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, request, showAlert, AlertComponent };
}
