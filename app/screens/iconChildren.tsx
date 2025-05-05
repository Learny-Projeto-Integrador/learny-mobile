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

import React, { useCallback, useEffect, useState } from "react";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import ContainerFilhos from "@/components/ui/ContainerFilhos";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient"; // ou 'react-native-linear-gradient' se não for Expo
import ContainerActions from "@/components/ui/ContainerActions";
import ContainerFasesConcluidas from "@/components/ui/ContainerFasesConcluidas";
import ContainerMundoAtual from "@/components/ui/ContainerMundoAtual";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContainerActionChildren from "@/components/ui/ContainerActionChildren";
import ContainerAcessibilidade from "@/components/ui/ContainerAcessibilidade";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "profileParent"
>;

type ParentData = {
  idParent: string;
  foto: string;
  nome: string;
  filhos: [{}];
  filhoSelecionado: {};
};

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
        colors={["#d57388", "#8fb3d7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default function IconChildrenScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<ParentData | undefined>(undefined);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (e) {
      console.error("Erro ao buscar o token", e);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();

      const res = await fetch("http://10.0.2.2:5000/pais", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        setData(result);
        setId(result._id.$oid);
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleRedirectCadastro = () => {
    if (!data) return;
    navigation.navigate("register", { idParent: id });
  };

  const handleSair = () => {
    Alert.alert("Alerta", "Deseja mesmo sair?", [
      { text: "Cancelar" },
      { text: "Sair", onPress: () => navigation.navigate("index") },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate("edit", { idParent: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.fundoBranco}></View>
        <View style={styles.containerDados}>
          <View style={styles.viewFotoIcon}>
            <View style={styles.viewFotoNome}>
              <View style={{flexDirection: "row"}}>
                <Image
                  style={styles.foto}
                  source={
                    data && data.foto
                      ? { uri: data.foto }
                      : require("../../assets/images/joana.png")
                  }
                />
              </View>
              <GradientText style={styles.nameText}>Joana</GradientText>
            </View>
            <View style={styles.viewIcon}>
              <Image
                style={styles.icon}
                source={
                  data && data.foto
                    ? { uri: data.foto }
                    : require("../../assets/images/icon-voltar2.png")
                }
              />
            </View>
          </View>
          <View style={styles.containerFotos}>
          {Array.from({ length: 9 }).map((_, index) => (
            <View key={index} style={styles.selectIcon} />
          ))}
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
    gap: height * 0.04
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
  containerFotos: {
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
    backgroundColor: "#c9c9c9"
  },
});
