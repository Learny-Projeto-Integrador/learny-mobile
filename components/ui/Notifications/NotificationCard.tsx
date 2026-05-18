import { Shadow } from "react-native-shadow-2";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { RF, RS, RW } from "@/theme";
import GradientText from "../GradientText";

interface Props {
  icon: ImageSourcePropType;
  label: string;
  description: string;
  isReaction?: boolean;
  colors?: [string, string];
}

export default function NotificationCard({
  icon,
  label,
  description,
  isReaction = true,
  colors,
}: Props) {
  return (
    <Shadow
      distance={6}
      startColor="rgba(0,0,0,0.1)"
      offset={[0, 0]}
      style={{
        alignSelf: "stretch",
      }}
    >
      <View
        className="bg-white flex-row items-center justify-center"
        style={{
          gap: RS(30),
          paddingVertical: RS(26),
          paddingHorizontal: RS(24),
          borderRadius: RW(12),
        }}
      >
        <View>
          <Image source={icon} style={{ width: RW(40), height: RW(40) }} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            className="font-montserratBold"
            style={{ fontSize: RF(20), color: "#4c4c4c" }}
          >
            {isReaction ? (
              <View className="flex-row items-center">
                <Text
                  className="font-montserratBold"
                  style={{ fontSize: RF(20), color: "#4c4c4c" }}
                >
                  De:{" "}
                </Text>
                <GradientText
                  color1={colors ? colors[0] : "#4c4c4c"}
                  color2={colors ? colors[1] : "#4c4c4c"}
                  style={{ fontSize: RF(20), fontFamily: "Montserrat_700Bold" }}
                >
                  {label}
                </GradientText>
              </View>
            ) : (
              <Text>{label}</Text>
            )}
          </Text>

          <Text className="font-montserratRegular" style={{ fontSize: RF(18) }}>
            {description}
          </Text>
        </View>
      </View>
    </Shadow>
  );
}
