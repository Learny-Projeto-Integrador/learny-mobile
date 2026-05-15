import { RW, RF, RS } from "@/theme";
import { View, Text, Image } from "react-native";

interface Props {
  label: string;
  value: string;
  color: string;
  icon: any;
}

export default function ConclusionStatCard({
  label,
  value,
  color,
  icon,
}: Props) {
  return (
    <View
      className="relative items-center justify-center"
      style={{
        paddingVertical: RS(12),
        borderWidth: 7,
        borderRadius: 26,
        borderColor: color,
      }}
    >
      <Text
        className="font-montserratBold text-center"
        style={{
          width: RW(120),
          color: color,
          fontSize: RF(20),
        }}
      >
        {label}
      </Text>
      <Text
        className="font-montserratBold text-center"
        style={{
          width: RW(120),
          color: "#4c4c4c",
          fontSize: RF(22),
        }}
      >
        {value}
      </Text>
      <Image
        source={icon}
        className="absolute"
        style={{
          width: RW(30),
          height: RW(30),
          aspectRatio: 1 / 1,
          top: -RS(18),
          right: -RS(18),
        }}
      />
    </View>
  );
}
