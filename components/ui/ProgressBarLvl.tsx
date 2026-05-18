import { View, Text, Animated, Easing } from "react-native";
import { useRef, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";

import { RF, RH, RS, RW } from "@/theme";

interface Props {
  points: string;
  progress: number; // 0 -> 100
}

export default function ProgressBarLvl({
  points,
  progress,
}: Props) {
  /*
   * ---------------------------------------
   * ANIMATION
   * ---------------------------------------
   */

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  /*
   * ---------------------------------------
   * INTERPOLATION
   * ---------------------------------------
   */

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  /*
   * ---------------------------------------
   * RENDER
   * ---------------------------------------
   */

  return (
    <LinearGradient
      colors={["#b25563", "#669bbb"]}
      className="w-full flex-row items-center"
      style={{
        height: RH(46),
        borderRadius: RW(10),
        overflow: "hidden",
      }}
    >
      {/* EXP */}
      <View
        className="h-full items-center justify-center bg-[#4c4c4c]"
        style={{
          width: RW(75),
        }}
      >
        <Text
          className="font-montserratBold text-white"
          style={{
            fontSize: RF(16),
          }}
        >
          exp: {points}
        </Text>
      </View>

      {/* BAR CONTAINER */}
      <View
        className="flex-1 justify-center bg-white"
        style={{
          height: RH(36),
          marginRight: RS(8),
          borderTopRightRadius: RW(5),
          borderBottomRightRadius: RW(5),
          overflow: "hidden",
        }}
      >
        {/* ANIMATED GRADIENT */}
        <Animated.View
          style={{
            width: widthInterpolation,
            height: "100%",
            paddingVertical: RS(5)
          }}
        >
          <LinearGradient
            colors={["#b25563", "#669bbb"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
            }}
          />
        </Animated.View>
      </View>
    </LinearGradient>
  );
}