import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
import { useProgress } from "@/contexts/ProgressContext";
import { RH, RS, RW } from "@/theme";
import RedirectItem from "@/components/ui/Profile/RedirectItem";
import ChildInfo from "@/components/ui/Profile/ChildInfo";
import { useRouter } from "expo-router";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import SelectedCharacter from "@/components/ui/Characters/SelectedCharacter";
import { useEffect, useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";

export default function ProfileScreen() {
  const router = useRouter();

  /** Itens de navegação */
  const itemsNavigation = [
    {
      icon: require("@/assets/icons/profile/character.png"),
      title: "Mudar Personagem",
      onPress: () => {
        router.push("/screens/characters");
      },
    },
    {
      icon: require("@/assets/icons/profile/notification.png"),
      title: "Notificações",
      onPress: () => {
        router.push("/screens/notifications");
      },
    },
    {
      icon: require("@/assets/icons/profile/acessibility.png"),
      title: "Acessibilidade",
      onPress: () => router.push("/screens/acessibility"),
    },
  ];

  /** Contextos */
  const { showAlert } = useCustomAlert();
  const { user, logout } = useUser();
  const { progress } = useProgress();
  const { selectedCharacter, getCharacters } = useCharacters();

  /**
   * Exibe alerta de confirmação para encerrar sessão
   */
  const handleSair = () => {
    showAlert({
      icon: require("@/assets/icons/custom-alert/alert.png"),
      title: "Alerta",
      message: "Deseja mesmo sair?",
      dualAction: true,
      closeLabel: "Cancelar",
      redirectLabel: "Sair",
      onRedirect: () => logout(),
    });
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-white"
      style={{ paddingVertical: RS(60), paddingHorizontal: RS(50) }}
    >
      <View style={{ gap: RS(24) }}>
        {/* Foto e informações do usuário */}
        {user && (
          <ChildInfo
            name={user?.name || "Usuário"}
            profilePicture={user?.profilePicture}
            level={progress ? Math.floor(progress.points / 100) : 0}
          />
        )}

        {progress && (
          <ProgressBarLvl
            points={(progress.points % 100).toString() || "0"}
            progress={progress.points % 100 || 0}
          />
        )}
      </View>

      <View
        className="items-center"
        style={{ gap: RS(30), marginVertical: RS(40) }}
      >
        {selectedCharacter && (
          <SelectedCharacter
            level={selectedCharacter?.level}
            characterPoints={selectedCharacter?.characterPoints}
            name={selectedCharacter?.name}
            image={selectedCharacter?.image}
            effect={selectedCharacter?.effect}
            tags={selectedCharacter?.tags}
          />
        )}
      </View>

      <View className="items-center" style={{ gap: RS(30) }}>
        {/* Botões de navegação */}
        {itemsNavigation.map((item, index) => (
          <RedirectItem
            key={index}
            icon={item.icon}
            title={item.title}
            onPress={item.onPress}
          />
        ))}
        {/* Sair do perfil */}
        <TouchableOpacity
          className="flex-row"
          style={{ marginTop: RS(10), marginBottom: RS(16) }}
          onPress={handleSair}
        >
          <Image
            style={{
              width: RW(55),
              height: RW(55),
              aspectRatio: 62 / 62,
            }}
            source={require("@/assets/images/profile/leave-btn.png")}
          />
        </TouchableOpacity>
      </View>

      <View className="bg-white" style={{ height: RH(120) }} />
    </ScrollView>
  );
}
