import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import ContainerMissoes from "@/components/ui/Children/Menu/ContainerMissoes";
import ContainerMedalhas from "@/components/ui/Children/ContainerMedalhas";
import GradientText from "@/components/ui/GradientText";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

export default function DiaryScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("@/assets/images/teste2.png")}
          style={styles.fundoGradiente}/>
        </View>
        <View style={styles.containerDados}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Diário</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: "row"}}>
                  <Image
                      source={require("@/assets/icons/icon-voltar2.png")}
                      style={styles.iconFechar}
                      />
                </TouchableOpacity>
            </View>
            <ContainerMissoes />
            <ContainerMedalhas />
            <GradientText color1="#946274" color2="#5c94b3" style={styles.txtMissoesConcluidas}>Missões Concluídas</GradientText>
            <View style={{width: "100%", height: 100}}/>
        </View>
      </ScrollView>
      <View style={styles.navigationBarWrapper}>
        <NavigationBar />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // fundo cinza
  },
  fundoGradiente: {
    width: "100%",
    aspectRatio: 390/124
  },
  containerDados: {
    width: "100%",
    height: "100%",
    paddingHorizontal: width * 0.08,
    gap: height * 0.04,
  },
  navigationBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.07,
    backgroundColor: "transparent",
  },
  containerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.12,
    paddingLeft: width * 0.28,
  },
  title: {
    color: "#4C4C4C",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.07,
  },
  iconFechar: {
    width: width * 0.07,
    aspectRatio: 1 / 1
  },
  txtMissoesConcluidas: {
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.055,
    textAlign: "center",
  }
});
