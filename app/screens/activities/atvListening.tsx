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
import HeaderFase from "@/components/ui/HeaderFase";
import SoundCard from "@/components/ui/SoundCard";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AtvListeningScreen() {
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

  return (
    <ScrollView style={styles.container}>
      <HeaderFase
        image={require("../../../assets/images/listen.png")}
        title="Listen & Answer"
        description="Ouça o nome e encontre ele escrito"
        color="#EF5B6A"
        onReturn={() => navigation.navigate("world")}
      />
      <View style={styles.containerSounds}>
        <SoundCard
          id="1"
          image={require("../../../assets/images/som-vermelho.png")}
          source={require("../../../assets/audios/monkey.wav")}
        />
        <SoundCard
          id="2"
          image={require("../../../assets/images/som-amarelo.png")}
          source={require("../../../assets/audios/bird.wav")}
        />
        <SoundCard
          id="3"
          image={require("../../../assets/images/som-azul.png")}
          source={require("../../../assets/audios/monkey.wav")}
        />
      </View>
      <View
        style={styles.viewQuadrados}
      >
        <View style={[styles.quadradoColocar, {borderColor: "#EF5B6A"}]} />
        <View style={[styles.quadradoColocar, {borderColor: "#FFB300"}]} />
        <View style={[styles.quadradoColocar, {borderColor: "#6CD2FF"}]} />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: height * 0.02,
          marginTop: height * 0.02,
        }}
      >
        <Text style={styles.txtPergunta}>Mova o animal do som</Text>
        <View style={{ flexDirection: "row", gap: width * 0.05 }}>
          <View style={styles.quadradoAnimal}>
            <Text style={styles.txtAnimal}>Dog</Text>
          </View>
          <View style={styles.quadradoAnimal}>
            <Text style={styles.txtAnimal}>Cat</Text>
          </View>
          <View style={styles.quadradoAnimal}>
            <Text style={styles.txtAnimal}>Bird</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: height * 0.015,
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
  containerSounds: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.05,
    marginVertical: height * 0.02,
  },
  viewQuadrados: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.06,
  },
  quadradoColocar: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    width: width * 0.23,
    height: width * 0.23,
    borderRadius: 30,
  },
  txtPergunta: {
    color: "#4c4c4c",
    textAlign: "center",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  quadradoAnimal: {
    borderWidth: 5,
    borderColor: "#4c4c4c",
    width: width * 0.23,
    height: width * 0.23,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  txtAnimal: {
    color: "#4c4c4c",
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  iconDica: {
    width: width * 0.1,
    aspectRatio: 49 / 67,
  },
});
