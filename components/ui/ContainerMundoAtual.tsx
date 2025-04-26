import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";

export default function ContainerMundoAtual() {
  return (
    <ImageBackground 
    source={require("../../assets/images/teste.png")}
    style={styles.container}>
      <Text style={styles.title}>Mundo Atual</Text>
      <View style={styles.teste}>
        <View style={styles.line} />
        <View style={styles.containerNumMundo}>
          <Text style={styles.txtNumMundo}>10</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    top: width * 0.07,
    width: "70%",
    borderWidth: 2,
    borderColor: "#EF5B6A", // ou qualquer cor que você quiser
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
    justifyContent: "center",
  },
  containerNumMundo: {
    backgroundColor: "#EF5B6A",
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
