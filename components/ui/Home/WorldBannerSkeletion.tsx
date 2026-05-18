import {
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";

import { useEffect, useRef } from "react";

import { RW, RH } from "@/theme";

export default function WorldBannerSkeleton() {
  const opacityAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.9,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        width: "100%",
        aspectRatio: 524 / 182,
      }}
    >
      <ImageBackground
        source={require("@/assets/images/banner-example.png")}
        className="flex-1 justify-center overflow-hidden"
        imageStyle={{
          opacity: 0.7,
        }}
      >
        <View
          className="w-5/6"
          style={{
            paddingLeft: RW(24),
          }}
        >
          {/* Descrição */}
          <Animated.View
            style={{
              width: RW(120),
              height: RH(12),
              marginBottom: RH(6),
              borderRadius: RW(5),
              backgroundColor: "#b8b8b8",
              opacity: opacityAnim,
            }}
          />

          {/* Nome */}
          <Animated.View
            style={{
              width: RW(190),
              height: RH(24),
              marginBottom: RH(6),
              borderRadius: RW(5),
              backgroundColor: "#b8b8b8",
              opacity: opacityAnim,
            }}
          />

          {/* Mundo */}
          <Animated.View
            style={{
              width: RW(90),
              height: RH(12),
              marginBottom: RH(14),
              borderRadius: RW(5),
              backgroundColor: "#b8b8b8",
              opacity: opacityAnim,
            }}
          />

          {/* Barra de progresso */}
          <Animated.View
            style={{
              width: "100%",
              height: RH(24),
              borderRadius: RW(5),
              backgroundColor: "#b8b8b8",
              opacity: opacityAnim,
            }}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}