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
      source={require("../../assets/images/fundo-gradiente.png")}
      style={styles.container}
    >
      <View style={styles.containerFilho}>
        <Image
        source={require("../../assets/images/joana.png")}
          style={{
            width: 70,
            height: 70,
            backgroundColor: "#fff",
            borderRadius: 50,
          }}
        />
        <View style={{
          width: "64%",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: 30,
        }}>
          <Text style={{
            fontSize: 18,
            color: "#fff",
          }}>Filho:</Text>
          <Text style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#fff",
          }}>Laura</Text>
        </View>
        <Image
          source={require("../../assets/images/icon-dropdown.png")}
          style={{
            width: 50,
            height: 50,
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
    width: "100%",
    display: "flex", 
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ContainerFilhos;
