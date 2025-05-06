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

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/fundo-gradiente.png")}
          resizeMode="cover"
          style={styles.gradiente}
        >
          <View style={{ alignItems: "center" }}>
            <Header pontos={1000} medalhas={10} ranking={1} />
          </View>
          <View style={styles.containerTitulo}>
            <Text style={styles.txtTitulo}>Mundos</Text>
            <Text style={styles.txtSubTitulo}>
              Escolha um Mundo para aprender
            </Text>
          </View>
          <ContainerMundo
            imagem={require("../../assets/images/fundo-mundo1.png")}
            nome="Floresta do Dino"
            nomeIngles="Dinos's Forest"
            num={1}
            progresso="50"
            cor="#329F00"
          />
          <ContainerMundo
            imagem={require("../../assets/images/fundo-mundo2.png")}
            nome="Mundo quebra-cabeça"
            nomeIngles="Jigsaw World"
            num={2}
            progresso="50"
            cor="#25A6DE"
          />
          <ContainerMundo
            imagem={require("../../assets/images/fundo-mundo3.png")}
            nome="Reino Espacial"
            nomeIngles="Space Realm"
            num={3}
            progresso="50"
            cor="#B060C2"
          />
          <ContainerMundo
            imagem={require("../../assets/images/fundo-mundo4.png")}
            nome="Festa Pop"
            nomeIngles="Pop Party"
            num={4}
            progresso="50"
            cor="#B82A38"
          />
          <View style={{alignItems: "center", paddingVertical: height * 0.03,}}>
            <View style={styles.divider} />
          </View>
          <ContainerTimeAttack />
        </ImageBackground>
      </ScrollView>
      <View style={styles.navigationBarWrapper}>
        <NavigationBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.07, // ajuste conforme o tamanho da sua barra
    backgroundColor: 'transparent', // ou a cor de fundo da barra
  },
  gradiente: {
    flex: 1,
    gap: height * 0.025,
    paddingTop: height * 0.1,
    paddingBottom: height * 0.14,
  },
  containerTitulo: {
    paddingVertical: height * 0.04,
    alignItems: "center",
  },
  txtTitulo: {
    color: "#fff",
    fontSize: width * 0.06,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
  txtSubTitulo: {
    width: width * 0.6,
    paddingTop: height * 0.01,
    color: "#fff",
    fontSize: width * 0.04,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
  },
  divider: {
    backgroundColor: "rgba(55,55,55,0.5)",
    width: "80%",
    height: width * 0.015,
    borderRadius: 15,
  },
});
