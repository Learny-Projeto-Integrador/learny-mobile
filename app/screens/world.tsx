import { useCallback, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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

  const [pontos, setPontos] = useState(0);
  const [numMedalhas, setNumMedalhas] = useState(0);
  const [rankingAtual, setRankingAtual] = useState(0);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (e) {
      console.error("Erro ao buscar o token", e);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();

      const res = await fetch("http://10.0.2.2:5000/criancas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setPontos(result.pontos);
        setNumMedalhas(result.medalhas.length);
        setRankingAtual(result.rankingAtual)
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("../../assets/images/teste.png")}
          style={styles.fundoVerde}/>
        </View>
        <View style={styles.containerDados}>
          <Header pontos={pontos} medalhas={numMedalhas} ranking={rankingAtual} />
          <View style={{flexDirection: "row", alignItems: "center", gap: 50}}>
            <ImageBackground
              source={require("../../assets/images/circulo-sombra.png")}
              style={styles.fundoMedalha}
            >
              <Image
                source={require("../../assets/images/medalha.png")}
                style={styles.medalha}
              />
            </ImageBackground>
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
              <ImageBackground
                source={require("../../assets/images/img-mundo1.png")}
                style={styles.fundoMundo}
              >
                <Text style={styles.txtNumMundo}>Mundo-1</Text>
                <Text style={styles.txtNomeMundo}>Dino's World</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: "row", alignItems: "center", paddingLeft: 30,}}>
          <Image
              source={require("../../assets/images/trilha.png")}
              style={styles.trilha}
            />
          </View>
          <TouchableOpacity style={styles.fase1} onPress={() => navigation.navigate("atvConnect")}>
            <Text style={styles.fase}>01</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fase2}  onPress={() => navigation.navigate("atvMemory")}>
            <Text style={styles.fase}>02</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fase3} onPress={() => navigation.navigate("atvMatch")}>
            <Text style={styles.fase}>03</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("atvListening")} style={styles.viewIconBoss}>
            <Image
              source={require("../../assets/images/icon-boss.png")}
              style={styles.boss}
            />
          </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.17,
    aspectRatio: 1/1
  },
  medalha: {
      width: width * 0.09,
      aspectRatio: 36 / 45,
  },
  fundoMundo: {
    width: width * 0.55,
    aspectRatio: 233/103,
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
    marginBottom: height * 0.1
  },
  fase: {
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.06,
    color: "#fff",
  },
  fase1: {
    position: "absolute",
    top: height * 0.745,
    paddingLeft: width * 0.2,
  },
  fase2: {
    position: "absolute",
    top: height * 0.57,
    paddingLeft: width * 0.48,
  },
  fase3: {
    position: "absolute",
    top: height * 0.405,
    paddingLeft: width * 0.21,
  },
  viewIconBoss: {
    position: "absolute",
    flexDirection: "row",
    top: height * 0.296,
    left: width * 0.263,
  },
  boss: {
    width: width * 0.15,
    aspectRatio: 73/70,
  }
});
