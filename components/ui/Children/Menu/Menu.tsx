import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import CustomAlert from "../../CustomAlert";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
  const navigation = useNavigation<NavigationProp>();
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <ImageBackground
      source={require("@/assets/images/fundo-gradiente-claro.png")}
      style={styles.container}
    >
      <CustomAlert
        icon={require("@/assets/icons/icon-alerta.png")}
        visible={alertVisible}
        title="Alerta"
        message={"Deseja mesmo sair?"}
        dualAction={true}
        onClose={() => setAlertVisible(false)}
        onRedirect={() => {
          setAlertVisible(false);
          navigation.navigate("index");
        }}
        closeLabel="Cancelar"
        redirectLabel="Sair"
      />
      <View style={styles.containerFilho}>
        <TouchableOpacity
          onPress={() => navigation.navigate("diary")}
          style={{ flexDirection: "row" }}
        >
          <Image
            source={require("@/assets/icons/icon-diario.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAlertVisible(true)}
          style={{ flexDirection: "row" }}
        >
          <Image
            source={require("@/assets/icons/icon-sair-menu.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ranking")}
          style={{ flexDirection: "row" }}
        >
          <Image
            source={require("@/assets/icons/icon-ranking.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height * 0.15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    overflow: "hidden",
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
