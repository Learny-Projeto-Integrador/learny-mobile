import { View, Text, Image } from "react-native";
import { RW, RH, RF, RS } from "@/theme";
import ProgressBarLvl from "../ProgressBarLvl";
import ProgressBarCharacter from "./ProgressBarCharacter";

interface Props {
  name: string;
  image: string;
  level: number;
  characterPoints: number; // %
  effect: string;
  tags: string[];
}

export default function SelectedCharacter({
  name,
  image,
  level,
  characterPoints,
  effect,
  tags,
}: Props) {
  return (
    <View
      className="flex-row bg-white"
      style={{
        paddingVertical: RS(16),
        paddingRight: RS(30),
        gap: RS(12),
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
              label={`${characterPoints}%`}
              progress={characterPoints}
            />
          </View>
        </View>

        <View className="items-center justify-center" style={{ gap: RS(12) }}>
          {/* EFFECT */}
          <Text
            className="font-montserratSemiBold text-gray-500"
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
    </View>
  );
}
