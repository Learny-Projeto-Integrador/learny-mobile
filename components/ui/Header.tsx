import { ImageBackground, Image, Text, View } from "react-native";
import { RW, RF, RS } from "@/theme";

interface Props {
  streak: number;
  coins: number;
  stellarPoints: number | string;
};

export default function Header({ streak, coins, stellarPoints }: Props) {
  const sectionsHeader = [
    {
      icon: require("@/assets/icons/header/fire.png"),
      value: streak,
      aspect: 41 / 48,
    },
    {
      icon: require("@/assets/icons/header/coins.png"),
      value: coins,
      aspect: 39 / 36,
    },
    {
      icon: require("@/assets/icons/header/points.png"),
      value: stellarPoints,
      aspect: 38 / 37,
    },
  ]

  return (
    <View className="flex-row">
      <View
        className="flex-row items-center justify-center"
        style={{ marginLeft: RW(-5), gap: RS(16) }}
      >
        {/* ITEM */}
        {sectionsHeader.map((item, index) => (
          <View key={index} className="flex-row items-center">
            {/* Ícone */}
            <Image
              source={item.icon}
              style={{
                width: RW(34),
                aspectRatio: item.aspect,
                position: "relative",
                top: -RW(5),
                left: RW(10),
                zIndex: 10,
              }}
            />

            {/* Fundo + valor */}
            <ImageBackground
              source={require("@/assets/images/header-item-background.png")}
              style={{
                width: RW(82),
                aspectRatio: 89 / 38,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: -RW(12),
              }}
            >
              <Text
                className="font-montserratBold text-center"
                style={{
                  color: "#4C4C4C",
                  fontSize: RF(18),
                  marginLeft: RW(6),
                }}
              >
                {item.value}
              </Text>
            </ImageBackground>
          </View>
        ))}
      </View>
    </View>
  );
}
