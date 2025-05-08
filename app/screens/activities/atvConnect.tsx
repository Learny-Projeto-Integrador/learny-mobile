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
import type { RootStackParamList } from "../../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContainerActionChildren from "@/components/ui/ContainerActionChildren";
import ContainerAcessibilidade from "@/components/ui/ContainerAcessibilidade";
import GradientText from "@/components/ui/GradientText";
import ContainerEmotion from "@/components/ui/ContainerEmotion";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AtvConnectScreen() {
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
        setNome(result.nome);
        setPontos(result.pontos);
        setNivel(Math.floor(pontos / 100));
        setProgressoNivel(pontos % 100);
        setAudio(result.audio);
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
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.foto}
            source={
              foto ? { uri: foto } : require("../../../assets/images/watch.png")
            }
          />
        </View>
        <View style={{ justifyContent: "center", gap: 10 }}>
          <View style={styles.containerNamePhase}>
            <Text style={styles.txt}>Watch &</Text>
            <Text style={[styles.txt, { marginTop: -height * 0.01 }]}>
            Match
            </Text>
          </View>
        </View>
        <View style={styles.viewVoltar}>
          <Image
            style={styles.iconVoltar}
            source={require("../../../assets/images/icon-voltar2.png")}
          />
          <Image
            style={styles.iconInfo}
            source={require("../../../assets/images/icon-info-transparente.png")}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: height * 0.01 }}>
        <ImageBackground
          source={require("../../../assets/images/a.png")}
          style={styles.retangulo}
        >
          <Text style={styles.txtTipoFase}>Ache as cartas correspondentes</Text>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: width * 0.3,
          justifyContent: "center",
          marginTop: height * 0.02,
        }}
      >
        <View style={{gap: height * 0.03}}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/cards/card-macaco-connect.png")}
              style={styles.card}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/cards/card-cavalo-connect.png")}
              style={styles.card}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/cards/card-cobra-connect.png")}
              style={styles.card}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/cards/card-passaro-connect.png")}
              style={styles.card}
            />
          </View>
        </View>
        <View style={{gap: height * 0.03}}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/cards/card-macaco-connect.png")}
              style={styles.card}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/cards/card-cavalo-connect.png")}
              style={styles.card}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/cards/card-cobra-connect.png")}
              style={styles.card}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/images/cards/card-passaro-connect.png")}
              style={styles.card}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: height * 0.01,
          gap: width * 0.02
        }}
      >
        <Image
          source={require("../../../assets/images/icon-dica.png")}
          style={styles.iconConfirmar}
        />
        <Image
          source={require("../../../assets/images/icon-confirmar-vermelho.png")}
          style={styles.iconConfirmar}
        />
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
    gap: width * 0.5,
  },
  containerDados: {
    display: "flex",
    height: "auto",
    flexDirection: "row",
    marginTop: height * 0.03,
    gap: width * 0.05,
  },
  foto: {
    width: width * 0.33,
    aspectRatio: 139 / 129,
  },
  viewVoltar: {
    position: "relative",
    alignItems: "center",
    paddingLeft: width * 0.01,
    paddingTop: height * 0.01,
    gap: height * 0.015,
  },
  iconVoltar: {
    width: width * 0.075,
    height: width * 0.075,
  },
  iconInfo: {
    width: width * 0.06,
    height: width * 0.06,
  },
  containerNamePhase: {
    justifyContent: "center",
  },
  txt: {
    color: "#6CD2FF",
    fontSize: width * 0.075,
    fontFamily: "Montserrat_800ExtraBold",
  },
  retangulo: {
    width: width * 0.87,
    aspectRatio: 350 / 85,
    alignItems: "center",
    justifyContent: "center",
  },
  txtTipoFase: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.058,
    fontFamily: "Montserrat_500Medium",
  },
  iconConfirmar: {
    width: width * 0.1,
    aspectRatio: 1 / 1,
  },
  card: {
    width: width * 0.2,
    aspectRatio: 1 / 1,
  },
});
