import { View, Image, Text, TouchableOpacity } from "react-native";
import { RF, RH, RS, RW } from "@/theme";
import Svg, { Polygon } from "react-native-svg";
import ProgressBarCharacter from "./ProgressBarCharacter";

interface DiagonalRectangleProps {
  name: string;
}

const DiagonalRectangle = ({ name }: DiagonalRectangleProps) => {
  return (
    <View
      style={{
        width: "100%",
        height: RH(44),
        position: "relative",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {/* Shape SVG */}
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute" }}
      >
        <Polygon
          points="0,40 100,0 100,100 0,100"
          fill="rgba(0,0,0,0.80)"
        />
      </Svg>

      {/* Texto central REAL */}
      <Text
        style={{ fontSize: RF(14), marginBottom: RH(4) }}
        className="text-white font-montserratBold"
      >
        {name}
      </Text>
    </View>
  );
}

interface Props {
  image: any;
  name: string;
  level: number;
  color: string;
  characterPoints?: number;
  mode?: "normal" | "upgrade"
  onPress?: () => void;
}

export default function CharacterCard({ image, name, level, characterPoints, mode, color, onPress }: Props) {
  return (
    <View style={{
      gap: RS(10)
    }}>
      <TouchableOpacity
        style={{
          width: RW(146),
          height: RH(160),
          borderRadius: RS(16),
          overflow: "hidden",
          backgroundColor: color,
          borderWidth: 4,
          borderColor: "#4c4c4c",
        }}
        className="relative justify-end"
        onPress={onPress}
      >
        {/* Personagem */}
        <Image
          source={{uri: image}}
          resizeMode="contain"
          style={{
            width: RW(140),
            height: RH(140),
            position: "absolute",
            top: RH(10),
            left: -RW(24),
          }}
        />

        {/* Badge Level */}
        <View
          style={{
            position: "absolute",
            top: RH(10),
            right: RW(10),
            paddingHorizontal: RW(10),
            paddingVertical: RH(4),
            borderRadius: RS(20),
          }}
          className="bg-black"
        >
          <Text
            style={{ fontSize: RF(10) }}
            className="text-white font-montserratBold"
          >
            Level {String(level).padStart(2, "0")}
          </Text>
        </View>

        {/* Base escura (simulando inclinação) */}
        <DiagonalRectangle name={name} />
      </TouchableOpacity>
      {/* PROGRESS BAR */}
      {mode == "upgrade" && (
        <ProgressBarCharacter
          label={`${characterPoints}%`}
          progress={characterPoints ? characterPoints : 0}
        />
      )}
    </View>
  );
}
