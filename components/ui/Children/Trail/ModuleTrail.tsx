import { View, Image, TouchableOpacity, Text } from "react-native";
import { fontSizes, RH, RW } from "@/theme";
import { Phase } from "@/types";
import PhaseCircle from "./PhaseCircle";
import { useRouter } from "expo-router";

interface Props {
  phases: Phase[];
  initialPhase?: number;
  moduleNumber: number;
  illustration: any;
  bossIcon: any;
  colorTheme?: string;
  variant?: "right" | "left"; // 🔥 NOVO
}

const phasesScreens = [
  "/screens/phases/atvConnect",
  "/screens/phases/atvMemory",
  "/screens/phases/atvFeeling",
  "/screens/phases/atvBoss",
];

export default function ModuleTrail({
  phases,
  initialPhase = 1,
  moduleNumber,
  illustration,
  bossIcon,
  colorTheme,
  variant = "right", // padrão
}: Props) {
  const router = useRouter();

  const bossImage = bossIcon || require("@/assets/images/trail/bosses/boss.png");

  const sortedPhases = [...phases].sort((a, b) => a.order - b.order);

  const isLeft = variant === "left";

  const isUnlocked = (index: number) => {
    if (index === 0) return true;
    return sortedPhases[index - 1]?.completed;
  };

  const handleNavigate = (index: number) => {
    if (!isUnlocked(index)) return;

    const route = phasesScreens[index];
    if (!route) return;

    router.push(route);
  };

  // 🔹 alinhamento (arco)
  const getAlignment = (index: number) => {
    const alignmentsRight = ["flex-end", "flex-end", "flex-end", "center"];
    const alignmentsLeft = ["flex-start", "flex-start", "flex-start", "center"];

    return (isLeft ? alignmentsLeft : alignmentsRight)[index] || "flex-end";
  };

  // 🔹 margens (fake arco)
  const getMarginHorizontal = (index: number) => {
    const marginsLeft = [RW(80), RW(40), RW(80), 30];
    const marginsRight = [RW(70), RW(30), RW(70), 0];

    if (isLeft) {
      return { marginLeft: marginsLeft[index] || 0 };
    }

    return { marginRight: marginsRight[index] || 0 };
  };

  return (
    <View style={{ width: "100%" }}>
      {/* 🖼️ ILUSTRAÇÃO */}
      <Image
        source={illustration}
        style={{
          position: "absolute",
          ...(isLeft ? { right: RW(50) } : { left: RW(50) }),
          top: RW(100),
          width: RW(120),
          height: RW(120),
        }}
        resizeMode="contain"
      />

      {/* 🔵 TRILHA */}
      <View style={{ width: "95%", zIndex: 1 }}>
        {sortedPhases.map((phase, index) => {
          let initial = initialPhase + index;
          const unlocked = isUnlocked(index);
          const isBoss = phase.type === "boss";

          return (
            <View
              key={phase.code}
              style={{
                //@ts-ignore
                alignItems: getAlignment(index),
                ...getMarginHorizontal(index),
                marginVertical: RW(15),
              }}
            >
              <TouchableOpacity
                activeOpacity={unlocked ? 0.7 : 1}
                onPress={() => handleNavigate(index)}
              >
                {isBoss ? (
                  <Image
                    source={bossImage}
                    style={{
                      width: RW(90),
                      height: RW(90),
                      opacity: 1,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <PhaseCircle
                    number={String(initial).padStart(2, "0")}
                    completed={phase.completed}
                    locked={!unlocked}
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* 🔴 CORTE DO MÓDULO */}
      <View
        style={{
          marginTop: RW(30),
          position: "absolute",
          bottom: RH(55),
          width: "100%",
          alignItems: isLeft ? "flex-start" : "flex-end",
          justifyContent: "center",
          zIndex: 0,
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 2,
            backgroundColor: "#969696",
          }}
        />

        <View
          style={{
            backgroundColor: colorTheme || "#EF4444",
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 6,
            ...(isLeft
              ? { marginLeft: RW(50) }
              : { marginRight: RW(50) }),
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Montserrat-Bold",
              fontSize: fontSizes.md,
              fontWeight: "bold",
            }}
          >
            Módulo {moduleNumber}
          </Text>
        </View>
      </View>
    </View>
  );
}