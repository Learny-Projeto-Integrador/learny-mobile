import { Text, ImageBackground } from "react-native";
import { RW, RS } from "@/theme";

interface Props {
  number: string;
  completed?: boolean;
  unlocked?: boolean;
}

export default function PhaseCircle({
  number,
  completed,
  unlocked,
}: Props) {
  const backgroundImage = completed
    ? require("@/assets/images/trail/phases-backgrounds/unlocked.png")
    : unlocked
      ? require("@/assets/images/trail/phases-backgrounds/unlocked.png")
      : require("@/assets/images/trail/phases-backgrounds/locked.png");

  return (
    <ImageBackground
      source={backgroundImage}
      style={{
        width: RW(70),
        aspectRatio: 1 / 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        className="text-white font-montserratBold"
        style={{
          fontSize: RS(24),
        }}
      >
        {number}
      </Text>
    </ImageBackground>
  );
}
