import { View, Text, Image, TouchableOpacity } from "react-native";
import { RW, RH, RF, RS } from "@/theme";
import ProgressBarCharacter from "./ProgressBarCharacter";

interface Props {
  name: string;
  image: string;
  level: number;
  progressLevel: number;
  effect: string;
  tags: string[];
  onPress?: () => void;
}

export default function SelectedCharacter({
  name,
  image,
  level,
  progressLevel,
  effect,
  tags,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row bg-white items-center"
      style={{
        paddingVertical: RS(16),
        paddingRight: RS(30),
        gap: RS(8),
        borderWidth: 2,
        borderColor: "#E5E7EB",
        borderRadius: RW(20),
      }}
    >
      {/* IMAGE */}
      <Image
        source={{ uri: image }}
        resizeMode="contain"
        style={{
          width: RW(120),
          height: RW(100),
        }}
      />

      <View style={{ gap: RS(12), flex: 1 }}>
        {/* HEADER */}
        <View className="flex-row justify-between items-end">
          <View>
            <Text
              className="font-montserratMedium text-gray-400"
              style={{ fontSize: RF(14) }}
            >
              Selected
            </Text>
            <Text
              className="font-montserratBold text-gray-700"
              style={{ fontSize: RF(18) }}
            >
              {name}
            </Text>
          </View>

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
        </View>

        {/* CONTENT */}
        <View className="flex-row items-center" style={{ gap: RS(12) }}>
          {/* INFO */}
          <View style={{ flex: 1, gap: RS(6) }}>
            {/* PROGRESS BAR */}
            <ProgressBarCharacter
              label={`${progressLevel < 100 ? progressLevel : "100"}%`}
              progress={progressLevel}
            />
          </View>
        </View>

        <View className="items-center justify-center" style={{ gap: RS(12) }}>
          {/* EFFECT */}
          <Text
            className="font-montserratSemiBold text-gray-500 text-center"
            style={{ fontSize: RF(12) }}
          >
            {effect}
          </Text>
          {/* TAGS */}
          <View className="flex-row" style={{ gap: RS(8) }}>
            {tags.map((tag, index) => (
              <View
                key={index}
                className="bg-[#4c4c4c]"
                style={{
                  paddingHorizontal: RS(10),
                  paddingVertical: RS(4),
                  borderRadius: RW(8),
                }}
              >
                <Text
                  className="font-montserratMedium text-white"
                  style={{ fontSize: RF(11) }}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
