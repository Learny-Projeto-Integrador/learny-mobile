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
import ModuleTrail from "@/components/ui/Children/Trail/ModuleTrail";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "world">;
type Props = NativeStackScreenProps<RootStackParamList, "world">;

const imgMedalhas: any = {
  "Iniciando!": require("@/assets/images/medals/resource.png"),
  "A todo o vapor!": require("@/assets/images/medals/double-points.png"),
  "Desvendando": require("@/assets/images/medals/clue.png"),
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
          source={require("@/assets/images/top-green.png")}
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
          
          {/* Trilha */}
          <View style={{ width: "100%", alignSelf: "flex-end", marginBottom: RH(20) }}>
            {/* 🔹 START */}
            <View style={{ alignItems: "center", marginRight: RW(50) }}>
              <Image
                source={require("@/assets/images/trail/start.png")}
                style={{ width: RW(80), height: RW(80) }}
                resizeMode="contain"
              />
            </View>
            
            <ModuleTrail
              moduleNumber={1}
              phases={phasesWithStatus}
              illustration={require("@/assets/images/trail/ilustrations/egg.png")}
              bossIcon={require("@/assets/images/trail/bosses/boss.png")}
              colorTheme="#EF5B6A"
            />

            <ModuleTrail
              moduleNumber={2}
              initialPhase={4}
              phases={phasesWithStatus}
              illustration={require("@/assets/images/trail/ilustrations/dino1.png")}
              bossIcon={require("@/assets/images/trail/bosses/boss2.png")}
              colorTheme="#6CD2FF"
              variant="left"
            />

            <ModuleTrail
              moduleNumber={3}
              initialPhase={7}
              phases={phasesWithStatus}
              illustration={require("@/assets/images/trail/ilustrations/dino2.png")}
              bossIcon={require("@/assets/images/trail/bosses/boss3.png")}
              colorTheme="#80D25B"
            />
            
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
                  fontSize: fontSizes.xl,
                  color: "#4c4c4c",
                  marginTop: RH(8),
                }}
              >
                Em desenvolvimento...
              </Text>
            </View>

          </View>

          {/* Espaçador */}
          <View style={{ height: RH(60)}} />
          
        </View>
      </ScrollView>

      {/* 🏅 BOTÃO MEDALHA FIXO */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          position: "absolute",
          left: RW(30),
          top: RH(150), // 👈 acima da navbar
          zIndex: 10,
        }}
      >
        <ImageBackground
          source={require("@/assets/images/medals/resource.png")}
          style={{
            width: RW(70),
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

      {/* Navbar */}
      <View
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: RH(60),
          zIndex: 0,
        }}
      >
        <NavigationBar />
      </View>
    </View>
  );
}
