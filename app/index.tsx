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
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, TokenPayload } from "@/types";
import { useApi } from "@/hooks/useApi";
import LoginInput from "@/components/ui/LoginInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import { fontSizes, RH, RW, spacing } from "@/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { setUser } = useUser();
  const { loading, request } = useApi();
  const { showAlert } = useCustomAlert();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const result = await request({
      endpoint: "/auth/login",
      method: "POST",
      body: { username, password },
    });

    if (result && !result.error) {
      const decoded = jwtDecode<TokenPayload>(result.access_token);
      if (decoded.user.type === "child") {
        setUser({
          profilePicture: null,
          username: decoded.user.username,
          name: decoded.user.name,
          audioActive: null,
          rankingActive: null,
        });
        await AsyncStorage.setItem("token", result.access_token);
        navigation.navigate("transition", {
          name: decoded.user.name,
        });
      } else {
        showAlert({
          icon: require("@/assets/icons/icon-alerta.png"),
          title: "Erro ao logar!",
          message:
            result.message ||
            "O usuário deve ser do tipo criança para acessar o app",
        });
      }
    } else {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerClassName="flex-1 items-center justify-center"
            contentContainerStyle={{
              paddingHorizontal: spacing.lg,
              gap: spacing.lg,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <Image
              style={{
                width: RW(120),
                height: RW(120),
              }}
              source={require("@/assets/images/logo.png")}
              resizeMode="contain"
            />

            {/* Títulos */}
            <View className="w-5/6 items-center gap-4">
              <Text 
                className="text-white font-montserratBold text-center"
                style={{ fontSize: fontSizes.xl }}
              >
                Entre em sua conta Learny
              </Text>
              <Text 
                className="text-white font-montserratRegular text-center"
                style={{ fontSize: fontSizes.lg }}
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
                    style={{ fontSize: fontSizes.md }}
                  >
                    Entrar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}
