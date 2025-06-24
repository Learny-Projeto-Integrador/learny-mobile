import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";

type Props = {
  filhoSelecionado: boolean;
}

export default function ContainerMundoAtual({ filhoSelecionado }:Props) {
  return (
    <ImageBackground 
    source={require("@/assets/images/retangulo-sombra1.png")}
    style={styles.container}>
      <Text style={styles.title}>Mundo Atual</Text>
      {filhoSelecionado && (
      <View style={styles.teste}>
        <View style={styles.line} />
        <View style={styles.containerNumMundo}>
          <Text style={styles.txtNumMundo}>1</Text>
        </View>
      </View>)}
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    top: width * 0.07,
    width: "70%",
    borderWidth: 2,
    borderColor: "#80D25B", // ou qualquer cor que você quiser
    borderStyle: "dashed",
  },
  teste: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: width * 0.5,
    aspectRatio: 199 / 108, // largura / altura da imagem original
    alignItems: "center",
    paddingVertical: height * 0.02
  },
  containerNumMundo: {
    backgroundColor: "#80D25B",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.14,
    height: width * 0.12,
    borderRadius: 10,
    marginTop: width * 0.02,
  },
  txt: {
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.06,
    textAlign: "center",
    color: "#EF5B6A",
  },
  txtNumMundo: {
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.06,
    textAlign: "center",
    color: "#fff",
  },
  title: {
    fontFamily: "Montserrat_500Medium",
    fontSize: width * 0.035,
    textAlign: "center",
    color: "#4C4C4C",
  },
});
