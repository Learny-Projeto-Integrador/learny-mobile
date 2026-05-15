import { View, Text } from "react-native";

type Props = {
  letter: string;
  color: string;
  size: number;
};

export default function OutlinedText ({ letter, color, size }: Props) {
  const outlineSize = 2;

  const directions = [];

  for (let angle = 0; angle < 360; angle += 20) {
    const rad = (angle * Math.PI) / 180;

    directions.push({
      x: Math.cos(rad) * outlineSize,
      y: Math.sin(rad) * outlineSize,
    });
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Outline */}
      {directions.map((pos, index) => (
        <Text
          key={index}
          style={{
            position: "absolute",
            color,
            fontSize: size,
            fontFamily: "Montserrat_900Black",
            transform: [{ translateX: pos.x }, { translateY: pos.y }],
          }}
        >
          {letter}
        </Text>
      ))}

      {/* Texto principal */}
      <Text
        style={{
          color: "#fff",
          fontSize: size,
          fontFamily: "Montserrat_900Black",
        }}
      >
        {letter}
      </Text>
    </View>
  );
};