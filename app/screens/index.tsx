import LoginInput from "@/components/ui/LoginInput";
import { useState } from "react";
import {
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "@/components/ui/CustomAlert";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const saveLoginInfo = async (token: string) => {
    try {
      await AsyncStorage.multiSet([
        ["token", token],
      ]);
    } catch (e) {
      console.error("Erro ao salvar dados de login", e);
    }
  };
  
  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://10.0.2.2:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          senha: senha,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        await saveLoginInfo(result.access_token);
        navigation.navigate("transition", {
          name: result.nome,
          type: result.tipo,
        });
      } else {
        setAlertData({
          icon: require("@/assets/icons/icon-alerta.png"),
          title: "Erro!",
          message: result.error,
        });
        setAlertVisible(true);
      }
    } catch (err: any) {
      setAlertData({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message:
          "Não foi possível conectar ao servidor. Verifique sua conexão.",
      });
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    navigation.navigate("register", { idParent: undefined });
  };

  return (
    <ImageBackground
      source={require("@/assets/images/fundo-gradiente.png")}
      resizeMode="cover"
      style={styles.container}
    >
      {alertData && (
        <CustomAlert
          icon={alertData.icon}
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
          dualAction={false}
          title={alertData.title}
          message={alertData.message}
        />
      )}
      <Image
        style={styles.logo}
        source={require("@/assets/images/logo.png")}
      />
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Entre em sua conta Learny</Text>
        <Text style={styles.subTitle}>
          Faça login com suas informações de cadastro
        </Text>
      </View>
      <View style={styles.viewInputs}>
        <LoginInput campo="Usuário" valor={usuario} atualizar={setUsuario} />
        <LoginInput campo="Senha" valor={senha} atualizar={setSenha} />
        <TouchableOpacity
          style={styles.button}
          onPress={
            // @ts-ignore
            () => handleLogin()
          }
        >
          {loading ? (
            <ActivityIndicator size="large" color="#547d98" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.viewLink}>
        <Text style={styles.txt}>Sem uma Conta?</Text>
        <TouchableOpacity onPress={() => handleRedirect()}>
          <Text style={styles.link}>Começe aqui</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
