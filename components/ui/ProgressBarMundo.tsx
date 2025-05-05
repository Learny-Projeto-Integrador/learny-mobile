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

const ProgressBarMundo = ({ progresso, cor }: any) => {
  const [widthAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progresso,
      duration: 500, // Duração da animação
      useNativeDriver: false,
    }).start();
  }, [progresso]);

  return (
    <View
      style={styles.container}
    >
      <View style={styles.containerNumProgresso}>
        <Text style={styles.txtProgresso}>{progresso}%</Text>
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
          <View
            style={[styles.gradientImage, {backgroundColor: cor}]}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.03,
    borderRadius: 5,
  },
  containerNumProgresso: {
    width: width * 0.13, 
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
    width: width * 0.64,
    height: height * 0.02,
    overflow: "hidden",
    justifyContent: "center",
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
  },
});

export default ProgressBarMundo;
