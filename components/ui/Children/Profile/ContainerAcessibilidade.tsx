import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { CustomSwitch } from "../../CutsomSwitch";
import GradientText from "../../GradientText";


type Props = {
  audioAtivo: boolean;
  onChangeAudio: (val: boolean) => void;
}

export default function ContainerAcessibilidade({
  audioAtivo,
  onChangeAudio,
}: Props) {
  return (
    <ImageBackground
      source={require("@/assets/images/retangulo-sombra3.png")}
      style={styles.container}
    >
    <View style={styles.containerElementos}>
        <View style={styles.viewTitle}>
            <Image
            style={styles.icon}
            source={require("@/assets/icons/icon-acessibilidade.png")}
            />
            <GradientText color1="#946274" color2="#5c94b3" style={styles.txtGradient}>Acessibilidade</GradientText>
        </View>
        <View style={styles.containerAction}>
            <Text style={styles.txtAction}>Desligar Audio</Text>
            <CustomSwitch value={audioAtivo} onToggle={onChangeAudio} />
        </View>
        <View style={styles.containerAction}>
            <Text style={styles.txtAction}>Mudar Cores</Text>
            <CustomSwitch value={true} />
        </View>
    </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    aspectRatio: 354 / 201, // largura / altura da imagem original
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.035,
  },
  containerElementos: {
    gap: height * 0.03,
  },
  viewTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.02
  },
  icon: {
    width: width * 0.09, // tamanho menor para alinhar melhor com o texto
    aspectRatio: 1 / 1,
  },
  txtGradient: {
    top: height * 0.004,
    fontSize: width * 0.05,
    fontFamily: "Montserrat_600SemiBold",
  },
  containerAction: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtAction: {
    color: "#aeaeae",
    fontSize: width * 0.04,
    fontFamily: "Montserrat_500Medium",
  },
});
