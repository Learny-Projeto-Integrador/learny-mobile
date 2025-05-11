import { useState, useCallback } from "react";
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
import PodiumCard from "@/components/ui/PodiumCard";
import OtherRanking from "@/components/ui/OtherRanking";
import { useFocusEffect } from "expo-router";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function RankingScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ranking, setRanking] = useState([{}]);

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

      const res = await fetch("http://10.0.2.2:5000/criancas/ranking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setRanking(result);
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
              source={require("../../assets/icons/icon-info.png")}
              style={styles.icon}
            />
            <Text style={styles.title}>Ranking</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../../assets/icons/icon-voltar2.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 40 }}>
            {ranking?.slice(0, 3).map((item: any, index: number) => {
              if (!item || item.nome === undefined || item.pontos === undefined)
                return null;
              return (
                <PodiumCard
                  key={item.id || index}
                  image={item.foto.toString()}
                  name={item.nome.toString()}
                  rank={(index + 1)}
                  points={item.pontos}
                />
              );
            })}
          </View>

          <ImageBackground
            source={require("../../assets/images/fundo-planeta.png")}
            style={{
              width: "100%",
              height: height * 0.5,
              alignItems: "center",
              marginBottom: -height * 0.035,
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.35)",
                width: width * 0.74,
                marginTop: height * 0.02,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                paddingVertical: height * 0.04,
              }}
            >
              {ranking?.slice(3, 7).map((item: any, index: number) => {
                if (
                  !item ||
                  item.nome === undefined ||
                  item.pontos === undefined
                )
                  return null;
                return (
                  <OtherRanking
                    key={item.id || index}
                    name={item.nome.toString()}
                    rank={(index + 4).toString()}
                    points={item.pontos.toString()}
                  />
                );
              })}
            </View>
          </ImageBackground>
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
    fontSize: width * 0.06,
  },
  icon: {
    width: width * 0.06,
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
