import { Image, Text, TouchableOpacity, View } from "react-native";
import GradientText from "@/components/ui/GradientText";
import { useRouter } from "expo-router";
import Container from "@/components/ui/Container";
import { RF, RH, RS, RW } from "@/theme";

export default function DiaryScreen() {
  const router = useRouter();

  return (
    <Container
      mode="customTop"
      colors={["#973e4a", "#4b85a1"]}
    >
      <View style={{ paddingHorizontal: RS(40), gap: RS(30) }}>
        {/* Título e botão de fechar */}
        <View 
          className="flex-row items-center justify-center"
          style={{ marginHorizontal: RW(20) }}
        >
          <Text
            className="font-montserratBold"
            style={{ color:"#4C4C4C", fontSize: RF(30)}}
          >
            Diário
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: "absolute", right: 0 }}
          >
            <Image
              source={require("@/assets/icons/back.png")}
              style={{ width: RW(30), height: RW(30) }}
            />
          </TouchableOpacity>
        </View>

        {/* <GradientText
          color1="#946274"
          color2="#5c94b3"
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: RF(30),
            textAlign: "center",
          }}
        >
          Missões Concluídas
        </GradientText> */}
      </View>
    </Container>
  );
}
