import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";

export default function ContainerMissoes() {
  return (
    <ImageBackground 
    source={require("../../assets/images/retangulo-sombra4.png")}
    style={styles.container}>
      <Text style={styles.title}>Missões Diárias</Text>
      <View style={{flexDirection: "row", gap: 10}}>
        <Image
          source={require("../../assets/images/missao1.png")}
          style={styles.missao}
        />
      </View>
      <View style={{flexDirection: "row", gap: 10}}>
        <Image
          source={require("../../assets/images/missao2.png")}
          style={styles.missao}
        />
      </View>
      <View style={{flexDirection: "row", gap: 10}}>
        <Image
          source={require("../../assets/images/missao3.png")}
          style={styles.missao}
        />
      </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.83,
    aspectRatio: 356 / 399, // largura / altura da imagem original
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#b5b5b5",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.05,
    textAlign: "center",
  },
  missao: {
    width: width * 0.68,
    aspectRatio: 378 / 103,
    marginTop: height * 0.02,
  }
});
