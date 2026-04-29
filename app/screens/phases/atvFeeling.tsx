import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import ContainerEmotion from "@/components/ui/Children/Phases/ContainerEmotion";
import HeaderFase from "@/components/ui/Children/Phases/HeaderFase";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";
import { useRouter } from "expo-router";

export default function AtvFeelingScreen() {
  const router = useRouter();
  const [infoVisible, setInfoVisible] = useState<boolean>(false);

  return (
    <ScrollView style={styles.container}>
      <ContainerInfo
          message={
            "Essa é a fase feeling. A primeira parte é um reconhecimento, para você descobrir quais são as emoções e seus respectivos dinos. Na segunda etapa você deve selecionar a emoção correta do dino entre as opções."
          }
          visible={infoVisible}
          onClose={() => setInfoVisible(false)}
        />
      <HeaderFase
        image={require("@/assets/images/phases/watch/intro.png")}
        title="Watch & Listen"
        description="Sentimentos"
        color="#94ECA5"
        onPressInfo={() => setInfoVisible(true)}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: width * 0.04,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ContainerEmotion
          dino="dino1"
          emotion="Sad"
          color="#EF5B6A"
        />
        <ContainerEmotion
          dino="dino2"
          emotion="Angry"
          color="#80D25B"
        />
        <ContainerEmotion
          dino="dino3"
          emotion="Happy"
          color="#6CD2FF"
        />
        <ContainerEmotion
          dino="dino4"
          emotion="Afraid"
          color="#FFB300"
        />
      </View>
      <TouchableOpacity
        onPress={() => router.push("/screens/atvMatch")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: height * 0.025,
        }}
      >
        <Image
          source={require("@/assets/icons/phases/confirm-red.png")}
          style={styles.iconConfirmar}
        />
      </TouchableOpacity>
    </ScrollView>
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
  txt: {
    color: "#94ECA5",
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
    fontSize: width * 0.065,
    fontFamily: "Montserrat_500Medium",
  },
  iconConfirmar: {
    width: width * 0.1,
    aspectRatio: 1 / 1,
  },
});
