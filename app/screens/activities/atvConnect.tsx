import React, { useState } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Svg, { Line } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../types";
import AnimalCard from "@/components/ui/AnimalCard"; // ajuste o caminho conforme necessário
import HeaderFase from "@/components/ui/HeaderFase";

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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AtvConnectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<CardInfo[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

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

  const handleConfirm = () => {
    const correctCount = connections.filter(c => c.isCorrect).length;
    const total = connections.length;
  
    console.log(`Acertos: ${correctCount} de ${total}`);
    // Aqui você pode atualizar pontuação, enviar pro backend, mostrar feedback, etc.
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderFase
        image={require("../../../assets/images/watch.png")}
        title="Look & Connect"
        description="Ligue os animais"
        color="#6CD2FF"
        onReturn={() => navigation.navigate("world")}
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
          <AnimalCard
            id="1"
            title="monkey"
            image={require("../../../assets/images/cards/connect/card-macaco.png")}
            source={require("../../../assets/audios/monkey.wav")}
            column="left"
            onSelect={handleSelect}
          />
          <AnimalCard
            id="2"
            title="horse"
            image={require("../../../assets/images/cards/connect/card-cavalo.png")}
            source={require("../../../assets/audios/horse.wav")}
            column="left"
            onSelect={handleSelect}
          />
          <AnimalCard
            id="3"
            title="snake"
            image={require("../../../assets/images/cards/connect/card-cobra.png")}
            source={require("../../../assets/audios/snake.wav")}
            column="left"
            onSelect={handleSelect}
          />
          <AnimalCard
            id="4"
            title="bird"
            image={require("../../../assets/images/cards/connect/card-passaro.png")}
            source={require("../../../assets/audios/bird.wav")}
            column="left"
            onSelect={handleSelect}
          />
        </View>
        <View style={{ gap: height * 0.03 }}>
          <AnimalCard
            id="5"
            title="horse"
            image={require("../../../assets/images/cards/connect/card-cavalo.png")}
            source={require("../../../assets/audios/horse.wav")}
            column="right"
            onSelect={handleSelect}
          />
          <AnimalCard
            id="6"
            title="bird"
            image={require("../../../assets/images/cards/connect/card-passaro.png")}
            source={require("../../../assets/audios/bird.wav")}
            column="right"
            onSelect={handleSelect}
          />
          <AnimalCard
            id="7"
            title="monkey"
            image={require("../../../assets/images/cards/connect/card-macaco.png")}
            source={require("../../../assets/audios/monkey.wav")}
            column="right"
            onSelect={handleSelect}
          />
          <AnimalCard
            id="8"
            title="snake"
            image={require("../../../assets/images/cards/connect/card-cobra.png")}
            source={require("../../../assets/audios/snake.wav")}
            column="right"
            onSelect={handleSelect}
          />
        </View>
      </View>

      <View style={styles.viewButtons}>
        <Image
          source={require("../../../assets/images/icon-dica.png")}
          style={styles.icon}
        />
        <TouchableOpacity style={{flexDirection: "row"}} onPress={handleConfirm}>
          <Image
            source={require("../../../assets/images/icon-confirmar-vermelho.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection: "row"}} onPress={handleClearConnections}>
          <Image
            source={require("../../../assets/images/icon-limpar.png")}
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
