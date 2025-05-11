import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (e) {
      console.error("Erro ao buscar o token", e);
    }
  };

export function useGetToken() {
  return { getToken };
}