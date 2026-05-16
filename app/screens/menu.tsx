import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/ui/Container";
import { RF, RH, RS, RW } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Shadow } from "react-native-shadow-2";

export default function MenuScreen() {
  const router = useRouter();

  /** Listagem dos botões do menu */
  const buttons = [
    {
      route: "/screens/diary",
      icon: require("@/assets/icons/menu/diary.png"),
    },
    {
      route: "/screens/profile",
      icon: require("@/assets/icons/menu/profile.png"),
    },
    {
      route: "/screens/ranking",
      icon: require("@/assets/icons/menu/ranking.png"),
    },
  ];

  return (
    <Container mode="customTop" colors={["#973e4a", "#4b85a1"]}>
      <View style={{ paddingHorizontal: RS(40), gap: RS(50) }}>
        {/* Título e botão de fechar */}
        <View
          className="flex-row items-center justify-center"
          style={{ marginHorizontal: RW(20) }}
        >
          <Text
            className="font-montserratBold"
            style={{ color: "#4C4C4C", fontSize: RF(30) }}
          >
            Atalhos
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: "absolute", right: 0 }}
          >
            <Image
              source={require("@/assets/icons/close.png")}
              style={{ width: RW(30), height: RW(30) }}
            />
          </TouchableOpacity>
        </View>

        {/* Botões do menu */}
        <LinearGradient
          colors={["#b25563", "#669bbb"]}
          className="flex-row justify-between items-center w-full"
          style={{ padding: RS(30), borderRadius: 50 }}
        >
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(button.route)}
              style={{ flexDirection: "row" }}
            >
              <Image
                source={button.icon}
                style={{ width: RW(60), height: RW(60) }}
              />
            </TouchableOpacity>
          ))}
        </LinearGradient>

        {/* Quadro de missões Diárias */}
        <Shadow
          distance={6}
          startColor="rgba(0,0,0,0.15)"
          offset={[0, 0]}
          style={{
            alignSelf: "stretch",
          }}
        >
          <View
            className="bg-white items-center"
            style={{
              borderRadius: 30,
              paddingHorizontal: RS(20),
              paddingVertical: RS(40),
            }}
          >
            <Text
              className="font-montserratBold text-center"
              style={{
                color: "#b5b5b5",
                fontSize: RW(20),
              }}
            >
              Missões Diárias
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={require("@/assets/images/missions/daily/one-phase.png")}
                style={{
                  width: RW(250),
                  aspectRatio: 378 / 103,
                  marginTop: RS(20),
                }}
              />
            </View>
          </View>
        </Shadow>
      </View>
    </Container>
  );
}
