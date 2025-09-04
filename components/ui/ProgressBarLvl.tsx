import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  pontos: string;
  progresso: number;
}

const ProgressBarLvl = ({ pontos, progresso }: Props) => {
  const [widthAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progresso,
      duration: 500, // Duração da animação
      useNativeDriver: false,
    }).start();
  }, [progresso]);

  return (
    <LinearGradient
        colors={['#b25563', '#669bbb']}
        style={styles.container}
      >
      <View style={styles.containerNumProgresso}>
        <Text style={styles.txtProgresso}>exp: {pontos}</Text>
      </View>
      <View style={styles.outerBar}>
        <Animated.View
          style={[
            styles.innerBar,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={['#b25563', '#669bbb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientImage}
          />
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.045,
    borderRadius: 10,
    overflow: "hidden",
  },
  containerNumProgresso: {
    width: width * 0.16, 
    height: "100%",
    backgroundColor: "#4C4C4C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  txtProgresso: {
    color: "#fff",
    fontSize: width * 0.025,
    fontFamily: 'Montserrat_700Bold',
  },
  outerBar: {
    backgroundColor: "#fff",
    width: width * 0.67,
    height: height * 0.035,
    overflow: "hidden",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  innerBar: {
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientImage: {
    width: "100%",
    height: 30,
  },
});

export default ProgressBarLvl;
