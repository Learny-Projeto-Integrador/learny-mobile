import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContainerActionChildren from "@/components/ui/ContainerActionChildren";
import ContainerAcessibilidade from "@/components/ui/ContainerAcessibilidade";
import GradientText from "@/components/ui/GradientText";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foto, setFoto] = useState("");
  const [nome, setNome] = useState("");
  const [pontos, setPontos] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [progressoNivel, setProgressoNivel] = useState(0);
  const [audio, setAudio] = useState(false);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (e) {
      console.error("Erro ao buscar o token", e);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();

      const res = await fetch("http://10.0.2.2:5000/criancas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setFoto(result.foto);
        setNome(result.nome)
        setPontos(result.pontos);
        setNivel(Math.floor(pontos/100))
        setProgressoNivel(pontos % 100)
        setAudio(result.audio)
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const atualizarAudio = async (audio: boolean, novoValor: boolean) => {
    const token = await getToken();
    try {
      await fetch("http://10.0.2.2:5000/criancas", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ audio: novoValor }),
      });
      setAudio(novoValor);
    } catch (e) {
      console.error("Erro ao atualizar o audio", e);
    }
  };

  const handleSair = () => {
    Alert.alert("Alerta", "Deseja mesmo sair?", [
      { text: "Cancelar" },
      { text: "Sair", onPress: () => navigation.navigate("index") },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerDados}>
        <TouchableOpacity onPress={()=> navigation.navigate("iconChildren")} style={{flexDirection: "row"}}>
          <Image
            style={styles.foto}
            source={
              foto
                ? { uri: foto }
                : require("../../assets/images/joana.png")
            }
          />
        </TouchableOpacity>
        <View style={{ justifyContent: "center", gap: 10 }}>
          <View style={styles.containerNameChildren}>
            {nome
              ? nome.split(" ").map((nome, index) => (
                  <GradientText color1="#EF5B6A" color2="#6CD2FF" key={index} style={styles.nameText}>
                    {nome}
                  </GradientText>
                ))
              : ""}
          </View>
          <View style={{ marginTop: width * 0.1, flexDirection: "row" }}>
            <Text style={styles.txt}>lvl {nivel}</Text>
          </View>
        </View>
        <View style={styles.viewVoltar}>
          <Image
            style={styles.iconVoltar}
            source={require("../../assets/images/icon-voltar2.png")}
          />
        </View>
      </View>
      <View style={styles.containerWidgets}>
        <ProgressBarLvl pontos={pontos} progresso={progressoNivel} />
        <View style={{ gap: 10 }}>
          <ContainerAcessibilidade audioAtivo={audio} onChangeAudio={(novoValor) => atualizarAudio(audio, novoValor)} />
          <ContainerActionChildren icon={require("../../assets/images/icon-estatisticas.png")} title="Estatísticas" />
          <ContainerActionChildren icon={require("../../assets/images/icon-quests.png")} title="Quests" />
          <ContainerActionChildren icon={require("../../assets/images/icon-notificacoes.png")} title="Notificações" />
        </View>
          <TouchableOpacity style={styles.viewBtn} onPress={handleSair}>
            <Image
              style={styles.btn}
              source={require("../../assets/images/btn-sair.png")}
            />
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: width * 0.08,
    gap: width * 0.05,
  },
  containerDados: {
    display: "flex",
    height: "auto",
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
    position: "relative",
    alignItems: "center",
    paddingLeft: width * 0.09,
    paddingTop: height * 0.01
  },
  iconVoltar: {
    width: width * 0.075,
    height: width * 0.075,
  },
  containerNameChildren: {
    height: width * 0.08,
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
