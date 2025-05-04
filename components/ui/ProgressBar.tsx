import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";

const ProgressBar = ({ progress }: any) => {
  const [widthAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500, // Duração da animação
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <ImageBackground
      source={require("../../assets/images/fundo-gradiente-claro.png")}
      style={styles.container}
    >
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
          <Image
            source={require("../../assets/images/fundo-gradiente-claro.png")}
            style={styles.gradientImage}
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderRadius: 15,
    overflow: 'hidden',
  },
  outerBar: {
    width: "97%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
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
    borderRadius: 10,
  },
});

export default ProgressBar;
