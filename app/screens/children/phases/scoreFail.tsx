import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import React from "react";
import { useNavigation } from "@react-navigation/native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = NativeStackScreenProps<RootStackParamList, "scoreFail">;

type ScoreFail = {
  pontos: number;
  tempo: number;
};

export default function ScoreFailScreen({ route }: RouteProp) {
  //@ts-ignore
  const { score }: { score: ScoreFail } = route.params;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={{ gap: height * 0.06 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("@/assets/images/img-try-again.png")}
            style={{
              width: width * 0.6,
              aspectRatio: 1 / 1,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: width * 0.05,
          }}
        >
          <ImageBackground
            source={require("@/assets/images/pontos.png")}
            style={styles.containerScore}
          >
            <Text style={styles.txtScore}>{score.pontos}</Text>
          </ImageBackground>
          <ImageBackground
            source={require("@/assets/images/tempo-azul.png")}
            style={[
              styles.containerScore,
              {
                width: width * 0.35,
                aspectRatio: 157 / 115,
              },
            ]}
          >
            <Text style={styles.txtScore}>{score.tempo}</Text>
          </ImageBackground>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("world")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: height * 0.02,
          }}
        >
          <Image
            source={require("@/assets/icons/icon-fechar2.png")}
            style={{
              width: width * 0.1,
              aspectRatio: 1,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: height * 0.1,
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.1,
    textAlign: "center",
  },
  containerScore: {
    width: width * 0.35,
    aspectRatio: 156 / 111,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: height * 0.013,
  },
  txtScore: {
    color: "#4c4c4c",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.04,
  },
});
