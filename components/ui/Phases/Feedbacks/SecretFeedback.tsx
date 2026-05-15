import {
  View,
  Text,
  ImageBackground,
} from "react-native";

import { RF, RH, RS, RW } from "@/theme";
import { Word } from "@/types/phases";

export default function SecretFeedback({
  phrase,
  correctOrder,
}: {
  phrase: string;
  correctOrder: Word[];
}) {
  return (
    <View
      className="items-center"
      style={{
        gap: RS(20),
      }}
    >
      <Text
        className="font-montserratSemiBold text-center"
        style={{
          fontSize: RF(22),
          color: "#FFFFFF",
        }}
      >
        {phrase}
      </Text>

      <View
        className="flex-row justify-center"
        style={{
          gap: RS(12),
        }}
      >
        {correctOrder.map((item, index) => (
          <View
            key={index}
            className="items-center"
            style={{
              gap: RS(8),
            }}
          >
            <ImageBackground
              source={item.image}
              resizeMode="contain"
              style={{
                width: RW(70),
                height: RH(100),
              }}
            />

            <Text
              className="font-montserratSemiBold"
              style={{
                fontSize: RF(14),
                color: item.color,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}