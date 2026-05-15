import { View, Text, Image, TouchableOpacity } from "react-native";

import { RH, RS, RW } from "@/theme";
import { useAudio } from "@/contexts/AudioContext";
import { EmotionOption } from "@/types/phases";

type Props = {
  order: EmotionOption[];
};

export default function ListenOrderFeedback({ order }: Props) {
  const { playAudio } = useAudio();

  return (
    <View
      className="items-center"
      style={{
        gap: RS(20),
        marginTop: RS(30),
      }}
    >
      <Text
        className="font-montserratBold"
        style={{
          fontSize: RS(26),
          color: "#4C4C4C",
          marginBottom: RS(20),
        }}
      >
        Ordem correta
      </Text>

      <View
        className="flex-row items-end"
        style={{
          gap: RS(12),
        }}
      >
        {order.map((item, index) => (
          <View
            key={item.id}
            className="items-center"
            style={{
              gap: RS(16),
            }}
          >
            <TouchableOpacity
              onPress={() => playAudio(item.audio)}
              className="items-center justify-center"
              style={{
                backgroundColor: item.color,
                width: RW(95),
                height: RH(115),
                borderRadius: 30,
              }}
            >
              <View
                className="bg-white items-center justify-center"
                style={{
                  width: RW(64),
                  height: RW(64),
                  borderRadius: 100,
                }}
              >
                <Image
                  source={require("@/assets/images/phases/listen/speaker.png")}
                  style={{
                    width: RW(30),
                    height: RW(30),
                    aspectRatio: 43 / 35,
                    tintColor: item.color,
                  }}
                />
              </View>
            </TouchableOpacity>

            <Text
              className="font-montserratBold"
              style={{
                fontSize: RS(26),
                color: item.color,
              }}
            >
              {item.emotion}
            </Text>

            <Image
              source={item.image}
              style={{
                width: RW(95),
                height: RW(95),
                borderRadius: 30,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
