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
  import MaskedView from "@react-native-masked-view/masked-view";
  import { LinearGradient } from "expo-linear-gradient"; // ou 'react-native-linear-gradient' se não for Expo
  import ContainerActions from "@/components/ui/ContainerActions";
  import ContainerFasesConcluidas from "@/components/ui/ContainerFasesConcluidas";
import ContainerMundoAtual from "@/components/ui/ContainerMundoAtual";
  
  const GradientText = ({ style, children }) => {
    return (
      <MaskedView maskElement={<Text style={[style, { backgroundColor: "transparent" }]}>{children}</Text>}>
        <LinearGradient
          colors={["#EF5B6A", "#6CD2FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[style, { opacity: 0 }]}>{children}</Text>
        </LinearGradient>
      </MaskedView>
    );
  };
  
  export default function ProfileParentScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.containerDados}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
          <View>
            <View>
              <GradientText style={styles.nameText}>João</GradientText>
              <GradientText style={styles.nameText}>Marcos</GradientText>
            </View>
            <View style={styles.containerRankParent}>
              <View>
                <GradientText style={styles.txt}>You're</GradientText>
                <GradientText style={styles.txtRankParent}>SUPER PARENT</GradientText>
              </View>
              <View style={styles.stackContainer}>
                <Image
                  style={styles.fireIcon}
                  source={require("../../assets/images/icon-fogo.png")}
                />
                 <Text style={styles.txtRankNumber}>5</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ width: "94%", gap: 30 }}>
          <ProgressBar progress="50" />
          <ContainerFilhos />
          <ContainerActions />
          <View style={{ width: "100%", flexDirection: "row", gap: 20}}>
            <ContainerMundoAtual/>
            <ContainerFasesConcluidas />
          </View>
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
      color: "#fff",
      fontFamily: "Montserrat_700Bold",
    },
  });
  