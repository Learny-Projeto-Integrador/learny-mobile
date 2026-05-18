import GradientText from "@/components/ui/GradientText";
import ConclusionStatCard from "@/components/ui/Phases/ConclusionStatCard";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { useTrailContext } from "@/contexts/TrailContext";
import { RF, RS, RW } from "@/theme";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function ScoreScreen() {
  const router = useRouter();

  const { setTrailData } = useTrailContext();
  const { stats, percentage, getDuration, restart } = usePhaseContext();

  const duration = useMemo(() => getDuration(), []);

  return (
    <View
      className="flex-1 bg-white items-center justify-center"
      style={{ gap: RS(60) }}
    >
      <View className="items-center justify-center">
        <Image
          source={require("@/assets/images/phases/completion-images/confetti2.png")}
          style={{
            width: RW(180),
            height: RW(180),
            aspectRatio: 1 / 1,
          }}
        />
        <GradientText
          color1="#EF5B6A"
          color2="#6CD2FF"
          style={{
            fontSize: RF(40),
            fontFamily: "Montserrat_700Bold",
            textAlign: "center",
          }}
        >
          Congratulations
        </GradientText>
      </View>

      <View
        className="flex-row flex-wrap items-center justify-center"
        style={{ gap: RS(30) }}
      >
        <ConclusionStatCard
          label="Total de pontos"
          value={stats.points.toString()}
          color="#80D25B"
          icon={require("@/assets/icons/phases/points.png")}
        />
        <ConclusionStatCard
          label="Porcentagem de acertos"
          value={percentage.toString() + "%"}
          color="#6CD2FF"
          icon={require("@/assets/icons/phases/percentage.png")}
        />
        <ConclusionStatCard
          label="Moedas Adquiridas"
          value={"+" + stats.coins.toString()}
          color="#FFD983"
          icon={require("@/assets/icons/phases/coin.png")}
        />
        <ConclusionStatCard
          label="Tempo de conslusão"
          value={duration.durationFormatted}
          color="#DF79F5"
          icon={require("@/assets/icons/phases/clock2.png")}
        />
      </View>

      <Shadow distance={6} startColor="rgba(0,0,0,0.15)" offset={[0, 0]}>
        <TouchableOpacity
          onPress={() => {
            
            setTrailData({ phaseCode: null });

            router.push("/screens/world");
            
            setTimeout(() => {
              restart();
            }, 200);
          }}
          className="flex-row items-center justify-center bg-white"
          style={{
            padding: RS(14),
            borderRadius: RW(60),
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
