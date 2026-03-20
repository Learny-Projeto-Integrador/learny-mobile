import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import ProgressBarMundo from "./ProgressBarMundo";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/types';
import { useNavigation } from "@react-navigation/native";
import { fontSizes, spacing, RW, RH, RS } from "@/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  image: ImageSourcePropType;
  name: string;
  description: string;
  num: number;
  progress: number;
  color: string;
  worldCode: string;
}

export default function WorldCard({ image, name, description, num, progress, color, worldCode } : Props) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        num === 1 ? navigation.navigate("world", { worldCode }) : null
      }
      activeOpacity={1}
      style={{
        width: "100%",
        aspectRatio: 524 / 182,
      }}
    >
      <ImageBackground
        source={image}
        style={{
          flex: 1,
          justifyContent: "center",
        }}
        imageStyle={{ borderRadius: 16 }} // opcional (pode remover se não quiser radius)
      >
        <View
          style={{
            width: "85%",
            height: "100%",
            justifyContent: "center",
            paddingLeft: RW(24),
          }}
        >
          {/* Descrição */}
          <Text
            className="font-montserratBold"
            style={{
              color: "#4C4C4C",
              fontSize: fontSizes.md,
            }}
          >
            {description}
          </Text>

          {/* Nome */}
          <Text
            className="font-montserratBlack"
            style={{
              color: "#3A3A3A",
              fontSize: fontSizes.xl,
              marginTop: -RH(4),
            }}
          >
            {name}
          </Text>

          {/* Mundo */}
          <Text
            className="font-montserratBold"
            style={{
              color: "#4C4C4C",
              fontSize: fontSizes.md,
              marginTop: -RH(4),
              marginBottom: RH(8),
            }}
          >
            Mundo-{num}
          </Text>

          {/* Progress */}
          <ProgressBarMundo
            progresso={progress.toLocaleString()}
            cor={color}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
