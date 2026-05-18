import { Image, TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import { useAudioPlayer } from "expo-audio";
import { RF, RH, RW } from "@/theme";
import { useAudio } from "@/contexts/AudioContext";

type Props = {
  audio: any;
  image: any;
  label: string;
  color: string;
};

export default function TutorialCard({ audio, image, label, color }: Props) {
  const { playAudio } = useAudio();

  const [active, setActive] = useState(false);

  const handlePress = () => {
    playAudio(audio);
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
          borderTopLeftRadius: RW(20),
          borderTopRightRadius: RW(20),
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
              borderRadius: RW(30),
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
                borderRadius: RW(30),
                backgroundColor: "rgba(80,80,80,0.7)",
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
