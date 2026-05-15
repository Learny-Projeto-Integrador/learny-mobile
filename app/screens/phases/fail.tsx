import ConclusionStatCard from "@/components/ui/Phases/ConclusionStatCard";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { useTrailContext } from "@/contexts/TrailContext";
import { RF, RS, RW } from "@/theme";
import { useRouter } from "expo-router";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function FailScreen() {
  const router = useRouter();

  const { worldCode, setTrailData } = useTrailContext();
  const { stats, getDuration, restart } = usePhaseContext();

  const points = stats.points;
  const duration = getDuration();

  return (
    <View
      className="flex-1 bg-white items-center justify-center"
      style={{ gap: RS(80) }}
    >
      <View className="flex-row items-center justify-center">
        <Image
          source={require("@/assets/images/phases/completion-images/fail.png")}
          style={{
            width: RW(250),
            aspectRatio: 1 / 1,
          }}
        />
      </View>

      <View className="flex-row" style={{ gap: RS(30) }}>
        <ConclusionStatCard
          label="Total de pontos"
          value={points.toString()}
          color="#80D25B"
          icon={require("@/assets/icons/phases/points.png")}
        />
        <ConclusionStatCard
          label="Tempo de conslusão"
          value={duration.durationFormatted}
          color="#DF79F5"
          icon={require("@/assets/icons/phases/clock2.png")}
        />
      </View>

      <Shadow distance={8} startColor="rgba(0,0,0,0.25)" offset={[0, 0]}>
        <TouchableOpacity
          onPress={() => {
            restart();

            setTrailData({ phaseCode: null });

            router.push({
              pathname: "/screens/world",
              params: { worldCode },
            });
          }}
          className="flex-row items-center justify-center bg-white"
          style={{
            padding: RS(14),
            borderRadius: 60,
          }}
        >
          <Text
            className="font-montserratBold text-center"
            style={{
              width: RW(200),
              fontSize: RF(20),
              color: "#4c4c4c",
            }}
          >
            Continuar
          </Text>
        </TouchableOpacity>
      </Shadow>
    </View>
  );
}
