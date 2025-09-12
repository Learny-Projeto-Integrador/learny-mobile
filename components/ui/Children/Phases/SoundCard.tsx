import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
  View,
  Text,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { useAudio } from "@/contexts/AudioContext";
import { colorMap } from "@/constants/phaseData";

type Props = {
  image?: ImageSourcePropType;
  source?: any;
  id: string;
  type?: string;
  text?: string;
  onPress?: () => void;
};

export default function SoundCard({
  image,
  source,
  id,
  type,
  text,
  onPress,
}: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const cardRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);
  const { width } = useWindowDimensions();

  const { checkAudio } = useAudio();

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
            backgroundColor: colorMap[text ? text : ""] || "#ccc",
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
