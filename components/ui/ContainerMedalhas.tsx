import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import Medalha from "./Medalha";

export default function ContainerMedalhas() {
  return (
    <ImageBackground 
    source={require("../../assets/images/retangulo-sombra4.png")}
    style={styles.container}>
      <Text style={styles.title}>Medalhas</Text>
      <View style={{gap: 20, marginTop: 20}}>
        <Medalha/>
        <Medalha/>
        <Medalha/>
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
    paddingHorizontal: width * 0.06,
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
