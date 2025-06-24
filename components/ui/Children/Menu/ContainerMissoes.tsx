import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetToken } from "@/hooks/useGetToken";

type MissaoDiaria = {
  nome: string;
  descricao: string;
};

const imgsMissoes: Record<string, ImageSourcePropType> = {
  "uma fase": require("@/assets/images/diarias/diaria-uma-fase.png"),
  "fase connect": require("@/assets/images/diarias/diaria-ligar.png"),
  "fase listening": require("@/assets/images/diarias/diaria-escuta.png"),
  "fase feeling": require("@/assets/images/diarias/diaria-emocoes.png"),
  "fase memoria": require("@/assets/images/diarias/diaria-memoria.png"),
};

export default function ContainerMissoes() {
  const [missoesDiarias, setMissoesDiarias] = useState<MissaoDiaria[] | null>(
    null
  );
  const { getToken } = useGetToken();

  const loadData = async () => {
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
        setMissoesDiarias(result.missoesDiarias);
      } else {
        alert(result.error);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <ImageBackground
      source={require("@/assets/images/retangulo-sombra4.png")}
      style={styles.container}
    >
      <Text style={styles.title}>Missões Diárias</Text>
      {missoesDiarias
        ? missoesDiarias.map((missao, index) => (
            <View key={index} style={{ flexDirection: "row", gap: 10 }}>
              <Image source={imgsMissoes[missao.nome]} style={styles.missao} />
            </View>
          ))
        : null}
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.83,
    aspectRatio: 356 / 399, // largura / altura da imagem original
    alignItems: "center",
    paddingVertical: height * 0.05,
  },
  title: {
    color: "#b5b5b5",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.05,
    textAlign: "center",
  },
  missao: {
    width: width * 0.68,
    aspectRatio: 378 / 103,
    marginTop: height * 0.02,
  },
});
