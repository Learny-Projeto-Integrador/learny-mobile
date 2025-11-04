import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import HeaderFase from "@/components/ui/Children/Phases/HeaderFase";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";
import { useCheckHint } from "@/hooks/useCheckHint";
import { useAudio } from "@/contexts/AudioContext";

const { width, height } = Dimensions.get("window");

const TARGETS = [
  { x: width * 0.15, y: height * 0.25, radius: 80 },
  { x: width * 0.43, y: height * 0.25, radius: 80 },
  { x: width * 0.71, y: height * 0.25, radius: 80 },
];

const START_POSITIONS = [
  { x: width * 0.15, y: height * 0.65 },
  { x: width * 0.43, y: height * 0.65 },
  { x: width * 0.71, y: height * 0.65 },
];

const items = [
  { text: "I", icon: require("@/assets/images/trem.png") },
  { text: "See", icon: require("@/assets/images/trem.png") },
  { text: "A Train", icon: require("@/assets/images/trem.png") },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AtvConnectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [infoVisible, setInfoVisible] = useState(false);
  const [hits, setHits] = useState(0);

  const { getDuration } = useScreenDuration();
  const { audioEnabled, checkAudio } = useAudio();
  const { submitMission } = useSubmitMission();
  const { setHintUsed, checkHint } = useCheckHint();

  /** Valores independentes por card */
  const tx = items.map(() => useSharedValue(0));
  const ty = items.map(() => useSharedValue(0));
  const locked = items.map(() => useSharedValue(false));

  const onHitJS = () => {
    setHits((prev) => {
      const newHits = prev + 1;
      if (newHits === items.length) {
        Alert.alert("✅ Concluído!", "Todos corretos!");
      }
      return newHits;
    });
  };

  const createGesture = (index: number) =>
    Gesture.Pan()
      .onUpdate((e) => {
        if (locked[index].value) return;
        tx[index].value = e.translationX;
        ty[index].value = e.translationY;
      })
      .onEnd(() => {
        if (locked[index].value) return;

        const itemX = START_POSITIONS[index].x + tx[index].value;
        const itemY = START_POSITIONS[index].y + ty[index].value;

        const target = TARGETS[index];
        const dist = Math.hypot(itemX - target.x, itemY - target.y);

        if (dist < target.radius) {
          locked[index].value = true;
          const finalTx = target.x - START_POSITIONS[index].x;
          const finalTy = target.y - START_POSITIONS[index].y;
          tx[index].value = withSpring(finalTx);
          ty[index].value = withSpring(finalTy);
          runOnJS(onHitJS)();
        } else {
          tx[index].value = withSpring(0);
          ty[index].value = withSpring(0);
        }
      });

  const animatedStyles = items.map((_, i) =>
    useAnimatedStyle(() => ({
      transform: [{ translateX: tx[i].value }, { translateY: ty[i].value }],
    }))
  );

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

      {/* TARGETS */}
      <View style={styles.viewItems}>
        {TARGETS.map((_, i) => (
          <View key={i} style={styles.target} />
        ))}
      </View>

      {/* FRASE INDICADA */}
      <View style={styles.viewFrase}>
        <Text style={{ fontSize: 20 }}>I see a train</Text>
      </View>

      {/* DRAGGABLES */}
      <View style={styles.dragZone}>
        {items.map((item, i) => (
          <GestureDetector key={i} gesture={createGesture(i)}>
            <Animated.View
              style={[
                styles.drag,
                {
                  left: START_POSITIONS[i].x - width * 0.12,
                  top: START_POSITIONS[i].y - height * 0.12,
                },
                animatedStyles[i],
              ]}
            >
              <Image source={item.icon} style={{ width: 40, height: 40 }} />
              <Text style={{ fontSize: 18 }}>{item.text}</Text>
            </Animated.View>
          </GestureDetector>
        ))}
      </View>
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
    marginTop: height * 0.03,
  },
  target: {
    width: width * 0.24,
    height: height * 0.2,
    backgroundColor: "#c0c1c2",
    borderRadius: 10,
  },
  viewFrase: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: height * 0.02,
    marginTop: height * 0.03,
  },
  dragZone: {
    position: "absolute",
    width: width,
    height: height * 0.5,
    bottom: 20,
  },
  drag: {
    position: "absolute",
    width: width * 0.24,
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c0c1c2",
    borderRadius: 10,
  },
});
