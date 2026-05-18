import { RF, RH, RS, RW } from "@/theme";
import { View, Text, Image } from "react-native";
import GradientText from "../GradientText";
import Svg, { Polygon } from "react-native-svg";

interface Props {
  discount: number;
  characterImage: any;
}

export default function DiscountBanner({ discount, characterImage }: Props) {
  return (
    <View
      className="w-full flex-row items-end justify-center"
      style={{
        backgroundColor: "#6CD2FF",
        gap: RS(50),
        borderRadius: RW(14),
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Image
        source={characterImage}
        style={{ width: RW(80), aspectRatio: 186 / 320, zIndex: 2 }}
      />

      <View style={{ paddingVertical: RS(20), zIndex: 2 }}>
        <Text
          className="font-montserratBold text-white"
          style={{ fontSize: RF(36) }}
        >
          {discount}%
        </Text>
        <Text
          className="font-montserratSemiBold text-white"
          style={{ fontSize: RF(22), marginTop: -RS(10), marginBottom: RS(10) }}
        >
          discount in
        </Text>
        <View
          className="bg-white items-center justify-center"
          style={{
            paddingHorizontal: RS(10),
            paddingVertical: RS(4),
            borderRadius: RW(10),
          }}
        >
          <GradientText
            color1="#EF5B6A"
            color2="#6CD2FF"
            style={{ fontSize: RF(24), fontFamily: "Montserrat_800ExtraBold" }}
          >
            Stellar Points
          </GradientText>
        </View>
      </View>

      {/* Shape SVG - Forma para */}
      <Svg
        style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: RH(60),
            zIndex: 1,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        >
        <Polygon
            points="0,40 100,0 100,100 0,100"
            fill="#e2f6ff"
        />
        </Svg>
    </View>
  );
}
