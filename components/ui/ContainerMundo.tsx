import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import ProgressBarMundo from "./ProgressBarMundo";

type ContainerMundoProps = {
  imagem: string;
  nome: string;
  nomeIngles: string;
  num: number;
  progresso: string;
  cor: string
}

export default function ContainerMundo({imagem, nome, nomeIngles, num, progresso, cor} : ContainerMundoProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.container}
        //@ts-ignore
        source={imagem}
      >
        <View style={styles.containerDadosMundo}>
          <Text style={styles.txtNome}>{nome}</Text>
          <Text style={styles.txtIngles}>{nomeIngles}</Text>
          <Text style={styles.txtMundo}>Mundo-{num}</Text>
          <ProgressBarMundo progresso={progresso} cor={cor} />
        </View>
      </ImageBackground>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width,
    aspectRatio: 524 / 182,
  },
  containerDadosMundo: {
      width: width * 0.85,
      height: "100%",
      justifyContent: "center",
      paddingLeft: width * 0.06,
  },
  txtNome: {
    color: "#4C4C4C",
    fontSize: width * 0.035,
    fontFamily: 'Montserrat_700Bold_Italic',
  },
  txtIngles: {
    top: -height * 0.005,
    color: "#3A3A3A",
    fontSize: width * 0.05,
    fontFamily: 'Montserrat_900Black',
  },
  txtMundo: {
    top: -height * 0.01,
    color: "#4C4C4C",
    fontSize: width * 0.035,
    fontFamily: 'Montserrat_700Bold_Italic',
  },
});
