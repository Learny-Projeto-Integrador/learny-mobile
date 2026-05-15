import { View } from "react-native";

import TutorialCard from "@/components/ui/Phases/TutorialCard";

import { RS } from "@/theme";
import { EmotionOption } from "@/types/phases";

interface Props {
  options: EmotionOption[];
}

export function TutorialContent({ options }: Props) {
  return (
    <View
      className="flex-row flex-wrap items-center justify-center"
      style={{ gap: RS(20) }}
    >
      {options.map((dino, index) => (
        <TutorialCard
          key={index}
          image={dino.image}
          audio={dino.audio}
          label={dino.emotion}
          color={dino.color || "#4c4c4c"}
        />
      ))}
    </View>
  );
}
