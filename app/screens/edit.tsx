import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import DateInput from "@/components/ui/DateInput";
import LoginInput from "@/components/ui/LoginInput";
import { useFocusEffect } from "expo-router";
import { useApi } from "@/hooks/useApi";
import { useLoading } from "@/contexts/LoadingContext";
import { pickImage } from "@/utils/pickImage";

type Props = NativeStackScreenProps<RootStackParamList, "edit">;

export default function EditScreen({ route, navigation }: Props) {
  const { userFilho } = route.params ?? {};
  const { showLoading, hideLoading } = useLoading();
  const { loading, request, showAlert, AlertComponent } = useApi();
  const [data, setData] = useState<any>(null);

  let pathGet = "pais";
  let pathPut = "pais";
  let pathDelete = "pais";

  if (userFilho) {
    pathGet = "pais/crianca/" + userFilho;
    pathDelete = "pais/crianca/" + userFilho;
    pathPut = "pais/criancas";
  }

  const fetchData = async () => {
    showLoading();
    const result = await request({
      endpoint: `/${pathGet}`,
    });
    setData(result ?? null);
    hideLoading();
  };

  const updateField = (field: any, value: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) updateField('foto', uri);
  }

  const handleEdit = async () => {
    const result = await request({
      endpoint: `/${pathPut}`,
      method: "PUT",
      body: { 
        foto: data?.foto,
        usuario: data?.usuario,
        nome: data?.nome,
        senha: data?.senha,
        email: data?.email,
        dataNasc: data?.dataNasc,
      },
    })

    if (result) {
      showAlert({
        icon: require("@/assets/icons/icon-check-gradiente.png"),
        title: "Sucesso!",
        message: result.message,
        dualAction: true,
      });
    }
  };

  const handleDelete = async () => {
    const result = await request({
      endpoint: `/${pathDelete}`,
      method: "DELETE",
    })

    if (result !== null) {
      showAlert({
        icon: require("@/assets/icons/icon-check-gradiente.png"),
        title: "Sucesso!",
        message: "A conta foi excluída com sucesso",
      });
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ImageBackground
      source={require("@/assets/images/fundo-gradiente.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <AlertComponent />
      {data && (
        <View style={{width: "100%", alignItems: "center", justifyContent: "center"}}>
          <View style={styles.containerFoto}>
            <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.navigate("profileParent")}>
              <Image
                style={styles.iconVoltar}
                source={require("@/assets/icons/icon-voltar.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePickImage}>
              {data.foto ? (
                <Image source={{ uri: data.foto }} style={styles.img} />
              ) : (
                <Image
                  style={styles.btnImg}
                  source={require("@/assets/icons/icone-camera.png")}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.viewInputs}>
          <LoginInput campo="Usuário" valor={data.usuario} atualizar={(value) => updateField('usuario', value)} edit={true} />
          <LoginInput campo="Nova Senha" valor={data.senha} atualizar={(value) => updateField('senha', value)} />
          <LoginInput campo="Nome" valor={data.nome} atualizar={(value) => updateField('nome', value)} />
          <LoginInput campo="Email" valor={data.email} atualizar={(value) => updateField('email', value)} />
          <DateInput valor={data.dataNasc} atualizar={(value) => updateField('dataNasc', value)} />

            <TouchableOpacity
              style={styles.btn}
              onPress={
                () => handleEdit()
              }
            >
              {loading ? (
                <ActivityIndicator size="large" color="#547d98" />
              ) : (
                <Text style={styles.btnText}>Confirmar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={
                () => handleDelete()
              }
            >
              {loading ? (
                <ActivityIndicator size="large" color="#547d98" />
              ) : (
                <Text style={[styles.btnText, { color: "#EF5B6A" }]}>
                  Excluir Conta
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: height * 0.035,
  },
  containerFoto: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnVoltar: {
    position: "absolute",
    top: 0,
    left: width * 0.13,
  },
  iconVoltar: {
    width: width * 0.08,
    height: width * 0.08,
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: height * 0.07,
    borderRadius: 15,
  },
  btnText: {
    fontSize: width * 0.04,
    fontFamily: "Montserrat_700Bold",
    color: "#547d98",
    textAlign: "center",
  },
  btnImg: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 20,
  },
  img: {
    width: width * 0.34,
    height: width * 0.34,
    borderRadius: 20,
  },
  viewInputs: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    display: "flex",
    alignItems: "center",
    width: "75%",
    gap: height * 0.02,
  },
  viewBtn: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: width * 0.05,
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    gap: width * 0.02,
  },
  inputDate: {
    width: width * 0.5,
    borderRadius: 8,
    fontSize: width * 0.04,
  },
});
