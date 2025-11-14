import {
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  ViewStyle,
} from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, RoutesWithoutParams } from "@/types";
import Header from "@/components/ui/Children/Header";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import ContainerSelectMedalha from "@/components/ui/Children/Menu/ContainerSelectMedalha";
import { useLoading } from "@/contexts/LoadingContext";
import { useApi } from "@/hooks/useApi";
import Error from "@/components/ui/Error";
import { useUser } from "@/contexts/UserContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "world">;

const imgMedalhas: any = {
  "Iniciando!": require("@/assets/icons/medalha-verde.png"),
  "A todo o vapor!": require("@/assets/icons/medalha-vermelha.png"),
  "Desvendando": require("@/assets/icons/medalha-azul.png"),
};

export default function WorldScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useUser();
  const [visible, setVisible] = useState(false);

  const renderFases = () => {
    if (!user?.mundos || user.mundos.length === 0) return null;

    const fases = user.mundos[0].fases;
    let liberarProxima = true;
    let ultimaFaseLiberadaIndex = -1;

    const renderedFases = fases.map((faseObj: any, index: any) => {
      const { fase, concluida, boss } = faseObj;
      const faseLiberada = liberarProxima;
      if (faseLiberada) ultimaFaseLiberadaIndex = index;
      if (!concluida) liberarProxima = false;

      const faseScreens: RoutesWithoutParams[] = [
        "atvConnect",
        "atvMemory",
        "atvFeeling",
        "atvBoss",
      ];

      const screenName: RoutesWithoutParams = faseScreens[index] ?? "atvConnect";

      if (boss) {
        return (
          <TouchableOpacity
            key={index}
            onPress={
              faseLiberada ? () => navigation.navigate(screenName) : undefined
            }
            disabled={!faseLiberada}
            style={styles.viewIconBoss}
          >
            <Image
              source={require("@/assets/icons/icon-boss.png")}
              style={styles.boss}
            />
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          key={index}
          onPress={
            faseLiberada ? () => navigation.navigate(screenName) : undefined
          }
          disabled={!faseLiberada}
          style={[faseStyles[fase], { flexDirection: "row" }]}
        >
          {faseLiberada ? (
            <Text style={styles.fase}>{String(fase).padStart(2, "0")}</Text>
          ) : (
            <Image
              source={require("@/assets/icons/icon-cadeado.png")}
              style={{ width: width * 0.06, aspectRatio: 31 / 35 }}
            />
          )}
        </TouchableOpacity>
      );
    });

    return renderedFases;
  };


  return (
    <View style={styles.container}>
      {user && (
        <ContainerSelectMedalha
          title="Medalhas"
          medalhas={user?.medalhas}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("@/assets/images/teste.png")}
            style={styles.fundoVerde}
          />
        </View>
        <View style={styles.containerDados}>
          {user && (
            <Header
              pontos={user.pontos}
              medalhas={user.medalhas?.length || 0}
              ranking={user.rankingAtual}
            />
          )}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 50 }}>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <ImageBackground
                source={require("@/assets/images/circulo-sombra.png")}
                style={styles.fundoMedalha}
              >
                {user && (
                  <Image
                    source={imgMedalhas[user.medalhaSelecionada ? user.medalhaSelecionada.nome : "Iniciando!"]}
                    style={styles.medalha}
                    resizeMode="contain"
                  />
                )}
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
              <ImageBackground
                source={require("@/assets/images/img-mundo1.png")}
                style={styles.fundoMundo}
              >
                <Text style={styles.txtNumMundo}>Mundo-1</Text>
                <Text style={styles.txtNomeMundo}>Dino's Forest</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 30,
            }}
          >
            <Image
              source={require("@/assets/images/trilha.png")}
              style={styles.trilha}
            />
            <TouchableOpacity 
            onPress={() => navigation.navigate("atvSecret")}
              style={{
                position: "absolute",
                bottom: height * 0.365,
              }}>
              <Image
                source={require("@/assets/images/arvores.png")}
                style={{
                  width: width * 0.25,
                  aspectRatio: 1/1,
                }}
              />
            </TouchableOpacity>
          </View>
          {renderFases()}
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
  navigationBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.07,
    backgroundColor: "transparent",
  },
  fundoMedalha: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.17,
    aspectRatio: 1 / 1,
  },
  medalha: {
    width: width * 0.11,
    height: width * 0.11,
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
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.06,
    color: "#fff",
  },
  inicio: {
    position: "absolute",
    flexDirection: "row",
    top: height * 0.845,
    left: width * 0.31,
  },
  fase1: {
    position: "absolute",
    top: height * 0.745,
    left: width * 0.57,
  },
  fase2: {
    position: "absolute",
    top: height * 0.57,
    left: width * 0.703,
  },
  fase3: {
    position: "absolute",
    top: height * 0.405,
    left: width * 0.57,
  },
  viewIconBoss: {
    position: "absolute",
    flexDirection: "row",
    top: height * 0.296,
    left: width * 0.263,
  },
  boss: {
    width: width * 0.15,
    aspectRatio: 73 / 70,
  },
});

const faseStyles: Record<number, ViewStyle> = {
  1: styles.fase1,
  2: styles.fase2,
  3: styles.fase3,
};
