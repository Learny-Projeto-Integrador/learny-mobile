import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";
import HeaderFase from "@/components/ui/Children/Phases/HeaderFase";
import { useLoading } from "@/contexts/LoadingContext";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import { Audio } from "expo-av";
import { useUser } from "@/contexts/UserContext";
import { useCustomAlert } from "@/contexts/AlertContext";

const { width, height } = Dimensions.get("window");

const PHRASE = ["I", "SEE", "A TRAIN"];
const IMAGE_PATHS = [
  require("@/assets/images/fases/secret/train/i.png"),
  require("@/assets/images/fases/secret/train/see.png"),
  require("@/assets/images/fases/secret/train/a-train.png"),
];

const COLORS = ["#EF5B6A", "#6CD2FF", "#80D25B"];

const TARGETS = [
  { x: width * 0.15, y: height * 0.25, radius: 90 },
  { x: width * 0.43, y: height * 0.25, radius: 90 },
  { x: width * 0.71, y: height * 0.25, radius: 90 },
];

const START_POSITIONS = [
  { x: width * 0.15, y: height * 0.65 },
  { x: width * 0.43, y: height * 0.65 },
  { x: width * 0.71, y: height * 0.65 },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "atvSecret">;

export default function AtvSecretScreen() {
  const [infoVisible, setInfoVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const { user } = useUser();
  const { showAlert } = useCustomAlert();
  const { showLoadingModal, hideLoadingModal } = useLoading();
  const { reset, getDuration } = useScreenDuration();
  const { submitMission } = useSubmitMission();

  // controla quais alvos já foram preenchidos
  const [placed, setPlaced] = useState<boolean[]>(
    Array(PHRASE.length).fill(false)
  );
  // qual imagem está no target i (ou undefined)
  const [placedImage, setPlacedImage] = useState<
    (any | undefined)[]
  >(Array(PHRASE.length).fill(undefined));
  // quem colocou (index do drag) no target i (ou undefined)
  const [placedBy, setPlacedBy] = useState<(number | undefined)[]>(
    Array(PHRASE.length).fill(undefined)
  );
  // total de encaixes feitos
  const [hits, setHits] = useState(0);

  const tx = PHRASE.map(() => useSharedValue(0));
  const ty = PHRASE.map(() => useSharedValue(0));
  const locked = PHRASE.map(() => useSharedValue(false)); // impede mover após encaixar

  // chamado quando um drag foi encaixado num target (targetIndex pode != dragIndex)
  const onPlaceJS = (targetIndex: number, dragIndex: number) => {
    // marcar target como preenchido com imagem do drag
    setPlaced((prev) => {
      const next = [...prev];
      next[targetIndex] = true;
      return next;
    });
    setPlacedImage((prev) => {
      const next = [...prev];
      next[targetIndex] = IMAGE_PATHS[dragIndex];
      return next;
    });
    setPlacedBy((prev) => {
      const next = [...prev];
      next[targetIndex] = dragIndex;
      return next;
    });
    setHits((prev) => {
      const newHits = prev + 1;
      return newHits;
    });
  };

  const gerarPontuacao = async() => {
    showLoadingModal();
    const { durationFormatted } = getDuration();
    let porcentagem = 100;
    const response = await submitMission({
      pontos: 150, 
      tipoFase: "secret"
    });
    if (response.success) {
      let pontosAtualizados = response.pontosAtualizados ?? 150;
      const score = { pontosAtualizados, porcentagem, tempo: durationFormatted };
      navigation.navigate("score", { score });
    }
    hideLoadingModal();
  }

  // quando todos colocados — verifica se todos corretos (target i foi preenchido pelo drag i)
  useEffect(() => {
    const allPlaced = placedBy.every((v) => v !== undefined);
    if (allPlaced) {
      const allCorrect = placedBy.every((by, idx) => by === idx);
      if (allCorrect) {
        gerarPontuacao();
      } else {
        showAlert({
          icon: require("@/assets/icons/icon-alerta.png"),
          title: "Ops...",
          message: "Algumas combinações estão incorretas. Deseja ver a resposta correta?",
          dualAction: true,
          closeLabel: "Não",
          redirectLabel: "Ver resposta",
          onRedirect: () => Alert.alert("Resposta correta:", PHRASE.join(" "))
        });

      }
    }
  }, [placedBy]);

  const createGesture = (dragIndex: number) =>
    Gesture.Pan()
      .onUpdate((e) => {
        if (locked[dragIndex].value) return;
        tx[dragIndex].value = e.translationX;
        ty[dragIndex].value = e.translationY;
      })
      .onEnd(() => {
        if (locked[dragIndex].value) return;

        // posição final do centro do drag
        const itemX = START_POSITIONS[dragIndex].x + tx[dragIndex].value;
        const itemY = START_POSITIONS[dragIndex].y + ty[dragIndex].value;

        // procurar o target mais próximo dentro do raio
        let nearestIndex = -1;
        let nearestDist = Number.POSITIVE_INFINITY;
        TARGETS.forEach((t, i) => {
          const d = Math.hypot(itemX - t.x, itemY - t.y);
          if (d < nearestDist) {
            nearestDist = d;
            nearestIndex = i;
          }
        });

        // se encontrou um target e dentro do raio
        if (nearestIndex !== -1 && nearestDist <= TARGETS[nearestIndex].radius) {
          // se target já ocupado -> voltar ao início (ou trocar se preferir)
          if (placed[nearestIndex]) {
            tx[dragIndex].value = withSpring(0);
            ty[dragIndex].value = withSpring(0);
            return;
          }

          // encaixa o drag naquele target (mesmo se for incorreto)
          locked[dragIndex].value = true;
          const finalTx =
            TARGETS[nearestIndex].x - START_POSITIONS[dragIndex].x;
          const finalTy =
            TARGETS[nearestIndex].y - START_POSITIONS[dragIndex].y;
          tx[dragIndex].value = withSpring(finalTx);
          ty[dragIndex].value = withSpring(finalTy);

          // informar ao JS que um dragIndex foi colocado no target nearestIndex
          runOnJS(onPlaceJS)(nearestIndex, dragIndex);
        } else {
          // não caiu em nenhum alvo -> volta para posição inicial
          tx[dragIndex].value = withSpring(0);
          ty[dragIndex].value = withSpring(0);
        }
      });

  const animatedStyles = PHRASE.map((_, i) =>
    useAnimatedStyle(() => ({
      transform: [{ translateX: tx[i].value }, { translateY: ty[i].value }],
    }))
  );

  const playAudio = async (word: string) => {
    const audioMap: Record<string, any> = {
      "I": require("@/assets/images/fases/secret/train/i.m4a"),
      "SEE": require("@/assets/images/fases/secret/train/see.m4a"),
      "A TRAIN": require("@/assets/images/fases/secret/train/a-train.m4a"),
    };

    const { sound } = await Audio.Sound.createAsync(audioMap[word]);
      await sound.playAsync();
  
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
  
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <ContainerInfo
        message="Essa é a fase secreta. Arraste as palavras para formar a frase corretamente."
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />

      <HeaderFase
        image={require("@/assets/images/secret.png")}
        title="Secret Stage"
        description="Junte as peças e faça Frases"
        color="#6CD2FF"
        onPressInfo={() => setInfoVisible(true)}
        secret
      />
      {/* ALVOS */}
      <View style={styles.viewItems}>
        {TARGETS.map((_, i) => (
          <ImageBackground
            key={i}
            source={
              placed[i]
                ? placedImage[i] // imagem do drag que foi colocado ali
                : require("@/assets/images/retangulo-sombra5.png")
            }
            style={styles.target}
            resizeMode="contain"
          />
        ))}
      </View>

      {/* FRASE COLORIDA */}
      <ImageBackground
        source={require("@/assets/images/retangulo-sombra6.png")}
        style={styles.viewFrase}
        resizeMode="contain"
      >
        {PHRASE.map((word, i) => (
          <Text key={i} style={[styles.text, { color: COLORS[i] }]}>
            {word}
          </Text>
        ))}
      </ImageBackground>

      {/* ITENS ARRASTÁVEIS */}
      <View style={styles.dragZone}>
        {PHRASE.map((word, i) => (
          <GestureDetector key={i} gesture={createGesture(i)}>
            <Animated.View
              style={[
                styles.drag,
                {
                  left: START_POSITIONS[i].x - width * 0.12,
                  top: START_POSITIONS[i].y - height * 0.12,
                  opacity: placedBy.some((p) => p === i) ? 0 : 1, // esconde se já usado em algum target
                },
                animatedStyles[i],
              ]}
            >
              <TouchableOpacity 
                activeOpacity={1} 
                onPress={() => user?.audioAtivado ? playAudio(word) : null}
                style={{width: "100%", height: "100%"}}
                >
                <ImageBackground
                  source={IMAGE_PATHS[i]}
                  style={styles.dragImage}
                  resizeMode="contain"
                />
                </TouchableOpacity>
            </Animated.View>
          </GestureDetector>
        ))}
      </View>

      <TouchableOpacity 
        onPress={() => {
          //@ts-ignore
          navigation.replace(navigation.getState().routes.at(-1)?.name as string)
          reset();
        }} 
        style={{
            backgroundColor: "#4c4c4c",
            borderRadius: 20,
            width: width * 0.3,
            position: "absolute",
            bottom: -height * 0.29,
            left: width * 0.29,
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Text style={{
              fontSize: width * 0.04,
              fontFamily: "Montserrat_700Bold",
              padding: width * 0.02,
              color: "#fff"
            }}>
              Reiniciar
            </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: width * 0.08,
  },
  viewItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.02,
  },
  target: {
    width: width * 0.23,
    aspectRatio: 108 / 153,
    alignItems: "center",
    justifyContent: "center",
  },
  viewFrase: {
    flexDirection: "row",
    width: width * 0.85,
    gap: width * 0.02,
    aspectRatio: 342 / 70,
    marginTop: height * 0.03,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    fontFamily: "Montserrat_700Bold",
  },
  dragZone: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    bottom: 20,
  },
  drag: {
    position: "absolute",
    width: width * 0.25,
    aspectRatio: 108 / 153,
    marginTop: -height * 0.01,
    justifyContent: "center",
    alignItems: "center",
  },
  dragImage: {
    width: "100%",
    height: "100%",
  },
});
