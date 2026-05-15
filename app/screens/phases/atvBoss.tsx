import { View, Text } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";

import PhaseBase from "@/components/ui/Phases/PhaseBase";

import TutorialCard from "@/components/ui/Phases/TutorialCard";

import { useLoading } from "@/contexts/LoadingContext";
import { useFeedbackContext } from "@/contexts/FeedbackContext";
import { usePhaseContext } from "@/contexts/PhaseContext";

import { EmotionOption, BossPhaseStats, Feedback } from "@/types/phases";

import { RF, RS } from "@/theme";

import { dinosEmotions } from "@/constants/phases/dinos";
import { colors } from "@/constants/colors";

import { shuffleArray } from "@/utils/emotions";

import FeelingActivity from "@/components/ui/Phases/Feeling/FeelingActivity";
import ConnectActivity from "@/components/ui/Phases/Connect/ConnectActivity";
import ListenActivity from "@/components/ui/Phases/Listen/ListenActivity";
import { useAudio } from "@/contexts/AudioContext";

export default function AtvBossScreen() {
  const router = useRouter();

  const [phaseOptions, setPhaseOptions] = useState<EmotionOption[]>([]);

  const [currentStep, setCurrentStep] = useState(0);

  const [bossStats, setBossStats] = useState<BossPhaseStats>({
    points: 0,
    coins: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    hintsUsed: 0,
    time: "00:00",
  });

  const { setFeedback } = useFeedbackContext();

  const { showLoadingModal, hideLoadingModal } = useLoading();

  const {
    started,

    start,
    restart,

    incrementStats,

    finish,
  } = usePhaseContext();

  const { stopAudio } = useAudio();

  /*
   * ACTIVITIES
   */

  const activities = useMemo(
    () => [FeelingActivity, ConnectActivity, ListenActivity],
    [],
  );

  const CurrentActivity = activities[currentStep];

  /*
   * HELPERS
   */

  const generatePhaseOptions = (amount: number = 4): EmotionOption[] => {
    const shuffledEmotions = shuffleArray(dinosEmotions);

    const shuffledColors = shuffleArray(colors);

    return shuffledEmotions.slice(0, amount).map((emotion, index) => ({
      ...emotion,
      color: shuffledColors[index],
    }));
  };

  /*
   * INITIALIZATION
   */

  const initializeBoss = () => {
    const generatedOptions = generatePhaseOptions(4);

    setPhaseOptions(generatedOptions);
  };

  /*
   * PROGRESSION
   */

  const handleActivitySuccess = async (stats: Partial<BossPhaseStats>) => {
    const updatedStats = {
      ...bossStats,

      points: bossStats.points + (stats.points || 0),

      coins: bossStats.coins + (stats.coins || 0),

      correctAnswers: bossStats.correctAnswers + (stats.correctAnswers || 0),
    };

    setBossStats(updatedStats);

    const isLastStep = currentStep === activities.length - 1;

    if (isLastStep) {
      incrementStats(updatedStats)

      showLoadingModal();

      await finish(updatedStats);

      hideLoadingModal();

      router.push("/screens/phases/score");

      return;
    }

    stopAudio();

    setCurrentStep((prev) => prev + 1);
  };

  const handleActivityError = (feedbackData: Feedback) => {
    setBossStats((prev) => ({
      ...prev,

      wrongAnswers: prev.wrongAnswers + (feedbackData.stats?.wrongAnswers || 0),
    }));

    setFeedback(feedbackData);

    router.push("/screens/phases/errorFeedback");
  };

  /*
   * EFFECTS
   */

  useEffect(() => {
    initializeBoss();
  }, []);

  /*
   * RENDER
   */

  return (
    <PhaseBase
      title="Boss Challenge"
      description={
        started
          ? `Atividade ${currentStep + 1} de ${activities.length}`
          : "Complete todas as atividades"
      }
      question={started ? "Derrote o boss!" : "Boss Battle"}
      color="#EF5B6A"
      headerImage={require("@/assets/images/phases/boss/intro.png")}
      tutorialTitle="Como Jogar"
      tutorialMessage={`
        Essa é a fase boss.

        Você deverá completar uma sequência de desafios
        para derrotar o boss final.

        Cada atividade concluída soma pontos,
        moedas e progresso.

        Boa sorte!
      `}
      started={started}
      onStart={start}
      onBack={() => {
        if (started) {
          restart();

          setCurrentStep(0);

          setBossStats({
            points: 0,
            coins: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            time: "00:00",
          });
        } else {
          router.back();
        }
      }}
      tutorialContent={
        <View
          className="flex-row flex-wrap items-center justify-center"
          style={{
            gap: RS(20),
          }}
        >
          {phaseOptions.map((dino, index) => {
            return (
              <TutorialCard
                key={index}
                image={dino.image}
                audio={dino.audio}
                label={dino.emotion}
                color={dino.color || "#4c4c4c"}
              />
            );
          })}
        </View>
      }
    >

      <CurrentActivity
        phaseOptions={phaseOptions}
        onSuccess={handleActivitySuccess}
        onError={handleActivityError}
      />
    </PhaseBase>
  );
}
