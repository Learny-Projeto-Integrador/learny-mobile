import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import type { TokenPayload } from "@/types";
import { useApi } from "@/hooks/useApi";
import LoginInput from "@/components/ui/LoginInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { RW, RH, RF, RS } from "@/theme";
import { useProgress } from "@/contexts/ProgressContext";
import { useRouter } from "expo-router";

/**
 * Página inicial da aplicação (Login)
 *
 * Responsável por:
 * - Login do usuário
 */
export default function LoginScreen() {
  const router = useRouter();

  /** Hook de comunicação com a API */
  const { loading, request } = useApi();

  /** Contextos */
  const { setUser } = useUser();
  const { getProgress } = useProgress();
  const { showAlert } = useCustomAlert();

  /** Estados */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Busca dados completos da criança para armazenar no contexto
   */
  const getUserData = async () => {
    const result = await request({
      endpoint: "/child",
      method: "GET",
    });

    if (result && !result.error) {
      setUser({
        username: result.username,
        name: result.name,
        rankingActive: result.rankingActive,
        audioActive: result.audioActive,
        profilePicture: result.profilePicture,
      });
    } else {
      showAlert({
        icon: require("@/assets/icons/custom-alert/alert.png"),
        title: "Erro ao carregar dados!",
        message: result.message || "Erro ao carregar informações do usuário",
      });
    }
  };

  /**
   * Envia requisição de login para a API
   */
  const handleLogin = async () => {
    const result = await request({
      endpoint: "/auth/login",
      method: "POST",
      body: { username, password },
    });

    if (result && !result.error) {
      const decoded = jwtDecode<TokenPayload>(result.access_token);

      if (decoded.user.type === "child") {
        await AsyncStorage.setItem("token", result.access_token);
        getUserData();
        getProgress();
        router.push("/screens/transition");
      } else {
        showAlert({
          icon: require("@/assets/icons/custom-alert/alert.png"),
          title: "Erro ao logar!",
          message:
            result.message ||
            "O usuário deve ser do tipo criança para acessar o app",
        });
      }
    } else {
      showAlert({
        icon: require("@/assets/icons/custom-alert/alert.png"),
        title: "Erro ao logar!",
        message: result.message || "Usuário e/ou senha inválidos",
      });
    }
  };

  return (
    <LinearGradient
      colors={["#973e4a", "#4b85a1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: RS(24),
            paddingVertical: RS(24),
            gap: RS(24),
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Logo */}
          <Image
            style={{
              width: RW(110),
              height: RW(110),
            }}
            source={require("@/assets/images/logo.png")}
            resizeMode="contain"
          />

          {/* Títulos */}
          <View
            style={{ marginHorizontal: RW(10) }}
            className="items-center gap-4"
          >
            <Text
              className="text-white font-montserratBold text-center"
              style={{ fontSize: RF(22) }}
            >
              Entre em sua conta Learny
            </Text>
            <Text
              className="text-white font-montserratRegular text-center"
              style={{ fontSize: RF(20) }}
            >
              Faça login com suas informações de cadastro
            </Text>
          </View>

          {/* Inputs */}
          <View className="w-[90%] gap-4 items-center">
            <LoginInput
              field="Usuário"
              value={username}
              onChange={setUsername}
            />
            <LoginInput
              field="Senha"
              value={password}
              onChange={setPassword}
              isPassword
            />

            {/* Botão */}
            <TouchableOpacity
              className="w-full bg-gray-100 rounded-2xl items-center justify-center"
              style={{ height: RH(56) }}
              onPress={handleLogin}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#547d98" />
              ) : (
                <Text
                  className="text-[#547d98] font-montserratBold"
                  style={{ fontSize: RF(18) }}
                >
                  Entrar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
