import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Dimensions,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

type ScoreFail = {
  pontos: number;
  tempo: number;
};

export default function ScoreFailScreen() {
  const { score } = useLocalSearchParams();
  const parsedScore = JSON.parse(score as string);
  
  const router = useRouter();

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
            source={require("@/assets/images/phases/completion-images/fail.png")}
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
            source={require("@/assets/images/phases/completion-images/points.png")}
            style={styles.containerScore}
          >
            <Text style={styles.txtScore}>{parsedScore.pontos}</Text>
          </ImageBackground>
          <ImageBackground
            source={require("@/assets/images/phases/completion-images/time.png")}
            style={[
              styles.containerScore,
              {
                width: width * 0.35,
                aspectRatio: 157 / 115,
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

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: verticalScale(20),
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
