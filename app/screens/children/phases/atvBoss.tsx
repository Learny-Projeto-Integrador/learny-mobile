import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import { useCheckHint } from "@/hooks/useCheckHint";
import { useAudio } from "@/contexts/AudioContext";
import BaloonLetter from "@/components/ui/Children/Phases/BaloonLetter";
import { MotiView } from "moti";
import { ImageBackground } from "expo-image";

const { width, height } = Dimensions.get("window");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FloatingItem {
  id: string;
  left: number;
  size: number;
  letter: string;
  color: string;
}

export default function AtvBossScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [score, setScore] = useState<number>(100);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentLettersSet, setCurrentLettersSet] = useState<string[]>([]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const colors = ["#EF5B6A", "#6CD2FF", "#FFB300", "#80D25B"];
  const wordList = ["APPLE", "HOUSE", "LEARNY", "GARDEN", "MOON", "BRAIN", "COLOR"];

  // Palavra aleatória ao carregar
  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setSelectedWord(randomWord);
    setRevealedLetters(Array(randomWord.length).fill("_"));
  }, []);

  // Gera balões aleatórios
  useEffect(() => {
    if (!selectedWord) return;

    // Gera o conjunto de 4 letras para a letra atual
    const generateLettersSet = () => {
      const correctLetter = selectedWord[currentLetterIndex];
      const otherLetters = alphabet.filter(l => l !== correctLetter);
      const randomLetters: string[] = [];

      while (randomLetters.length < 3) {
        const randIndex = Math.floor(Math.random() * otherLetters.length);
        randomLetters.push(otherLetters[randIndex]);
        otherLetters.splice(randIndex, 1);
      }

      // Mistura letra correta com as aleatórias
      const letters = [correctLetter, ...randomLetters].sort(() => Math.random() - 0.5);
      setCurrentLettersSet(letters);
    };

    generateLettersSet(); // gera no início da letra atual

  }, [selectedWord, currentLetterIndex]);

  useEffect(() => {
    if (!currentLettersSet.length) return;

    // Subir um balão por vez
    const interval = setInterval(() => {
      const letterToShow = currentLettersSet[Math.floor(Math.random() * currentLettersSet.length)];

      const newItem: FloatingItem = {
        id: Math.random().toString(36).substring(7),
        left: Math.random() * (width - 100),
        size: 70 + Math.random() * 60,
        letter: letterToShow,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setItems(prev => [...prev, newItem]);

      setTimeout(() => {
        setItems(prev => prev.filter(i => i.id !== newItem.id));
      }, 5000);

    }, 2000);

    return () => clearInterval(interval);
  }, [currentLettersSet]);

  // Modifique o handlePress para avançar na palavra apenas quando clicar na letra correta
  const handlePress = (item: FloatingItem) => {
    const letter = item.letter;
    const wordArray = selectedWord.split("");

    if (letter === wordArray[currentLetterIndex]) {
      // Acertou a letra correta da vez
      const updated = [...revealedLetters];
      updated[currentLetterIndex] = letter;
      setRevealedLetters(updated);
      setScore(prev => prev + 10);

      // Passa para a próxima letra
      setCurrentLetterIndex(prev => prev + 1);

      if (updated.join("") === selectedWord) {
        Alert.alert("Parabéns!", `Você completou a palavra ${selectedWord}! 🎉`);
      }
    } else {
      // Errou
      setScore(prev => Math.max(prev - 5, 0));
    }

    // Remove o balão clicado
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  return (
    <View style={styles.container}>
      {/* SCORE */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score: </Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      {/* Palavra com traços e letras reveladas */}
      <View style={styles.wordContainer}>
        <Text style={styles.letterText}>{selectedWord}</Text>
        <View style={styles.revealContainer}>
          {revealedLetters.map((char, index) => (
            <View key={index} style={styles.letterContainer}>
              <Text style={styles.letterText}>
                {char !== "_" ? char : ""}
              </Text>
              <View style={styles.traco} />
            </View>
          ))}
        </View>
      </View>

      {/* Balões flutuando */}
      {items.map((item) => (
        <MotiView
          key={item.id}
          from={{ translateY: 0, opacity: 1 }}
          animate={{ translateY: -height * 0.42, opacity: 0 }}
          transition={{ type: "timing", duration: 5000 }}
          style={[styles.balao, { left: item.left }]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress(item)}>
            <BaloonLetter letter={item.letter} color={item.color} />
          </TouchableOpacity>
        </MotiView>
      ))}

      {/* Fundo de nuvens */}
      <ImageBackground
        source={require("@/assets/images/nuvens.png")}
        style={styles.nuvens}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scoreContainer: {
    flexDirection: "row",
    marginTop: height * 0.02,
    marginLeft: width * 0.02,
  },
  scoreLabel: {
    fontSize: width * 0.07,
    fontFamily: "Montserrat_900Black",
    color: "#4C4C4C",
  },
  scoreValue: {
    fontSize: width * 0.07,
    fontFamily: "Montserrat_900Black",
    color: "#FFB300",
  },
  balao: {
    position: "absolute",
    bottom: height * 0.2,
  },
  wordContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.05,
  },
  revealContainer: {
    flexDirection: "row",
    gap: width * 0.04,
  },
  letterContainer: {
    alignItems: "center",
  },
  letterText: {
    fontSize: width * 0.07,
    fontFamily: "Montserrat_900Black",
    color: "#4C4C4C",
    marginBottom: 4,
  },
  traco: {
    width: width * 0.08,
    height: 4,
    backgroundColor: "#4C4C4C",
    borderRadius: 2,
  },
  nuvens: {
    position: "absolute",
    bottom: -25,
    width: width,
    aspectRatio: 390 / 227,
  },
});
