import { View, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import Svg, { Text as SvgText } from "react-native-svg";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

type Props = {
  letter: string;
  color: string;
  isAudioEnabled?: boolean;
  onPress?: () => void;
};

const audioMap: Record<string, any> = {
    A: require("@/assets/audios/letras/a.m4a"),
    B: require("@/assets/audios/letras/b.m4a"),
    C: require("@/assets/audios/letras/c.m4a"),
    D: require("@/assets/audios/letras/d.m4a"),
    E: require("@/assets/audios/letras/e.m4a"),
    F: require("@/assets/audios/letras/f.m4a"),
    G: require("@/assets/audios/letras/g.m4a"),
    H: require("@/assets/audios/letras/h.m4a"),
    I: require("@/assets/audios/letras/i.m4a"),
    J: require("@/assets/audios/letras/j.m4a"),
    K: require("@/assets/audios/letras/k.m4a"),
    L: require("@/assets/audios/letras/l.m4a"),
    M: require("@/assets/audios/letras/m.m4a"),
    N: require("@/assets/audios/letras/n.m4a"),
    O: require("@/assets/audios/letras/o.m4a"),
    P: require("@/assets/audios/letras/p.m4a"),
    Q: require("@/assets/audios/letras/q.m4a"),
    R: require("@/assets/audios/letras/r.m4a"),
    S: require("@/assets/audios/letras/s.m4a"),
    T: require("@/assets/audios/letras/t.m4a"),
    U: require("@/assets/audios/letras/u.m4a"),
    V: require("@/assets/audios/letras/v.m4a"),
    W: require("@/assets/audios/letras/w.m4a"),
    X: require("@/assets/audios/letras/x.m4a"),
    Y: require("@/assets/audios/letras/y.m4a"),
    Z: require("@/assets/audios/letras/z.m4a"),
  };

export default function BaloonLetter({ letter, color, isAudioEnabled, onPress }: Props) {
  const baloes: any = {
    "#EF5B6A": require("@/assets/images/balao-vermelho.png"),
    "#6CD2FF": require("@/assets/images/balao-azul.png"),
    "#FFB300": require("@/assets/images/balao-amarelo.png"),
    "#80D25B": require("@/assets/images/balao-verde.png"),
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
          width: width * 0.13,
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
          <Svg height="120" width="300">
            <SvgText
              fill="#fff"
              stroke={color}
              strokeWidth="2"
              fontSize={width * 0.09}
              fontFamily="Montserrat_900Black"
              fontWeight="bold"
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
