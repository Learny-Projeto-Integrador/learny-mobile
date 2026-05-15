import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import PhaseBase from "@/components/ui/Phases/PhaseBase";

import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { useFeedbackContext } from "@/contexts/FeedbackContext";

import { RF, RH, RS, RW } from "@/theme";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { Shadow } from "react-native-shadow-2";
import { useAudioPlayer } from "expo-audio";
import ModalInfo from "@/components/ui/ModalInfo";
import HeaderPhase from "@/components/ui/Phases/HeaderPhase";
import { Placement, Word } from "@/types/phases";
import SecretFeedback from "@/components/ui/Phases/Feedbacks/SecretFeedback";
import { phrase } from "@/constants/phases/train";
import { useAudio } from "@/contexts/AudioContext";

export default function AtvSecretScreen() {
  const router = useRouter();

  const { showLoadingModal, hideLoadingModal } = useLoading();
  const { user } = useUser();
  const { setFeedback } = useFeedbackContext();

  const {
    started,

    start,
    finish,
    restart,

    incrementStats,
  } = usePhaseContext();

  const player = useAudioPlayer();

  const [infoVisible, setInfoVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const [placements, setPlacements] = useState<Placement>([null, null, null]);

  const { playAudio } = useAudio();

  /*
   * ---------------------------------------
   * ANSWERS
   * ---------------------------------------
   */

  const handleSuccess = async () => {
    showLoadingModal();

    incrementStats({
      points: 10,
      coins: 1,
      correctAnswers: 1,
    });

    await finish();

    hideLoadingModal();

    router.push("/screens/phases/score");
  };

  const handleError = () => {
    incrementStats({
      wrongAnswers: 1,
    });

    setFeedback({
      label: `Veja a sequência correta`,

      content: <SecretFeedback phrase="I SEE A TRAIN" correctOrder={phrase} />,
    });

    router.push("/screens/phases/errorFeedback");
  };

  const handlePlace = (targetIndex: number) => {
    if (!selectedWord) return;

    const updated = [...placements];

    const existingIndex = updated.findIndex(
      (item) => item?.id === selectedWord.id,
    );

    if (existingIndex !== -1) {
      updated[existingIndex] = null;
    }

    updated[targetIndex] = selectedWord;

    setPlacements(updated);
    setSelectedWord(null);
  };

  const handleReset = () => {
    setPlacements([null, null, null]);
    setSelectedWord(null);
  };

  const handleConfirm = async () => {
    const isCorrect = placements.every(
      (item, index) => item?.id === phrase[index].id,
    );

    if (isCorrect) {
      handleSuccess();
    } else {
      handleError();
    }
  };

  /*
   * ---------------------------------------
   * RENDER
   * ---------------------------------------
   */

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: RS(50),
      }}
    >
      <ModalInfo
        title={"Secret Stage"}
        message={"Junte as peças e faça as fases"}
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />

      <HeaderPhase
        image={require("@/assets/images/phases/secret/intro.png")}
        title={"Secret Stage"}
        description={"Junte as peças e faça as fases"}
        color={"#6CD2FF"}
        onPressInfo={() => setInfoVisible(true)}
        onBack={() => router.back()}
      />

      <View
        style={{
          gap: RS(30),
          marginTop: RS(20),
        }}
      >
        {/* TARGETS */}
        <View
          className="flex-row justify-between"
          style={{
            gap: RS(20),
            marginBottom: RS(10),
          }}
        >
          {placements.map((item, i) => {
            const isActive = !!selectedWord;

            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.9}
                onPress={() => handlePlace(i)}
              >
                {item ? (
                  <ImageBackground
                    source={item.image}
                    style={{
                      width: RW(90),
                      height: RW(110),
                      aspectRatio: 114 / 137,
                    }}
                  />
                ) : (
                  <Shadow
                    distance={10}
                    startColor={
                      isActive ? "rgba(108,210,255,0.45)" : "rgba(0,0,0,0.20)"
                    }
                    offset={[0, 0]}
                    style={{
                      borderRadius: 30,
                    }}
                  >
                    <View
                      className="items-center justify-center bg-white"
                      style={{
                        width: RW(90),
                        height: RH(140),
                        padding: RS(16),
                        borderRadius: 30,
                        borderWidth: isActive ? 3 : 0,
                        borderColor: "#6CD2FF",
                      }}
                    />
                  </Shadow>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FRASE */}
        <Shadow
          distance={8}
          startColor="rgba(0,0,0,0.25)"
          offset={[0, 0]}
          style={{
            alignSelf: "stretch",
          }}
        >
          <View
            className="flex-row items-center justify-center bg-white"
            style={{
              padding: RS(16),
              gap: RS(10),
              borderRadius: 20,
              flexWrap: "wrap",
            }}
          >
            {phrase.map((word, i) => (
              <Text
                key={i}
                className="font-montserratSemiBold"
                style={{
                  fontSize: RF(24),
                  color: word.color,
                }}
              >
                {word.label}
              </Text>
            ))}
          </View>
        </Shadow>

        {/* ITENS */}
        <View className="flex-row justify-between">
          {phrase.map((word, i) => {
            const isSelected = selectedWord?.id === word.id;

            const isPlaced = placements.some((item) => item?.id === word.id);

            if (isPlaced) {
              return (
                <View
                  key={i}
                  style={{
                    width: RW(90),
                    height: RW(110),
                  }}
                />
              );
            }

            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.9}
                onPress={() => {
                  setSelectedWord(word);
                  playAudio(word.audio);
                }}
              >
                <View
                  className="bg-white items-center justify-center"
                  style={{
                    padding: RS(4),
                    borderRadius: 24,
                    borderColor: "#6CD2FF",
                  }}
                >
                  <ImageBackground
                    source={word.image}
                    style={{
                      width: isSelected ? RW(100) : RW(90),
                      height: isSelected ? RW(120) : RW(110),
                      aspectRatio: 114 / 137,
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ACTIONS */}
        <View
          className="flex-row justify-center items-center"
          style={{
            gap: RS(20),
          }}
        >
          <TouchableOpacity onPress={handleConfirm}>
            <Image
              source={require("@/assets/icons/phases/confirm-red.png")}
              style={{
                width: RW(46),
                aspectRatio: 1 / 1,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleReset}>
            <Image
              source={require("@/assets/icons/phases/clear.png")}
              style={{
                width: RW(40),
                aspectRatio: 1 / 1,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
