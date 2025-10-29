import { View, Dimensions, ImageBackground } from "react-native";
import React from "react";
import Svg, { Text as SvgText } from "react-native-svg";

const { width, height } = Dimensions.get("window");

type Props = {
  letter: string;
  color: string;
};

export default function BaloonLetter({ letter, color }: Props) {
  const baloes: any = {
    "#EF5B6A": require("@/assets/images/balao-vermelho.png"),
    "#6CD2FF": require("@/assets/images/balao-azul.png"),
    "#FFB300": require("@/assets/images/balao-amarelo.png"),
    "#80D25B": require("@/assets/images/balao-verde.png"),
  };

  return (
    <ImageBackground
      source={baloes[color]}
      style={{
        width: width * 0.13,
        aspectRatio: 65 / 94,
        position: "relative",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
        }}
      >
        <Svg height="120" width="300">
          <SvgText
            fill="#fff"
            stroke={color}
            strokeWidth="2"
            fontSize={width * 0.09}
            fontFamily="Montserrat_900Black"
            fontWeight="bold"
            x="50%"
            y="33%"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {letter}
          </SvgText>
        </Svg>
      </View>
    </ImageBackground>
  );
}
