import { View, Image, TouchableOpacity, Text } from "react-native";
import { RW, RH, RF, RS } from "@/theme";
import { Phase } from "@/types/worlds";
import PhaseCircle from "./PhaseCircle";
import { useRouter } from "expo-router";
import { useTrailContext } from "@/contexts/TrailContext";

interface Props {
  phases: Phase[];
  moduleCode: string;
  worldCode: string;

  initialPhase?: number;
  moduleNumber: number;
  illustration: any;
  bossIcon: any;
  colorTheme?: string;
  variant?: "right" | "left";
}

const phasesScreens = [
  "/screens/phases/atvFeeling",
  "/screens/phases/atvConnect",
  "/screens/phases/atvListening",
  "/screens/phases/atvReview",
  "/screens/phases/atvBoss",
];

export default function ModuleTrail({
  phases,
  moduleCode,
  worldCode,
  initialPhase = 1,
  moduleNumber,
  illustration,
  bossIcon,
  colorTheme,
  variant = "right", // padrão
}: Props) {
  const router = useRouter();

  const { setTrailData } = useTrailContext();

  const bossImage =
    bossIcon || require("@/assets/images/trail/bosses/boss.png");

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

    const phase = sortedPhases[index];

    setTrailData({
      worldCode,
      moduleCode,
      phaseCode: phase.code,
    });

    router.push(route);
  };

  // 🔹 alinhamento (arco)
  const getAlignment = (index: number) => {
    const alignmentsRight = ["flex-end", "flex-end", "flex-end", "flex-end", "flex-end"];
    const alignmentsLeft = ["flex-start", "flex-start", "flex-start", "flex-start", "flex-start"];

    return (isLeft ? alignmentsLeft : alignmentsRight)[index] || "flex-end";
  };

  // 🔹 margens (fake arco)
  const getMarginHorizontal = (index: number) => {
    const marginsLeft = [RS(90), RS(60), RS(110), RS(180), RS(250)];
    const marginsRight = [RS(98), RS(30), RS(70), RS(150), RS(230)];

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
          ...(isLeft ? { right: RW(50), top: RW(110) } : { left: RW(50), top: RW(160) }),
          width: RW(120),
          height: RW(120),
        }}
        resizeMode="contain"
      />

      {/* 🔵 TRILHA */}
      <View style={{ width: "95%", zIndex: 1 }}>

        {/* Início (bandeira) */}
        {moduleNumber == 1 && (
          <View style={{ alignItems: "center", marginLeft: RS(20) }}>
            <Image
              source={require("@/assets/images/trail/start.png")}
              style={{ width: RW(80), height: RW(80), aspectRatio: 90 / 94 }}
            />
          </View>
        )}

        {sortedPhases.map((phase, index) => {
          let initial = initialPhase + index;
          const unlocked = isUnlocked(index);
          const isBoss = phase.type === "boss";

          return (
            //@ts-ignore
            <View
              key={phase.code}
              style={{
                alignItems: getAlignment(index),
                ...getMarginHorizontal(index),
                marginTop: index === 0 ? 0 : index === 1 ? RS(30) : RS(20),
                marginBottom: index === 1 && RS(20),
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
                      width: RW(80),
                      height: RW(80),
                      opacity: 1,
                    }}
                  />
                ) : (
                  <PhaseCircle
                    number={String(initial).padStart(2, "0")}
                    completed={phase.completed}
                    unlocked={unlocked && !phase.completed}
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
          bottom: RH(34),
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
            borderRadius: RW(6),
            ...(isLeft ? { marginLeft: RW(50) } : { marginRight: RW(50) }),
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Montserrat-Bold",
              fontSize: RF(16),
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
