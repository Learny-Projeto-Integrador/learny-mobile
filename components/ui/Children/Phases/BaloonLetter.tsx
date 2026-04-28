import { View, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import Svg, { Text as SvgText } from "react-native-svg";
import { Audio } from "expo-av";
import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

type Props = {
  letter: string;
  color: string;
  isAudioEnabled?: boolean;
  onPress?: () => void;
};

const audioMap: Record<string, any> = {
    A: require("@/assets/audios/letters/a.m4a"),
    B: require("@/assets/audios/letters/b.m4a"),
    C: require("@/assets/audios/letters/c.m4a"),
    D: require("@/assets/audios/letters/d.m4a"),
    E: require("@/assets/audios/letters/e.m4a"),
    F: require("@/assets/audios/letters/f.m4a"),
    G: require("@/assets/audios/letters/g.m4a"),
    H: require("@/assets/audios/letters/h.m4a"),
    I: require("@/assets/audios/letters/i.m4a"),
    J: require("@/assets/audios/letters/j.m4a"),
    K: require("@/assets/audios/letters/k.m4a"),
    L: require("@/assets/audios/letters/l.m4a"),
    M: require("@/assets/audios/letters/m.m4a"),
    N: require("@/assets/audios/letters/n.m4a"),
    O: require("@/assets/audios/letters/o.m4a"),
    P: require("@/assets/audios/letters/p.m4a"),
    Q: require("@/assets/audios/letters/q.m4a"),
    R: require("@/assets/audios/letters/r.m4a"),
    S: require("@/assets/audios/letters/s.m4a"),
    T: require("@/assets/audios/letters/t.m4a"),
    U: require("@/assets/audios/letters/u.m4a"),
    V: require("@/assets/audios/letters/v.m4a"),
    W: require("@/assets/audios/letters/w.m4a"),
    X: require("@/assets/audios/letters/x.m4a"),
    Y: require("@/assets/audios/letters/y.m4a"),
    Z: require("@/assets/audios/letters/z.m4a"),
  };

export default function BaloonLetter({ letter, color, isAudioEnabled, onPress }: Props) {
  const baloes: any = {
    "#EF5B6A": require("@/assets/images/phases/balloon/balloons/red.png"),
    "#6CD2FF": require("@/assets/images/phases/balloon/balloons/blue.png"),
    "#FFB300": require("@/assets/images/phases/balloon/balloons/yellow.png"),
    "#80D25B": require("@/assets/images/phases/balloon/balloons/green.png"),
  };

  const playSound = async (letter: string) => {
    const { sound } = await Audio.Sound.createAsync(audioMap[letter]);
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  };

  const handlePress = () => {
    isAudioEnabled && playSound(letter);
    onPress && onPress();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <ImageBackground
        source={baloes[color]}
        style={{
          width: scale(45),
          aspectRatio: 65 / 94,
          position: "relative",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
          }}
        >
          <Svg height={verticalScale(65)} width={scale(32)}>
            <SvgText
              fill="#fff"
              stroke={color}
              strokeWidth={scale(1.5)}
              fontSize={scale(30)}
              fontFamily="Montserrat_900Black"
              x="50%"
              y="33%"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {letter}
            </SvgText>
          </Svg>
        </View>
      </ImageBackground>
      </TouchableOpacity>
  );
}
