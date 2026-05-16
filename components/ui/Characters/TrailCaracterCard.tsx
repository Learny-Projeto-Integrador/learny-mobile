import { View, Text, Image, TouchableOpacity } from "react-native";
import { RW, RF, RS, RH } from "@/theme";
import { Shadow } from "react-native-shadow-2";

interface Props {
  name: string;
  image: string;
  level: number;
  onPress?: () => void;
}

export default function TrailCharacterCard({
  name,
  image,
  level,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row bg-white items-center justify-between"
      style={{
        paddingVertical: RS(16),
        paddingRight: RS(30),
        gap: RS(8),
        borderWidth: 2,
        borderColor: "#E5E7EB",
        borderRadius: RW(20),
      }}
    >
      <View className="flex-row items-center" style={{ gap: RS(20) }}>
        {/* IMAGE */}
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={{
            width: RW(100),
            height: RW(80),
          }}
        />

        <View>
          <Text
            className="font-montserratMedium text-yellow-500"
            style={{ fontSize: RF(20) }}
          >
            Lv.
            <Text
              className="font-montserratExtraBold"
              style={{ fontSize: RF(26) }}
            >
              {level.toString().padStart(2, "0")}
            </Text>
          </Text>
          <Text
            className="font-montserratBold"
            style={{ fontSize: RF(22), color: "#4c4c4c" }}
          >
            {name}
          </Text>
        </View>
      </View>

      <Shadow
        distance={6}
        startColor={"rgba(0,0,0,0.20)"}
        offset={[0, 0]}
        style={{
          borderRadius: 100,
        }}
      >
        <View
          className="items-center justify-center bg-white"
          style={{
            width: RW(40),
            height: RW(40),
            padding: RS(10),
            borderRadius: 100,
          }}
        >
          <Image
            source={require("@/assets/icons/change.png")}
            resizeMode="contain"
            style={{
              width: RW(20),
              height: RW(20),
            }}
          />
        </View>
      </Shadow>
    </TouchableOpacity>
  );
}
