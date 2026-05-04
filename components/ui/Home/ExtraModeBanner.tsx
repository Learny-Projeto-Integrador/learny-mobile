import { ImageBackground, Text, View } from "react-native";
import { RW, RF, RS } from "@/theme";

interface Props {
  name: string;
  image: string;
};

export default function ExtraModeBanner({ name, image }: Props) {
  return (
    <View className="items-start">
      <ImageBackground
        source={{ uri: image }}
        style={{
          width: RW(300),
          aspectRatio: 423 / 142,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "85%",
            paddingLeft: RS(16),
            gap: RS(4),
          }}
        >
          <Text
            className="text-white font-montserratSemiBold"
            style={{ fontSize: RF(14) }}
          >
            Modo de Jogo
          </Text>

          <Text
            className="text-white font-montserratBlack"
            style={{
              fontSize: RF(26),
              width: RW(120),
            }}
          >
            {name}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
