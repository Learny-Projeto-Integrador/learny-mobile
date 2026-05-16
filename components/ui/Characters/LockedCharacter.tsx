import { View, Text, Image } from "react-native";
import { RW, RH, RF, RS } from "@/theme";

interface Props {
  image: string;
  description: string;
  tags: string[];
}

export default function LockedCharacter({ image, description, tags }: Props) {
  return (
    <View
      className="flex-row bg-white items-center"
      style={{
        paddingVertical: RS(16),
        paddingRight: RS(30),
        gap: RS(8),
        borderWidth: 2,
        borderColor: "#4c4c4c",
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
          tintColor: "rgba(0,0,0,0.5)"
        }}
      />

      <View style={{ gap: RS(12), flex: 1 }}>
        {/* HEADER */}
        <View className="flex-row justify-between items-end">
          <Text
            className="font-montserratBold text-gray-700"
            style={{ fontSize: RF(18) }}
          >
            ????
          </Text>
        </View>

        <View className="items-center justify-center" style={{ gap: RS(12) }}>
          {/* EFFECT */}
          <Text
            className="font-montserratSemiBold text-gray-500 text-center"
            style={{ fontSize: RF(12) }}
          >
            {description}
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
