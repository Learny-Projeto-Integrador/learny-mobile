import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import DateInput from "@/components/ui/DateInput";
import LoginInput from "@/components/ui/LoginInput";
import { useApi } from "@/hooks/useApi";
import { pickImage } from "@/utils/pickImage";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomAlert } from "@/contexts/AlertContext";

type Props = NativeStackScreenProps<RootStackParamList, "register">;

export default function RegisterScreen({ route, navigation }: Props) {
  const { idParent } = route.params ?? {};
  const { loading, request } = useApi();
  const { showAlert } = useCustomAlert();
  const [image, setImage] = useState<string | null>("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) setImage(uri);
  }

  const handleSubmit = async () => {
    let registerRoute;
    idParent ? (registerRoute = "criancas") : (registerRoute = "pais");

    const result = await request({
      endpoint: `/${registerRoute}`,
      method: "POST",
      body: { 
        foto: image,
        usuario: usuario,
        nome: nome,
        senha: senha,
        email: email,
        dataNasc: dataNasc,
        responsavel: idParent, 
      },
    });

    if (result && !result.error) {

      if (idParent) {
        const result2 = await request({
          endpoint: `/pais/addcrianca`,
          method: "PUT",
          body: { 
            _id: result.dados._id,
          },
        })

        if (result2 && result2.error) {
          showAlert({
            icon: require("@/assets/icons/icon-alerta.png"),
            title: "Erro ao vincular a criança!",
            message: result2.message,
          });
        }
      };

      showAlert({
          icon: require("@/assets/icons/icon-check-gradiente.png"),
          title: "Sucesso!",
          message: result.message,
          dualAction: true,
          redirectLabel: idParent ? "Voltar" : "Fazer Login",
          onRedirect: () => idParent ? navigation.navigate("profileParent") : navigation.navigate("index"),
      });
    } else {
      showAlert({
        icon: require("@/assets/icons/icon-alerta.png"),
        title: "Erro ao cadastrar os dados!",
        message: result.message,
      });
    }
  };

  return (
    <LinearGradient
      colors={['#973e4a', '#4b85a1']}
      style={styles.container}
    >
      <TouchableOpacity onPress={handlePickImage}>
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
        <TouchableOpacity onPress={() => idParent ? navigation.navigate("profileParent")
        : navigation.navigate("index")}>
          <Text style={styles.link}>{idParent ? "Voltar" : "Entre aqui"}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
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
