import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import TutorialCard from "@/components/ui/Phases/TutorialCard";
import PhaseBase from "@/components/ui/Phases/PhaseBase";

import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { useFeedbackContext } from "@/contexts/FeedbackContext";

import { RS, RW } from "@/theme";
import { usePhaseContext } from "@/contexts/PhaseContext";
import { Connection, ConnectionCard, FeelingOption } from "@/types/phases";
import Svg, { Line } from "react-native-svg";
import ConnectFeedback from "@/components/ui/Phases/Feedbacks/ConnectFeedback";
import ConnectCard from "@/components/ui/Phases/Connect/ConnectCard";
import { dinosEmotions } from "@/constants/phases/dinos";
import { colors } from "@/constants/colors";

export default function AtvConnectScreen() {
  const router = useRouter();

  const [selected, setSelected] = useState<ConnectionCard[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const [leftCards, setLeftCards] = useState<ConnectionCard[]>([]);
  const [rightCards, setRightCards] = useState<ConnectionCard[]>([]);
  const [hiddenCards, setHiddenCards] = useState<ConnectionCard[]>([]);

  const { showLoadingModal, hideLoadingModal } = useLoading();
  const { user } = useUser();
  const { setFeedback } = useFeedbackContext();

  const {
    started,

    start,
    finish,
    restart,

    incrementStats,

    useHint,
  } = usePhaseContext();

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const generateConnectOptions = (amount: number = 4): ConnectionCard[] => {
    const shuffledEmotions = shuffleArray(dinosEmotions);
    const shuffledColors = shuffleArray(colors);

    return shuffledEmotions.slice(0, amount).map((emotion, index) => ({
      ...emotion,

      color: shuffledColors[index],

      uniqueId: "",
      x: 0,
      y: 0,
      column: "left",
    }));
  };

  /*
   * ---------------------------------------
   * INITIALIZATION
   * ---------------------------------------
   */

  const initializePhase = () => {
    const generatedOptions = generateConnectOptions(4);

    const left = generatedOptions.map((item, index) => ({
      ...item,
      uniqueId: `left-${index}`,
      x: 0,
      y: 0,
      column: "left" as const,
    }));

    const right = shuffleArray(generatedOptions).map((item, index) => ({
      ...item,
      uniqueId: `right-${index}`,
      x: 0,
      y: 0,
      column: "right" as const,
    }));

    setLeftCards(left);
    setRightCards(right);
  };

  /*
   * ---------------------------------------
   * ANSWERS
   * ---------------------------------------
   */

  const handleSuccess = async () => {
    showLoadingModal();

    incrementStats({
      points: 10,
      coins: 1,
      correctAnswers: 1,
    });

    await finish();

    hideLoadingModal();

    router.push("/screens/phases/score");
  };

  const handleError = () => {
    incrementStats({
      wrongAnswers: 1,
    });

    const correctConnections = getCorrectConnections();

    setFeedback({
      label: `Veja quais são as ligações corretas`,

      content: (
        <ConnectFeedback
          connections={correctConnections}
          leftCards={leftCards}
          rightCards={rightCards}
          hiddenCards={hiddenCards}
        />
      ),
    });

    router.push("/screens/phases/errorFeedback");
  };

  const handleConfirm = async () => {
    const correctConnections = connections.filter((c) => c.isCorrect);

    const totalNeeded = leftCards.length - hiddenCards.length / 2;

    if (correctConnections.length === totalNeeded) {
      handleSuccess();
    } else {
      handleError();
    }
  };

  const handleSelect = (card: ConnectionCard) => {
    const alreadyConnected = connections.some(
      (conn) =>
        conn.from.uniqueId === card.uniqueId ||
        conn.to.uniqueId === card.uniqueId,
    );

    if (alreadyConnected) return;

    if (selected.length === 0) {
      setSelected([card]);
      return;
    }

    const first = selected[0];

    // impede selecionar da mesma coluna
    if (first.column === card.column) {
      setSelected([card]);
      return;
    }

    const isCorrect = first.id === card.id;

    setConnections((prev) => [
      ...prev,
      {
        from: first,
        to: card,
        isCorrect,
        color: isCorrect ? first.color : "#9E9E9E",
      },
    ]);

    setSelected([]);
  };

  const handleClearConnections = () => {
    setConnections([]);
    setSelected([]);
  };

  const getCorrectConnections = (): Connection[] => {
    return leftCards.reduce<Connection[]>((acc, leftCard) => {
      const rightCard = rightCards.find((right) => right.id === leftCard.id);

      if (!rightCard) return acc;

      const isHiddenPair =
        hiddenCards.some((c) => c.uniqueId === leftCard.uniqueId) ||
        hiddenCards.some((c) => c.uniqueId === rightCard.uniqueId);

      // não mostra pares removidos pela dica
      if (isHiddenPair) return acc;

      acc.push({
        from: leftCard,
        to: rightCard,
        isCorrect: true,
        color: leftCard.color,
      });

      return acc;
    }, []);
  };

  /*
   * ---------------------------------------
   * HINT
   * ---------------------------------------
   */

  const handleHint = async () => {
    showLoadingModal();

    const canUseHint = await useHint();

    hideLoadingModal();

    if (!canUseHint) return;

    const availablePairs = leftCards.filter((left) => {
      const alreadyConnected = connections.some(
        (c) => c.from.id === left.id || c.to.id === left.id,
      );

      return !alreadyConnected;
    });

    if (availablePairs.length === 0) return;

    const randomLeft =
      availablePairs[Math.floor(Math.random() * availablePairs.length)];

    const matchingRight = rightCards.find(
      (right) => right.id === randomLeft.id,
    );

    if (!matchingRight) return;

    setHiddenCards((prev) => [...prev, randomLeft, matchingRight]);
  };

  const isHidden = (card: ConnectionCard) => {
    return hiddenCards.some((c) => c.uniqueId === card.uniqueId);
  };

  const updateCardPosition = (
    uniqueId: string,
    column: "left" | "right",
    x: number,
    y: number,
  ) => {
    const setter = column === "left" ? setLeftCards : setRightCards;

    setter((prev) =>
      prev.map((card) =>
        card.uniqueId === uniqueId
          ? {
              ...card,
              x,
              y,
            }
          : card,
      ),
    );
  };

  /*
   * ---------------------------------------
   * EFFECTS
   * ---------------------------------------
   */

  useEffect(() => {
    initializePhase();
  }, []);

  /*
   * ---------------------------------------
   * RENDER
   * ---------------------------------------
   */

  return (
    <PhaseBase
      title="Watch & match"
      description="Emoções"
      color="#6CD2FF"
      headerImage={require("@/assets/images/phases/connect/intro.png")}
      tutorialTitle="Como Jogar"
      tutorialMessage={`
        Essa é a fase connect. Para concluir ela você deve conectar os animais 
        correspondentes. Quando um par correto é formado a linha entre os dois 
        icones é feita.
      `}
      started={started}
      onStart={start}
      onBack={() => {
        if (started) {
          restart();
        } else {
          router.back();
        }
      }}
      tutorialContent={
        <View
          className="flex-row flex-wrap items-center justify-center"
          style={{ gap: RS(20) }}
        >
          {leftCards.map((dino, index) => {
            return (
              <TutorialCard
                key={index}
                image={dino.image}
                audio={dino.audio}
                label={dino.emotion}
                color={dino.color}
              />
            );
          })}
        </View>
      }
    >
      <View>
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
        <View
          className="flex-row justify-between"
          style={{ paddingHorizontal: RS(30) }}
        >
          <View style={{ gap: RS(20) }}>
            {leftCards.map((card) => {
              if (isHidden(card)) return null;

              return (
                <ConnectCard
                  key={card.uniqueId}
                  image={card.image}
                  audio={user?.audioActive ? card.audio : null}
                  onPress={() => handleSelect(card)}
                  onLayout={(event) => {
                    const { x, y, width, height } = event.nativeEvent.layout;

                    updateCardPosition(
                      card.uniqueId,
                      "left",
                      x + width / 2,
                      y + height / 2,
                    );
                  }}
                />
              );
            })}
          </View>

          <View style={{ gap: RS(20) }}>
            {rightCards.map((card) => {
              if (isHidden(card)) return null;

              const connected = connections.some(
                (c) =>
                  c.from.uniqueId === card.uniqueId ||
                  c.to.uniqueId === card.uniqueId,
              );

              return (
                <ConnectCard
                  key={card.uniqueId}
                  image={card.image}
                  audio={user?.audioActive ? card.audio : null}
                  overlay={!connected}
                  onPress={() => handleSelect(card)}
                  onLayout={(event) => {
                    const { x, y, width, height } = event.nativeEvent.layout;

                    updateCardPosition(
                      card.uniqueId,
                      "right",
                      x + width / 2 + RW(220),
                      y + height / 2,
                    );
                  }}
                />
              );
            })}
          </View>
        </View>

        <View
          className="flex-row justify-center items-center"
          style={{
            marginTop: RS(20),
            gap: RS(20),
          }}
        >
          <TouchableOpacity onPress={handleHint}>
            <Image
              source={require("@/assets/icons/phases/hint.png")}
              style={{
                width: RW(40),
                aspectRatio: 49 / 67,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm}>
            <Image
              source={require("@/assets/icons/phases/confirm-red.png")}
              style={{
                width: RW(46),
                aspectRatio: 1 / 1,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClearConnections}>
            <Image
              source={require("@/assets/icons/phases/clear.png")}
              style={{
                width: RW(40),
                aspectRatio: 1 / 1,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </PhaseBase>
  );
}
