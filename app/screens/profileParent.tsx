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
import ContainerActions from "@/components/ui/ContainerActions";
import ContainerFasesConcluidas from "@/components/ui/ContainerFasesConcluidas";
import ContainerMundoAtual from "@/components/ui/ContainerMundoAtual";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function ProfileParentScreen() {
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
    navigation.navigate("edit");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerDados}>
        <Image
          style={styles.foto}
          source={
            data && data.foto
              ? { uri: data.foto }
              : require("../../assets/images/logo.png")
          }
        />
        <View>
          <View style={styles.containerNameParent}>
            {data
              ? data.nome.split(" ").map((nome, index) => (
                  <GradientText color1="#EF5B6A" color2="#6CD2FF" key={index} style={styles.nameText}>
                    {nome}
                  </GradientText>
                ))
              : ""}
          </View>
          <View style={styles.containerRankParent}>
            <View>
              <Text style={styles.txt}>You're a</Text>
              <GradientText color1="#EF5B6A" color2="#6CD2FF" style={styles.txtRankParent}>
                SUPER PARENT
              </GradientText>
            </View>
            <View style={styles.stackContainer}>
              <Image
                style={styles.fireIcon}
                source={require("../../assets/icons/icon-fogo.png")}
              />
              <Text style={styles.txtRankNumber}>5</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerWidgets}>
        <ProgressBarLvl progresso="50" />
        <ContainerFilhos
          //@ts-ignore
          filhos={data ? data.filhos : [{}]}
          //@ts-ignore
          filhoSelecionado={data ? data.filhoSelecionado : {}}
          handleRedirect={handleRedirectCadastro}
        />
        <ContainerActions />
        <View style={styles.containerDadosFases}>
          <ContainerMundoAtual />
          <ContainerFasesConcluidas />
        </View>
        <View style={styles.divider} />
        <View style={{ flexDirection: "row", gap: 40 }}>
          <TouchableOpacity onPress={handleEdit}>
            <Image
              style={styles.btn}
              source={require("../../assets/images/btn-editar.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSair}>
            <Image
              style={styles.btn}
              source={require("../../assets/images/btn-sair.png")}
            />
          </TouchableOpacity>
        </View>
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
  containerRankParent: {
    marginTop: width * 0.1,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: width * 0.02,
  },
  foto: {
    width: width * 0.33,
    height: width * 0.33,
    borderRadius: 20,
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
    color: "#4c4c4c",
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
    height: width * 0.01,
    borderRadius: 15,
    backgroundColor: "#a5a5a5",
  },
  btn: {
    width: width * 0.15,
    height: width * 0.15,
    aspectRatio: 62 / 62,
  },
});
