import { View, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { RF, RH, RW } from "@/theme";

interface Props {
  label: string; // ex: "100%" ou "boost"
  progress: number; // 0 - 100
}

export default function ProgressBarCharacter({ label, progress }: Props) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View
      className="w-full flex-row items-center overflow-hidden"
      style={{
        height: RH(18),
        borderWidth: 2,
        borderColor: "#4C4C4C",
        borderRadius: 20,
      }}
    >
      {/* LABEL */}
      <View
        className="h-full items-center justify-center bg-[#4c4c4c]"
        style={{
          width: RW(40), // um pouco menor
        }}
      >
        <Text
          className="font-montserratBold text-white"
          style={{ fontSize: RF(10) }}
        >
          {label}
        </Text>
      </View>

      {/* PROGRESS CONTAINER */}
      <View
        className="flex-1 overflow-hidden justify-center bg-white"
        style={{
          height: RH(10),
          marginRight: RW(5),
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <Animated.View
          style={{
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            height: "100%",
          }}
        >
          <LinearGradient
            colors={["#b25563", "#669bbb"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
}
