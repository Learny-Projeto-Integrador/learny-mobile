import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import GradientText from "@/components/ui/GradientText";
import { useApi } from "@/hooks/useApi";
import { useCustomAlert } from "@/contexts/AlertContext";
import CharacterSprite from "@/components/ui/Children/CharacterSprite";
import { useUser } from "@/contexts/UserContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList,"iconChildren">;

type ChildData = {
  nome: string;
  foto: string;
  avatar: string;
};

export default function IconChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useUser();
  const chacaterSprites = ["boy", "girl"];

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.fundoBranco}></View>
        <View style={styles.containerDados}>
          <View style={styles.viewFotoIcon}>
            <View style={styles.viewFotoNome}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.foto}
                  source={
                    user && user.foto
                      ? { uri: user.foto }
                      : require("@/assets/images/logo.png")
                  }
                />
              </View>
              <GradientText
                color1="#946274"
                color2="#5c94b3"
                style={styles.nameText}
              >
                {user ? user.nome : ""}
              </GradientText>
            </View>
            <TouchableOpacity
              style={styles.viewIcon}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.icon}
                source={require("@/assets/icons/icon-voltar2.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.containerAvatares}>
            {Array.from({ length: 9 }).map((_, index) => {
              const avatar = chacaterSprites[index];

              return (
                <TouchableOpacity
                  key={index}
                  disabled={!avatar}
                  style={styles.selectIcon}
                >
                  {avatar && (
                    <CharacterSprite sprite={avatar} direction="down" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4C4C4C",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  fundoBranco: {
    height: height * 0.83,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  containerDados: {
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingVertical: height * 0.1,
    alignItems: "center",
    gap: height * 0.04,
  },
  viewFotoIcon: {
    flexDirection: "row",
    paddingLeft: width * 0.2,
    gap: width * 0.1,
  },
  viewFotoNome: {
    alignItems: "center",
    gap: height * 0.02,
  },
  foto: {
    width: width * 0.4,
    borderRadius: 50,
    aspectRatio: 147 / 141,
    elevation: 15,
  },
  viewIcon: {
    paddingTop: height * 0.12,
    flexDirection: "row",
  },
  icon: {
    width: width * 0.09,
    aspectRatio: 1 / 1,
  },
  nameText: {
    fontSize: width * 0.07,
    fontFamily: "Montserrat_700Bold",
  },
  containerAvatares: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
    gap: width * 0.04,
  },
  selectIcon: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: 30,
    backgroundColor: "#c9c9c9",
    alignItems: "center",
    justifyContent: "center",
  },
});
