import { useState } from "react";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import { useGetToken } from "./useGetToken";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestParams = {
  endpoint: string;
  method?: HttpMethod;
  body?: any;
};

type ApiError = {
  error: true;
  type: string;
  message: string;
};

type UseApiReturn<T> = {
  loading: boolean;
  request: (params: RequestParams) => Promise<T | ApiError>;
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
  }: RequestParams): Promise<T | ApiError> => {
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
        return { error: true, type: "api", message: result.error || "Erro inesperado." };
      }

      return result;
    } catch (err) {
      return { error: true, type: "network", message: "Não foi possível conectar ao servidor." };
    } finally {
      setLoading(false);
    }
  };

  return { loading, request, showAlert, AlertComponent };
}
