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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContainerActionChildren from "@/components/ui/ContainerActionChildren";
import ContainerAcessibilidade from "@/components/ui/ContainerAcessibilidade";
import GradientText from "@/components/ui/GradientText";

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

export default function ProfileChildrenScreen() {
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
    <ScrollView style={styles.container}>
      <View style={styles.containerDados}>
        <Image
          style={styles.foto}
          source={
            data && data.foto
              ? { uri: data.foto }
              : require("../../assets/images/joana.png")
          }
        />
        <View style={{ height: 180, justifyContent: "center", gap: 10 }}>
          <View style={styles.containerNameChildren}>
            {/* {data
              ? data.nome.split(" ").map((nome, index) => (
                  <GradientText key={index} style={styles.nameText}>
                    {nome}
                  </GradientText>
                ))
              : ""} */}
            <GradientText color1="#EF5B6A" color2="#6CD2FF" style={styles.nameText}>Joana</GradientText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt}>lvl 100</Text>
          </View>
        </View>
        <View style={styles.viewVoltar}>
          <Image
            style={styles.iconVoltar}
            source={require("../../assets/images/icon-voltar2.png")}
          />
        </View>
      </View>
      <View style={styles.containerWidgets}>
        <ProgressBarLvl progresso="50" />
        <View style={{ gap: 10 }}>
          <ContainerAcessibilidade />
          <ContainerActionChildren icon={require("../../assets/images/icon-estatisticas.png")} title="Estatísticas" />
          <ContainerActionChildren icon={require("../../assets/images/icon-quests.png")} title="Quests" />
          <ContainerActionChildren icon={require("../../assets/images/icon-notificacoes.png")} title="Notificações" />
        </View>
          <TouchableOpacity style={styles.viewBtn} onPress={handleSair}>
            <Image
              style={styles.btn}
              source={require("../../assets/images/btn-sair.png")}
            />
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: width * 0.08,
    gap: width * 0.05,
  },
  containerDados: {
    display: "flex",
    height: "auto",
    flexDirection: "row",
    marginTop: height * 0.04,
    gap: width * 0.05,
  },
  foto: {
    width: width * 0.33,
    height: width * 0.33,
    borderRadius: 20,
  },
  viewVoltar: {
    position: "relative",
    alignItems: "center",
    paddingLeft: width * 0.09,
    paddingTop: height * 0.01
  },
  iconVoltar: {
    width: width * 0.075,
    height: width * 0.075,
  },
  containerNameChildren: {
    height: width * 0.08,
  },
  nameText: {
    fontSize: width * 0.07,
    fontFamily: "Montserrat_800ExtraBold",
  },
  txt: {
    color: "#4c4c4c",
    fontSize: width * 0.04,
    fontFamily: "Montserrat_400Regular",
  },
  containerWidgets: {
    width: "100%",
    marginTop: height * 0.03,
    gap: width * 0.04,
    alignItems: "center",
  },
  viewBtn: {
    flexDirection: "row", 
    marginTop: height * 0.02, 
    marginBottom: height * 0.04, 
  },
  btn: {
    width: width * 0.15,
    height: width * 0.15,
    aspectRatio: 62 / 62,
  },
});
