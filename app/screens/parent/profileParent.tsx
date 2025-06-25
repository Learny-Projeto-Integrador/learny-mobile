import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
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
import type { AlertData, RootStackParamList } from "@/types";
import CustomAlert from "@/components/ui/CustomAlert";
import HeaderParent from "@/components/ui/Parent/HeaderParent";
import { useLoadData } from "@/hooks/useLoadData";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "profileParent"
>;

type ParentData = {
  idParent: string;
  foto: string;
  nome: string;
  filhos: [{}];
  filhoSelecionado: {fasesConcluidas: any};
};

export default function ProfileParentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<ParentData | undefined>(undefined);
  const [childrenData, setChildrenData] = useState<any>(undefined);
  const [id, setId] = useState("");

  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const { loadData } = useLoadData();
  
  const fetchParentData = async () => {
    const data = await loadData("http://10.0.2.2:5000/pais");
    setData(data ?? null);
    setId(data._id.$oid);
  };
  const fetchChildrenData = async () => {
    const data = await loadData("http://10.0.2.2:5000/pais/criancas");
    setChildrenData(data ?? null);
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

  const outrosFilhos = childrenData?.filter(
    (child: any) => normalizarId(child._id) !== filhoSelecionadoId
  );

  const handleRedirectCadastro = () => {
    if (!data) return;
    navigation.navigate("register", { idParent: id });
  };

  const handleSair = () => {
    setAlertData({
      icon: require("@/assets/icons/icon-alerta.png"),
      title: "Alerta",
      message: "Deseja mesmo sair?",
      dual: true,
    });
    setAlertVisible(true);
  };

  const handleEdit = () => {
    navigation.navigate("edit", { userFilho: undefined });
  };

  return (
    <ScrollView style={styles.container}>
      {alertData && (
        <CustomAlert
          icon={alertData.icon}
          visible={alertVisible}
          title={alertData.title}
          message={alertData.message}
          dualAction={alertData.dual}
          onClose={() => setAlertVisible(false)}
          onRedirect={() => {
            setAlertVisible(false);
            navigation.navigate("index");
          }}
          closeLabel="Cancelar"
          redirectLabel="Sair"
        />
      )}
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
          //@ts-ignore
          filhos={childrenData ? childrenData : [{}]}
          //@ts-ignore
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
          <TouchableOpacity onPress={handleEdit}>
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
