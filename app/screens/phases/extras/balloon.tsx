import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { MotiView } from "moti";

import BalloonLetter from "@/components/ui/Phases/Balloon/BalloonLetter";

import { useUser } from "@/contexts/UserContext";
import { usePhaseContext } from "@/contexts/PhaseContext";

import { Balloon } from "@/types/phases";
import { balloonColors, wordList, alphabetAudioMap } from "@/constants/phases/balloon";

import { RF, RH, RS, RW } from "@/theme";
import ModalInfo from "@/components/ui/ModalInfo";

import { useAudioPlayer } from "expo-audio";

export default function AtvBossScreen() {
  const router = useRouter();

  const { user } = useUser();

  const {
    started,

    start,
    finish,
    restart,

    incrementStats,
  } = usePhaseContext();

  const player = useAudioPlayer();

  const [items, setItems] = useState<Balloon[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(0);

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentLettersSet, setCurrentLettersSet] = useState<string[]>([]);

  const [infoVisible, setInfoVisible] = useState(false);

  const lastLetterRef = useRef<string | null>(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  /*
   * ---------------------------------------
   * INITIALIZATION
   * ---------------------------------------
   */

  const initializePhase = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    setSelectedWord(randomWord);

    setRevealedLetters(Array(randomWord.length).fill("_"));

    setCurrentLetterIndex(0);

    setPoints(0);

    setItems([]);
  };

  /*
   * ---------------------------------------
   * LETTER OPTIONS
   * ---------------------------------------
   */

  useEffect(() => {
    if (!selectedWord) return;

    const correctLetter = selectedWord[currentLetterIndex];

    const otherLetters = alphabet.filter((letter) => letter !== correctLetter);

    const randomLetters: string[] = [];

    while (randomLetters.length < 2) {
      const randomIndex = Math.floor(Math.random() * otherLetters.length);

      randomLetters.push(otherLetters[randomIndex]);

      otherLetters.splice(randomIndex, 1);
    }

    const letters = [correctLetter, ...randomLetters].sort(
      () => Math.random() - 0.5,
    );

    setCurrentLettersSet(letters);
  }, [selectedWord, currentLetterIndex]);

  /*
   * ---------------------------------------
   * BALLOONS
   * ---------------------------------------
   */

  useEffect(() => {
    let colorIndex = 0;

    const interval = setInterval(() => {
      const letters = started ? currentLettersSet : alphabet;

      if (!letters.length) return;

      let letterToShow = letters[Math.floor(Math.random() * letters.length)];

      if (letters.length > 1) {
        while (letterToShow === lastLetterRef.current) {
          letterToShow = letters[Math.floor(Math.random() * letters.length)];
        }
      }

      lastLetterRef.current = letterToShow;

      const newColor = balloonColors[colorIndex % balloonColors.length];

      colorIndex++;

      const newItem: Balloon = {
        id: Math.random().toString(36).substring(7),
        left: Math.random() * RW(330),
        size: RS(100),
        letter: letterToShow,
        color: newColor,
        audio: alphabetAudioMap[letterToShow],
      };

      setItems((prev) => [...prev, newItem]);

      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 5000);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentLettersSet, started]);

  /*
   * ---------------------------------------
   * ANSWERS
   * ---------------------------------------
   */

  const handleSuccess = async () => {
    incrementStats({
      points,
      coins: 5,
      correctAnswers: selectedWord.length,
    });

    await finish();

    router.push("/screens/phases/score");
  };

  const playLetterAudio = (audio: any) => {
    if (!audio) return;

    try {
      player.replace(audio);
      player.seekTo(0);
      player.play();
    } catch (e) {
      console.log(e);
    }
  };

  const handlePress = async (item: Balloon) => {
    if (!started) {
      setItems((prev) => prev.filter((balloon) => balloon.id !== item.id));
      return;
    }

    const letter = item.letter;

    const wordArray = selectedWord.split("");

    const correctLetter = wordArray[currentLetterIndex];

    if (letter === correctLetter) {
      const updated = [...revealedLetters];

      updated[currentLetterIndex] = letter;

      setRevealedLetters(updated);

      const earnedPoints = Math.round(100 / wordArray.length);

      setPoints((prev) => prev + earnedPoints);

      incrementStats({
        points: earnedPoints,
        correctAnswers: 1,
      });

      const newWord = updated.join("");

      if (newWord === selectedWord) {
        await handleSuccess();
      } else {
        setCurrentLetterIndex((prev) => prev + 1);
      }
    } else {
      const lostPoints = Math.round((100 / wordArray.length) * 0.5);

      setPoints((prev) => (prev - lostPoints > 0 ? prev - lostPoints : 0));

      incrementStats({
        wrongAnswers: 1,
      });
    }

    setItems((prev) => prev.filter((balloon) => balloon.id !== item.id));
  };

  return (
    <View className="flex-1 bg-white">
      <ModalInfo
        title={"Ballon Phase"}
        message={`
          Esse é a balloon phase.
          Para concluir ele você deve estourar os balões
          com as letras correspondentes para formar a palavra.
          Caso estoure a letra errada serão descontados pontos.
        `}
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
      />

      {/* Fundo de nuvens */}
      <ImageBackground
        source={require("@/assets/images/phases/balloon/clouds-top.png")}
        className="absolute w-full"
        style={{
          top: -RH(50),
          aspectRatio: 390 / 227,
        }}
      />

      {/* SCORE */}
      <View
        className="flex-row justify-between items-center"
        style={{ marginTop: RS(40), marginRight: RS(40) }}
      >
        <View
          className="flex-row bg-[#4c4c4c] items-center"
          style={{
            width: RW(130),
            borderTopEndRadius: 30,
            borderBottomEndRadius: 30,
            paddingVertical: RS(10),
            paddingLeft: RS(20),
            gap: RS(10),
          }}
        >
          <Text
            className="font-montserratSemiBold text-white"
            style={{ fontSize: RF(26) }}
          >
            Score:
          </Text>
          <Text
            className="font-montserratMedium text-white"
            style={{ fontSize: RF(26) }}
          >
            {points}
          </Text>
        </View>

        <View
          className="items-center"
          style={{ gap: RS(16), marginTop: RS(30) }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={{ width: RW(28), height: RW(28), aspectRatio: 1 / 1 }}
              source={require("@/assets/icons/back.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setInfoVisible(true)}>
            <Image
              style={{ width: RW(20), height: RW(20), aspectRatio: 1 / 1 }}
              source={require("@/assets/icons/phases/info-transparent.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Palavra com traços e letras reveladas */}
      {started && (
        <View
          className="items-center justify-center"
          style={{ marginTop: RS(20) }}
        >
          <Text
            className="font-montserratBlack"
            style={{
              color: "#4c4c4c",
              fontSize: RF(30),
            }}
          >
            {selectedWord}
          </Text>
          <View className="flex-row" style={{ gap: RS(10) }}>
            {revealedLetters.map((char, index) => (
              <View key={index} className="items-center">
                <Text
                  className="font-montserratBlack"
                  style={{
                    fontSize: RF(30),
                    color: "#4C4C4C",
                    marginBottom: RS(7),
                  }}
                >
                  {char !== "_" ? char : ""}
                </Text>
                <View
                  style={{
                    width: RW(35),
                    height: RH(3),
                    backgroundColor: "#4C4C4C",
                    borderRadius: 8,
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Balões flutuando */}
      {items.map((item) => (
        <MotiView
          key={item.id}
          from={{ translateY: 0, opacity: 1 }}
          animate={{ translateY: -RH(360) }}
          transition={{ type: "timing", duration: 5000 }}
          style={{
            position: "absolute",
            bottom: RH(80),
            left: item.left,
          }}
        >
          <BalloonLetter
            letter={item.letter}
            color={item.color}
            audio={item.audio}
            onPlayAudio={playLetterAudio}
            onPress={() => handlePress(item)}
          />
        </MotiView>
      ))}

      {/* Fundo de nuvens */}
      <ImageBackground
        source={require("@/assets/images/phases/balloon/clouds-bottom.png")}
        className="absolute w-full"
        style={{
          bottom: -RH(20),
          aspectRatio: 390 / 227,
        }}
      />

      <View
        className="w-full absolute items-center justify-center"
        style={{
          bottom: RH(80),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (started) {
              // 🔁 Se estiver parando o jogo → reseta tudo
              setItems([]);
              setCurrentLetterIndex(0);
              setRevealedLetters(Array(selectedWord.length).fill("_"));
              setPoints(0);

              restart(); // reinicia o score
            } else {
              // 🟢 Se estiver começando → limpa balões iniciais aleatórios
              setItems([]);
              start(); // inicia o cronometro ao começar a fase
              initializePhase();
            }
          }}
          className="bg-[#4c4c4c] items-center justify-center"
          style={{
            borderRadius: 20,
            width: RW(100),
          }}
        >
          <Text
            className="font-montserratBold text-white"
            style={{
              fontSize: RF(26),
              padding: RS(10),
            }}
          >
            {!started ? "Start" : "Stop"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
