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
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import Header from "@/components/ui/Children/Header";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import PodiumCard from "@/components/ui/Children/Ranking/PodiumCard";
import OtherRanking from "@/components/ui/Children/Ranking/OtherRanking";
import { useFocusEffect } from "@react-navigation/native";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";
import { useLoading } from "@/contexts/LoadingContext";
import { useApi } from "@/hooks/useApi";
import { useUser } from "@/contexts/UserContext";
import { useCustomAlert } from "@/contexts/AlertContext";
import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ranking">;

export default function RankingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useUser();
  const { request } = useApi();
  const { showAlert } = useCustomAlert();
  const { showLoadingModal, hideLoadingModal } = useLoading();
  const [ranking, setRanking] = useState([{}]);
  const [infoVisible, setInfoVisible] = useState(false);

  const loadRanking = async () => {
    showLoadingModal();

    const result = await request({
      endpoint: "/criancas/ranking"
    });

    if (result && !result.error) {
      setRanking(result);
    } else {
      if (result.status != 401) {
        showAlert({
          icon: require("@/assets/icons/custom-alert/alert.png"),
          title: "Erro ao buscar ranking!",
          message: result.message,
          dualAction: true,
          closeLabel: "OK",
          redirectLabel: "Tentar Novamente",
          onRedirect: () => loadRanking()
        });
        hideLoadingModal();
        return null;
      }
    }
    
    hideLoadingModal();
  };

  useFocusEffect(
    useCallback(() => {
      loadRanking();
    }, [])
  );

  const podiumItems = [...ranking.slice(0, 3)];
  while (podiumItems.length < 3) {
    podiumItems.push({});
  }

  const otherItems= [...ranking.slice(3, 7)];
  while (otherItems.length < 4) {
    otherItems.push({});
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
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("@/assets/images/top-blue.png")}
            style={styles.fundoAzul}
          />
        </View>
        <View style={styles.containerDados}>
          {/* <Header
            pontos={0}
            medalhas={0}
            ranking={0}
          /> */}
          <View style={styles.containerTitle}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => setInfoVisible(true)}
            >
              <Image
                source={require("@/assets/icons/phases/info.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Ranking</Text>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require("@/assets/icons/back.png")}
                style={[styles.icon, { width: scale(24) }]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ gap: verticalScale(26) }}>
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
            source={require("@/assets/images/ranking/planet.png")}
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
                borderRadius: scale(20),
                alignItems: "center",
                justifyContent: "center",
                gap: scale(10),
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
  fundoAzul: {
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
