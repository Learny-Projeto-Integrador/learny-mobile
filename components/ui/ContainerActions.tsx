import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";

const ContainerActions = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/fundo-gradiente-claro.png")}
      style={styles.container}
    >
      <View style={styles.containerFilho}>
        <Image
        source={require("../../assets/images/icon-notificacao.png")}
        style={styles.icon}
        />
        <Image
        source={require("../../assets/images/icon-atv.png")}
        style={styles.icon}
        />
        <Image
        source={require("../../assets/images/icon-chat.png")}
        style={styles.icon}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    overflow: 'hidden',
  },
  icon: {
    width: 80,
    height: 80,
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
