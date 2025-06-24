import { useCallback, useState } from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { AlertData } from "@/types";
import Header from "@/components/ui/Children/Header";
import ContainerMundo from "@/components/ui/Children/ContainerMundo";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import CustomAlert from "@/components/ui/CustomAlert";
import { useGetToken } from "@/hooks/useGetToken";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [data, setData] = useState<any>(null);

  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [progressoMundo, setProgressoMundo] = useState(0);

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
        setData(result);
        const progresso = (result.mundos[0].faseAtual/4) * 100
        setProgressoMundo(progresso)
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

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
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
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require("@/assets/images/fundo-gradiente.png")}
          resizeMode="cover"
          style={styles.gradiente}
        >
          <View style={{ alignItems: "center" }}>
            {data && (
              <Header
                pontos={data.pontos}
                medalhas={data.numMedalhas || 0}
                ranking={data.rankingAtual}
              />
            )}
          </View>
          <View style={styles.containerTitulo}>
            <Text style={styles.txtTitulo}>Mundos</Text>
            <Text style={styles.txtSubTitulo}>
              Escolha um Mundo para aprender
            </Text>
          </View>
          <ContainerMundo
            imagem={require("@/assets/images/fundo-mundo1.png")}
            nome="Floresta do Dino"
            nomeIngles="Dinos's Forest"
            num={1}
            //@ts-ignore
            progresso={progressoMundo}
            cor="#329F00"
          />
          <ContainerMundo
            imagem={require("@/assets/images/fundo-mundo2.png")}
            nome="Mundo quebra-cabeça"
            nomeIngles="Jigsaw World"
            num={2}
            progresso="0"
            cor="#25A6DE"
          />
          <ContainerMundo
            imagem={require("@/assets/images/fundo-mundo3.png")}
            nome="Reino Espacial"
            nomeIngles="Space Realm"
            num={3}
            progresso="0"
            cor="#B060C2"
          />
          <ContainerMundo
            imagem={require("@/assets/images/fundo-mundo4.png")}
            nome="Festa Pop"
            nomeIngles="Pop Party"
            num={4}
            progresso="0"
            cor="#B82A38"
          />
          <View
            style={{ alignItems: "center", paddingVertical: height * 0.03 }}
          >
            <View style={styles.divider} />
          </View>
          <View style={styles.viewTimeAttack}>
            <ImageBackground
              style={styles.viewTimeAttack}
              //@ts-ignore
              source={require("@/assets/images/fundo-timeAttack.png")}
            >
              <View style={styles.containerDadosTimeAttack}>
                <Text style={styles.txtTimeAttack}>Modo de Jogo</Text>
                <Text style={styles.txtBlack}>Time Attack</Text>
              </View>
            </ImageBackground>
          </View>
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.07, // ajuste conforme o tamanho da sua barra
    backgroundColor: "transparent", // ou a cor de fundo da barra
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
  viewTimeAttack: {
    width: width * 0.8,
    aspectRatio: 423 / 142,
  },
  containerDadosTimeAttack: {
      width: width * 0.85,
      height: "100%",
      justifyContent: "center",
      paddingLeft: width * 0.06,
  },
  txtTimeAttack: {
    color: "#fff",
    fontSize: width * 0.035,
    fontFamily: 'Montserrat_600SemiBold_Italic',
  },
  txtBlack: {
    color: "#fff",
    width: width * 0.3,
    fontSize: width * 0.05,
    fontFamily: 'Montserrat_900Black',
  },
});
