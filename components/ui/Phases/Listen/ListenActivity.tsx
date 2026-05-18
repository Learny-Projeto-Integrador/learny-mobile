import { View, Image, TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";

import { useAudioPlayer } from "expo-audio";

import { RF, RH, RS, RW } from "@/theme";

import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { usePhaseContext } from "@/contexts/PhaseContext";

import { EmotionOption, Feedback, PhaseStats } from "@/types/phases";

import ListenFeedback from "@/components/ui/Phases/Feedbacks/ListenFeedback";

import { shuffleArray } from "@/utils/emotions";
import { useAudio } from "@/contexts/AudioContext";

interface Props {
  phaseOptions: EmotionOption[];

  onSuccess: (stats: Partial<PhaseStats>) => void;

  onError: (feedbackData: Feedback) => void;
}

export default function ListenActivity({
  phaseOptions,
  onSuccess,
  onError,
}: Props) {
  const [correctOption, setCorrectOption] = useState<EmotionOption | null>(
    null,
  );

  // ordem dos speakers
  const [audioOptions, setAudioOptions] = useState<EmotionOption[]>([]);

  // ordem das imagens
  const [imageOptions, setImageOptions] = useState<EmotionOption[]>([]);

  const [selectedOption, setSelectedOption] = useState<EmotionOption | null>(
    null,
  );

  const [placements, setPlacements] = useState<(EmotionOption | null)[]>([
    null,
    null,
    null,
  ]);

  const { showLoadingModal, hideLoadingModal } = useLoading();

  const { user } = useUser();

  const { useHint } = usePhaseContext();

  /*
   * AUDIO
   */

  const { playAudio } = useAudio();

  /*
   * INITIALIZATION
   */

  const initializePhase = () => {
    const generatedOptions = phaseOptions;

    const randomCorrect =
      generatedOptions[Math.floor(Math.random() * generatedOptions.length)];

    const incorrectOptions = generatedOptions.filter(
      (option) => option.id !== randomCorrect.id,
    );

    const randomIncorrect = shuffleArray(incorrectOptions).slice(0, 2);

    // ordem correta dos audios
    const finalAudioOptions = shuffleArray([randomCorrect, ...randomIncorrect]);

    // embaralha imagens separadamente
    let finalImageOptions = shuffleArray(finalAudioOptions);

    // evita alinhamento vertical
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
   * ANSWERS
   */

  const handleConfirm = () => {
    const isCorrect = placements.every((item, index) => {
      return item?.id === audioOptions[index]?.id;
    });

    if (isCorrect) {
      onSuccess({
        points: 100,
        coins: 100,
        correctAnswers: 1,
      });

      return;
    }

    onError({
      stats: {
        wrongAnswers: 1,
      },

      label: "Essa era a ordem correta dos sons:",

      content: <ListenFeedback order={audioOptions} />,
    });
  };

  /*
   * HINT
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
   * PLACEMENT
   */

  const handlePlace = (targetIndex: number) => {
    if (!selectedOption) return;

    const updated = [...placements];

    const existingIndex = updated.findIndex(
      (item) => item?.id === selectedOption.id,
    );

    // remove posição anterior
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

  /*
   * EFFECTS
   */

  useEffect(() => {
    initializePhase();
  }, []);

  /*
   * RENDER
   */

  return (
    <>
      <View
        className="items-center"
        style={{
          gap: RS(30),
          marginTop: RS(5),
        }}
      >
        <Text
          className="text-center font-montserratBold"
          style={{
            color: "#4c4c4c",
            fontSize: RF(24),
          }}
        >
          Ouça e organize os dinossauros
        </Text>

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
                height: RH(100),
                borderRadius: RW(20),
              }}
            >
              <View
                className="bg-white items-center justify-center"
                style={{
                  width: RW(64),
                  height: RW(64),
                  borderRadius: RW(100),
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
                      height: RH(105),
                      borderRadius: RW(20),
                    }}
                  />
                ) : (
                  <View
                    className="items-center justify-center"
                    style={{
                      borderWidth: RW(3),
                      borderColor: option.color,
                      width: RW(95),
                      height: RH(100),
                      borderRadius: RW(20),
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

            const isPlaced = placements.some((item) => item?.id === option.id);

            if (isPlaced) {
              return;
            }

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.9}
                onPress={async () => {
                  await playAudio(option.audio);

                  setSelectedOption(option);
                }}
              >
                <Image
                  source={option.image}
                  style={{
                    width: isSelected ? RW(105) : RW(95),

                    height: isSelected ? RW(105) : RW(100),

                    borderRadius: RW(20),

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
    </>
  );
}
