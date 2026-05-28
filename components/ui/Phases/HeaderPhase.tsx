import { View, Image, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { RF, RS, RW } from "@/theme";
import { Shadow } from "react-native-shadow-2";

type Props = {
  image: any;
  title: string;
  description: string;
  question?: string;
  color: string;
  onPressInfo?: () => void;
  onBack?: () => void;
};

export default function HeaderPhase({
  image,
  title,
  description,
  question,
  color,
  onPressInfo,
  onBack,
}: Props) {
  return (
    <View style={{ marginBottom: RS(26) }}>
      <View
        className="flex-row w-full items-center justify-between bg-white"
        style={{ marginTop: RS(50), marginBottom: RS(20), gap: RS(34) }}
      >
        <Shadow
          distance={4}
          startColor="rgba(0,0,0,0.25)"
          offset={[2, 3]}
          style={{
            alignSelf: "stretch",
          }}
        >
          <View
            className="items-center justify-center"
            style={{
              backgroundColor: title == "Review Phase" ? "#4C4C4C" : color,
              width: RW(110),
              height: RW(110),
              borderRadius: RW(30),
            }}
          >
            <Image
              source={image && image}
              style={{ tintColor: "#fff", transform: [{ scale: 1.3 }] }}
            />
          </View>
        </Shadow>

        <Text
          className="font-montserratExtraBold flex-1"
          style={{ fontSize: RF(30), color: color }}
        >
          {title}
        </Text>

        <View
          className="items-center self-start"
          style={{ gap: RS(16), marginTop: RS(10) }}
        >
          <TouchableOpacity onPress={onBack}>
            <Image
              style={{ width: RW(28), height: RW(28), aspectRatio: 1 / 1 }}
              source={require("@/assets/icons/back.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressInfo}>
            <Image
              style={{ width: RW(20), height: RW(20), aspectRatio: 1 / 1 }}
              source={require("@/assets/icons/phases/info-transparent.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Shadow
        distance={3}
        startColor="rgba(0,0,0,0.25)"
        offset={[1, 3]}
        style={{ alignSelf: "stretch" }}
      >
        <View
          className="w-full items-center justify-center bg-[#4c4c4c]"
          style={{
            paddingVertical: RS(30),
            paddingHorizontal: RS(10),
            borderRadius: RW(26),
          }}
        >
          <Text
            className="font-montserratBold text-white text-center"
            style={{ fontSize: RF(20) }}
          >
            {description}
          </Text>
        </View>
      </Shadow>

      {question && (
        <View
          className="items-center justify-center"
          style={{
            backgroundColor: color,
            marginHorizontal: RS(80),
            padding: RS(10),
            borderBottomLeftRadius: RW(10),
            borderBottomRightRadius: RW(10),
          }}
        >
          <Text
            className="font-montserratBold text-white"
            style={{ fontSize: RF(20) }}
          >
            {question.toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
}
