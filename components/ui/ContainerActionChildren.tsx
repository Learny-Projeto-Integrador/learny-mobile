import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";

type ContainerActionChildrenProps = {
  icon: any;
  title: string;
};

const GradientText = ({ style, children }: any) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent" }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={["#d57388", "#8fb3d7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default function ContainerActionChildren({
  icon,
  title,
}: ContainerActionChildrenProps) {
  return (
    <ImageBackground
      source={require("../../assets/images/ferramentas.png")}
      style={styles.container}
    >
      <View style={styles.viewTitle}>
        <Image style={styles.icon} source={icon} />
        {title == "Notificações" ? (
            <Text style={[styles.txtGradient, {color: "#4C4C4C"}]}>{title}</Text>
        ) : (
            <GradientText style={styles.txtGradient}>{title}</GradientText>
        )  
        }
      </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    aspectRatio: 354 / 87,
    paddingHorizontal: width * 0.08,
    justifyContent: "center",
  },
  viewTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.04,
  },
  icon: {
    width: width * 0.09, // tamanho menor para alinhar melhor com o texto
    aspectRatio: 1 / 1,
  },
  txtGradient: {
    top: height * 0.004,
    fontSize: width * 0.045,
    fontFamily: "Montserrat_700Bold",
  },
});
