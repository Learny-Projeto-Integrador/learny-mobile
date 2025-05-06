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
import ContainerActions from "@/components/ui/ContainerActions";
import ContainerMissoes from "@/components/ui/ContainerMissoes";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function MenuScreen() {
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
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/teste2.png")}
          style={styles.fundoGradiente}/>
        </View>
        <View style={styles.containerDados}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Atalhos</Text>
                <Image
                    source={require("../../assets/images/icon-fechar.png")}
                    style={styles.iconFechar}
                    />
            </View>
            <ContainerActions/>
            <ContainerMissoes />
            <View style={{width: "100%", height: 100}}/>
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
  fundoGradiente: {
    width: "100%",
    aspectRatio: 390/124
  },
  containerDados: {
    width: "100%",
    height: "100%",
    paddingHorizontal: width * 0.08,
    gap: height * 0.04,
  },
  navigationBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.07,
    backgroundColor: "transparent",
  },
  containerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.12,
    paddingLeft: width * 0.28,
  },
  title: {
    color: "#4C4C4C",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.07,
  },
  iconFechar: {
    width: width * 0.07,
    aspectRatio: 1 / 1
  },
});
