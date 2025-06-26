import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "@/types";

import { useGetToken } from "@/hooks/useGetToken";
import GradientText from "@/components/ui/GradientText";
import CustomAlert from "@/components/ui/CustomAlert";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import ContainerAcessibilidade from "@/components/ui/Children/Profile/ContainerAcessibilidade";
import ContainerActionChildren from "@/components/ui/Children/Profile/ContainerActionChildren";
import { useLoadData } from "@/hooks/useLoadData";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "profileChildren">;

const { width, height } = Dimensions.get("window");

export default function ProfileChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { getToken } = useGetToken();

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const { loadData } = useLoadData();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await loadData("http://10.0.2.2:5000/criancas");
        setData(data ?? null);
      };
      fetchData();
    }, [])
  );

  const atualizarAudio = async (novoValor: boolean) => {
    try {
      const token = await getToken();
      await fetch("http://10.0.2.2:5000/criancas", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ audio: novoValor }),
      });
      setData((prev: any) => ({ ...prev, audio: novoValor }));
    } catch (e) {
      setAlertData({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message: `Erro ao atualizar o áudio: ${e}`,
      });
      setAlertVisible(true);
    }
  };

  const handleSair = () => {
    setAlertData({
      icon: require("@/assets/icons/icon-alerta.png"),
      title: "Alerta",
      message: "Deseja mesmo sair?",
      dual: true,
    });
    setAlertVisible(true);
  };

  if (!data) return null;

  const { foto, nome, pontos, audio } = data;
  const nivel = Math.floor(pontos / 100);
  const progressoNivel = pontos % 100;

  return (
    <ScrollView style={styles.container}>
      {alertData && (
        <CustomAlert
          icon={alertData.icon}
          visible={alertVisible}
          title={alertData.title}
          message={alertData.message}
          dualAction={alertData.dual}
          onClose={() => setAlertVisible(false)}
          onRedirect={() => {
            setAlertVisible(false);
            navigation.navigate("index");
          }}
          closeLabel="Cancelar"
          redirectLabel="Sair"
        />
      )}
      <View style={styles.containerDados}>
        <TouchableOpacity
          onPress={() => navigation.navigate("iconChildren")}
          style={{ flexDirection: "row" }}
        >
          <Image
            style={styles.foto}
            source={foto ? { uri: foto } : require("@/assets/images/logo.png")}
          />
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
        <ProgressBarLvl pontos={progressoNivel} progresso={progressoNivel} />
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
