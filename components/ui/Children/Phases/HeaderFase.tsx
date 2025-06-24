import {
  ImageBackground,
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type HeaderFaseProps = {
  image: any;
  title: string;
  description: string;
  color: string;
  onPressInfo?: () => void;
};

export default function HeaderFase({
  image,
  title,
  description,
  color,
  onPressInfo,
}: HeaderFaseProps) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerDados}>
        <Image style={styles.image} source={image} />
        <View style={{ justifyContent: "center", gap: 10 }}>
          <View style={styles.containerNamePhase}>
            <Text style={[styles.txt, { color: color }]}>{title}</Text>
          </View>
        </View>
        <View style={styles.viewVoltar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.iconVoltar}
              source={require("@/assets/icons/icon-voltar2.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressInfo}>
            <Image
              style={styles.iconInfo}
              source={require("@/assets/icons/icon-info-transparente.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: height * 0.01 }}>
        <ImageBackground
          source={require("@/assets/images/retangulo-sombra-preto.png")}
          style={styles.retangulo}
        >
          <Text style={styles.txtTipoFase}>{description}</Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: width * 0.08,
    gap: width * 0.5,
  },
  containerDados: {
    display: "flex",
    height: "auto",
    flexDirection: "row",
    marginTop: height * 0.03,
    gap: width * 0.05,
  },
  image: {
    width: width * 0.33,
    aspectRatio: 139 / 129,
  },
  viewVoltar: {
    position: "relative",
    alignItems: "center",
    paddingLeft: width * 0.01,
    paddingTop: height * 0.01,
    gap: height * 0.015,
  },
  iconVoltar: {
    width: width * 0.075,
    height: width * 0.075,
  },
  iconInfo: {
    width: width * 0.06,
    height: width * 0.06,
  },
  containerNamePhase: {
    width: width * 0.34,
    justifyContent: "center",
  },
  txt: {
    fontSize: width * 0.075,
    fontFamily: "Montserrat_800ExtraBold",
  },
  retangulo: {
    width: width * 0.87,
    aspectRatio: 350 / 85,
    alignItems: "center",
    justifyContent: "center",
  },
  txtTipoFase: {
    color: "#fff",
    textAlign: "center",
    width: width * 0.7,
    fontSize: width * 0.055,
    fontFamily: "Montserrat_500Medium",
  },
});
