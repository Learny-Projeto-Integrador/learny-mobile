import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";

type SoundCardProps = {
  image: ImageSourcePropType;
  source: any;
  id: string;
};

export default function SoundCard({
  image,
  source,
  id,
}: SoundCardProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  //@ts-ignore
  const cardRef = useRef<TouchableOpacity>(null);
  const { width } = useWindowDimensions();

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

  return (
    <TouchableOpacity
      ref={cardRef}
      style={{ flexDirection: "row" }}
      onPress={playSound}
      activeOpacity={1}
    >
      <Image
        source={image}
        style={{
          width: width * 0.24,
          aspectRatio: 1,
        }}
      />
    </TouchableOpacity>
  );
}
