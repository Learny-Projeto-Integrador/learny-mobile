import { useRouter } from "expo-router";
import PhaseBase from "@/components/ui/Phases/PhaseBase";
import { useFeedbackContext } from "@/contexts/FeedbackContext";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { Feedback, PhaseStats } from "@/types/phases";
import { TutorialContent } from "@/components/ui/Phases/TutorialContent";
import { generateEmotionOptions } from "@/utils/emotions";
import ConnectActivity from "@/components/ui/Phases/Connect/ConnectActivity";

export default function AtvConnectScreen() {
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
      title="Watch & Match"
      description={started ? "Ligue as emoções" : "How are you?"}
      question={started ? "The dinousaur is" : "I am"}
      color="#6CD2FF"
      headerImage={require("@/assets/images/phases/connect/intro.png")}
      tutorialTitle="Como Jogar"
      tutorialMessage={`
        Essa é a fase connect. Para concluir ela você deve conectar os animais 
        correspondentes. Quando um par correto é formado a linha entre os dois 
        icones é feita.
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
      <ConnectActivity
        phaseOptions={phaseOptions}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </PhaseBase>
  );
}
