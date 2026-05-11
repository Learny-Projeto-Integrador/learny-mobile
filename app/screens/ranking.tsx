import {
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useCallback } from "react";
import PodiumCard from "@/components/ui/Ranking/PodiumCard";
import OtherRanking from "@/components/ui/Ranking/OtherRanking";
import { useFocusEffect } from "@react-navigation/native";
import { useApi } from "@/hooks/useApi";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useRouter } from "expo-router";
import Container from "@/components/ui/Container";
import { RF, RH, RS, RW } from "@/theme";
import ModalInfo from "@/components/ui/ModalInfo";

export default function RankingScreen() {
  const router = useRouter();

  /** Hook de comunicação com a API */
  const { request } = useApi();

  /** Contexto de alertas */
  const { showAlert } = useCustomAlert();

  /** Estados */
  const [ranking, setRanking] = useState([{}]);
  const [infoVisible, setInfoVisible] = useState(false);

  /**
   * Carrega o ranking das crianças
   */
  const loadRanking = async () => {
    const result = await request({
      endpoint: "/children/ranking",
    });

    if (result && !result.error) {
      setRanking(result);
    } else {
      showAlert({
        icon: require("@/assets/icons/custom-alert/alert.png"),
        title: "Erro ao buscar ranking!",
        message: result.message,
        dualAction: true,
        closeLabel: "OK",
        redirectLabel: "Tentar Novamente",
        onRedirect: () => loadRanking(),
      });
    }
  };

  /**
   * Efeito para carregar o ranking toda vez que a tela for focada
   */
  useFocusEffect(
    useCallback(() => {
      loadRanking();
    }, []),
  );

  /** Processa items do ranking e divide entre pódio e outros utilizando slice */
  const podiumItems = [...ranking.slice(0, 3)];
  const otherItems = [...ranking.slice(3, 7)];

  while (podiumItems.length < 3) {
    podiumItems.push({});
  }
  while (otherItems.length < 4) {
    otherItems.push({});
  }

  return (
    <Container
      mode="customTop"
      colors={["#6CD2FF", "#6CD2FF"]}
      spaceBottom={false}
    >
      {/* Modal de Informações */}
      <ModalInfo
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
        title="Informações"
        message="Veja a classificação dos participantes com base nos pontos acumulados. Fique atento para subir na classificação e conquistar prêmios incríveis!"
      />

      <View
        className="relative items-center"
        style={{ gap: RS(30), paddingHorizontal: RW(60) }}
      >
        {/* Título da tela, botão de informações e voltar */}
        <View className="flex-row w-full items-center justify-between">
          <TouchableOpacity onPress={() => setInfoVisible(true)}>
            <Image
              source={require("@/assets/icons/phases/info.png")}
              style={{ width: RW(20), height: RW(20) }}
            />
          </TouchableOpacity>

          <Text
            className="font-montserratBold"
            style={{ color: "#4C4C4C", fontSize: RF(26) }}
          >
            Ranking
          </Text>

          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => router.back()}
          >
            <Image
              source={require("@/assets/icons/back.png")}
              style={{ width: RW(24), height: RW(24) }}
            />
          </TouchableOpacity>
        </View>

        {/* Cards do pódio */}
        <View style={{ gap: RS(20) }}>
          {podiumItems.map((item: any, index: any) => (
            <PodiumCard
              key={item?.id || `empty-${index}`}
              image={item?.profilePicture?.toString() || ""}
              name={item?.name?.toString() || ""}
              rank={index + 1}
              points={item?.points !== undefined ? item.points.toString() : ""}
            />
          ))}
        </View>

        {/* Outros colocados do ranking */}
        <View
          className="items-center justify-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.35)",
            width: RW(300),
            borderRadius: 20,
            gap: RS(10),
            paddingVertical: RS(20),
            marginBottom: RH(90),
          }}
        >
          {otherItems.map((item: any, index: any) => (
            <OtherRanking
              key={item?.id || `empty-other-${index}`}
              name={item?.name?.toString() || ""}
              rank={(index + 4).toString()}
              points={item?.points !== undefined ? item.points.toString() : ""}
            />
          ))}
        </View>

        {/* Fundo decorativo do ranking (planeta) */}
        <ImageBackground
          source={require("@/assets/images/ranking/planet.png")}
          className="absolute bottom-0"
          style={{
            width: RW(400),
            height: RH(300),
            zIndex: -1,
          }}
        />
      </View>
    </Container>
  );
}
