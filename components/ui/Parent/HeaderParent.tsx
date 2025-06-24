import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from "react-native";
import GradientText from "../GradientText";

type Props = {
    foto: any;
    nome: string;
}

export default function HeaderParent({foto, nome}:Props) {
  return (
    <View style={styles.containerDados}>
      <Image
        style={styles.foto}
        source={
          foto
            ? { uri: foto }
            : require("@/assets/images/logo.png")
        }
      />
      <View>
        <View style={styles.containerNameParent}>
          {nome.split(" ").map((nome: any, index: any) => (
                <GradientText
                  color1="#EF5B6A"
                  color2="#6CD2FF"
                  key={index}
                  style={styles.nameText}
                >
                  {nome}
                </GradientText>
              ))}
        </View>
        <View style={styles.containerRankParent}>
          <View>
            <Text style={styles.txt}>You're a</Text>
            <GradientText
              color1="#EF5B6A"
              color2="#6CD2FF"
              style={styles.txtRankParent}
            >
              SUPER PARENT
            </GradientText>
          </View>
          <View style={styles.stackContainer}>
            <Image
              style={styles.fireIcon}
              source={require("@/assets/icons/icon-fogo.png")}
            />
            <Text style={styles.txtRankNumber}>5</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  containerDados: {
    display: "flex",
    height: "auto",
    flexDirection: "row",
    marginTop: height * 0.04,
    gap: width * 0.05,
  },
  containerRankParent: {
    marginTop: width * 0.1,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: width * 0.02,
  },
  foto: {
    width: width * 0.33,
    height: width * 0.33,
    borderRadius: 20,
  },
  stackContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: width * 0.01,
  },
  fireIcon: {
    width: width * 0.09,
    height: width * 0.09,
    tintColor: "#EF5B6A",
  },
  containerNameParent: {
    height: width * 0.08,
  },
  nameText: {
    fontSize: width * 0.07,
    fontFamily: "Montserrat_800ExtraBold",
  },
  txt: {
    color: "#4c4c4c",
    fontSize: width * 0.04,
    fontFamily: "Montserrat_400Regular",
  },
  txtRankParent: {
    fontSize: width * 0.045,
    fontFamily: "Montserrat_600SemiBold",
  },
  txtRankNumber: {
    position: "absolute",
    top: height * 0.012,
    fontSize: width * 0.045,
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
  },
});
