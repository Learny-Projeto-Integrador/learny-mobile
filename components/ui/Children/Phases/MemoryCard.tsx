import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { useAudioPlayer } from 'expo-audio';

type Props = {
  id: string;
  image: ImageSourcePropType;
  audio: any;
  onPress: () => void;
  disabled: boolean;
};

export default function MemoryCard({
  image,
  audio,
  onPress,
  disabled,
}: Props) {
  const sound = useAudioPlayer(audio);
  const { width } = useWindowDimensions();

  const playSound = async () => {
    sound.seekTo(0);
    sound.play();
  };
  
  const handlePress = async () => {
    if (disabled) return; // impede ação
    playSound();
    onPress();
  };

  return (
    <TouchableOpacity
      style={{ flexDirection: "row" }}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={image}
        style={{
          width: width * 0.26,
          aspectRatio: 141 / 169,
          marginHorizontal: width * 0.06,
        }}
      />
    </TouchableOpacity>
  );
}
