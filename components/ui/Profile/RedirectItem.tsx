import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import { RF, RS, RW } from "@/theme";

interface Props {
  title: string;
  icon: any;
  onPress?: () => void;
}

export default function RedirectItem({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={require("@/assets/images/profile/navigation-option.png")}
        className="justify-center"
        style={{
          width: RW(320),
          aspectRatio: 354 / 87,
          paddingHorizontal: RS(30),
        }}
      >
        <View className="flex-row items-center" style={{ gap: RS(20) }}>
          <Image
            style={{
              width: RW(40),
              aspectRatio: 1 / 1,
            }}
            source={icon}
          />
          <Text
            className="font-montserratBold"
            style={{
              fontSize: RF(18),
              color: "#4C4C4C",
            }}
          >
            {title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
