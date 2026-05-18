import { colors } from "@/constants/Colors";
import { dinosEmotions } from "@/constants/phases/dinos";
import { EmotionOption } from "@/types/phases";

export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const generateEmotionOptions = (amount: number = 4): EmotionOption[] => {
  const shuffledEmotions = shuffleArray(dinosEmotions);

  const shuffledColors = shuffleArray(colors);

  return shuffledEmotions.slice(0, amount).map((emotion, index) => ({
    ...emotion,
    color: shuffledColors[index],
  }));
};
