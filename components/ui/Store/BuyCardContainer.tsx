import { ReactNode, useRef, useState } from "react";
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { RS, RW } from "@/theme";

interface Props {
  children: ReactNode;
}

export default function BuyCardContainer({ children }: Props) {
  const scrollRef = useRef<ScrollView>(null);

  const [contentWidth, setContentWidth] = useState(1);
  const [containerWidth, setContainerWidth] = useState(1);
  const [scrollX, setScrollX] = useState(0);

  const scrollbarWidth =
    contentWidth > containerWidth
      ? (containerWidth / contentWidth) * containerWidth
      : containerWidth;

  const maxScroll = contentWidth - containerWidth;

  const thumbTranslate =
    maxScroll > 0
      ? (scrollX / maxScroll) * (containerWidth - scrollbarWidth)
      : 0;

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrollX(e.nativeEvent.contentOffset.x);
  }

  return (
    <View
      style={{
        gap: RS(12),
      }}
    >
      <View
        onLayout={(e) => {
          setContainerWidth(e.nativeEvent.layout.width);
        }}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onContentSizeChange={(w) => {
            setContentWidth(w);
          }}
          contentContainerStyle={{
            paddingHorizontal: RS(4),
            gap: RS(12),
            alignItems: "flex-start",
          }}
        >
          {children}
        </ScrollView>
      </View>

      {/* SCROLLBAR */}
      <View
        style={{
          width: "100%",
          height: RS(5),
          borderRadius: 999,
          backgroundColor: "#D9D9D9",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: scrollbarWidth,
            height: "100%",
            borderRadius: 999,
            backgroundColor: "#6A6A6A",
            transform: [{ translateX: thumbTranslate }],
          }}
        />
      </View>
    </View>
  );
}