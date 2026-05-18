import { useEffect, useMemo, useState } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useApi } from "@/hooks/useApi";
import Container from "@/components/ui/Container";
import { World } from "@/types/worlds";
import WorldTrail from "@/components/ui/World/Trail/WorldTrail";
import { useCharacters } from "@/hooks/useCharacters";
import { useTrailContext } from "@/contexts/TrailContext";
import { View, Image, Text } from "react-native";
import { RF, RH, RS, RW } from "@/theme";
import TrailCharacterCard from "@/components/ui/Characters/TrailCaracterCard";
import { useRouter } from "expo-router";

export default function WorldScreen() {
  const router = useRouter();
  const { worldCode } = useTrailContext();

  const { loading, request } = useApi();

  const { progress, getProgress } = useProgress();
  const { showAlert } = useCustomAlert();
  const { selectedCharacter, getCharacters } = useCharacters();

  const [worldData, setWorldData] = useState<World | null>(null);

  /**
   * Busca os dados completos do mundo
   */
  const getWorldData = async () => {
    const result = await request({
      endpoint: `/game/worlds/${worldCode}`,
      method: "GET",
    });

    if (result && !result.error) {
      setWorldData(result);
    } else {
      if (result.status === 404) return;

      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao buscar mundos!",
        message: result.message || "Erro desconhecido ao carregar mundos",
      });
    }
  };

  /**
   * Atualiza módulos com progresso
   */
  const modulesWithProgress = useMemo(() => {
    if (!worldData) return [];

    const currentWorldProgress = progress?.worlds?.find(
      (w) => w.worldCode === worldCode,
    );

    const completedSet = new Set(
      (currentWorldProgress?.completedPhases || [])
        .filter((phase) => phase.completed)
        .map((phase) => phase.phaseCode),
    );

    return worldData.modules
      .filter((module) => module.phases.length > 0)
      .map((module) => ({
        ...module,
        phases: module.phases.map((phase) => ({
          ...phase,
          completed: completedSet.has(phase.code),
        })),
      }));
  }, [worldData, progress, worldCode]);

  /**
   * Carrega dados iniciais
   */
  useEffect(() => {
    if (!worldCode) return;

    getProgress();
    getWorldData();
    getCharacters();
  }, [worldCode]);

  return (
    <Container mode="customTop" colors={["#80D25B", "#80D25B"]}>
      {selectedCharacter && (
        <View style={{ paddingHorizontal: RS(40), marginBottom: RS(40) }}>
          <TrailCharacterCard
            image={selectedCharacter.image}
            name={selectedCharacter.name}
            level={selectedCharacter.level}
            onPress={() => router.push("/screens/characters")}
          />
        </View>
      )}

      {loading || !worldData ? (
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("@/assets/gifs/loading.gif")}
            style={{ width: RW(100), height: RW(100) }}
          />
        </View>
      ) : (
        <View>
          <WorldTrail modules={modulesWithProgress} />

          <View style={{ alignItems: "center", marginTop: RH(40) }}>
            <Image
              source={require("@/assets/images/trail/ilustrations/dino3.png")}
              style={{
                width: RW(180),
                height: RW(140),
              }}
              resizeMode="contain"
            />

            <Text
              className="font-montserratBold"
              style={{
                fontSize: RF(26),
                color: "#4c4c4c",
                marginTop: RH(8),
              }}
            >
              Em desenvolvimento...
            </Text>
          </View>
        </View>
      )}
    </Container>
  );
}
