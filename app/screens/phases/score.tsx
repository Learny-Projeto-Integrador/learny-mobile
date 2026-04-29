import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

type Score = {
  pontosAtualizados: number;
  porcentagem: number;
  tempo: number;
};

export default function ScoreScreen() {
  const { score } = useLocalSearchParams();
  const parsedScore = JSON.parse(score as string);

  const router = useRouter();

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
            source={require("@/assets/images/phases/completion-images/confetti2.png")}
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
            source={require("@/assets/images/phases/completion-images/points.png")}
            style={styles.containerScore}
          >
            <Text style={styles.txtScore}>{parsedScore.pontosAtualizados}</Text>
          </ImageBackground>
          <ImageBackground
            source={require("@/assets/images/phases/completion-images/percentage.png")}
            style={[
              styles.containerScore,
              {
                width: width * 0.35,
                aspectRatio: 157 / 115,
              },
            ]}
          >
            <Text style={styles.txtScore}>{parsedScore.porcentagem}%</Text>
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
            source={require("@/assets/images/phases/completion-images/time.png")}
            style={[
              styles.containerScore,
              {
                width: width * 0.4,
                aspectRatio: 167 / 99,
                paddingBottom: height * 0.01,
              },
            ]}
          >
            <Text style={styles.txtScore}>{parsedScore.tempo}</Text>
          </ImageBackground>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/screens/world")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: height * 0.02,
          }}
        >
          <Image
            source={require("@/assets/icons/phases/close-score.png")}
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
