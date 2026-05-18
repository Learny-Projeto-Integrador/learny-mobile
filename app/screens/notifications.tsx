import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/ui/Container";
import { RF, RH, RS, RW } from "@/theme";
import NotificationCard from "@/components/ui/Notifications/NotificationCard";

export default function NotificationsScreen() {
  const router = useRouter();

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
            Notificações
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

        <View style={{ gap: RS(26) }}>
          <NotificationCard
            icon={require("@/assets/icons/notifications/start.png")}
            label="Inicio completo!"
            description="Você fez seu primeiro Login, parabéns! Vamos começar a aprender se divertindo!"
            isReaction={false}
          />

          <NotificationCard
            icon={require("@/assets/icons/notifications/heart.png")}
            label="Yummi"
            description="Parabéns filho, continue assim. Amo você"
            colors={["#EF5B6A", "#EF5B6A"]}
          />

          <NotificationCard
            icon={require("@/assets/icons/notifications/character.png")}
            label="Angryssaur"
            description="Vamos construir nossa jornada e combater monstros juntos. Let’s rock!"
            colors={["#946274", "#5c94b3"]}
          />
        </View>
      </View>
    </Container>
  );
}
