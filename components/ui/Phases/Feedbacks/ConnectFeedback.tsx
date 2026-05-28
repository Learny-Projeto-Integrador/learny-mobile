import { View, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Svg, { Line } from "react-native-svg";

import { Connection, ConnectionCard } from "@/types/phases";
import { RS, RW } from "@/theme";

type Props = {
  connections: Connection[];

  leftCards: ConnectionCard[];
  rightCards: ConnectionCard[];

  hiddenCards: ConnectionCard[];
};

export default function ConnectFeedback({
  connections,
  leftCards,
  rightCards,
  hiddenCards,
}: Props) {
  const [localLeftCards, setLocalLeftCards] =
    useState<ConnectionCard[]>(leftCards);

  const [localRightCards, setLocalRightCards] =
    useState<ConnectionCard[]>(rightCards);

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
    const setter =
      column === "left"
        ? setLocalLeftCards
        : setLocalRightCards;

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
   * CONNECTIONS
   * ---------------------------------------
   */

  const renderedConnections = connections.map((conn) => {
    const from = localLeftCards.find(
      (card) => card.uniqueId === conn.from.uniqueId,
    );

    const to = localRightCards.find(
      (card) => card.uniqueId === conn.to.uniqueId,
    );

    return {
      ...conn,
      from: from || conn.from,
      to: to || conn.to,
    };
  });

  /*
   * ---------------------------------------
   * RENDER
   * ---------------------------------------
   */

  return (
    <View
      style={{
        marginTop: RS(20),
        position: "relative",
      }}
    >
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        {renderedConnections.map((conn, idx) => (
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
        className="w-full flex-row justify-between"
        style={{
          paddingHorizontal: RS(10),
        }}
      >
        {/* LEFT COLUMN */}
        <View style={{ gap: RS(20) }}>
          {localLeftCards.map((card) => {
            if (isHidden(card)) return null;

            return (
              <View
                key={card.uniqueId}
                onLayout={(event) => {
                  const { x, y, width, height } =
                    event.nativeEvent.layout;

                  updateCardPosition(
                    card.uniqueId,
                    "left",
                    x + width / 2,
                    y + height / 2,
                  );
                }}
              >
                <Image
                  source={card.image}
                  style={{
                    width: RW(70),
                    height: RW(70),
                    borderRadius: RW(100),
                  }}
                />
              </View>
            );
          })}
        </View>

        {/* RIGHT COLUMN */}
        <View style={{ gap: RS(20) }}>
          {localRightCards.map((card) => {
            if (isHidden(card)) return null;

            return (
              <View
                key={card.uniqueId}
                onLayout={(event) => {
                  const { x, y, width, height } =
                    event.nativeEvent.layout;

                  updateCardPosition(
                    card.uniqueId,
                    "right",
                    x + width / 2 + RW(230),
                    y + height / 2,
                  );
                }}
              >
                <Image
                  source={card.image}
                  style={{
                    width: RW(70),
                    height: RW(70),
                    borderRadius: RW(100),
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}