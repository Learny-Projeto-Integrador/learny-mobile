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
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/ui/Header";
import ContainerMundo from "@/components/ui/ContainerMundo";
import ContainerTimeAttack from "@/components/ui/ContainerTimeAttack";
import NavigationBar from "@/components/ui/NavigationBar";
import RankingCard from "@/components/ui/RankingCard";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function RankingScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.error("Erro ao salvar o token", e);
    }
  };

  const handleRedirect = () => {
    navigation.navigate("register", { idParent: undefined });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../assets/images/teste3.png")}
            style={styles.fundoVerde}
          />
        </View>
        <View style={styles.containerDados}>
          <Header pontos={1000} medalhas={10} ranking={1} />
          <View style={styles.containerTitle}>
            <Image
              source={require("../../assets/images/icon-info.png")}
              style={styles.iconFechar}
            />
            <Text style={styles.title}>Ranking</Text>
            <Image
              source={require("../../assets/images/icon-voltar2.png")}
              style={styles.iconFechar}
            />
          </View>
          <RankingCard name="Joana" rank="1" points="100" />
        </View>
      </ScrollView>
      <View style={styles.navigationBarWrapper}>
        <NavigationBar />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // fundo cinza
  },
  fundoVerde: {
    width: "100%",
    aspectRatio: 390 / 124,
  },
  containerDados: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    top: -height * 0.08,
    gap: height * 0.04,
  },
  containerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.12,
    paddingLeft: width * 0.05,
  },
  title: {
    color: "#4C4C4C",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.07,
  },
  iconFechar: {
    width: width * 0.07,
    aspectRatio: 1 / 1,
  },
  navigationBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.07,
    backgroundColor: "transparent",
  },
  fundoMedalha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.17,
    aspectRatio: 1 / 1,
  },
  medalha: {
    width: width * 0.09,
    aspectRatio: 36 / 45,
  },
  fundoMundo: {
    width: width * 0.55,
    aspectRatio: 233 / 103,
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    gap: height * 0.01,
  },
  txtNumMundo: {
    fontFamily: "Montserrat_500Medium",
    fontSize: width * 0.04,
    color: "#fff",
  },
  txtNomeMundo: {
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.05,
    color: "#fff",
  },
  trilha: {
    width: width * 0.6,
    aspectRatio: 281 / 537,
    marginBottom: height * 0.1,
  },
  fase: {
    position: "absolute",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.06,
    color: "#fff",
  },
  fase1: {
    top: height * 0.745,
    paddingLeft: width * 0.2,
  },
  fase2: {
    top: height * 0.57,
    paddingLeft: width * 0.48,
  },
  fase3: {
    top: height * 0.405,
    paddingLeft: width * 0.21,
  },
  viewIconBoss: {
    position: "absolute",
    flexDirection: "row",
    top: height * 0.295,
    left: width * 0.265,
  },
  boss: {
    width: width * 0.15,
    aspectRatio: 73 / 70,
  },
});
