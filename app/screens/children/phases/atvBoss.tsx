import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import { useScreenDuration } from "@/hooks/useScreenDuration";
import { useSubmitMission } from "@/hooks/useSubmitMission";
import { useCheckHint } from "@/hooks/useCheckHint";
import { useAudio } from "@/contexts/AudioContext";
import { ImageBackground } from "expo-image";
import HeaderFase from "@/components/ui/Children/Phases/HeaderFase";
import ContainerInfo from "@/components/ui/Children/Phases/ContainerInfo";
import BaloonLetter from "@/components/ui/Children/Phases/BaloonLetter";
import { MotiView } from "moti";

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
  const [pontos, setPontos] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentLettersSet, setCurrentLettersSet] = useState<string[]>([]);
  const [infoVisible, setInfoVisible] = useState<boolean>(false);
  const [iniciou, setIniciou] = useState<boolean>(false);
  const [totalClicados, setTotalClicados] = useState(0);
  const [qtdAcertos, setQtdAcertos] = useState(0);
  const lastLetterRef = useRef<string | null>(null);

  const { start, reset, getDuration } = useScreenDuration();
  const { audioEnabled, checkAudio } = useAudio();
  const { submitMission } = useSubmitMission();

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const colors = ["#EF5B6A", "#6CD2FF", "#FFB300", "#80D25B"];
  const wordList = [
    "APPLE",
    "HOUSE",
    "LEARNY",
    "GARDEN",
    "MOON",
    "BRAIN",
    "COLOR",
  ];

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
      const otherLetters = alphabet.filter((l) => l !== correctLetter);
      const randomLetters: string[] = [];

      while (randomLetters.length < 2) {
        const randIndex = Math.floor(Math.random() * otherLetters.length);
        randomLetters.push(otherLetters[randIndex]);
        otherLetters.splice(randIndex, 1);
      }

      // Mistura letra correta com as aleatórias
      const letters = [correctLetter, ...randomLetters].sort(
        () => Math.random() - 0.5
      );
      setCurrentLettersSet(letters);
    };

    generateLettersSet(); // gera no início da letra atual
  }, [selectedWord, currentLetterIndex]);

  useEffect(() => {
    // Controla índice da cor atual fora do setInterval
    let colorIndex = 0;

    const interval = setInterval(() => {
      // Determina quais letras usar
      const letters = iniciou
        ? currentLettersSet
        : alphabet; // se ainda não iniciou, usa o alfabeto inteiro

      if (!letters.length) return;

      // Escolhe uma letra diferente da última exibida
      let letterToShow = letters[Math.floor(Math.random() * letters.length)];
      if (letters.length > 1) {
        // Evita repetir a última letra
        while (letterToShow === lastLetterRef.current) {
          letterToShow = letters[Math.floor(Math.random() * letters.length)];
        }
      }

      // Atualiza a ref com a letra exibida
      lastLetterRef.current = letterToShow;

      // Intercala ciclicamente entre as 4 cores
      const newColor = colors[colorIndex % colors.length];
      colorIndex++;

      // Cria o novo balão
      const newItem: FloatingItem = {
        id: Math.random().toString(36).substring(7),
        left: Math.random() * (width - 100),
        size: 70 + Math.random() * 60,
        letter: letterToShow,
        color: newColor,
      };

      setItems((prev) => [...prev, newItem]);

      // Remove depois de 5 segundos
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== newItem.id));
      }, 5000);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentLettersSet, iniciou]);

  const gerarPontuacao = async() => {
    const { durationFormatted } = getDuration();
    let porcentagem = (qtdAcertos / totalClicados) * 100;
    const response = await submitMission({
      pontos: pontos, 
      tipoFase: "boss"
    });
    if (response.success) {
      let pontosAtualizados = response.pontosAtualizados ?? pontos;
      const score = { pontosAtualizados, porcentagem, tempo: durationFormatted };
      navigation.navigate("score", { score });
    }
  }

  // Modifique o handlePress para avançar na palavra apenas quando clicar na letra correta
  const handlePress = (item: FloatingItem) => {
    const letter = item.letter;
    const wordArray = selectedWord.split("");

    if (iniciou){
      if (letter === wordArray[currentLetterIndex]) {
        const updated = [...revealedLetters];
        updated[currentLetterIndex] = letter;

        const newWord = updated.join("");
        setRevealedLetters(updated);
        setPontos((prev) => prev + Math.round(100/wordArray.length));

        setQtdAcertos(qtdAcertos + 1)
        setTotalClicados(totalClicados + 1)

        if (newWord === selectedWord) {
          gerarPontuacao(); // chama antes de mudar índice
        } else {
          setCurrentLetterIndex((prev) => prev + 1);
          setTotalClicados(totalClicados+1)
        }
      } else {
        if ((pontos - Math.round((100/wordArray.length)*0.5)) > 0) {
          setPontos((prev) => prev - Math.round((100/wordArray.length)*0.5));
        } else {
          setPontos(0)
        }
      }
    }

    // Remove o balão clicado
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  useEffect(() => {
    checkAudio();
  }, []);

  return (
    <View style={styles.container}>
      {!iniciou ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: height * 0.02,
          }}
        >
          <ContainerInfo
        message={
          "Esse é o boss stage. Para concluir ele você deve estourar os balões com as letras correspondentes para ganhar pontos. Caso estoure a letra errada serão descontados pontos."
        }
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />
          <HeaderFase
            image={require("@/assets/images/boss.png")}
            title="Boss Stage"
            description="Estoure os balões para formar a frase"
            color="#EF5B6A"
            onPressInfo={() => setInfoVisible(true)}
          />
        </View>
      ) : (
        <View>
          {/* SCORE */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Score: </Text>
            <Text style={styles.scoreValue}>{pontos}</Text>
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
        </View>
      )}

      {/* Balões flutuando */}
      {items.map((item) => (
        <MotiView
          key={item.id}
          from={{ translateY: 0, opacity: 1 }}
          animate={{ translateY: iniciou ? -height * 0.42 : -height * 0.36, opacity: 0 }}
          transition={{ type: "timing", duration: 5000 }}
          style={[styles.balao, { left: item.left }]}
        >
          <BaloonLetter letter={item.letter} color={item.color} isAudioEnabled={audioEnabled} onPress={() => handlePress(item)} />
        </MotiView>
      ))}

      {/* Fundo de nuvens */}
      <ImageBackground
        source={require("@/assets/images/nuvens.png")}
        style={styles.nuvens}
      />

      <View style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: height * 0.1
      }}>
        <TouchableOpacity onPress={() => { 
          if (iniciou) {
            // 🔁 Se estiver parando o jogo → reseta tudo
            setItems([]);
            setCurrentLetterIndex(0);
            setRevealedLetters(Array(selectedWord.length).fill("_"));
            setPontos(0);
            setQtdAcertos(0);
            setTotalClicados(0);

            reset(); // reinicia o cronômetro
          } else {
            // 🟢 Se estiver começando → limpa balões iniciais aleatórios
            setItems([]);
            start(); // inicia o cronometro ao começar a fase
          }
          setIniciou(!iniciou)
        }} style={{
          backgroundColor: "#4c4c4c",
          borderRadius: 20,
          width: width * 0.3,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{
            fontSize: width * 0.05,
            fontFamily: "Montserrat_700Bold",
            padding: width * 0.02,
            color: "#fff"
          }}>{!iniciou ? "Iniciar" : "Parar"}</Text>
        </TouchableOpacity>
      </View>
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
