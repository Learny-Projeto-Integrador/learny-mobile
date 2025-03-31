import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";

const ContainerFilhos = () => {
  return (
    <ImageBackground
      source={require("../../../assets/images/fundo-gradiente.png")}
      style={styles.container}
    >
      <View style={styles.containerFilho}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#fff",
            borderRadius: 50,
          }}
        />
        <View>
          <Text>Filho:</Text>
          <Text>Joana</Text>
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#fff",
            borderRadius: 50,
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: 'hidden',
  },
  containerFilho: {
    width: "90%",
    display: "flex", 
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ContainerFilhos;
