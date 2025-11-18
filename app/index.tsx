import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import { useApi } from "@/hooks/useApi";
import LoginInput from "@/components/ui/LoginInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { setUser } = useUser();
  const { loading, request } = useApi();
  const { showAlert } = useCustomAlert();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    const result = await request({
      endpoint: "/login",
      method: "POST",
      body: { usuario, senha },
    });

    if (result && !result.error && result.tipo == "crianca") {
      await AsyncStorage.setItem("token", result.access_token);
      setUser(result.user);
      navigation.navigate("transition", {
        name: result.user.nome,
      });
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
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image style={styles.logo} source={require("@/assets/images/logo.png")} />

          <View style={styles.viewTitle}>
            <Text style={styles.title}>Entre em sua conta Learny</Text>
            <Text style={styles.subTitle}>
              Faça login com suas informações de cadastro
            </Text>
          </View>

          <View style={styles.viewInputs}>
            <LoginInput campo="Usuário" valor={usuario} atualizar={setUsuario} />
            <LoginInput campo="Senha" valor={senha} atualizar={setSenha} />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator size="large" color="#547d98" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </LinearGradient>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: height * 0.025,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
  },
  viewTitle: {
    width: "78%",
    backgroundColor: "rgba(52, 52, 52, 0)",
    display: "flex",
    alignItems: "center",
    gap: height * 0.01,
  },
  title: {
    color: "#fff",
    fontSize: width * 0.055,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  subTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.045,
    fontFamily: "Montserrat_400Regular",
  },
  viewInputs: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    gap: height * 0.015,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: height * 0.07,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: width * 0.04,
    fontFamily: "Montserrat_700Bold",
    color: "#547d98",
    textAlign: "center",
  },
  viewLink: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.06,
  },
  txt: {
    fontSize: width * 0.04,
    fontFamily: "Montserrat_400Regular",
    color: "#fff",
  },
  link: {
    fontSize: width * 0.04,
    fontFamily: "Montserrat_700Bold",
    textDecorationLine: "underline",
    color: "#fff",
  },
});
