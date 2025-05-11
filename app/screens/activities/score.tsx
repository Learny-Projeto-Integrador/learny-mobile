import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import HeaderFase from "@/components/ui/HeaderFase";
import SoundCard from "@/components/ui/SoundCard";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../types";
import GradientText from "@/components/ui/GradientText";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = NativeStackScreenProps<RootStackParamList, "score">;

type Score = {
  pontos: number;
  tempo: number;
};

export default function ScoreScreen({ route }: RouteProp) {
  //@ts-ignore
  const { score }: { answer: DinoOption } = route.params;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={{ gap: height * 0.02 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/confetes2.png")}
            style={{
              width: width * 0.5,
              aspectRatio: 1 / 1,
            }}
          />
        </View>

        <View>
          <Text style={[styles.title, { color: "#EF5B6A" }]}>Congratu</Text>
          <Text
            style={[
              styles.title,
              { color: "#6CD2FF", marginTop: -height * 0.01 },
            ]}
          >
            lations
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: width * 0.05,
          }}
        >
          <ImageBackground
            source={require("../../../assets/images/pontos.png")}
            style={styles.containerScore}
          >
            <Text style={styles.txtScore}>{score.pontos}</Text>
          </ImageBackground>
          <ImageBackground
            source={require("../../../assets/images/porcentagem.png")}
            style={[
              styles.containerScore,
              {
                width: width * 0.35,
                aspectRatio: 157 / 115,
              },
            ]}
          >
            <Text style={styles.txtScore}>{score.pontos}%</Text>
          </ImageBackground>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageBackground
            source={require("../../../assets/images/tempo.png")}
            style={[
              styles.containerScore,
              {
                width: width * 0.4,
                aspectRatio: 167 / 99,
                paddingBottom: height * 0.01,
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
            source={require("../../../assets/icons/icon-fechar2.png")}
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
    justifyContent: "center",
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
