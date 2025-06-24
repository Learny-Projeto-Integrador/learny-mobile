import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import { useCheckAudio } from "@/hooks/useCheckAudio";

type MemoryCardProps = {
  id: string;
  image: ImageSourcePropType;
  source: any;
  onPress: () => void;
  disabled: boolean;
};

export default function MemoryCard({
  id,
  image,
  source,
  onPress,
  disabled,
}: MemoryCardProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { width } = useWindowDimensions();

  const { checkAudio } = useCheckAudio();

  const [canPlayAudio, setCanPlayAudio] = useState(false);

  useEffect(() => {
    const verifyAudio = async () => {
      const result = await checkAudio();
      if (result !== undefined) {
        setCanPlayAudio(result);
      }
    };
    verifyAudio();
  }, []);

  const playSound = async () => {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync(source);
    setSound(newSound);
    await newSound.playAsync();
  };

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  const handlePress = async () => {
    if (disabled) return; // impede ação
    canPlayAudio ? await playSound() : null;
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
