import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import ContainerFilhos from "@/components/ui/ContainerFilhos";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient"; // ou 'react-native-linear-gradient' se não for Expo
import ContainerActions from "@/components/ui/ContainerActions";
import ContainerFasesConcluidas from "@/components/ui/ContainerFasesConcluidas";
import ContainerMundoAtual from "@/components/ui/ContainerMundoAtual";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "profileParent">;


const GradientText = ({ style, children }: any) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent" }]}>
          {children}
        </Text>
      }
    >
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
  const navigation = useNavigation<NavigationProp>();

  const handleRedirectCadastro = () => {
    navigation.navigate("register")
  }

  const handleSair = () => {
    Alert.alert("Alerta", "Deseja mesmo sair?", [
      { text: "Cancelar" },
      { text: "Sair", onPress: () => navigation.navigate("index") },
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerDados}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
        <View>
          <View style={styles.containerNameParent}>
            <GradientText style={styles.nameText}>João</GradientText>
            <GradientText style={styles.nameText}>Marcos</GradientText>
          </View>
          <View style={styles.containerRankParent}>
            <View>
              <GradientText style={styles.txt}>You're a</GradientText>
              <GradientText style={styles.txtRankParent}>
                SUPER PARENT
              </GradientText>
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
      <View style={styles.containerWidgets}>
        <ProgressBar progress="50" />
        <ContainerFilhos handleRedirect={handleRedirectCadastro} />
        <ContainerActions />
        <View style={styles.containerDadosFases}>
          <ContainerMundoAtual />
          <ContainerFasesConcluidas />
        </View>
        <View
          style={styles.divider}
        />
        <TouchableOpacity 
          style={styles.btnSair}
          onPress={handleSair}
          >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/images/icon-sair.png")}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.08,
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
    marginTop: width * 0.1,
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
    paddingBottom: width * 0.01,
  },
  fireIcon: {
    width: width * 0.09,
    height: width * 0.09,
    tintColor: "orange",
  },
  containerNameParent: {
    height: width * 0.08,
  },
  nameText: {
    fontSize: width * 0.07,
    fontFamily: "Montserrat_800ExtraBold",
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
    top: height * 0.012,
    fontSize: width * 0.045,
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
  },
  containerWidgets: {
    width: "100%",
    marginTop: height * 0.03,
    gap: width * 0.04,
    alignItems: "center",
  },
  containerDadosFases: {
    width: "100%",
    flexDirection: "row",
    gap: width * 0.05,
    marginTop: width * 0.02,
    marginBottom: width * 0.02,
  },
  divider: {
    width: "100%",
    height: width * 0.02,
    borderRadius: 15,
    backgroundColor: "#a5a5a5",
  },
  btnSair: {
    width: width * 0.15,
    height: width * 0.15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,

    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Sombra para Android
    elevation: 5,
  },
});
