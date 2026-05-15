import { RW } from "@/theme";
import { useAudioPlayer } from "expo-audio";
import {
  ImageSourcePropType,
  TouchableOpacity,
  Image,
  View,
} from "react-native";

interface Props {
  image: ImageSourcePropType;
  audio: any;
  overlay?: boolean;
  onPress: () => void;
  onLayout: (event: any) => void;
}

export default function ConnectCard({
  image,
  audio,
  overlay,
  onPress,
  onLayout,
}: Props) {
  const sound = useAudioPlayer(audio);

  const playSound = async () => {
    sound.seekTo(0);
    await sound.play();
  };

  const handlePress = () => {
    if (audio != null) playSound();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} onLayout={onLayout}>
      <Image
        source={image}
        style={{
          width: RW(70),
          height: RW(70),
          borderRadius: 100,
        }}
      />

      {overlay && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 100,
            backgroundColor: "rgba(80,80,80,0.8)",
          }}
        />
      )}
    </TouchableOpacity>
  );
}
