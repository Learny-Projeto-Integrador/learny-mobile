import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import { useGetToken } from "@/hooks/useGetToken";
import GradientText from "@/components/ui/GradientText";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "iconChildren"
>;

type ChildData = {
  foto: string;
  avatar: string;
};

// IMPORT MANUAL DOS AVATARES
const avatarNames = [
  "avatar1",
  "avatar2",
  "avatar3",
  "avatar4",
  "avatar5",
  "avatar6",
  "avatar7",
  "avatar8",
  "avatar9",
];

export default function IconChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<ChildData | undefined>(undefined);
  const { getToken } = useGetToken();

  const avatarNames = ["avatar1", "avatar2"];

  const getAvatarImage = (name: string) => {
    switch (name) {
      case "avatar1":
        return require("../../assets/icons/avatars/avatar1.png");
      case "avatar2":
        return require("../../assets/icons/avatars/avatar2.png");
      default:
        return undefined;
    }
  };

  const loadData = async () => {
    try {
      const token = await getToken();
      const res = await fetch("http://10.0.2.2:5000/criancas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (res.ok) {
        setData(result);
      } else {
        alert(result.error);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const changeAvatar = async (avatarName: string) => {
    const body = { avatar: avatarName }; // salva o nome apenas

    try {
      const token = await getToken();
      const res = await fetch("http://10.0.2.2:5000/criancas", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (res.ok) {
        Alert.alert("Sucesso!", "Avatar alterado com sucesso!");
      } else {
        Alert.alert("Erro na edição", result.error);
      }
    } catch (err: any) {
      Alert.alert("Erro inesperado", "Não foi possível conectar ao servidor.");
    }
  };

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
                    data && data.foto
                      ? { uri: data.foto }
                      : require("../../assets/images/joana.png")
                  }
                />
              </View>
              <GradientText
                color1="#946274"
                color2="#5c94b3"
                style={styles.nameText}
              >
                Joana
              </GradientText>
            </View>
            <TouchableOpacity style={styles.viewIcon} onPress={() => navigation.goBack()}>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/icon-voltar2.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.containerAvatares}>
            {Array.from({ length: 9 }).map((_, index) => {
              const avatarName = avatarNames[index];

              return (
                <TouchableOpacity
                  key={index}
                  onPress={avatarName ? () => changeAvatar(avatarName) : undefined}
                  disabled={!avatarName}
                  style={styles.selectIcon}
                >
                  {avatarName && (
                    <Image
                      source={getAvatarImage(avatarName)}
                      style={{ width: width * 0.1, height: width * 0.1 }}
                      resizeMode="contain"
                    />
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
