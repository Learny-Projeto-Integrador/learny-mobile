import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import GradientText from "@/components/ui/GradientText";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import ContainerAcessibilidade from "@/components/ui/Children/Profile/ContainerAcessibilidade";
import { useLoading } from "@/contexts/LoadingContext";
import { useApi } from "@/hooks/useApi";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function ProfileChildrenScreen() {
  const router = useRouter();
  
  const { user, setUser } = useUser();
  const { showLoadingModal, hideLoadingModal } = useLoading();
  const { request } = useApi();
  const { showAlert } = useCustomAlert();

  const handleLogout = async () => {
    try {
      setUser(null);
      await AsyncStorage.multiRemove(["user", "token"]);
      router.replace("/")
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  const atualizarAudio = async (novoValor: boolean) => {
    showLoadingModal();
    const result = await request({
      endpoint: "/child",
      method: "PUT",
      body: { 
        audio: novoValor,
      }
    })
    
    if (result && !result.error) {
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, audioAtivado: novoValor };
      });
    } else {
      if (result.status != 401) {
        showAlert({
          icon: require("@/assets/icons/custom-alert/alert.png"),
          title: "Erro ao atualizar o áudio!",
          message: result.message,
        });
      }
    }
    hideLoadingModal();
  };

  const handleSair = () => {
    showAlert({
      icon: require("@/assets/icons/custom-alert/alert.png"),
      title: "Alerta",
      message: "Deseja mesmo sair?",
      dualAction: true,
      closeLabel: "Cancelar",
      redirectLabel: "Sair",
      onRedirect: () => handleLogout()
    });
  };

  if (!user) return null;

  const { profilePicture, name, points, audioActive } = user;
  const nivel = Math.floor(points / 100);
  const progressoNivel = points % 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerDados}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
        >
          <View style={{position: "relative"}}>
            <Image
              style={styles.foto}
              source={profilePicture ? { uri: profilePicture } : require("@/assets/images/logo.png")}
            />
            <Image
              style={{
              width: width * 0.07,
              height: width * 0.07,
              position: "absolute",
              bottom: width * 0.02,
              right: width * 0.02,
              borderRadius: 20,}}
              source={require("@/assets/icons/profile/edit.png")}
            />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: "center" }}>
          <View style={styles.containerNameChildren}>
            {name.split(" ").map((parte: string, index: number) => (
              <GradientText
                color1="#EF5B6A"
                color2="#6CD2FF"
                key={index}
                style={styles.nameText}
              >
                {parte}
              </GradientText>
            ))}
            <Text style={styles.txt}>lvl <Text style={[styles.txt, {fontSize: width * 0.05,fontFamily: "Montserrat_700Bold"}]}>{nivel}</Text></Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.back()} style={styles.viewVoltar}>
          <Image
            style={styles.iconVoltar}
            source={require("@/assets/icons/back.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerWidgets}>
        <ProgressBarLvl pontos={progressoNivel.toString()} progresso={progressoNivel} />
        <View style={{ gap: 10 }}>
          <ContainerAcessibilidade
            audioAtivo={audioActive}
            onChangeAudio={(novoValor) => atualizarAudio(novoValor)}
          />
          {/* <ContainerActionChildren
            icon={require("@/assets/icons/icon-estatisticas.png")}
            title="Estatísticas"
          />
          <TouchableOpacity onPress={() => navigation.navigate("diary")}>
            <ContainerActionChildren
              icon={require("@/assets/icons/icon-quests.png")}
              title="Quests"
            />
          </TouchableOpacity>
          <ContainerActionChildren
            icon={require("@/assets/icons/icon-notificacoes.png")}
            title="Notificações"
          /> */}
        </View>
        <TouchableOpacity style={styles.viewBtn} onPress={handleSair}>
          <Image
            style={styles.btn}
            source={require("@/assets/images/profile/leave-btn.png")}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: width * 0.08,
    gap: width * 0.05,
  },
  containerDados: {
    flexDirection: "row",
    marginTop: height * 0.08,
    gap: width * 0.05,
  },
  foto: {
    width: width * 0.33,
    height: width * 0.33,
    borderRadius: 20,
  },
  viewVoltar: {
    alignItems: "center",
    paddingTop: height * 0.01,
  },
  iconVoltar: {
    width: width * 0.075,
    height: width * 0.075,
  },
  containerNameChildren: {
    width: width * 0.35,
    justifyContent: "center",
  },
  nameText: {
    fontSize: width * 0.07,
    fontFamily: "Montserrat_800ExtraBold",
  },
  txt: {
    color: "#4c4c4c",
    fontSize: width * 0.04,
    fontFamily: "Montserrat_400Regular",
  },
  containerWidgets: {
    width: "100%",
    marginTop: height * 0.03,
    gap: width * 0.04,
    alignItems: "center",
  },
  viewBtn: {
    flexDirection: "row",
    marginTop: height * 0.02,
    marginBottom: height * 0.04,
  },
  btn: {
    width: width * 0.15,
    height: width * 0.15,
    aspectRatio: 62 / 62,
  },
});
