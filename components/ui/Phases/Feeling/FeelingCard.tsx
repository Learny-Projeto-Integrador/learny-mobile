import {
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useAudioPlayer } from "expo-audio";
import { RF, RH, RW } from "@/theme";

type Props = {
  audio: any;
  text: string;
  color: string;
  onPress?: () => void;
};

export default function FeelingCard({ audio, text, color, onPress }: Props) {
  const sound = useAudioPlayer(audio);

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
      style={{ flexDirection: "row" }}
      onPress={press}
      activeOpacity={1}
    >
      <View
        style={{
          backgroundColor: color || "#ccc",
          width: RW(100),
          alignItems: "center",
          justifyContent: "center",
          height: RH(100),
          borderRadius: 30,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: RF(22),
            fontFamily: "Montserrat_700Bold",
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
