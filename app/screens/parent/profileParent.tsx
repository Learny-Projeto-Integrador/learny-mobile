import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import ProgressBarLvl from "@/components/ui/ProgressBarLvl";
import ContainerFilhos from "@/components/ui/Parent/ContainerFilhos";
import ContainerActions from "@/components/ui/Parent/ContainerActions";
import ContainerFasesConcluidas from "@/components/ui/Parent/ContainerFasesConcluidas";
import ContainerMundoAtual from "@/components/ui/Parent/ContainerMundoAtual";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ParentData, RootStackParamList } from "@/types";
import HeaderParent from "@/components/ui/Parent/HeaderParent";
import { useApi } from "@/hooks/useApi";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "profileParent">;

export default function ProfileParentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { loading, request, showAlert, AlertComponent } = useApi();
  const [data, setData] = useState<ParentData | undefined>(undefined);
  const [childrenData, setChildrenData] = useState<any>(undefined);
  const [id, setId] = useState("");
  
  const fetchParentData = async () => {
    const result = await request({endpoint: "/pais"});
    setData(result ?? null);
    setId(result._id.$oid);
  };

  const fetchChildrenData = async () => {
    const result = await request({endpoint: "/pais/criancas"});
    setChildrenData(result ?? null);
  };

  useFocusEffect(
    useCallback(() => {
      fetchParentData();
      fetchChildrenData();
    }, [])
  );

  const normalizarId = (idObj: any) => (typeof idObj === "string" ? idObj : idObj?.$oid);

  const filhoSelecionadoId = normalizarId(data?.filhoSelecionado);

  const filhoSelecionado = childrenData?.find(
    (child: any) => normalizarId(child._id) === filhoSelecionadoId
  );

  const handleRedirectCadastro = () => {
    if (!data) return;
    navigation.navigate("register", { idParent: id });
  };

  const handleSair = () => {
    showAlert({
      icon: require("@/assets/icons/icon-alerta.png"),
      title: "Alerta",
      message: "Deseja mesmo sair?",
      dualAction: true,
      redirectLabel: "Sair",
      onRedirect: () => navigation.replace("index")
    });
  };

  return (
    <ScrollView style={styles.container}>
      <AlertComponent />
      {data && (
          <HeaderParent 
            foto={data.foto}
            nome={data.nome}
          />
        )
      }
      <View style={styles.containerWidgets}>
        <ProgressBarLvl pontos="50" progresso="50" />
        <ContainerFilhos
          filhos={childrenData ? childrenData : [{}]}
          filhoSelecionado={filhoSelecionado ? filhoSelecionado : {}}
          handleRedirect={handleRedirectCadastro}
          onSelectFilho={async () => {
            await fetchParentData();
            await fetchChildrenData();
          }}
        />
        <ContainerActions />
        <View style={styles.containerDadosFases}>
          <ContainerMundoAtual
            filhoSelecionado={!!filhoSelecionado}
          />
          <ContainerFasesConcluidas
            filhoSelecionado={filhoSelecionado}
            fasesConcluidas={filhoSelecionado?.fasesConcluidas}
          />
        </View>
        <View style={styles.divider} />
        <View style={{ flexDirection: "row", gap: 40 }}>
          <TouchableOpacity onPress={() => navigation.navigate("edit", { userFilho: undefined })}>
            <Image
              style={styles.btn}
              source={require("@/assets/images/btn-editar.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSair}>
            <Image
              style={styles.btn}
              source={require("@/assets/images/btn-sair.png")}
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
