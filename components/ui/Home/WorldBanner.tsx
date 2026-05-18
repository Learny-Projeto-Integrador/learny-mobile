import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
  Animated,
} from "react-native";
import { RW, RH, RF, RS } from "@/theme";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { useTrailContext } from "@/contexts/TrailContext";

interface ProgressBarProps {
  progress: number;
  color: string;
}

const ProgressBar = ({ progress, color }: ProgressBarProps) => {
  const [widthAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View
      className="bg-white w-full flex-row items-center rounded-lg"
      style={{ height: RH(28) }}
    >
      <View
        className="flex-col h-full bg-[#4c4c4c] items-center justify-center rounded-md"
        style={{ width: RW(40) }}
      >
        <Text
          className="text-white font-montserratExtraBold"
          style={{ fontSize: RF(12) }}
        >
          {progress}%
        </Text>
      </View>
      <View
        className="flex justify-center overflow-hidden"
        style={{ width: RW(250), height: RH(20) }}
      >
        <Animated.View
          className="flex h-full items-center justify-center rounded-md"
          style={[
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        >
          <View
            className="w-full"
            style={{
              height: RH(30),
              marginRight: RS(20),
              backgroundColor: color,
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

interface WorldBannerProps {
  image: ImageSourcePropType;
  name: string;
  description: string;
  num: number;
  percentage: number;
  color: string;
  worldCode: string;
  unlocked: boolean;
}

export default function WorldBanner({
  image,
  name,
  description,
  num,
  percentage,
  color,
  worldCode,
  unlocked,
}: WorldBannerProps) {
  const router = useRouter();
  const { setTrailData } = useTrailContext();

  return (
    <TouchableOpacity
      onPress={async () => {
        setTrailData({
          worldCode: worldCode,
        });
        router.push("/screens/world");
      }}
      activeOpacity={1}
      style={{
        width: "100%",
        aspectRatio: 524 / 182,
      }}
    >
      <ImageBackground source={image} className="flex-1 justify-center">
        <View className="w-5/6" style={{ paddingLeft: RW(24) }}>
          {/* Descrição */}
          <Text
            className="font-montserratBold"
            style={{
              color: "#4C4C4C",
              fontSize: RF(16),
            }}
          >
            {description}
          </Text>

          {/* Nome */}
          <Text
            className="font-montserratBlack"
            style={{
              color: "#3A3A3A",
              fontSize: RF(28),
              marginTop: -RH(8),
            }}
          >
            {name}
          </Text>

          {/* Mundo */}
          <Text
            className="font-montserratBold"
            style={{
              color: "#4C4C4C",
              fontSize: RF(16),
              marginTop: -RH(8),
              marginBottom: RH(8),
            }}
          >
            Mundo-{num}
          </Text>

          {/* Progresso */}
          <ProgressBar progress={percentage} color={color} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
