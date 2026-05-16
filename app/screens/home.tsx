import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { RW, RH, RF, RS } from "@/theme";
import { useApi } from "@/hooks/useApi";
import { useCustomAlert } from "@/contexts/AlertContext";
import WorldBanner from "@/components/ui/Home/WorldBanner";
import ExtraModeBanner from "@/components/ui/Home/ExtraModeBanner";
import { ProgressWorld, World, WorldWithProgress } from "@/types/worlds";
import Container from "@/components/ui/Container";
import { useRouter } from "expo-router";

/**
 * Página home
 *
 * Responsável por:
 * - Exibição dos mundos e modos extras de jogo
 */
export default function HomeScreen() {
  const router = useRouter();
  
  /** Hook de comunicação com a API */
  const { request } = useApi();

  /** Contextos */
  const { progress, getProgress } = useProgress();
  const { showAlert } = useCustomAlert();

  const [worlds, setWorlds] = useState<World[]>([]);

  /**
   * Busca dados completos do mundo (banner, nome, descrição, etc)
   */
  const buscarMundos = async () => {
    const result = await request({
      endpoint: "/game/worlds",
      method: "GET",
    });

    if (result && !result.error) {
      setWorlds(result);
    } else {
      showAlert({
        icon: require("@/assets/icons/custom-alert/alert.png"),
        title: "Erro ao buscar dados dos mundos!",
        message: result.message || "Erro inesperado",
      });
    }
  };

  /**
   * Mescla dados do catálogo com o progresso do usuário para montar os banners
   */
  //@ts-ignore
  const worldsCompletos: WorldWithProgress[] = worlds.map((world) => {
    const worldProgress = progress?.worlds?.find(
      (w: ProgressWorld) => w.worldCode === world.code,
    );

    return {
      ...world,
      percentage: worldProgress?.percentage ?? 0,
      unlocked: worldProgress?.unlocked ?? false,
      completedPhases: worldProgress?.completedPhases ?? [],
    };
  });

  /**
   * Efeito para carregar progresso sempre que montar a tela
   */
  useEffect(() => {
    getProgress();
    buscarMundos();
  }, []);

  return (
    <Container spaceBottom={false}>
      {/* Texto de apresentação da tela */}
      <View
        className="items-center"
        style={{ paddingVertical: RH(32), gap: RS(4) }}
      >
        <Text
          className="text-white font-montserratBold text-center"
          style={{ fontSize: RF(26) }}
        >
          Mundos
        </Text>

        <Text
          className="text-white font-montserratMedium text-center"
          style={{
            fontSize: RF(20),
            width: RW(220),
          }}
        >
          Escolha um Mundo para aprender
        </Text>
      </View>

      {/* Lista de mundos (banners) */}
      {worldsCompletos.map((world, index) => {
        return (
          <WorldBanner
            key={world.code}
            image={{ uri: world.picture }}
            name={world.name}
            description={world.description}
            num={index + 1}
            percentage={world.percentage}
            color={world.color}
            worldCode={world.code}
            unlocked={world.unlocked}
          />
        );
      })}

      {/* Divisor */}
      <View className="items-center" style={{ paddingVertical: RS(24) }}>
        <View
          className="bg-black/40 rounded-2xl"
          style={{
            width: "80%",
            height: RH(10),
          }}
        />
      </View>

      {/* Time Attack Banner */}
      <ExtraModeBanner
        name={"Time Attack"}
        image="https://pi-learny.s3.us-east-1.amazonaws.com/worlds/banners/time-attack.png"
        onPress={() => console.log("Time Attack!")}
      />

      {/* Pop Party Banner */}
      <ExtraModeBanner
        name={"Pop party"}
        image="https://pi-learny.s3.us-east-1.amazonaws.com/worlds/banners/pop-party.png"
        onPress={() => router.push("/screens/phases/extras/balloon")}
      />
    </Container>
  );
}
