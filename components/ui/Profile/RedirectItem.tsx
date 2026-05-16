import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { RF, RS, RW } from "@/theme";
import { Shadow } from "react-native-shadow-2";

interface Props {
  title: string;
  icon: any;
  onPress?: () => void;
}

export default function RedirectItem({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Shadow
        distance={8}
        startColor="rgba(0,0,0,0.15)"
        offset={[0, 0]}
        style={{
          alignSelf: "stretch",
        }}
      >
        <View
          className="flex-row items-center bg-white"
          style={{
            width: RW(300),
            paddingHorizontal: RS(40),
            paddingVertical: RS(24),
            gap: RS(20),
            borderRadius: 70,
          }}
        >
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
      </Shadow>
    </TouchableOpacity>
  );
}
