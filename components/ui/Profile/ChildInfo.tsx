import { View, Text, TouchableOpacity, Image } from "react-native";
import GradientText from "@/components/ui/GradientText";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import { useRouter } from "expo-router";
import { RF, RS, RW } from "@/theme";

interface Props {
  name: string;
  profilePicture: string | null;
  level: number;
  progressLevel: number;
}

export default function ChildInfo({
  name,
  profilePicture,
  level,
  progressLevel,
}: Props) {
  const router = useRouter();

  return (
    <View style={{ gap: RS(20) }}>
      <View className="flex-row" style={{ gap: RS(20) }}>
        <Image
          style={{
            width: RW(120),
            height: RW(120),
            borderRadius: 30,
          }}
          source={
            profilePicture
              ? { uri: profilePicture }
              : require("@/assets/images/logo.png")
          }
        />

        <View className="justify-center" style={{ width: RW(120) }}>
          {name.split(" ").map((part: string, index: number) => (
            <GradientText
              color1="#EF5B6A"
              color2="#6CD2FF"
              key={index}
              style={{ fontFamily: "Montserrat_700Bold", fontSize: RF(34) }}
            >
              {part}
            </GradientText>
          ))}

          <Text
            className="font-montserratExtraBold"
            style={{ color: "#4c4c4c", fontSize: RF(20) }}
          >
            lvl{" "}
            <Text className="font-montserratBold" style={{ fontSize: RF(24) }}>
              {level}
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center"
          style={{ paddingTop: RS(20) }}
        >
          <Image
            style={{ width: RW(30), height: RW(30) }}
            source={require("@/assets/icons/back.png")}
          />
        </TouchableOpacity>
      </View>

      <ProgressBarLvl
        points={progressLevel?.toString() || "0"}
        progress={progressLevel || 0}
      />
    </View>
  );
}
