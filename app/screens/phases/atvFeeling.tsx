import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import TutorialCard from "@/components/ui/Phases/TutorialCard";
import PhaseBase from "@/components/ui/Phases/PhaseBase";
import FeelingFeedback from "@/components/ui/Phases/Feedbacks/FeelingFeedback";

import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { useFeedbackContext } from "@/contexts/FeedbackContext";

import { RF, RH, RS, RW } from "@/theme";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { FeelingOption } from "@/types/phases";

import FeelingCard from "@/components/ui/Phases/Feeling/FeelingCard";
import { dinosEmotions } from "@/constants/phases/dinos";
import { colors } from "@/constants/colors";

export default function AtvFeelingScreen() {
  const router = useRouter();

  const [correctOption, setCorrectOption] = useState<FeelingOption | null>(null);
  const [phaseOptions, setPhaseOptions] = useState<FeelingOption[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<FeelingOption[]>([]);

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
    // gera todas as opções possíveis
    const generatedOptions = generateFeelingOptions(4);

    setPhaseOptions(generatedOptions);

    // escolhe uma correta aleatória
    const randomCorrect =
      generatedOptions[Math.floor(Math.random() * generatedOptions.length)];

    // remove a correta
    const incorrectOptions = generatedOptions.filter(
      (option) => option.id !== randomCorrect.id,
    );

    // pega apenas 2 incorretas
    const randomIncorrect = shuffleArray(incorrectOptions).slice(0, 2);

    // junta correta + incorretas e embaralha
    const finalOptions = shuffleArray([randomCorrect, ...randomIncorrect]);

    setCorrectOption(randomCorrect);
    setShuffledOptions(finalOptions);
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

  const handleError = (selectedOption: FeelingOption) => {
    incrementStats({
      wrongAnswers: 1,
    });

    const emotionTranslate =
      correctOption?.emotion === "Sad"
        ? "triste"
        : correctOption?.emotion === "Happy"
          ? "feliz"
          : "bravo";

    setFeedback({
      label: `O dinossauro está ${emotionTranslate} (${correctOption?.emotion})`,

      content: (
        <FeelingFeedback
          correctEmotion={correctOption?.emotion || ""}
          image={correctOption?.bigImage}
          color={correctOption?.color || "#4c4c4c"}
        />
      ),
    });

    router.push("/screens/phases/errorFeedback");
  };

  const handleAnswer = async (option: FeelingOption) => {
    const isCorrect = option.id === correctOption?.id;

    if (isCorrect) {
      await handleSuccess();
    } else {
      handleError(option);
    }
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
      title="Watch & Listen"
      description={started ? "Veja a imagem e ligue à emoção correta" : "How are you?"}
      question={started ? "The dinousaur is" : "I am"}
      color="#94ECA5"
      headerImage={require("@/assets/images/phases/feeling/intro.png")}
      tutorialTitle="Como Jogar"
      tutorialMessage={`
        Essa é a fase feeling. A primeira parte é um reconhecimento,
        para você descobrir quais são as emoções e seus respectivos dinos.
        Na segunda etapa você deve selecionar a emoção correta.
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
              borderRadius: 30,
            }}
          />
        )}

        <View className="flex-row" style={{ gap: RS(10) }}>
          {shuffledOptions.map((option, key) => (
            <FeelingCard
              key={key}
              text={option.emotion}
              audio={user?.audioActive ? option.audio : null}
              color={option.color}
              onPress={() => handleAnswer(option)}
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
    </PhaseBase>
  );
}
