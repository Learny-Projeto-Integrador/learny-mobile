import { useAudio } from "@/contexts/AudioContext";
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
  overlay?: boolean;
  onPress: () => void;
  onLayout: (event: any) => void;
}

export default function ConnectCard({
  image,
  overlay,
  onPress,
  onLayout,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} onLayout={onLayout}>
      <Image
        source={image}
        style={{
          width: RW(80),
          height: RW(80),
          borderRadius: RW(100),
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
            borderRadius: RW(100),
            backgroundColor: "rgba(80,80,80,0.8)",
          }}
        />
      )}
    </TouchableOpacity>
  );
}
