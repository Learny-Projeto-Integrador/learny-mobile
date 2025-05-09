import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";

type AnimalCardProps = {
  image: ImageSourcePropType;
  source: any;
  title: string;
  id: string;
  column: "left" | "right";
  onSelect: (card: {
    id: string;
    type: string;
    x: number;
    y: number;
    column: "left" | "right";
  }) => void;
};

export default function AnimalCard({
  image,
  source,
  title,
  id,
  column,
  onSelect,
}: AnimalCardProps) {
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

  const handlePress = () => {
    playSound();
    // Mede a posição do componente na tela
    //@ts-ignore
    cardRef.current?.measure((x, y, w, h, pageX, pageY) => {
      onSelect({
        id,
        type: title,
        x: pageX + w / 2,
        y: pageY + h / 2,
        column,
      });
    });
  };

  return (
    <TouchableOpacity
      ref={cardRef}
      style={{ flexDirection: "row" }}
      onPress={handlePress}
      activeOpacity={1}
    >
      <Image
        source={image}
        style={{
          width: width * 0.2,
          aspectRatio: 1,
        }}
      />
    </TouchableOpacity>
  );
}
