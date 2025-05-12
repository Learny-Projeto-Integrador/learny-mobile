import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
  View,
  Text,
} from "react-native";
import { useCheckAudio } from "@/hooks/useCheckAudio";

type SoundCardProps = {
  image?: ImageSourcePropType;
  source?: any;
  id: string;
  type?: string;
  text?: string;
  onPress?: () => void;
};

const colorMap: Record<string, string> = {
  Sad: "#EF5B6A", // vermelho
  Happy: "#6CD2FF", // amarelo
  Angry: "#80D25B", // azul
};

export default function SoundCard({
  image,
  source,
  id,
  type,
  text,
  onPress,
}: SoundCardProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  //@ts-ignore
  const cardRef = useRef<TouchableOpacity>(null);
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

  const press = () => {
    canPlayAudio ? playSound() : null;
    onPress ? onPress() : null;
  };

  return (
    <TouchableOpacity
      ref={cardRef}
      style={{ flexDirection: "row" }}
      onPress={press}
      activeOpacity={1}
    >
      {image ? (
        <Image
          source={image}
          style={
            type !== "grande"
              ? {
                  width: width * 0.24,
                  aspectRatio: 1,
                }
              : { width: width * 0.8, aspectRatio: 350 / 112 }
          }
        />
      ) : (
        <View
          style={{
            //@ts-ignore
            backgroundColor: colorMap[text] || "#ccc",
            width: width * 0.23,
            alignItems: "center",
            justifyContent: "center",
            height: width * 0.2,
            borderRadius: 20,
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: width * 0.05,
              fontFamily: "Montserrat_700Bold",
              textAlign: "center",
            }}
          >
            {text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
