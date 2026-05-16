import { useEffect, useMemo, useState } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useApi } from "@/hooks/useApi";
import { useLocalSearchParams } from "expo-router";
import Container from "@/components/ui/Container";
import { World } from "@/types/worlds";
import WorldTrail from "@/components/ui/World/Trail/WorldTrail";
import { useCharacters } from "@/hooks/useCharacters";

/**
 * Página world
 *
 * Responsável por:
 * - Exibição da trilha de aprendizado e personagem selecionado
 */
export default function WorldScreen() {
  /** Parâmetros enviados pela navegação */
  const { worldCode } = useLocalSearchParams();

  /** Hook de comunicação com a API */
  const { request } = useApi();

  /** Contextos */
  const { progress } = useProgress();
  const { showAlert } = useCustomAlert();
  const { selectedCharacter, getCharacters } = useCharacters();

  const [worldData, setWorldData] = useState<World | null>(null);

  /**
   * Busca os dados completos do mundo específico através do código
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
   * Mescla dados dos módulos e fases com o progresso do usuário para montar a trilha
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
   * Efeito para carregar fases sempre que montar a tela
   */
  useEffect(() => {
    if (worldCode) {
      getWorldData();
      getCharacters();
    }
  }, [worldCode]);

  return (
    <Container mode="customTop" colors={["#80D25B", "#80D25B"]}>
      <WorldTrail 
        selectedCharacter={selectedCharacter} 
        modules={modulesWithProgress} 
      />
    </Container>
  );
}
