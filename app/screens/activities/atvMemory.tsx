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
  ListRenderItem,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderFase from "@/components/ui/HeaderFase";
import MemoryCard from "@/components/ui/MemoryCard";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type AnimalCard = {
  text: string;
  icon: string;
  audio: string
}

const animalCards: Record<string, AnimalCard> = {
  monkey: {
    text: require("../../../assets/images/cards/memory/card-monkey-text.png"),
    icon: require("../../../assets/images/cards/memory/card-monkey-icon.png"),
    audio: require("../../../assets/audios/monkey.wav"),
  },
  bird: {
    text: require("../../../assets/images/cards/memory/card-bird-text.png"),
    icon: require("../../../assets/images/cards/memory/card-bird-icon.png"),
    audio: require("../../../assets/audios/bird.wav"),
  },
  snake: {
    text: require("../../../assets/images/cards/memory/card-snake-text.png"),
    icon: require("../../../assets/images/cards/memory/card-snake-icon.png"),
    audio: require("../../../assets/audios/snake.wav"),
  },
};

const generateCards = () => {
  const cards = [];
  let id = 1;
  for (const animal of Object.keys(animalCards)) {
    cards.push({
      id: `${id++}`,
      animal,
      type: "text",
      image: animalCards[animal].text,
      audio: animalCards[animal].audio,
    });
    cards.push({
      id: `${id++}`,
      animal,
      type: "icon",
      image: animalCards[animal].icon,
      audio: animalCards[animal].audio,
    });
  }

  // Shuffle cards
  return cards.sort(() => Math.random() - 0.5);
};

export default function AtvMemoryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [cards, setCards] = useState(generateCards());
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const handleCardPress = (id: string, animal: string, type: string) => {
    if (isChecking || selected.includes(id) || matched.includes(id)) return;
  
    const newSelected = [...selected, id];
    setSelected(newSelected);
  
    if (newSelected.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = newSelected;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);
  
      const isMatch =
        firstCard?.animal === secondCard?.animal &&
        firstCard?.type !== secondCard?.type;
  
      if (isMatch) {
        setTimeout(() => {
          setMatched((prev) => [...prev, firstId, secondId]);
          setSelected([]);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          setSelected([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matched.length === cards.length) {
      handleConfirm();
    }
  }, [matched]);

  const handleConfirm = () => {
    Alert.alert("Parabéns!", "Você completou o jogo da memória!");
    // Aqui você pode fazer a integração com a API depois
    // navigation.navigate("world");
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderFase
        image={require("../../../assets/images/memory.png")}
        title="Memory Game"
        description="Ache os pares de texto e imagem"
        color="#FFB300"
        onReturn={() => navigation.navigate("world")}
      />

      <View style={styles.containerCards}>
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          id={card.id}
          image={
            selected.includes(card.id) || matched.includes(card.id)
              ? card.image
              : require("../../../assets/images/cards/memory/card-base.png")
          }
          source={card.audio}
          onPress={() => handleCardPress(card.id, card.animal, card.type)}
          disabled={isChecking}
        />
      ))}
      </View>

      <View style={styles.viewButton}>
        <Image
          source={require("../../../assets/images/icon-dica.png")}
          style={styles.icon}
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
  },
  containerCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: width * 0.03,
    justifyContent: "center",
    marginTop: height * 0.01,
  },
  icon: {
    width: width * 0.1,
    aspectRatio: 1 / 1,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.008,
  },
});