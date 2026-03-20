import { useState } from "react";
import { useGetToken } from "./useGetToken";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/contexts/UserContext";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestParams = {
  endpoint: string;
  method?: HttpMethod;
  body?: any;
  navigation?: any;
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
  baseUrl = process.env.EXPO_PUBLIC_API_URL
): UseApiReturn<T> {
  const [loading, setLoading] = useState(false);
  const { getToken } = useGetToken();
  const { setUser } = useUser();

  const handleLogout = async (navigation: any) => {
    try {
      setUser(null);
      await AsyncStorage.multiRemove(["user", "token"]);
      navigation.reset({
        index: 0,
        routes: [{ name: "index" }],
      })
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  const request = async ({
    endpoint,
    method = "GET",
    body,
    navigation,
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

      if (res.status === 401) {
         Alert.alert('Sessão expirada!', 'Fazendo logout...', [
          { 
            text: 'OK', 
            onPress: () => navigation && handleLogout(navigation)
          },
        ]);
        
        return { error: true, status: 401 };
      }

      // se a resposta for 204 (No Content), não tenta parsear JSON
      if (res.status === 204) {
        return { error: false, status: 204 };
      }

      const result = await res.json();

      if (!res.ok) {
        return { error: true, status: res.status, message: result.error || "Erro inesperado." };
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
