import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import HeaderFase from "@/components/ui/Children/Phases/HeaderFase";
import SoundCard from "@/components/ui/Children/Phases/SoundCard";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import { SoundItem } from "@/types";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";
import { useCheckHint } from "@/hooks/useCheckHint";
import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";

const { width, height } = Dimensions.get("window");

const sounds: SoundItem[] = [
  {
    id: "1",
    audio: require("@/assets/audios/animals/cow.wav"),
    image: require("@/assets/images/phases/listen/speakers/red.png"),
    icon: require("@/assets/images/phases/listen/dinos/dino1.png"),
    expectedLabel: "Cow",
  },
  {
    id: "2",
    audio: require("@/assets/audios/animals/bird.wav"),
    image: require("@/assets/images/phases/listen/speakers/yellow.png"),
    icon: require("@/assets/images/phases/listen/dinos/dino2.png"),
    expectedLabel: "Bird",
  },
  {
    id: "3",
    audio: require("@/assets/audios/animals/dog.wav"),
    image: require("@/assets/images/phases/listen/speakers/blue.png"),
    icon: require("@/assets/images/phases/listen/dinos/dino3.png"),
    expectedLabel: "Dog",
  },
];

const colors = ["#EF5B6A", "#FFB300", "#6CD2FF"];

export default function AtvListeningScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [assignments, setAssignments] = useState<{ [soundId: string]: string }>({});
  const [infoVisible, setInfoVisible] = useState<boolean>(false);

  const { showLoadingModal, hideLoadingModal } = useLoading();
  const { getDuration } = useScreenDuration();
  const { submitMission } = useSubmitMission();
  const { user } = useUser();
  const { setHintUsed, checkHint } = useCheckHint();

  const handleAssign = (soundId: string, label: string) => {
    setAssignments((prev) => ({ ...prev, [soundId]: label }));
  };

  const handleHint = async () => {
    showLoadingModal();
    const canUse = await checkHint();
    hideLoadingModal();

    if (!canUse) return;

    for (const sound of sounds) {
      const isAssigned = assignments[sound.id];
      if (!isAssigned) {
        setAssignments((prev) => ({
          ...prev,
          [sound.id]: sound.expectedLabel,
        }));
        break; // Aplica a dica a apenas um item
      }
    }

    setHintUsed(true); // marca que a dica foi usada
  };

  const handleConfirm = async () => {
    showLoadingModal();
    const { durationFormatted } = getDuration();

    let correct = 0;
    sounds.forEach((sound) => {
      if (assignments[sound.id] === sound.expectedLabel) correct++;
    });
    let pontos = (correct / sounds.length) * 100;
    let porcentagem = parseFloat(((correct / sounds.length) * 100).toFixed(0)); // arredondado

    // Arredonda pontos depois dos bônus/multiplicadores
    pontos = parseFloat(pontos.toFixed(0));

    const response = await submitMission({
      pontos: pontos, 
      tipoFase: "listening"
    });

    if (response.success) {
      let pontosAtualizados = response.pontosAtualizados ?? pontos;
      const score = { pontosAtualizados, porcentagem, tempo: durationFormatted };
      navigation.navigate("score", { score });
    }
    hideLoadingModal();
  };

  return (
    <ScrollView style={styles.container}>
      <ContainerInfo
        message={
          "Essa é a fase listening. Para concluir ela você deve reconhecer quais são as posições corretas dos animais e ordenar eles corretamente."
        }
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />
      <HeaderFase
        image={require("@/assets/images/phases/listen/intro.png")}
        title="Listen & Answer"
        description="Ouça o nome e encontre ele escrito"
        color="#EF5B6A"
        onPressInfo={() => setInfoVisible(true)}
      />

      <View style={styles.containerSounds}>
        {sounds.map((sound) =>
          user?.audioActive ? (
            <SoundCard
              key={sound.id}
              id={sound.id}
              image={sound.image}
              audio={sound.audio}
            />
          ) : (
            <View
              key={sound.id}
              style={{
                //@ts-ignore
                backgroundColor: colors[sound.id - 1],
                flexDirection: "row",
                padding: width * 0.039,
                borderRadius: 30,
              }}
            >
              <Image
                source={sound.icon}
                style={{
                  width: width * 0.16,
                  height: width * 0.16,
                }}
                resizeMode="contain"
              />
            </View>
          )
        )}
      </View>

      <View style={styles.viewQuadrados}>
        {sounds.map((sound, index) => {
          const borderColors = ["#EF5B6A", "#FFB300", "#6CD2FF"]; // vermelho, amarelo, azul
          return (
            <View
              key={sound.id}
              style={[
                styles.quadradoColocar,
                { borderColor: borderColors[index] || "#ccc" },
              ]}
            >
              <Text style={styles.txtAnimal}>
                {assignments[sound.id] || "?"}
              </Text>
            </View>
          );
        })}
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: height * 0.02,
          marginTop: height * 0.02,
        }}
      >
        <Text style={styles.txtPergunta}>Selecione a ordem correta</Text>
        <View style={{ flexDirection: "row", gap: width * 0.05 }}>
          {["Dog", "Cow", "Bird"].map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => {
                // Simula mover para a primeira posição vazia (para fins de teste)
                const firstEmpty = sounds.find((s) => !assignments[s.id]);
                if (firstEmpty) handleAssign(firstEmpty.id, label);
              }}
              style={styles.quadradoAnimal}
            >
              <Text style={styles.txtAnimal}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.viewButtons}>
        <TouchableOpacity onPress={handleHint} style={{ flexDirection: "row" }}>
          <Image
            source={require("@/assets/icons/phases/hint.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={handleConfirm}
        >
          <Image
            source={require("@/assets/icons/phases/confirm-red.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: width * 0.08,
    gap: width * 0.5,
  },
  containerSounds: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.05,
    marginVertical: height * 0.02,
  },
  viewQuadrados: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.06,
  },
  quadradoColocar: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    width: width * 0.23,
    height: width * 0.23,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  txtPergunta: {
    color: "#4c4c4c",
    textAlign: "center",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  quadradoAnimal: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    width: width * 0.23,
    height: width * 0.23,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  txtAnimal: {
    color: "#4c4c4c",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  viewButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.03,
    gap: width * 0.02,
  },
  icon: {
    width: width * 0.1,
    aspectRatio: 1 / 1,
  },
});
