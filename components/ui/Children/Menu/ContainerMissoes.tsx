import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useApi } from "@/hooks/useApi";
import { imgsMissoes } from "@/constants/dadosFases";
import { useLoading } from "@/contexts/LoadingContext";

type MissaoDiaria = {
  nome: string;
  descricao: string;
};

export default function ContainerMissoes() {
  const [missoesDiarias, setMissoesDiarias] = useState<MissaoDiaria[] | null>(null);
  const { request } = useApi();
  const { showLoadingModal, hideLoadingModal } = useLoading();

  const fetchData = async () => {
    showLoadingModal();
    const result = await request({
      endpoint: "/criancas",
    });
    setMissoesDiarias(result.missoesDiarias ?? null);
    hideLoadingModal();
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
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
