import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "react-native";
import React, { useCallback } from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "@/types";

type Props = NativeStackScreenProps<RootStackParamList, "edit">;

import DateInput from "@/components/ui/DateInput";
import LoginInput from "@/components/ui/LoginInput";
import { useFocusEffect } from "expo-router";
import CustomAlert from "@/components/ui/CustomAlert";
import { useGetToken } from "@/hooks/useGetToken";
import { useLoadData } from "@/hooks/useLoadData";

export default function EditScreen({ route, navigation }: Props) {
  const { userFilho } = route.params ?? {};
  
  const [data, setData] = useState<any>(null);
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: any, value: any) => {
    setData((prevData: any) => ({
      ...prevData,
      [field]: value
    }));
  };

  const { getToken } = useGetToken();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const originalUri = result.assets[0].uri;
      const filename = originalUri.split("/").pop(); // Obtém o nome do arquivo
      const newPath = `${FileSystem.documentDirectory}${filename}`; // Novo caminho

      try {
        await FileSystem.copyAsync({
          from: originalUri,
          to: newPath,
        });
        updateField('foto', newPath);
      } catch (error) {
        console.error("Erro ao copiar a imagem:", error);
      }
    }
  };

  let pathGet = "pais";
  let pathPut = "pais";
  let pathDelete = `pais`;

  if (userFilho) {
    pathGet = "pais/crianca/" + userFilho;
    pathDelete = "pais/crianca/" + userFilho;
    pathPut = "pais/criancas";
  }

  const { loadData } = useLoadData();
  
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await loadData(`http://10.0.2.2:5000/${pathGet}`);
        console.log(data)
        setData(data ?? null);
      };
      fetchData();
    }, [])
  );

  const handleEdit = async () => {
    setLoading(true);

    const body: any = {
      foto: data?.foto,
      usuario: data?.usuario,
      nome: data?.nome,
      senha: data?.senha,
      email: data?.email,
      dataNasc: data?.dataNasc,
    };

    try {
      const token = await getToken();

      const res = await fetch(`http://10.0.2.2:5000/${pathPut}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.ok) {
        setAlertData({
          icon: require("@/assets/icons/icon-check-gradiente.png"),
          title: "Sucesso!",
          message: result.message,
          dual: true,
        });
        setAlertVisible(true);
      } else {
        setAlertData({
          icon: require("@/assets/icons/icon-alerta.png"),
          title: "Erro!",
          message: result.error,
        });
        setAlertVisible(true);
      }
    } catch (err: any) {
      setAlertData({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message:
          "Não foi possível conectar ao servidor. Verifique sua conexão.",
      });
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      const res = await fetch(`http://10.0.2.2:5000/${pathDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        setAlertData({
          icon: require("@/assets/icons/icon-check-gradiente.png"),
          title: "Sucesso!",
          message: "A conta foi excluída com sucesso",
        });
        setAlertVisible(true);
      } else {
        const result = await res.json();
        setAlertData({
          icon: require("@/assets/icons/icon-alerta.png"),
          title: "Erro!",
          message: result.error,
        });
        setAlertVisible(true);
      }
    } catch (err: any) {
      setAlertData({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro!",
        message:
          "Não foi possível conectar ao servidor. Verifique sua conexão.",
      });
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    navigation.navigate("profileParent");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/fundo-gradiente.png")}
      resizeMode="cover"
      style={styles.container}
    >
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
            navigation.navigate("profileParent");
          }}
          redirectLabel="Voltar"
        />
      )}
      {data && (
        <View style={{width: "100%", alignItems: "center", justifyContent: "center"}}>

          <View style={styles.containerFoto}>
            <TouchableOpacity style={styles.btnVoltar} onPress={handleRedirect}>
              <Image
                style={styles.iconVoltar}
                source={require("@/assets/icons/icon-voltar.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
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
                // @ts-ignore
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
                // @ts-ignore
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
