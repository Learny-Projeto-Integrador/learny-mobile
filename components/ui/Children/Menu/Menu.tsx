import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import CustomAlert from "../../CustomAlert";
import { LinearGradient } from "expo-linear-gradient";
import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
  const navigation = useNavigation<NavigationProp>();
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <LinearGradient
      colors={['#b25563', '#669bbb']}
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
    </LinearGradient>
  );
}

const { width, height } = Dimensions.get("window");

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    height: verticalScale(100),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(30),
    overflow: "hidden",
  },
  icon: {
    width: scale(50),
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
