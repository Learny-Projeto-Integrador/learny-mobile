//@ts-nocheck
import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Svg, { Line } from "react-native-svg";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "../../../../types";
import AnimalCard from "@/components/ui/Children/Phases/AnimalCard";
import HeaderFase from "@/components/ui/Children/Phases/HeaderFase";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import CustomAlert from "@/components/ui/CustomAlert";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import { useCheckMedalha } from "@/hooks/useChceckMedalha";
import { useCheckAudio } from "@/hooks/useCheckAudio";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";

const { width, height } = Dimensions.get("window");

type CardInfo = {
  id: string;
  type: string;
  x: number;
  y: number;
  column: "left" | "right";
};

type Connection = {
  from: CardInfo;
  to: CardInfo;
  isCorrect: boolean;
  color: string;
};

const animalColors: Record<string, string> = {
  monkey: "#FFB300", // amarelo
  bird: "#6CD2FF", // azul
  horse: "#EF5B6A", // marrom
  snake: "#80D25B", // verde
};

const imgsMedalhas = {
  "Iniciando!": require("@/assets/icons/icon-medalha-verde.png"),
  "A todo o vapor!": require("@/assets/icons/icon-medalha-vermelha.png"),
  Desvendando: require("@/assets/icons/icon-medalha-azul.png"),
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AtvConnectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<CardInfo[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const [alertDica, setAlertDica] = useState<AlertData | null>(null);
  const [alertQueue, setAlertQueue] = useState<AlertData[]>([]);
  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [hiddenCardIds, setHiddenCardIds] = useState<Set<string>>(new Set());
  const [medalha, setMedalha] = useState<string | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [audio, setAudio] = useState<any>(null);
  const [infoVisible, setInfoVisible] = useState<boolean>(false);

  const { getDuration } = useScreenDuration();
  const { submitMission } = useSubmitMission();
  const { checkMedalha } = useCheckMedalha();
  const { checkAudio } = useCheckAudio();

  useFocusEffect(
    useCallback(() => {
      const fetchMedalha = async () => {
        const nomeMedalha = await checkMedalha();
        setMedalha(nomeMedalha ?? null);
      };
      const fetchAudio = async () => {
        const audio = await checkAudio();
        setAudio(audio ?? null);
      };
      fetchAudio();
      fetchMedalha();
    }, [])
  );

  const showNextAlert = () => {
    if (alertQueue.length > 0) {
      const [next, ...rest] = alertQueue;
      setCurrentAlert(next);
      setAlertQueue(rest);
      setAlertVisible(true);
    } else {
      setCurrentAlert(null);
      // Vai para a tela de score quando todos os alertas forem fechados
      navigation.navigate("score", {
        score: currentAlert?.score,
      });
    }
  };

  const handleSelect = (card: CardInfo) => {
    if (connections.some((c) => c.from.id === card.id || c.to.id === card.id))
      return;

    if (selected.length === 1) {
      const from = selected[0];
      const to = card;

      const isCorrect =
        from.type === to.type && from.id !== to.id && from.column !== to.column;
      if (from.column === to.column) {
        setSelected([]);
        return;
      }
      const color = isCorrect
        ? animalColors[from.type] || "#00C853"
        : "#9E9E9E";

      setConnections((prev) => [...prev, { from, to, isCorrect, color }]);
      setSelected([]);
    } else {
      setSelected([card]);
    }
  };

  const handleClearConnections = () => {
    setConnections([]);
    setSelected([]);
  };

  const handleConfirm = async () => {
    const { durationFormatted } = getDuration();
    const correctCount = connections.filter((c) => c.isCorrect).length;
    let porcentagem = (correctCount / 4) * 100;
    let pontos = (correctCount / 4) * 100;

    if (medalha == "Iniciando!") {
      pontos != 0 ? pontos += 50 : null
    } else if (medalha == "A todo o vapor!") {
      pontos = pontos * 2;
    }

    const body = {
      pontos,
      fasesConcluidas: 1,
      tipoFase: "connect",
    };

    const response = await submitMission(body);

    if (response.success) {
      const score = { pontos, porcentagem, tempo: durationFormatted };
      const newAlerts: AlertData[] = [];

      if (response.result.missaoConcluida) {
        newAlerts.push({
          title: "Diária concluída!",
          message: response.result.missaoConcluida.descricao,
          score,
        });
      }

      if (
        response.result.medalhasGanhas &&
        response.result.medalhasGanhas.length > 0
      ) {
        for (const medalha of response.result.medalhasGanhas) {
          newAlerts.push({
            icon: imgsMedalhas[medalha.nome],
            title: "Medalha conquistada!",
            message: medalha.descricao || "Você ganhou uma medalha!",
            score,
          });
        }
      }

      if (newAlerts.length > 0) {
        setCurrentAlert(newAlerts[0]);
        setAlertQueue(newAlerts.slice(1)); // Apenas o restante entra na fila
        setAlertVisible(true);
      } else {
        navigation.navigate("score", { score });
      }
    } else {
      setCurrentAlert({
        title: "Erro!",
        message: response.error ? response.error : "Erro desconhecido",
      });
      setAlertQueue([]);
      setAlertVisible(true);
    }
  };

  const handleHint = () => {
    if (hintUsed) return; // impede uso múltiplo

    if (medalha != "Desvendando") {
      setAlertDica({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message: 'Você precisa estar com a medalha "Desvendando"',
      });
      setAlertVisible(true);
      return;
    }
    const allPairs: { left: CardInfo; right: CardInfo }[] = [
      {
        left: { id: "1", type: "monkey", column: "left", x: 100, y: 200 },
        right: { id: "7", type: "monkey", column: "right", x: 300, y: 200 },
      },
      {
        left: { id: "2", type: "horse", column: "left", x: 100, y: 300 },
        right: { id: "5", type: "horse", column: "right", x: 300, y: 300 },
      },
      {
        left: { id: "3", type: "snake", column: "left", x: 100, y: 400 },
        right: { id: "8", type: "snake", column: "right", x: 300, y: 400 },
      },
      {
        left: { id: "4", type: "bird", column: "left", x: 100, y: 500 },
        right: { id: "6", type: "bird", column: "right", x: 300, y: 500 },
      },
    ];

    // Filtra pares ainda não conectados nem escondidos
    const unusedPairs = allPairs.filter(
      (pair) =>
        !connections.some(
          (c) =>
            (c.from.id === pair.left.id && c.to.id === pair.right.id) ||
            (c.from.id === pair.right.id && c.to.id === pair.left.id)
        ) &&
        !hiddenCardIds.has(pair.left.id) &&
        !hiddenCardIds.has(pair.right.id)
    );

    if (unusedPairs.length === 0) return;

    const pair = unusedPairs[Math.floor(Math.random() * unusedPairs.length)];
    const color = animalColors[pair.left.type];

    setConnections((prev) => [
      ...prev,
      {
        from: 0,
        to: 0,
        isCorrect: true,
        color,
      },
    ]);

    setHiddenCardIds((prev) => new Set([...prev, pair.left.id, pair.right.id]));
    setHintUsed(true); // marca que a dica foi usada
  };

  return (
    <ScrollView style={styles.container}>
      <ContainerInfo
        message={
          "Essa é a fase connect. Para concluir ela você deve conectar os animais correspondentes. Quando um par correto é formado a linha entre os dois icones é feita."
        }
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />
      {currentAlert && (
        <CustomAlert
          icon={
            currentAlert.icon ??
            require("@/assets/icons/icon-check-gradiente.png")
          }
          visible={alertVisible}
          onClose={() => {
            setAlertVisible(false);
            showNextAlert();
          }}
          dualAction={false}
          title={currentAlert.title}
          message={currentAlert.message}
        />
      )}
      {alertDica && (
        <CustomAlert
          icon={
            alertDica.icon ??
            require("@/assets/icons/icon-check-gradiente.png")
          }
          visible={alertVisible}
          onClose={() => {
            setAlertVisible(false);
          }}
          dualAction={false}
          title={alertDica.title}
          message={alertDica.message}
        />
      )}
      <HeaderFase
        image={require("@/assets/images/watch.png")}
        title="Look & Connect"
        description="Ligue os animais"
        color="#6CD2FF"
        onPressInfo={() => setInfoVisible(true)}
      />

      {/* Camada das linhas */}
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        {connections.map((conn, idx) => (
          <Line
            key={idx}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke={conn.color}
            strokeWidth={4}
          />
        ))}
      </Svg>

      <View style={styles.containerCards}>
        <View style={{ gap: height * 0.03 }}>
          {!hiddenCardIds.has("1") && (
            <AnimalCard
              id="1"
              title="monkey"
              image={require("@/assets/images/cards/connect/card-macaco.png")}
              source={
                audio ? require("@/assets/audios/monkey.wav") : null
              }
              column="left"
              onSelect={handleSelect}
            />
          )}
          {!hiddenCardIds.has("2") && (
            <AnimalCard
              id="2"
              title="horse"
              image={require("@/assets/images/cards/connect/card-cavalo.png")}
              source={
                audio ? require("@/assets/audios/horse.wav") : null
              }
              column="left"
              onSelect={handleSelect}
            />
          )}
          {!hiddenCardIds.has("3") && (
            <AnimalCard
              id="3"
              title="snake"
              image={require("@/assets/images/cards/connect/card-cobra.png")}
              source={
                audio ? require("@/assets/audios/snake.wav") : null
              }
              column="left"
              onSelect={handleSelect}
            />
          )}
          {!hiddenCardIds.has("4") && (
            <AnimalCard
              id="4"
              title="bird"
              image={require("@/assets/images/cards/connect/card-passaro.png")}
              source={audio ? require("@/assets/audios/bird.wav") : null}
              column="left"
              onSelect={handleSelect}
            />
          )}
        </View>
        <View style={{ gap: height * 0.03 }}>
          {!hiddenCardIds.has("5") && (
            <AnimalCard
              id="5"
              title="horse"
              image={require("@/assets/images/cards/connect/card-cavalo.png")}
              source={
                audio ? require("@/assets/audios/horse.wav") : null
              }
              column="right"
              onSelect={handleSelect}
            />
          )}
          {!hiddenCardIds.has("6") && (
            <AnimalCard
              id="6"
              title="bird"
              image={require("@/assets/images/cards/connect/card-passaro.png")}
              source={audio ? require("@/assets/audios/bird.wav") : null}
              column="right"
              onSelect={handleSelect}
            />
          )}
          {!hiddenCardIds.has("7") && (
            <AnimalCard
              id="7"
              title="monkey"
              image={require("@/assets/images/cards/connect/card-macaco.png")}
              source={
                audio ? require("@/assets/audios/monkey.wav") : null
              }
              column="right"
              onSelect={handleSelect}
            />
          )}
          {!hiddenCardIds.has("8") && (
            <AnimalCard
              id="8"
              title="snake"
              image={require("@/assets/images/cards/connect/card-cobra.png")}
              source={
                audio ? require("@/assets/audios/snake.wav") : null
              }
              column="right"
              onSelect={handleSelect}
            />
          )}
        </View>
      </View>

      <View style={styles.viewButtons}>
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={handleHint}>
          <Image
            source={require("@/assets/icons/icon-dica.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={handleConfirm}
        >
          <Image
            source={require("@/assets/icons/icon-confirmar-vermelho.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={handleClearConnections}
        >
          <Image
            source={require("@/assets/icons/icon-limpar.png")}
            style={styles.icon}
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
    gap: width * 0.5,
  },
  containerCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width * 0.3,
    justifyContent: "center",
    marginTop: height * 0.01,
  },
  viewButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02,
    gap: width * 0.02,
  },
  icon: {
    width: width * 0.1,
    aspectRatio: 1 / 1,
  },
});
