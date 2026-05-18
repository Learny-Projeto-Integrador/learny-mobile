import { RF, RS, RW } from "@/theme";
import { View, Text, Image } from "react-native";

interface Props {
  rank: number;
  name: string;
  points: string;
  image: any;
}

export default function PodiumCard({ rank, name, points, image }: Props) {
  const colors = ["#E3AC0A", "#B8B9BB", "#C55A1D"];
  const borderColor = colors[rank - 1] || "#000";
  const color = colors[rank - 1] || "#000";

  return (
    <View className="flex-row items-center" style={{ gap: RS(20) }}>
      <Image
        source={
          image ? { uri: image } : require("@/assets/images/ranking/avatar.png")
        }
        style={{
          width: RS(80),
          borderRadius: RW(100),
          borderWidth: RW(4),
          aspectRatio: 1 / 1,
          borderColor: borderColor,
        }}
      />
      <View
        className="flex-row items-center justify-between"
        style={{
          width: RW(200),
          borderWidth: RW(4),
          borderRadius: RW(20),
          paddingVertical: RS(20),
          paddingHorizontal: RS(16),
          borderColor: borderColor,
        }}
      >
        <View className="flex-row items-center" style={{ gap: RS(6) }}>
          <Text
            className="font-montserratBold"
            style={{
              fontSize: RF(20),
              color: color,
            }}
          >
            {rank}º
          </Text>

          <Text
            className="font-montserratBold"
            style={{
              fontSize: RF(20),
              color: color,
            }}
          >
            {name}
          </Text>
        </View>

        <Text style={{ color: "#555" }}>
          <Text className="font-montserratBold " style={{ fontSize: RF(16) }}>
            {points}
          </Text>{" "}
          pts.
        </Text>
      </View>
    </View>
  );
}
