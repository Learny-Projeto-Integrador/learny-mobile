import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
} from "react-native";

import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import ContainerFilhos from "@/components/ui/ContainerFilhos";

export default function ProfileParentScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerDados}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        />
        <View>
          <View>
            <Text style={styles.nameText}>João</Text>
            <Text style={styles.nameText}>Marcos</Text>
          </View>
          <View style={styles.containerRankParent}>
            <View>
              <Text style={styles.txt}>You're</Text>
              <Text style={styles.txtRankParent}>SUPER PARENT</Text>
            </View>
            <View style={styles.stackContainer}>
              <Image
                style={styles.fireIcon}
                source={require("../assets/images/icon-fogo.png")}
              />
              <Text style={styles.txtRankNumber}>5</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: "94%" }}>
        <ProgressBar progress="50" />
      </View>
      <View style={{ width: "94%", marginTop: 15 }}>
        <ContainerFilhos />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: width * 0.05,
    gap: width * 0.05,
  },
  containerDados: {
    display: "flex",
    height: "auto",
    flexDirection: "row",
    marginTop: height * 0.05,
    gap: width * 0.05,
  },
  containerRankParent: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: width * 0.02,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
  },
  stackContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  fireIcon: {
    width: width * 0.09,
    height: width * 0.09,
    tintColor: "orange",
  },
  nameText: {
    fontSize: width * 0.055,
    fontFamily: "Montserrat_700Bold",
  },
  txt: {
    fontSize: width * 0.04,
    fontFamily: "Montserrat_400Regular",
  },
  txtRankParent: {
    fontSize: width * 0.045,
    fontFamily: "Montserrat_600SemiBold",
  },
  txtRankNumber: {
    position: "absolute",
    top: height * 0.015,
    fontSize: width * 0.045,
    fontFamily: "Montserrat_700Bold",
  },
});
