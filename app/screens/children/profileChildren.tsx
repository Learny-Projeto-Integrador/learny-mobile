import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import GradientText from "@/components/ui/GradientText";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import ContainerAcessibilidade from "@/components/ui/Children/Profile/ContainerAcessibilidade";
import ContainerActionChildren from "@/components/ui/Children/Profile/ContainerActionChildren";
import { useLoading } from "@/contexts/LoadingContext";
import { useApi } from "@/hooks/useApi";
import Error from "@/components/ui/Error";
import { useCustomAlert } from "@/contexts/AlertContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "profileChildren">;

const { width, height } = Dimensions.get("window");

export default function ProfileChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { showLoadingModal, hideLoadingModal } = useLoading();
  const { request } = useApi();
  const { showAlert } = useCustomAlert();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    showLoadingModal();
    setError(null);

    const result = await request({
      endpoint: "/criancas",
    });

    if (result.error) {
      setError(result.message);
      hideLoadingModal();
      return null;
    }

    setData(result ?? null);
    hideLoadingModal();
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const atualizarAudio = async (novoValor: boolean) => {
    showLoadingModal();
    const result = await request({
      endpoint: "/criancas",
      method: "PUT",
      body: { 
        audio: novoValor,
      },
    })
    
    if (result && !result.error) {
      setData((prev: any) => ({ ...prev, audio: novoValor }));
    } else {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro ao atualizar o áudio!",
        message: result.message,
      });
    }
    hideLoadingModal();
  };

  const handleSair = () => {
    showAlert({
      icon: require("@/assets/icons/icon-alerta.png"),
      title: "Alerta",
      message: "Deseja mesmo sair?",
      dualAction: true,
      closeLabel: "Cancelar",
      redirectLabel: "Sair",
      onRedirect: () => navigation.replace("index")
    });
  };

  if (!data) return null;

  const { foto, nome, pontos, audio } = data;
  const nivel = Math.floor(pontos / 100);
  const progressoNivel = pontos % 100;

  return (
    <ScrollView style={styles.container}>
      {error && <Error error={error} onReload={fetchData} />}
      <View style={styles.containerDados}>
        <TouchableOpacity
          onPress={() => navigation.navigate("iconChildren")}
          style={{ flexDirection: "row" }}
        >
          <View style={{position: "relative"}}>
            <Image
              style={styles.foto}
              source={foto ? { uri: foto } : require("@/assets/images/logo.png")}
            />
            <Image
              style={{
              width: width * 0.07,
              height: width * 0.07,
              position: "absolute",
              bottom: width * 0.02,
              right: width * 0.02,
              borderRadius: 20,}}
              source={require("@/assets/icons/editar.png")}
            />
          </View>
        </TouchableOpacity>
        <View style={{ justifyContent: "center" }}>
          <View style={styles.containerNameChildren}>
            {nome.split(" ").map((parte: string, index: number) => (
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.viewVoltar}>
          <Image
            style={styles.iconVoltar}
            source={require("@/assets/icons/icon-voltar2.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerWidgets}>
        <ProgressBarLvl pontos={progressoNivel.toString()} progresso={progressoNivel} />
        <View style={{ gap: 10 }}>
          <ContainerAcessibilidade
            audioAtivo={audio}
            onChangeAudio={(novoValor) => atualizarAudio(novoValor)}
          />
          <ContainerActionChildren
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
          />
        </View>
        <TouchableOpacity style={styles.viewBtn} onPress={handleSair}>
          <Image
            style={styles.btn}
            source={require("@/assets/images/btn-sair.png")}
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
    marginTop: height * 0.04,
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
    marginTop: -height * 0.015,
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
