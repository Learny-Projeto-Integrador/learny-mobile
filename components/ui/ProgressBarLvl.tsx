import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

const ProgressBarLvl = ({ progresso }: any) => {
  const [widthAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progresso,
      duration: 500, // Duração da animação
      useNativeDriver: false,
    }).start();
  }, [progresso]);

  return (
    <ImageBackground
      source={require("../../assets/images/fundo-gradiente-claro.png")}
      style={styles.container}
    >
      <View style={styles.containerNumProgresso}>
        <Text style={styles.txtProgresso}>exp: 100</Text>
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
          <Image
            source={require("../../assets/images/fundo-gradiente-claro.png")}
            style={styles.gradientImage}
          />
        </Animated.View>
      </View>
    </ImageBackground>
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
