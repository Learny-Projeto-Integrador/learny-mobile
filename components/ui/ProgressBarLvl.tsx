import { View, Text, Animated } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { RF, RH, RW } from "@/theme";

interface Props {
  points: string;
  progress: number;
}

export default function ProgressBarLvl({ points, progress }: Props) {
  const [widthAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <LinearGradient
      colors={["#b25563", "#669bbb"]}
      className="w-full flex-row items-center bg-white overflow-hidden"
      style={{ height: RH(46), borderRadius: 10 }}
    >
      <View
        className="h-full items-center justify-center bg-[#4c4c4c]"
        style={{ width: RW(70), borderRadius: 5 }}
      >
        <Text
          className="font-montserratBold text-white"
          style={{ fontSize: RF(18) }}
        >
          exp: {points}
        </Text>
      </View>
      <View
        className="w-full overflow-hidden justify-center bg-white"
        style={{
          height: RH(35),
          marginRight: RW(5),
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Animated.View
          className="h-full items-center justify-center"
          style={{
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            borderRadius: 10,
          }}
        >
          <LinearGradient
            colors={["#b25563", "#669bbb"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: "100%", height: RH(20) }}
          />
        </Animated.View>
      </View>
    </LinearGradient>
  );
}
