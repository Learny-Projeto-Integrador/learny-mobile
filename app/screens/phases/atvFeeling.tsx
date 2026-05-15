import FeelingActivity from "@/components/ui/Phases/Feeling/FeelingActivity";
import PhaseBase from "@/components/ui/Phases/PhaseBase";
import { TutorialContent } from "@/components/ui/Phases/TutorialContent";
import { useFeedbackContext } from "@/contexts/FeedbackContext";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { Feedback, PhaseStats } from "@/types/phases";
import { generateEmotionOptions } from "@/utils/emotions";
import { useRouter } from "expo-router";

export default function AtvFeelingScreen() {
  const router = useRouter();

  const { setFeedback } = useFeedbackContext();
  const { started, start, restart, finish, incrementStats } = usePhaseContext();

  const phaseOptions = generateEmotionOptions(4);

  const handleSuccess = async (stats: Partial<PhaseStats>) => {
    const updatedStats = incrementStats(stats);

    await finish(updatedStats);

    router.push("/screens/phases/score");
  };

  const handleError = (feedback: Feedback) => {
    incrementStats(feedback.stats);

    setFeedback(feedback);

    router.push("/screens/phases/errorFeedback");
  };

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
      tutorialContent={<TutorialContent options={phaseOptions} />}
    >
      <FeelingActivity
        phaseOptions={phaseOptions}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </PhaseBase>
  );
}
