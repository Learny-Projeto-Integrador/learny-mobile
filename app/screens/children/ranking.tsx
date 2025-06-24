import { useState, useCallback } from "react";
import {
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "@/types";
import Header from "@/components/ui/Children/Header";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import PodiumCard from "@/components/ui/Children/Ranking/PodiumCard";
import OtherRanking from "@/components/ui/Children/Ranking/OtherRanking";
import { useFocusEffect } from "expo-router";
import { useGetToken } from "@/hooks/useGetToken";
import CustomAlert from "@/components/ui/CustomAlert";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function RankingScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [pontos, setPontos] = useState(0);
  const [numMedalhas, setNumMedalhas] = useState(0);
  const [rankingAtual, setRankingAtual] = useState(0);

  const [ranking, setRanking] = useState([{}]);
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState<boolean>(false);

  const { getToken } = useGetToken();

  const loadData = async () => {
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
        setRankingAtual(result.rankingAtual);
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
    }
  };

  const loadRanking = async () => {
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
        console.log(result)
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
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
      loadRanking();
    }, [])
  );

  const podiumItems = [...ranking.slice(0, 3)];
  while (podiumItems.length < 3) {
    //@ts-ignore
    podiumItems.push(null);
  }

  // Garante que sempre haja 4 elementos no other ranking
  const otherItems = [...ranking.slice(3, 7)];
  while (otherItems.length < 4) {
    //@ts-ignore
    otherItems.push(null);
  }

  return (
    <View style={styles.container}>
      <ContainerInfo
        message={
          "Esse é o ranking. Aqui você entrontra as crianças com a melhor pontuação do 1° ao 7° colocados. Os integrantes do pódios tem um cardespecias, mostrando a foto. Se você ainda não está aqui não fique triste, uma hora você consegue!"
        }
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />
      {alertData && (
        <CustomAlert
          icon={alertData.icon}
          visible={alertVisible}
          title={alertData.title}
          message={alertData.message}
          dualAction={false}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("@/assets/images/teste3.png")}
            style={styles.fundoVerde}
          />
        </View>
        <View style={styles.containerDados}>
          <Header
            pontos={pontos}
            medalhas={numMedalhas}
            ranking={rankingAtual}
          />
          <View style={styles.containerTitle}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => setInfoVisible(true)}
            >
              <Image
                source={require("@/assets/icons/icon-info.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Ranking</Text>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require("@/assets/icons/icon-voltar2.png")}
                style={[styles.icon, { width: width * 0.07 }]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 40 }}>
            {podiumItems.map((item: any, index: any) => (
              <PodiumCard
                key={item?.id || `empty-${index}`}
                image={item?.foto?.toString() || ""}
                name={item?.nome?.toString() || ""}
                rank={index + 1}
                points={item?.pontos !== undefined ? item.pontos.toString() : ""}
              />
            ))}
          </View>

          <ImageBackground
            source={require("@/assets/images/fundo-planeta.png")}
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
              {otherItems.map((item: any, index: any) => (
                <OtherRanking
                  key={item?.id || `empty-other-${index}`}
                  name={item?.nome?.toString() || ""}
                  rank={(index + 4).toString()}
                  points={item?.pontos !== undefined ? item.pontos.toString() : ""}
                />
              ))}
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
});
