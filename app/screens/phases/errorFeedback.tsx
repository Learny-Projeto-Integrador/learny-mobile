import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import GradientText from "@/components/ui/GradientText";
import { useRouter } from "expo-router";
import { RF, RH, RS, RW } from "@/theme";
import { useFeedbackContext } from "@/contexts/FeedbackContext";
import { Shadow } from "react-native-shadow-2";

export default function ErrorFeedbackScreen() {
  const router = useRouter();

  const { feedback } = useFeedbackContext();

  const handleConfirm = () => {
    router.push("/screens/phases/fail");
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      style={{ gap: RS(30), paddingHorizontal: RS(50) }}
    >

      <View style={{ marginTop: RS(70) }}>
        <GradientText
          color1="#EF5B6A"
          color2="#6CD2FF"
          style={{
            fontFamily: "Montserrat_900Black",
            fontSize: RF(34),
            textAlign: "center",
          }}
        >
          Let's
        </GradientText>
        <GradientText
          color1="#EF5B6A"
          color2="#6CD2FF"
          style={{
            fontFamily: "Montserrat_900Black",
            fontSize: RF(34),
            textAlign: "center",
            marginTop: -RS(10),
          }}
        >
          Remember
        </GradientText>
      </View>

      <View
        className="w-full"
        style={{
          marginVertical: RS(10),
        }}
      >
        <Shadow
          distance={8}
          startColor="rgba(0,0,0,0.25)"
          offset={[1, 4]}
          style={{
            alignSelf: "stretch",
          }}
        >
          <View
            className="flex-row items-center justify-center bg-[#4c4c4c]"
            style={{
              padding: RS(16),
              borderRadius: RW(30),
            }}
          >
            <Text
              className="font-montserratSemiBold text-center text-white"
              style={{
                width: RW(200),
                fontSize: RF(22),
              }}
            >
              {feedback?.label}
            </Text>
          </View>
        </Shadow>
      </View>

      {feedback?.content}

      <Text
        className="font-montserratSemiBold text-center"
        style={{
          fontSize: RF(22),
          marginTop: RS(30),
          color: "#4c4c4c",
        }}
      >
        Você está indo bem, continue e tente novamente
      </Text>

      <View
        className="w-full"
        style={{
          paddingHorizontal: RS(60),
          marginTop: RS(40),
        }}
      >
        <Shadow
          distance={8}
          startColor="rgba(0,0,0,0.25)"
          offset={[0, 0]}
          style={{
            alignSelf: "stretch",
          }}
        >
          <TouchableOpacity
            onPress={handleConfirm}
            className="flex-row items-center justify-center bg-white"
            style={{
              padding: RS(14),
              borderRadius: RW(60),
            }}
          >
            <Text
              className="font-montserratSemiBold text-center"
              style={{
                width: RW(200),
                fontSize: RF(22),
                color: "#4c4c4c",
              }}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </Shadow>
      </View>
    </ScrollView>
  );
}
