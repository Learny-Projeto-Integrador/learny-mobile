import { useState } from "react";
import { useGetToken } from "./useGetToken";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestParams = {
  endpoint: string;
  method?: HttpMethod;
  body?: any;
};

type ApiError = {
  error: boolean;
  status: number;
  message?: string;
};

type UseApiReturn<T> = {
  loading: boolean;
  request: (params: RequestParams) => Promise<T | ApiError>;
};

export function useApi<T = any>(
  baseUrl = "https://learny-mobile-api.onrender.com"
): UseApiReturn<T> {
  const [loading, setLoading] = useState(false);
  const { getToken } = useGetToken();

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
        return { error: false, status: 204 };
      }

      const result = await res.json();

      if (!res.ok) {
        return { error: true, status: 400, message: result.error || "Erro inesperado." };
      }

      return result;
    } catch (err) {
      return { error: true, status: 500, message: "Não foi possível conectar ao servidor." };
    } finally {
      setLoading(false);
    }
  };

  return { loading, request };
}
