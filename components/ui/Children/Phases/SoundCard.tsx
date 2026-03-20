import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
  View,
  Text,
} from "react-native";
import { useRef } from "react";
import { useAudioPlayer } from 'expo-audio';
import { colorMap } from "@/constants/phaseData";
import { scale } from "react-native-size-matters";

type Props = {
  image?: ImageSourcePropType;
  audio?: any;
  id: string;
  type?: string;
  text?: string;
  onPress?: () => void;
};

export default function SoundCard({
  image,
  audio,
  type,
  text,
  onPress,
}: Props) {
  const sound = useAudioPlayer(audio);
  const cardRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);
  const { width } = useWindowDimensions();

  const playSound = async () => {
    sound.seekTo(0);
    sound.play();
  };
  
  const press = () => {
    playSound();
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
            width: scale(85),
            alignItems: "center",
            justifyContent: "center",
            height: scale(80),
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
