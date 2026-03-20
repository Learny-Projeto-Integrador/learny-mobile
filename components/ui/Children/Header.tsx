import { ImageBackground, Image, Text, View } from "react-native";
import { fontSizes, spacing, RW } from "@/theme";

type Props = {
  points: number;
  medals: number;
  ranking: number | string;
};

export default function Header({ points, medals, ranking }: Props) {
  const sectionsHeader = [
    {
      icon: require("@/assets/icons/icon-chama.png"),
      value: points,
      aspect: 41 / 48,
    },
    {
      icon: require("@/assets/icons/icon-medalha.png"),
      value: medals,
      aspect: 43 / 49,
    },
    {
      icon: require("@/assets/icons/icon-estrela.png"),
      value: ranking,
      aspect: 38 / 38,
    },
  ]

  return (
    <View className="flex-row">
      <View
        className="flex-row items-center justify-center"
        style={{ marginLeft: RW(-5), gap: spacing.md }}
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
              source={require("@/assets/images/area-pontos.png")}
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
                  fontSize: fontSizes.lg,
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
