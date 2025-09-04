import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
  View,
} from "react-native";
import { useCheckAudio } from "@/hooks/useCheckAudio";

type Props = {
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
}: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const cardRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);
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
  }, [checkAudio]);

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
    if (canPlayAudio) {
      playSound();
    }

    // Mede a posição do componente na tela
    cardRef.current?.measure?.(
      (x: number, y: number, w: number, h: number, pageX: number, pageY: number) => {
        onSelect({
          id,
          type: title,
          x: pageX + w / 2,
          y: pageY + h / 2,
          column,
        });
      }
    );
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
