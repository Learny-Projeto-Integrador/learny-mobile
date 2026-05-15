import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import Svg, { Line } from "react-native-svg";

import { RS, RW } from "@/theme";

import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { usePhaseContext } from "@/contexts/PhaseContext";

import {
  Connection,
  ConnectionCard,
  EmotionOption,
  Feedback,
  PhaseStats,
} from "@/types/phases";

import ConnectCard from "@/components/ui/Phases/Connect/ConnectCard";
import ConnectFeedback from "@/components/ui/Phases/Feedbacks/ConnectFeedback";

import { shuffleArray } from "@/utils/emotions";
import { useAudio } from "@/contexts/AudioContext";

interface Props {
  phaseOptions: EmotionOption[];

  onSuccess: (stats: Partial<PhaseStats>) => void;

  onError: (feedbackData: Feedback) => void;
}

export default function ConnectActivity({
  phaseOptions,
  onSuccess,
  onError,
}: Props) {
  const [selected, setSelected] = useState<ConnectionCard[]>([]);

  const [connections, setConnections] = useState<Connection[]>([]);

  const [leftCards, setLeftCards] = useState<ConnectionCard[]>([]);

  const [rightCards, setRightCards] = useState<ConnectionCard[]>([]);

  const [hiddenCards, setHiddenCards] = useState<ConnectionCard[]>([]);

  const { showLoadingModal, hideLoadingModal } = useLoading();

  const { user } = useUser();

  const { playAudio } = useAudio();

  const { useHint } = usePhaseContext();

  /*
   * ---------------------------------------
   * INITIALIZATION
   * ---------------------------------------
   */

  const initializePhase = () => {
    const generatedOptions = phaseOptions;

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

  const handleConfirm = async () => {
    const correctConnections = connections.filter((c) => c.isCorrect);

    const totalNeeded = leftCards.length - hiddenCards.length / 2;

    if (correctConnections.length === totalNeeded) {
      onSuccess({
        points: 10,
        coins: 1,
        correctAnswers: 1,
      });

      return;
    }

    const correctFeedbackConnections = getCorrectConnections();

    onError({
      stats: {
        wrongAnswers: 1,
      },

      label: `Veja quais são as ligações corretas`,

      content: (
        <ConnectFeedback
          connections={correctFeedbackConnections}
          leftCards={leftCards}
          rightCards={rightCards}
          hiddenCards={hiddenCards}
        />
      ),
    });
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

        color: isCorrect ? first.color || "#4c4c4c" : "#9E9E9E",
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

        color: leftCard.color || "#4c4c4c",
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

  /*
   * ---------------------------------------
   * HELPERS
   * ---------------------------------------
   */

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
        style={{
          paddingHorizontal: RS(30),
        }}
      >
        <View style={{ gap: RS(20) }}>
          {leftCards.map((card) => {
            if (isHidden(card)) return null;

            return (
              <ConnectCard
                key={card.uniqueId}
                image={card.image}
                onPress={async () => {
                  await playAudio(card.audio);
                  handleSelect(card);
                }}
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
                overlay={!connected}
                onPress={async () => {
                  await playAudio(card.audio);
                  handleSelect(card);
                }}
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
  );
}
