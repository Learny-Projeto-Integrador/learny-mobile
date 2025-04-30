import {
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'edit'>;

type ParentData = {
  idParent: string;
  nome: string;
  filhos: [{}]
  filhoSelecionado: {}
}

import DateInput from "@/components/ui/DateInput";
import LoginInput from "@/components/ui/LoginInput";

export default function EditScreen({ route, navigation }: Props) {
  const { idParent } = route.params ?? {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<ParentData | undefined>(undefined);

  const [image, setImage] = useState<string | null>("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");

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
        setImage(newPath); // Atualiza o estado com a nova URI
      } catch (error) {
        console.error("Erro ao copiar a imagem:", error);
      }
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.error('Erro ao buscar o token', e);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    setError(null);
  
    let editRoute = "pais";
  
    const body: any = {
      foto: image,
      usuario: usuario,
      nome: nome,
      senha: senha,
      email: email,
      dataNasc: dataNasc,
    };
  
    if (idParent) {
      editRoute = "criancas";
      body.responsavel = idParent;
    }
  
    try {
      const token = await getToken();

      const res = await fetch(`http://10.0.2.2:5000/${editRoute}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        Alert.alert("Sucesso!", result, [
          { text: "Voltar", onPress: () => navigation.navigate("profileParent") },
          { text: "OK" },
        ]);
      } else {
        setError(result.error);
        Alert.alert("Erro na edição", result.error);
      }
    } catch (err: any) {
      setError(err.message);
      Alert.alert("Erro inesperado", "Não foi possível conectar ao servidor. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    navigation.navigate("index");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/fundo-gradiente.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <Image
            style={styles.btnImg}
            source={require("../../assets/images/icone-camera.png")}
          />
        )}
      </TouchableOpacity>
      <View style={styles.viewInputs}>
        <LoginInput campo="Usuário" valor={usuario} atualizar={setUsuario} />
        <LoginInput campo="Senha" valor={senha} atualizar={setSenha} />
        <LoginInput campo="Nome" valor={nome} atualizar={setNome} />
        <LoginInput campo="Email" valor={email} atualizar={setEmail} />
        <DateInput valor={dataNasc} atualizar={setDataNasc} />
        <TouchableOpacity
          style={styles.button}
          onPress={
            // @ts-ignore
            () => handleEdit()
          }
        >
          {loading ? (
            <ActivityIndicator size="large" color="#547d98" />
          ) : (
            <Text style={styles.buttonText}>Confirmar</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.viewLink}>
        <Text style={styles.txtLink}>Já possui uma Conta?</Text>
        <TouchableOpacity onPress={() => handleRedirect()}>
          <Text style={styles.link}>Entre aqui</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: height * 0.07,
    borderRadius: 15,
  },
  buttonText: {
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
  btn: {
    width: width * 0.1,
    height: width * 0.1,
    marginBottom: width * 0.01,
  },
  viewLink: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.06,
  },
  txtLink: {
    color: "#fff",
    fontSize: width * 0.04,
    fontFamily: "Montserrat_400Regular",
  },
  link: {
    fontSize: width * 0.04,
    fontFamily: "Montserrat_700Bold",
    textDecorationLine: "underline",
    color: "#fff",
  },
});
