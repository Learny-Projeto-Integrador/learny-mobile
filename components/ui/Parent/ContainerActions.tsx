import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const ContainerActions = () => {
  return (
    <LinearGradient
      colors={['#b25563', '#669bbb']}
      style={styles.container}
    >
      <View style={styles.containerFilho}>
        <Image
        source={require("@/assets/icons/icon-notificacao.png")}
        style={styles.icon}
        />
        <Image
        source={require("@/assets/icons/icon-atv.png")}
        style={styles.icon}
        />
        <Image
        source={require("@/assets/icons/icon-chat.png")}
        style={styles.icon}
        />
      </View>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height * 0.15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    overflow: 'hidden',
  },
  icon: {
    width: width * 0.15,
    aspectRatio: 62 / 62,
  },
  containerFilho: {
    width: "70%",
    display: "flex", 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ContainerActions;
