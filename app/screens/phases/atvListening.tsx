import { useRouter } from "expo-router";

import PhaseBase from "@/components/ui/Phases/PhaseBase";

import { useFeedbackContext } from "@/contexts/FeedbackContext";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { Feedback, PhaseStats } from "@/types/phases";
import ListenActivity from "@/components/ui/Phases/Listen/ListenActivity";
import { TutorialContent } from "@/components/ui/Phases/TutorialContent";
import { generateEmotionOptions } from "@/utils/emotions";

export default function AtvListenScreen() {
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
      tutorialContent={<TutorialContent options={phaseOptions} />}
    >
      <ListenActivity
        phaseOptions={phaseOptions}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </PhaseBase>
  );
}
