import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AlertData, RootStackParamList } from "@/types";

type Props = NativeStackScreenProps<RootStackParamList, "register">;

import DateInput from "@/components/ui/DateInput";
import LoginInput from "@/components/ui/LoginInput";
import { useGetToken } from "@/hooks/useGetToken";
import CustomAlert from "@/components/ui/CustomAlert";

export default function RegisterScreen({ route, navigation }: Props) {
  const { idParent } = route.params ?? {};

  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getToken } = useGetToken();

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

  const handleSubmit = async () => {
    setLoading(true);

    let registerRoute;

    const body: any = {
      foto: image,
      usuario: usuario,
      nome: nome,
      senha: senha,
      email: email,
      dataNasc: dataNasc,
      responsavel: idParent,
    };

    idParent ? (registerRoute = "criancas") : (registerRoute = "pais");

    try {
      const token = await getToken();

      const res = await fetch(`http://10.0.2.2:5000/${registerRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.ok) {
        if (idParent) {
          const bodyId: any = {
            _id: result.dados._id,
          };

          // Adicionando a criança na lista de filhos do responsável
          await fetch(`http://10.0.2.2:5000/pais/addcrianca`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bodyId),
          });

          setAlertData({
            icon: require("@/assets/icons/icon-check-gradiente.png"),
            title: "Sucesso!",
            message: result.message,
            dual: true,
            label: "Voltar",
          });
        } else {
          setAlertData({
            icon: require("@/assets/icons/icon-check-gradiente.png"),
            title: "Sucesso!",
            message: result.message,
            dual: true,
            label: "Fazer Login",
          });
        }
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

  const handleRedirect = () => {
    {
      idParent
        ? navigation.navigate("profileParent")
        : navigation.navigate("index");
    }
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
            alertData.label == "Voltar" ? navigation.navigate("profileParent") : navigation.navigate("index")
          }}
          redirectLabel={alertData.label ? alertData.label : "Voltar"}
        />
      )}
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <Image
            style={styles.btnImg}
            source={require("@/assets/icons/icone-camera.png")}
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
            () => handleSubmit()
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
        {idParent ? (
          <Text style={styles.txtLink}>Deseja voltar?</Text>
        ) : (
          <Text style={styles.txtLink}>Já possui uma Conta?</Text>
        )}
        <TouchableOpacity onPress={() => handleRedirect()}>
          <Text style={styles.link}>{idParent ? "Voltar" : "Entre aqui"}</Text>
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
