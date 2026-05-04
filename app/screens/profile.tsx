import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
import { useProgress } from "@/contexts/ProgressContext";
import { RS, RW } from "@/theme";
import RedirectItem from "@/components/ui/Profile/RedirectItem";
import ChildInfo from "@/components/ui/Profile/ChildInfo";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  /** Contextos */
  const { showAlert } = useCustomAlert();
  const { user, logout } = useUser();
  const { progress } = useProgress();

  /** Itens de navegação */
  const itemsNavigation = [
    {
      icon: require("@/assets/icons/profile/character.png"),
      title: "Mudar Personagem",
      onPress: () => {},
    },
    {
      icon: require("@/assets/icons/profile/notification.png"),
      title: "Notificações",
      onPress: () => {},
    },
    {
      icon: require("@/assets/icons/profile/acessibility.png"),
      title: "Acessibilidade",
      onPress: () => router.push("/screens/acessibility"),
    }
  ]

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

  return (
    <ScrollView
      className="flex-1 bg-white" 
      style={{ padding: RW(30), gap: RS(20)}}
    >
      <View
        className="items-center" 
        style={{ gap: RS(20), paddingHorizontal: RW(40) }}
      >
        {/* Foto e informações do usuário */}
        {user && progress && (
          <ChildInfo
            name={user?.name || "Usuário"}
            profilePicture={user?.profilePicture}
            level={Math.floor(progress.points / 100)}
            progressLevel={progress.points % 100}
          />
        )}
        
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
          onPress={handleSair}>
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
    </ScrollView>
  );
}