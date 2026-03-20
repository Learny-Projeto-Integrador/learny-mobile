import { View, Image, TouchableOpacity } from "react-native";
import { RW } from "@/theme";
import { Phase, RootStackParamList, RoutesWithoutParams } from "@/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  phases: Phase[];
}

const positions = [
  { name: "start", width: RW(65), height: RW(65), right: RW(150) },
  { name: "dashed-line-1", width: RW(65), height: RW(30), right: RW(100), rotation: "45deg" },
  { name: "phase-1", width: RW(65), height: RW(65), right: RW(60) },
  { name: "dashed-line-2", width: RW(65), height: RW(50), right: RW(20), rotation: "60deg" },
  { name: "phase-2", width: RW(65), height: RW(65) },
  { name: "dashed-line-3", width: RW(65), height: RW(50), right: RW(20), rotation: "120deg" },
  { name: "phase-3", width: RW(65), height: RW(65), right: RW(60) },
  { name: "dashed-line-4", width: RW(65), height: RW(40), right: RW(100), rotation: "130deg" },
  { name: "boss", width: RW(65), height: RW(65), right: RW(150) },
];

// imagens
const phaseImages: Record<number, any> = {
  1: require("@/assets/images/trilha/fase1.png"),
  2: require("@/assets/images/trilha/fase2.png"),
  3: require("@/assets/images/trilha/fase3.png"),
};

const lockedImage = require("@/assets/images/trilha/cadeado.png");
const bossImage = require("@/assets/images/trilha/boss.png");

const phasesScreens: RoutesWithoutParams[] = [
  "atvConnect",
  "atvMemory",
  "atvFeeling",
  "atvBoss",
];

export default function Trail({ phases }: Props) {
  const navigation = useNavigation<NavigationProp>();
  
  const sortedPhases = [...phases].sort((a, b) => a.order - b.order);

  // verifica desbloqueio
  const isUnlocked = (index: number) => {
    if (index === 0) return true;
    return sortedPhases[index - 1]?.completed;
  };

  // decide imagem
  const getImage = (posName: string) => {
    if (posName.startsWith("phase-")) {
      const phaseNumber = Number(posName.split("-")[1]);
      const phase = sortedPhases[phaseNumber - 1];

      if (!phase) return null;

      if (!isUnlocked(phaseNumber - 1)) return lockedImage;

      return phaseImages[phaseNumber];
    }

    if (posName === "boss") {
      const bossIndex = sortedPhases.length - 1;
      const bossPhase = sortedPhases[bossIndex];

      return bossImage;
    }

    return null;
  };

  const handleNavigate = (index: number) => {
    if (!isUnlocked(index)) return;

    const route = phasesScreens[index];

    if (!route) return;

    navigation.navigate(route);
  };

  const getPhaseIndex = (posName: string) => {
    if (posName.startsWith("phase-")) {
      return Number(posName.split("-")[1]) - 1;
    }

    if (posName === "boss") {
      return sortedPhases.length - 1;
    }

    return null;
  };

  return (
    <View className="w-[70%] flex-col items-end">
      {positions.map((item, index) => {
        const phaseIndex = getPhaseIndex(item.name);
        const img = getImage(item.name);

        // 🔹 START
        if (item.name === "start") {
          return (
            <Image
              key={index}
              source={require("@/assets/images/trilha/inicio.png")}
              style={{
                width: item.width,
                height: item.height,
                right: item.right
              }}
              resizeMode="contain"
            />
          );
        }

        // 🔹 LINHAS
        if (item.name.startsWith("dashed-line")) {
          return (
            <Image
              key={index}
              source={require("@/assets/images/trilha/linha-tracejada.png")}
              style={{
                width: item.width,
                height: item.height,
                right: item.right,
                transform: [{ rotate: item.rotation! }],
              }}
              resizeMode="contain"
            />
          );
        }

        // FASE 2 ESPECIAL
        if (img && phaseIndex !== null && item.name === "phase-2") {
          return (
            <View key={index} className="flex-row items-center">
              <Image
                source={require("@/assets/images/trilha/arvores.png")}
                style={{ width: RW(65), height: RW(65) }}
                resizeMode="contain"
              />

              <Image
                source={require("@/assets/images/trilha/tracejado.png")}
                style={{ width: RW(65), height: RW(65) }}
                resizeMode="contain"
              />
              <TouchableOpacity 
                key={index}
                activeOpacity={isUnlocked(phaseIndex) ? 0.7 : 1}
                onPress={() => handleNavigate(phaseIndex)}
              >
                <Image
                  source={img}
                  style={{ width: RW(65), height: RW(65) }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          );
        }

        // FASES NORMAIS + BOSS
        if (img && phaseIndex !== null) {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={isUnlocked(phaseIndex) ? 0.7 : 1}
              onPress={() => handleNavigate(phaseIndex)}
            >
              <Image
                source={img}
                style={{
                  width: item.width,
                  height: item.height,
                  right: item.right,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        }

        return null;
      })}
    </View>
  );
}