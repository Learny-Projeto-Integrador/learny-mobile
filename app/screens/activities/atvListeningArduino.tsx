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

export default function AtvListeningArduinoScreen() {
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
            <Text style={styles.txt}>Listen &</Text>
            <Text style={[styles.txt, { marginTop: -height * 0.01 }]}>
              Answer
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
          <Text style={styles.txtTipoFase}>
          Ouça o nome e encontre ele escrito
          </Text>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: width * 0.05,
          marginVertical: height * 0.02,
        }}
      >
        <View style={{flexDirection: "row"}}>
          <Image
            source={require("../../../assets/images/som-vermelho-grande.png")}
            style={styles.som}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: height * 0.02,
          marginTop: height * 0.02,
        }}
      >
        <Text style={styles.txtPergunta}>Que animal é esse?</Text>
        <View style={{ flexDirection: "row", gap: width * 0.05 }}>
          <View style={styles.retanguloAnimal}>
            <Text style={styles.txtEmocao}>Dog</Text>
          </View>
          <View style={styles.retanguloAnimal}>
            <Text style={styles.txtEmocao}>Cat</Text>
          </View>
          <View style={styles.retanguloAnimal}>
            <Text style={styles.txtEmocao}>Bird</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: height * 0.16,
        }}
      >
        <Image
          source={require("../../../assets/images/icon-dica.png")}
          style={styles.iconDica}
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
    color: "#EF5B6A",
    fontSize: width * 0.075,
    fontFamily: "Montserrat_800ExtraBold",
  },
  retangulo: {
    width: width * 0.87,
    aspectRatio: 350 / 85,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.04,
  },
  txtTipoFase: {
    color: "#fff",
    textAlign: "center",
    fontSize: width * 0.055,
    fontFamily: "Montserrat_500Medium",
  },
  img: {
    marginTop: height * 0.02,
    width: width * 0.8,
    aspectRatio: 350 / 257,
  },
  retanguloAnimal: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    padding: width * 0.06,
    borderRadius: 20,
  },
  retanguloColocar: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    width: width * 0.23,
    height: width * 0.23,
    borderRadius: 20,
  },
  txtPergunta: {
    color: "#4c4c4c",
    textAlign: "center",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  txtEmocao: {
    color: "#4c4c4c",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  iconDica: {
    width: width * 0.1,
    aspectRatio: 49 / 67,
  },
  som: {
    width: width * 0.8,
    aspectRatio: 350/112
  }
});
