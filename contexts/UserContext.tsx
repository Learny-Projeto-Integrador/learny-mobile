import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import type { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  // 🔁 Recupera usuário salvo ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do AsyncStorage:", error);
      }
    };

    loadUser();
  }, []);

  // 💾 Salva/Remove no AsyncStorage sempre que mudar
  useEffect(() => {
    const persistUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Erro ao salvar usuário no AsyncStorage:", error);
      }
    };

    persistUser();
  }, [user]);

  // 🚪 Logout
  const logout = useCallback(async () => {
    try {
      setUser(null);
      await AsyncStorage.multiRemove(["user", "token"]);
      router.replace("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }, [router]);

  const value = useMemo(
    () => ({ user, setUser, logout }),
    [user, logout],
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser deve ser usado dentro de um UserProvider");
  return context;
}
