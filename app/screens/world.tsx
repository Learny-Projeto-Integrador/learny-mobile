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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function WorldScreen() {
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
            source={require("../../assets/images/teste.png")}
          style={styles.fundoVerde}/>
        </View>
        <View style={styles.containerDados}>
          <Header pontos={1000} medalhas={10} ranking={1} />
          <View style={{flexDirection: "row", alignItems: "center", gap: 50}}>
            <Image
              source={require("../../assets/images/circulo-sombra.png")}
              style={styles.fundoMedalha}
            />
            <Image
              source={require("../../assets/images/img-mundo1.png")}
              style={styles.imgMundo}
            />
          </View>
          <View style={{flexDirection: "row", alignItems: "center", paddingLeft: 30,}}>
          <Image
              source={require("../../assets/images/trilha.png")}
              style={styles.trilha}
            />
          </View>
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
    aspectRatio: 390/124
  },
  containerDados: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    top: -height * 0.08,
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
  fundoMedalha: {
    width: width * 0.17,
    aspectRatio: 1/1
  },
  imgMundo: {
    width: width * 0.55,
    aspectRatio: 233/103
  },
  trilha: {
    width: width * 0.6,
    aspectRatio: 281 / 537,
    marginBottom: height * 0.1
  },
});
