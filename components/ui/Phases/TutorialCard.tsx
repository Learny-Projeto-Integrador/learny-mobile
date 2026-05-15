import { Image, TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import { useAudioPlayer } from "expo-audio";
import { RF, RH, RW } from "@/theme";

type Props = {
  audio: any;
  image: any;
  label: string;
  color: string;
};

export default function TutorialCard({ audio, image, label, color }: Props) {
  const sound = useAudioPlayer(audio);

  const [active, setActive] = useState(false);

  const playSound = async () => {
    sound.seekTo(0);
    sound.play();
  };

  const handlePress = () => {
    playSound();
    setActive((prev) => !prev);
  };

  return (
    <View className="items-center">
      <Text
        className="font-montserratBold"
        style={{ fontSize: RF(24), color: color }}
      >
        {label}
      </Text>

      <View
        style={{
          width: RW(80),
          height: RH(10),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: color,
        }}
      />

      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={handlePress}
        activeOpacity={1}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={image}
            style={{
              width: RW(130),
              height: RW(130),
              borderRadius: 30,
              aspectRatio: 1 / 1,
            }}
          />

          {!active && (
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 30,
                backgroundColor: "rgba(80,80,80,0.7)",
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
