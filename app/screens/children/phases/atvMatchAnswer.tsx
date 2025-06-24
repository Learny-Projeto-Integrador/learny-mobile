import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";

import React from "react";
import { useNavigation } from "@react-navigation/native";
import SoundCard from "@/components/ui/Children/Phases/SoundCard";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../../types";
import GradientText from "@/components/ui/GradientText";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = NativeStackScreenProps<RootStackParamList, "atvMatchAnswer">;

type DinoOption = {
  id: string;
  image: string;
  emotion: string;
};

type Score = {
  pontos: number;
  tempo: number;
};

export default function AtvMatchAnswerScreen({ route }: RouteProp) {
  //@ts-ignore
  const { answer }: { answer: DinoOption } = route.params;
  //@ts-ignore
  const { score }: { score: Score } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const handleConfirm = () => {
    navigation.navigate("scoreFail", {score: score});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("@/assets/images/confetes.png")}
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
          source={require("@/assets/images/retangulo-sombra-preto.png")}
          style={styles.retangulo}
        >
          <Text style={styles.txtTipoFase}>
            O dinossauro está
            {answer.emotion == "Sad"
              ? " triste "
              : answer.emotion == "Happy"
              ? " feliz "
              : " bravo "}
            ({answer.emotion})
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
          style={{ width: width * 0.75, aspectRatio: 350 / 257 }}
        />

        <View style={{ flexDirection: "row", gap: width * 0.05 }}>
          <SoundCard id="1" text={answer.emotion} onPress={handleConfirm} />
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
