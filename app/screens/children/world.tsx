import {
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, RoutesWithoutParams } from "@/types";
import Header from "@/components/ui/Children/Header";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import ContainerSelectMedalha from "@/components/ui/Children/Menu/ContainerSelectMedalha";
import { useUser } from "@/contexts/UserContext";
import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "world">;

const imgMedalhas: any = {
  "Iniciando!": require("@/assets/icons/medalha-verde.png"),
  "A todo o vapor!": require("@/assets/icons/medalha-vermelha.png"),
  Desvendando: require("@/assets/icons/medalha-azul.png"),
};

const fasesConfig = [
  {
    boss: false,
    position: { top: verticalScale(260), left: scale(150) },
    imageUnlocked: require("@/assets/images/trilha/fase1.png"),
    imageLocked: require("@/assets/images/trilha/cadeado.png"),
  },
  {
    boss: false,
    position: { top: verticalScale(155), left: scale(200) },
    imageUnlocked: require("@/assets/images/trilha/fase2.png"),
    imageLocked: require("@/assets/images/trilha/cadeado.png"),
  },
  {
    boss: false,
    position: { top: verticalScale(55), left: scale(145) },
    imageUnlocked: require("@/assets/images/trilha/fase3.png"),
    imageLocked: require("@/assets/images/trilha/cadeado.png"),
  },
  {
    boss: true,
    position: { top: verticalScale(0), left: scale(50) },
    imageBoss: require("@/assets/images/trilha/boss.png"),
  },
];

export default function WorldScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useUser();
  const [visible, setVisible] = useState(false);

  const renderFases = () => {
    if (!user?.mundos || user.mundos.length === 0) return null;

    const fases = user.mundos[0].fases;
    let liberarProxima = true;
    let ultimaFaseLiberadaIndex = -1;

    const renderedFases = fases.map((faseObj: any, index: number) => {
      const { fase, concluida, boss } = faseObj;
      const faseLiberada = liberarProxima;
      if (faseLiberada) ultimaFaseLiberadaIndex = index;
      if (!concluida) liberarProxima = false;

      const config = fasesConfig[index];

      const faseScreens: RoutesWithoutParams[] = [
        "atvConnect",
        "atvMemory",
        "atvFeeling",
        "atvBoss",
      ];

      const screenName: RoutesWithoutParams =
        faseScreens[index] ?? "atvConnect";

      if (boss) {
        return (
          <TouchableOpacity
            key={index}
            onPress={
              faseLiberada ? () => navigation.navigate(screenName) : undefined
            }
            disabled={!faseLiberada}
            style={[
              {
                position: "absolute",
                zIndex: 2,
                ...config.position,
              },
            ]}
          >
            <Image
              source={config.imageBoss}
              style={{ width: scale(70), height: scale(70) }}
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
          style={[
            {
              position: "absolute",
              ...config.position,
              flexDirection: "row",
              zIndex: 2,
            },
          ]}
        >
          {faseLiberada ? (
            <Image
              source={config.imageUnlocked}
              style={{ width: scale(65), height: scale(65) }}
            />
          ) : (
            <Image
              source={config.imageLocked}
              style={{ width: scale(65), height: scale(65) }}
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: verticalScale(30),
            }}
          >
            <TouchableOpacity onPress={() => setVisible(true)}>
              <ImageBackground
                source={require("@/assets/images/circulo-sombra.png")}
                style={styles.fundoMedalha}
              >
                {user && (
                  <Image
                    source={
                      imgMedalhas[
                        user.medalhaSelecionada
                          ? user.medalhaSelecionada.nome
                          : "Iniciando!"
                      ]
                    }
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
              position: "relative",
              width: "100%",
              marginLeft: scale(60)
            }}
          >
            {renderFases()}
            <Image
              source={require("@/assets/images/trilha/inicio.png")}
              style={{
                width: scale(70),
                height: scale(70),
                position: "absolute",
                top: verticalScale(330),
                left: scale(50),
              }}
            />

            <TouchableOpacity 
              onPress={
                () => user &&
                      user.mundos[0].faseAtual > 2 ? 
                      navigation.navigate("atvSecret") : null
              }
              activeOpacity={1}
              style={{
                position: "absolute",
                top: verticalScale(145),
                left: scale(60),
              }}
              >
              <Image
                source={require("@/assets/images/trilha/arvores.png")}
                style={{
                  width: scale(80),
                  height: scale(80),
                }}
              />
            </TouchableOpacity>


            { user && user.mundos[0].faseAtual > 2 && (
                <Image
                source={require("@/assets/images/trilha/tracejado.png")}
                style={{
                  width: scale(80),
                  height: scale(3),
                  position: "absolute",
                  top: verticalScale(190),
                  left: scale(120),
                }}
              />
              )}

            <Image
              source={require("@/assets/images/trilha/arco.png")}
              style={{
                width: scale(110),
                height: verticalScale(300),
                aspectRatio: 197 / 494,
                position: "absolute",
                top: verticalScale(40),
                left: scale(125),
              }}
            />
          </View>
        </View>
      <View style={styles.navigationBarWrapper}>
        <NavigationBar />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = ScaledSheet.create({
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
