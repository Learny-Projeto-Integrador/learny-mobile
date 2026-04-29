import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import SoundCard from "@/components/ui/Children/Phases/SoundCard";
import GradientText from "@/components/ui/GradientText";
import { scale } from "react-native-size-matters";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AtvMatchAnswerScreen() {
  const { data } = useLocalSearchParams();
  const parsedData = JSON.parse(data as string);

  const router = useRouter();

  const handleConfirm = () => {
    router.push({
        pathname: '/screens/phasesscoreFail',
        params: { score: JSON.stringify(data) },
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("@/assets/images/phases/completion-images/confetti.png")}
          style={{
            width: width,
            aspectRatio: 390 / 220,
          }}
        />
      </View>

      <View style={{ marginTop: -height * 0.15 }}>
        <GradientText color1="#EF5B6A" color2="#6CD2FF" style={styles.title}>
          Let's
        </GradientText>
        <GradientText
          color1="#EF5B6A"
          color2="#6CD2FF"
          style={[styles.title, { marginTop: -height * 0.02 }]}
        >
          Remember
        </GradientText>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: height * 0.02,
          paddingHorizontal: width * 0.08,
        }}
      >
        <ImageBackground
          source={require("@/assets/images/shadow-rectangles/black.png")}
          style={styles.retangulo}
        >
          <Text style={styles.txtTipoFase}>
            O dinossauro está
            {parsedData.answer.emotion == "Sad"
              ? " triste "
              : parsedData.emotion == "Happy"
              ? " feliz "
              : " bravo "}
            ({parsedData.emotion})
          </Text>
        </ImageBackground>
      </View>

      <View
        style={{
          alignItems: "center",
          gap: height * 0.02,
          marginTop: height * 0.02,
        }}
      >
        <Image
          //@ts-ignore
          source={answer.image}
          style={{ width: scale(300), height: scale(217) }}
        />

        <View style={{ flexDirection: "row", gap: width * 0.05 }}>
          <SoundCard id="1" text={parsedData.emotion} onPress={handleConfirm} />
        </View>
      </View>
    </ScrollView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    gap: width * 0.5,
  },
  title: {
    fontFamily: "Montserrat_900Black",
    fontSize: width * 0.09,
    textAlign: "center",
  },
  img: {
    marginTop: height * 0.02,
    width: width * 0.8,
    aspectRatio: 350 / 257,
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
    width: width * 0.6,
    fontSize: width * 0.055,
    fontFamily: "Montserrat_500Medium",
  },
});
