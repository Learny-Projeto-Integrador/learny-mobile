//@ts-nocheck
import { useEffect, useCallback, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "@/types";
import Header from "@/components/ui/Children/Header";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import { useGetToken } from "@/hooks/useGetToken";
import ContainerSelectMedalha from "@/components/ui/Children/Menu/ContainerSelectMedalha";
import CustomAlert from "@/components/ui/CustomAlert";
import { useLoadData } from "@/hooks/useLoadData";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

const imgMedalhas = {
  "Iniciando!": require("@/assets/icons/medalha-verde.png"),
  "A todo o vapor!": require("@/assets/icons/medalha-vermelha.png"),
  Desvendando: require("@/assets/icons/medalha-azul.png"),
};

export default function WorldScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<any>(null);
  const [dadosMundo, setDadosMundo] = useState<any>(null);

  const [visible, setVisible] = useState(false);
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const { getToken } = useGetToken();

  const { loadData } = useLoadData();

  const fetchData = async () => {
    const data = await loadData("http://10.0.2.2:5000/criancas")
    setData(data ?? null);
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (!visible) {
      fetchData(); // só recarrega quando o modal for fechado
    }
  }, [visible]);

  const getAvatarImage = (name: string) => {
    switch (name) {
      case "avatar1":
        return require("@/assets/icons/avatars/avatar1.png");
      case "avatar2":
        return require("@/assets/icons/avatars/avatar2.png");
      default:
        return null;
    }
  };

  const renderFases = () => {
    if (!data?.mundos || data.mundos.length === 0) return null;

    const fases = data.mundos[0].fases;
    let liberarProxima = true;
    let ultimaFaseLiberadaIndex = -1;

    const renderedFases = fases.map((faseObj: any, index: any) => {
      const { fase, concluida, boss } = faseObj;
      const faseLiberada = liberarProxima;
      if (faseLiberada) ultimaFaseLiberadaIndex = index;
      if (!concluida) liberarProxima = false;

      const faseScreens = [
        "atvConnect",
        "atvMemory",
        "atvFeeling",
        "atvListening",
      ];
      const screenName = faseScreens[index] ?? "atvConnect";

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
          style={[styles[`fase${fase}`], { flexDirection: "row" }]}
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

  const renderAvatar = () => {
    if (!data?.avatar || !data.mundos) return null;

    const faseAtual = data.mundos[0].faseAtual;

    // Define o estilo baseado na faseAtual ou inicio
    const avatarStyle =
      faseAtual === ""
        ? styles.inicio
        : styles[`fase${faseAtual}`] || styles.inicio;

    return (
      <View style={avatarStyle}>
        <Image
          source={getAvatarImage(data.avatar)}
          style={{ width: width * 0.1, height: width * 0.1 }}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
      {data && (
        <ContainerSelectMedalha
          medalhas={data?.medalhas}
          visible={visible}
          onClose={() => setVisible(false)}
          onSelectMedalha={() => {
            fetchData(); // sua função de recarregamento aqui
          }}
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
          {data ? (
            <Header
              pontos={data.pontos}
              medalhas={data.numMedalhas}
              ranking={data.rankingAtual}
            />
          ) : null}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 50 }}>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <ImageBackground
                source={require("@/assets/images/circulo-sombra.png")}
                style={styles.fundoMedalha}
              >
                {data && (
                  <Image
                    source={imgMedalhas[data.medalhaSelecionada.nome]}
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
                <Text style={styles.txtNomeMundo}>Dino's World</Text>
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
          </View>
          {renderFases()}
          {renderAvatar()}
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
    aspectRatio: 73 / 70,
  },
});
