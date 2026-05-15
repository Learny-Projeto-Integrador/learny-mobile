import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import TutorialCard from "@/components/ui/Phases/TutorialCard";
import PhaseBase from "@/components/ui/Phases/PhaseBase";

import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { useFeedbackContext } from "@/contexts/FeedbackContext";

import { RF, RH, RS, RW } from "@/theme";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { FeelingOption } from "@/types/phases";

import { dinosEmotions } from "@/constants/phases/dinos";
import { colors } from "@/constants/colors";

import { useAudioPlayer } from "expo-audio";

import ListenFeedback from "@/components/ui/Phases/Feedbacks/ListenFeedback";

export default function AtvListenScreen() {
  const router = useRouter();

  const [correctOption, setCorrectOption] = useState<FeelingOption | null>(
    null,
  );

  const [phaseOptions, setPhaseOptions] = useState<FeelingOption[]>([]);

  // ordem dos speakers
  const [audioOptions, setAudioOptions] = useState<FeelingOption[]>([]);

  // ordem das imagens (embaralhada separadamente)
  const [imageOptions, setImageOptions] = useState<FeelingOption[]>([]);

  const { showLoadingModal, hideLoadingModal } = useLoading();

  const { user } = useUser();

  const { setFeedback } = useFeedbackContext();

  const {
    started,

    start,
    finish,
    restart,

    incrementStats,

    useHint,
  } = usePhaseContext();

  const player = useAudioPlayer();

  /*
   * ---------------------------------------
   * AUDIO
   * ---------------------------------------
   */

  const playAudio = (audio: any) => {
    if (!audio) return;

    if (!user?.audioActive) return;

    try {
      player.replace(audio);

      player.seekTo(0);

      player.play();
    } catch (e) {
      console.log(e);
    }
  };

  /*
   * ---------------------------------------
   * HELPERS
   * ---------------------------------------
   */

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const generateFeelingOptions = (amount: number = 4): FeelingOption[] => {
    const shuffledEmotions = shuffleArray(dinosEmotions);

    const shuffledColors = shuffleArray(colors);

    return shuffledEmotions.slice(0, amount).map((emotion, index) => ({
      ...emotion,
      color: shuffledColors[index],
    }));
  };

  /*
   * ---------------------------------------
   * INITIALIZATION
   * ---------------------------------------
   */

  const initializePhase = () => {
    const generatedOptions = generateFeelingOptions(4);

    setPhaseOptions(generatedOptions);

    const randomCorrect =
      generatedOptions[Math.floor(Math.random() * generatedOptions.length)];

    const incorrectOptions = generatedOptions.filter(
      (option) => option.id !== randomCorrect.id,
    );

    const randomIncorrect = shuffleArray(incorrectOptions).slice(0, 2);

    // ordem correta baseada nos speakers
    const finalAudioOptions = shuffleArray([
      randomCorrect,
      ...randomIncorrect,
    ]);

    // embaralha imagens separadamente
    let finalImageOptions = shuffleArray(finalAudioOptions);

    // garante que não fique alinhado verticalmente
    while (
      finalImageOptions.some(
        (item, index) => item.id === finalAudioOptions[index]?.id,
      )
    ) {
      finalImageOptions = shuffleArray(finalAudioOptions);
    }

    setCorrectOption(randomCorrect);

    setAudioOptions(finalAudioOptions);

    setImageOptions(finalImageOptions);
  };

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
      label: "Essa era a ordem correta dos sons:",
      content: <ListenFeedback order={audioOptions} />,
    });

    router.push("/screens/phases/errorFeedback");
  };

  /*
   * ---------------------------------------
   * HINT
   * ---------------------------------------
   */

  const handleHint = async () => {
    showLoadingModal();

    const canUseHint = await useHint();

    hideLoadingModal();

    if (!canUseHint) return;

    if (!correctOption || imageOptions.length <= 2) {
      return;
    }

    const incorrectOptions = imageOptions.filter(
      (option) => option.id !== correctOption.id,
    );

    const optionToRemove =
      incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

    setImageOptions((prev) =>
      prev.filter((option) => option.id !== optionToRemove.id),
    );
  };

  /*
   * ---------------------------------------
   * PLACEMENT
   * ---------------------------------------
   */

  const [selectedOption, setSelectedOption] =
    useState<FeelingOption | null>(null);

  const [placements, setPlacements] = useState<(FeelingOption | null)[]>([
    null,
    null,
    null,
  ]);

  const handlePlace = (targetIndex: number) => {
    if (!selectedOption) return;

    const updated = [...placements];

    const existingIndex = updated.findIndex(
      (item) => item?.id === selectedOption.id,
    );

    if (existingIndex !== -1) {
      updated[existingIndex] = null;
    }

    updated[targetIndex] = selectedOption;

    setPlacements(updated);

    setSelectedOption(null);
  };

  const handleReset = () => {
    setPlacements([null, null, null]);

    setSelectedOption(null);
  };

  const handleConfirm = async () => {
    const isCorrect = placements.every((item, index) => {
      return item?.id === audioOptions[index]?.id;
    });

    if (isCorrect) {
      await handleSuccess();
    } else {
      handleError();
    }
  };

  /*
   * ---------------------------------------
   * EFFECTS
   * ---------------------------------------
   */

  useEffect(() => {
    initializePhase();
  }, []);

  /*
   * ---------------------------------------
   * RENDER
   * ---------------------------------------
   */

  return (
    <PhaseBase
      title="Listen & Answer"
      description={started ? "Ouça o nome e encontre ele escrito" : "How are you?"}
      question={started ? "The dinousaur is" : "I am"}
      color="#94ECA5"
      headerImage={require("@/assets/images/phases/listen/intro.png")}
      tutorialTitle="Como Jogar"
      tutorialMessage={`
        Essa é a fase listen. A primeira parte é um reconhecimento,
        para você descobrir quais são as emoções e seus respectivos dinos.
        Na segunda etapa você deve relacionar as emoções corretas com os sons 
        emitidos pelas caixas.
      `}
      started={started}
      onStart={start}
      onBack={() => {
        if (started) {
          restart();
        } else {
          router.back();
        }
      }}
      tutorialContent={
        <View
          className="flex-row flex-wrap items-center justify-center"
          style={{ gap: RS(20) }}
        >
          {phaseOptions.map((dino, index) => {
            return (
              <TutorialCard
                key={index}
                image={dino.image}
                audio={dino.audio}
                label={dino.emotion}
                color={dino.color}
              />
            );
          })}
        </View>
      }
    >
      <View
        className="items-center"
        style={{
          gap: RS(30),
          marginTop: RS(5),
        }}
      >
        {/* SPEAKERS */}
        <View className="flex-row" style={{ gap: RS(20) }}>
          {audioOptions.map((option, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => playAudio(option.audio)}
              className="items-center justify-center"
              style={{
                backgroundColor: option.color,
                width: RW(95),
                height: RH(115),
                borderRadius: 30,
              }}
            >
              <View
                className="bg-white items-center justify-center"
                style={{
                  width: RW(64),
                  height: RW(64),
                  borderRadius: 100,
                }}
              >
                <Image
                  source={require("@/assets/images/phases/listen/speaker.png")}
                  style={{
                    width: RW(30),
                    height: RW(30),
                    aspectRatio: 43 / 35,
                    tintColor: option.color,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* TARGETS */}
        <View className="flex-row" style={{ gap: RS(20) }}>
          {audioOptions.map((option, key) => {
            const placedItem = placements[key];

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.9}
                onPress={() => handlePlace(key)}
              >
                {placedItem ? (
                  <Image
                    source={placedItem.image}
                    style={{
                      backgroundColor: placedItem.color,
                      width: RW(95),
                      height: RH(115),
                      borderRadius: 30,
                    }}
                  />
                ) : (
                  <View
                    className="items-center justify-center"
                    style={{
                      borderWidth: 6,
                      borderColor: option.color,
                      width: RW(95),
                      height: RH(115),
                      borderRadius: 30,
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* IMAGENS */}
        <View className="flex-row" style={{ gap: RS(20) }}>
          {imageOptions.map((option, key) => {
            const isSelected = selectedOption?.id === option.id;

            const isPlaced = placements.some(
              (item) => item?.id === option.id,
            );

            if (isPlaced) {
              return (
                <View
                  key={key}
                  style={{
                    width: RW(100),
                    height: RH(120),
                  }}
                />
              );
            }

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.9}
                onPress={() => {
                  setSelectedOption(option);

                  playAudio(option.audio);
                }}
              >
                <Image
                  source={option.image}
                  style={{
                    width: isSelected ? RW(105) : RW(95),
                    height: isSelected ? RW(105) : RW(100),
                    borderRadius: 30,
                    borderWidth: isSelected ? 6 : 0,
                    borderColor:
                      audioOptions.findIndex(
                        (item) => item.id === option.id,
                      ) !== -1
                        ? audioOptions[
                            audioOptions.findIndex(
                              (item) => item.id === option.id,
                            )
                          ]?.color
                        : "#6CD2FF",
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View
        className="flex-row justify-center items-center"
        style={{
          marginTop: RS(20),
          gap: RS(20),
        }}
      >
        <TouchableOpacity onPress={handleHint}>
          <Image
            source={require("@/assets/icons/phases/hint.png")}
            style={{
              width: RW(40),
              aspectRatio: 49 / 67,
            }}
          />
        </TouchableOpacity>

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
    </PhaseBase>
  );
}