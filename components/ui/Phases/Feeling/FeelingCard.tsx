import {
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { RF, RH, RW } from "@/theme";

type Props = {
  text: string;
  color: string;
  onPress?: () => void;
};

export default function FeelingCard({ text, color, onPress }: Props) {

  return (
    <TouchableOpacity
      style={{ flexDirection: "row" }}
      onPress={onPress}
      activeOpacity={1}
    >
      <View
        style={{
          backgroundColor: color || "#ccc",
          width: RW(100),
          alignItems: "center",
          justifyContent: "center",
          height: RH(100),
          borderRadius: RW(30),
          elevation: 3,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: RF(22),
            fontFamily: "Montserrat_700Bold",
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
