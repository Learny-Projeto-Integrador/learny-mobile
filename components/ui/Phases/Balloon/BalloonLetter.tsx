import { ImageBackground, TouchableOpacity } from "react-native";

import { balloonImages } from "@/constants/phases/balloon";
import { RF, RW } from "@/theme";

import OutlinedText from "../../OutlinedText";

type Props = {
  letter: string;
  color: string;
  audio?: any;
  onPress?: () => void;
  onPlayAudio?: (audio: any) => void;
};

export default function BalloonLetter({
  letter,
  color,
  audio,
  onPress,
  onPlayAudio,
}: Props) {
  const handlePress = () => {
    if (audio) {
      onPlayAudio?.(audio);
    }

    onPress?.();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <ImageBackground
        source={balloonImages[color]}
        className="relative items-center"
        style={{
          width: RW(45),
          aspectRatio: 65 / 94,
        }}
      >
        <OutlinedText letter={letter} color={color} size={RF(34)} />
      </ImageBackground>
    </TouchableOpacity>
  );
}
