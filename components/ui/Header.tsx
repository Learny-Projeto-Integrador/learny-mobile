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
} from "react-native";

type HeaderProps = {
    pontos: number;
    medalhas: number;
    ranking: number;
}

export default function Header({pontos,medalhas,ranking}: HeaderProps) {
  return (
      <View style={styles.container}>
        <View style={styles.areaPontos}>
          <View style={styles.pontos}>
            <Image
              style={styles.iconChama}
              source={require("../../assets/icons/icon-chama.png")}
            />
            <ImageBackground
              style={styles.retanguloPontos}
              source={require("../../assets/images/area-pontos.png")}
            >
              <Text style={styles.txtPontos}>{pontos}</Text>
            </ImageBackground>
          </View>
          <View style={styles.pontos}>
            <Image
              style={styles.iconMedalha}
              source={require("../../assets/icons/icon-medalha.png")}
            />
            <ImageBackground
              style={styles.retanguloPontos}
              source={require("../../assets/images/area-pontos.png")}
            >
              <Text style={styles.txtPontos}>{medalhas}</Text>
            </ImageBackground>
          </View>
          <View style={styles.pontos}>
            <Image
              style={styles.iconEstrela}
              source={require("../../assets/icons/icon-estrela.png")}
            />
            <ImageBackground
              style={styles.retanguloPontos}
              source={require("../../assets/images/area-pontos.png")}
            >
              <Text style={styles.txtPontos}>{ranking}</Text>
            </ImageBackground>
          </View>
        </View>
      </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  areaPontos: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pontos: {
    flexDirection: "row",
    alignItems: "center",
  },
  retanguloPontos: {
    width: width * 0.22,
    right: width * 0.03,
    aspectRatio: 89 / 38,
    justifyContent: "center",
    alignItems: "center",
  },
  iconChama: {
    top: -5,
    left: width * 0.03,
    width: width * 0.09, // tamanho menor para alinhar melhor com o texto
    aspectRatio: 41 / 48,
    zIndex: 10,
  },
  iconMedalha: {
    top: -5,
    left: width * 0.03,
    width: width * 0.09, // tamanho menor para alinhar melhor com o texto
    aspectRatio: 43 / 49,
    zIndex: 10,
  },
  iconEstrela: {
    top: -5,
    left: width * 0.03,
    width: width * 0.09, // tamanho menor para alinhar melhor com o texto
    aspectRatio: 38 / 38,
    zIndex: 10,
  },
  txtPontos: {
    left: width * 0.016,
    fontSize: width * 0.04,
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
  },
});
