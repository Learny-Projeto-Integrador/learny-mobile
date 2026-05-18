import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Container from "@/components/ui/Container";
import { RF, RS, RW } from "@/theme";
import NotificationCard from "@/components/ui/Notifications/NotificationCard";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useCustomAlert } from "@/contexts/AlertContext";

type Notification = {
  _id: string;
  type: string;
  description: string;
  parent: {
    _id: string;
    name: string;
  };
};

const iconNotificationMap = {
  positive: require("@/assets/icons/notifications/happy.png"),
  love: require("@/assets/icons/notifications/heart.png"),
  comment: require("@/assets/icons/notifications/comment.png"),
};

export default function NotificationsScreen() {
  const router = useRouter();

  const { request } = useApi();
  const { showAlert } = useCustomAlert();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = async () => {
    const result = await request({
      endpoint: "/child/notifications",
      method: "GET",
    });

    if (result && !result.error) {
      setNotifications(result);
    } else {
      showAlert({
        icon: require("@/assets/icons/custom-alert/alert.png"),
        title: "Erro ao carregar dados!",
        message: result.message || "Erro ao carregar notificações",
      });
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Container mode="customTop" colors={["#973e4a", "#4b85a1"]}>
      <View style={{ paddingHorizontal: RS(40), gap: RS(50) }}>
        {/* Título */}
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

        {/* Lista */}
        <View style={{ gap: RS(26) }}>
          {notifications.map((notification, index) => (
            <NotificationCard
              key={index}
              icon={
                iconNotificationMap[
                  notification.type as keyof typeof iconNotificationMap
                ] || require("@/assets/icons/notifications/start.png")
              }
              label={notification.parent?.name || "Responsável"}
              description={notification?.description}
              isReaction={notification?.type !== "comment"}
            />
          ))}
        </View>
      </View>
    </Container>
  );
}
