import {
  ImageBackground,
  Text,
  View,
  ScrollView,
} from "react-native";
import Header from "@/components/ui/Children/Header";
import WorldCard from "@/components/ui/Children/WorldCard";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import { LinearGradient } from "expo-linear-gradient";
import { useApi } from "@/hooks/useApi";
import { useEffect } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { useCustomAlert } from "@/contexts/AlertContext";
import { fontSizes, RH, RS, RW, spacing } from "@/theme";

const WORLDS_CONFIG = [
  {
    code: "WORLD_1",
    name: "Dino's Forest",
    description: "Floresta do Dino",
    image: require("@/assets/images/fundo-mundo1.png"),
    color: "#329F00",
  },
  {
    code: "WORLD_2",
    name: "Jigsaw World",
    description: "Mundo quebra-cabeça",
    image: require("@/assets/images/fundo-mundo2.png"),
    color: "#25A6DE",
  },
  {
    code: "WORLD_3",
    name: "Space Realm",
    description: "Reino Espacial",
    image: require("@/assets/images/fundo-mundo3.png"),
    color: "#B060C2",
  },
  {
    code: "WORLD_4",
    name: "Pop Party",
    description: "Festa Pop",
    image: require("@/assets/images/fundo-mundo4.png"),
    color: "#B82A38",
  },
];

export default function HomeScreen() {
  const { progress, setProgress } = useProgress();
  const { showAlert } = useCustomAlert();
  const { request } = useApi();

  const getProgress = async () => {
    const result = await request({
      endpoint: `/child/progress`,
      method: "GET",
    });

    if (result && !result.error) {
      setProgress(result);
    } else {
      if (result.status === 404) return;
      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao buscar filho!",
        message: result.message || "Erro desconhecido ao carregar filho",
      });
    }
  }

  useEffect(() => {
    getProgress();
  }, [])

  const getWorldProgress = (code: string) => {
    return progress?.worlds?.find(w => w.worldCode === code);
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <LinearGradient
          colors={["#973e4a", "#4b85a1"]}
          style={{
            flex: 1,
            gap: RS(20),
            paddingTop: RH(80),
            paddingBottom: RH(110),
          }}
        >
          {/* Header */}
          <View className="items-center">
            <Header
              points={progress?.points || 0}
              medals={progress?.medals?.length || 0}
              ranking={progress?.ranking || 0}
            />
          </View>

          {/* Título */}
          <View
            className="items-center"
            style={{ paddingVertical: RH(32), gap: spacing.sm }}
          >
            <Text
              className="text-white font-montserratBold text-center"
              style={{ fontSize: fontSizes.title }}
            >
              Mundos
            </Text>

            <Text
              className="text-white font-montserratMedium text-center"
              style={{
                fontSize: fontSizes.lg,
                width: RW(220),
              }}
            >
              Escolha um Mundo para aprender
            </Text>
          </View>

          {/* Lista de mundos */}
          {WORLDS_CONFIG.map((world, index) => {
            const worldProgress = getWorldProgress(world.code);

            return (
              <WorldCard
                key={world.code}
                image={world.image}
                name={world.name}
                description={world.description}
                num={index + 1}
                progress={worldProgress?.percentage || 0}
                color={world.color}
                worldCode={world.code}
              />
            );
          })}

          {/* Divider */}
          <View
            className="items-center"
            style={{ paddingVertical: spacing.lg }}
          >
            <View
              className="bg-black/40 rounded-2xl"
              style={{
                width: "80%",
                height: RH(10),
              }}
            />
          </View>

          {/* Time Attack */}
          <View className="items-center">
            <ImageBackground
              source={require("@/assets/images/fundo-timeAttack.png")}
              style={{
                width: RW(300),
                aspectRatio: 423 / 142,
                justifyContent: "center",
              }}
              imageStyle={{ borderRadius: 16 }}
            >
              <View
                style={{
                  width: "85%",
                  paddingLeft: spacing.md,
                  gap: spacing.xs,
                }}
              >
                <Text
                  className="text-white font-montserratSemiBold"
                  style={{ fontSize: fontSizes.md }}
                >
                  Modo de Jogo
                </Text>

                <Text
                  className="text-white font-montserratBlack"
                  style={{
                    fontSize: fontSizes.xl,
                    width: RW(120),
                  }}
                >
                  Time Attack
                </Text>
              </View>
            </ImageBackground>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Navigation */}
      <View
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: RH(60),
        }}
      >
        <NavigationBar />
      </View>
    </View>
  );
}
