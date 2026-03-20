import {
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import type { Phase, RootStackParamList } from "@/types";
import Header from "@/components/ui/Children/Header";
import NavigationBar from "@/components/ui/Children/NavigationBar";
import MedalSelectModal from "@/components/ui/Children/Menu/MedalSelectModal";
import { useProgress } from "@/contexts/ProgressContext";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useApi } from "@/hooks/useApi";
import { spacing, fontSizes, RW, RH, RS } from "@/theme";
import Trail from "@/components/ui/Children/Trail";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "world">;
type Props = NativeStackScreenProps<RootStackParamList, "world">;

const imgMedalhas: any = {
  "Iniciando!": require("@/assets/icons/medalha-verde.png"),
  "A todo o vapor!": require("@/assets/icons/medalha-vermelha.png"),
  "Desvendando": require("@/assets/icons/medalha-azul.png"),
};

export default function WorldScreen({ route }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const { worldCode } = route.params;

  const { progress } = useProgress();
  const { showAlert } = useCustomAlert();
  const { request } = useApi();

  const [worldPhases, setWorldPhases] = useState<Phase[]>([]);
  const [visible, setVisible] = useState(false);

  const getWorlds = async () => {
    const result = await request({
      endpoint: `/game/worlds/${worldCode}/phases`,
      method: "GET",
    });

    if (result && !result.error) {
      setWorldPhases(result);
    } else {
      if (result.status === 404) return;
      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao buscar mundos!",
        message: result.message || "Erro desconhecido ao carregar mundos",
      });
    }
  };

  useEffect(() => {
    getWorlds();
  }, []);

  const phasesWithStatus: any = useMemo(() => {
    const currentWorldProgress = progress?.worlds?.find(
      (w) => w.worldCode === worldCode,
    );

    const completedSet = new Set(currentWorldProgress?.completedPhases || []);

    return worldPhases.map((phase) => ({
      ...phase,
      completed: completedSet.has(phase.code),
    }));
  }, [worldPhases, progress, worldCode]);

  return (
    <View className="flex-1 bg-white">
      <MedalSelectModal
        navigation={navigation}
        medals={progress?.medals || []}
        visible={visible}
        onClose={() => setVisible(false)}
      />

      <ScrollView className="flex-1">
        {/* Fundo topo */}
        <Image
          source={require("@/assets/images/teste.png")}
          style={{
            width: "100%",
            height: RH(145),
          }}
          resizeMode="contain"
        />

        {/* Conteúdo */}
        <View
          className="items-center"
          style={{
            marginTop: -RH(60),
            gap: RH(32),
          }}
        >
          {/* Header */}
          <Header
            points={progress?.points || 0}
            medals={progress?.medals?.length || 0}
            ranking={progress?.ranking || 0}
          />

          {/* Área central */}
          <View className="flex-row items-center" style={{ gap: spacing.lg }}>
            {/* Medalha */}
            <TouchableOpacity onPress={() => setVisible(true)}>
              <ImageBackground
                source={require("@/assets/images/circulo-sombra.png")}
                style={{
                  width: RW(64),
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    progress?.selectedMedal
                      ? imgMedalhas[progress?.selectedMedal]
                      : undefined
                  }
                  resizeMode="contain"
                  style={{
                    width: RW(42),
                    height: RW(42),
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>

            {/* Mundo */}
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
              <ImageBackground
                source={require("@/assets/images/img-mundo1.png")}
                style={{
                  width: RW(210),
                  aspectRatio: 233 / 103,
                  justifyContent: "center",
                  paddingHorizontal: RW(20),
                  gap: spacing.xs,
                }}
              >
                <Text
                  className="font-montserratMedium text-white"
                  style={{ fontSize: fontSizes.md }}
                >
                  Mundo-1
                </Text>

                <Text
                  className="font-montserratBold text-white"
                  style={{ fontSize: fontSizes.xl }}
                >
                  Dino's Forest
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          
          {/* Trilha */}
          <Trail phases={phasesWithStatus} />

          {/* Espaçador */}
          <View style={{ height: RH(60)}} />
          
        </View>
      </ScrollView>

      {/* Navbar */}
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
