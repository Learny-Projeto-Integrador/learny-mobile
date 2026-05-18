import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { RF, RH, RS, RW } from "@/theme";

import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { usePhaseContext } from "@/contexts/PhaseContext";

import { EmotionOption, Feedback, PhaseStats } from "@/types/phases";

import FeelingCard from "@/components/ui/Phases/Feeling/FeelingCard";
import FeelingFeedback from "@/components/ui/Phases/Feedbacks/FeelingFeedback";
import { shuffleArray } from "@/utils/emotions";
import { useAudio } from "@/contexts/AudioContext";
import { emotionTranslations } from "@/constants/phases/dinos";

interface Props {
  phaseOptions: EmotionOption[];
  onSuccess: (stats: Partial<PhaseStats>) => void;
  onError: (feedbackData: Feedback) => void;
}

export default function FeelingActivity({
  phaseOptions,
  onSuccess,
  onError,
}: Props) {
  const [correctOption, setCorrectOption] = useState<EmotionOption | null>(
    null,
  );

  const [shuffledOptions, setShuffledOptions] = useState<EmotionOption[]>([]);

  const { playAudio } = useAudio();

  const { showLoadingModal, hideLoadingModal } = useLoading();

  const { useHint } = usePhaseContext();

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

    const finalOptions = shuffleArray([randomCorrect, ...randomIncorrect]);

    setCorrectOption(randomCorrect);

    setShuffledOptions(finalOptions);
  };

  /*
   * ANSWERS
   */

  const handleAnswer = async (option: EmotionOption) => {
    const isCorrect = option.id === correctOption?.id;

    if (isCorrect) {
      onSuccess({
        points: 100,
        coins: 100,
        correctAnswers: 1,
      });

      return;
    }

    const emotionTranslate = emotionTranslations[correctOption?.emotion || ""] || "";

    onError({
      stats: {
        wrongAnswers: 1,
      },

      label: `O dinossauro está ${emotionTranslate} (${correctOption?.emotion})`,

      content: (
        <FeelingFeedback
          correctEmotion={correctOption?.emotion || ""}
          image={correctOption?.bigImage}
          color={correctOption?.color || "#4c4c4c"}
        />
      ),
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

    if (!correctOption || shuffledOptions.length <= 2) {
      return;
    }

    const incorrectOptions = shuffledOptions.filter(
      (option) => option.id !== correctOption.id,
    );

    const optionToRemove =
      incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

    setShuffledOptions((prev) =>
      prev.filter((option) => option.id !== optionToRemove.id),
    );
  };

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
          Como ele está?
        </Text>

        {correctOption && (
          <Image
            source={correctOption.bigImage}
            style={{
              width: RS(300),
              height: RH(217),
              borderRadius: RW(30),
            }}
          />
        )}

        <View className="flex-row" style={{ gap: RS(10) }}>
          {shuffledOptions.map((option, key) => (
            <FeelingCard
              key={key}
              text={option.emotion}
              color={option.color || "#4c4c4c"}
              onPress={async () => {
                await playAudio(option.audio);
                setTimeout(() => {
                  handleAnswer(option);
                }, 1000);
              }}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleHint}
        className="flex-row justify-center"
        style={{
          marginTop: RS(20),
        }}
      >
        <Image
          source={require("@/assets/icons/phases/hint.png")}
          style={{
            width: RW(40),
            aspectRatio: 49 / 67,
          }}
        />
      </TouchableOpacity>
    </>
  );
}
